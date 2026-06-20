(function () {
  const fallbackSave = {
    enabled: false,
    ready: Promise.resolve({ enabled: false }),
    loadProgress: async () => null,
    saveProgress: async () => {},
    loadLeaderboard: async () => [],
  };

  function hasFirebaseConfig(config) {
    return Boolean(
      config &&
        config.apiKey &&
        config.authDomain &&
        config.projectId &&
        config.appId
    );
  }

  function copyProgress(progress) {
    return {
      playerName: typeof progress.playerName === "string" ? progress.playerName : "",
      completedLevels: Array.isArray(progress.completedLevels) ? progress.completedLevels.map(Boolean) : [],
      cheeseRunLevels: Array.isArray(progress.cheeseRunLevels) ? progress.cheeseRunLevels.map(Boolean) : [],
      cheeseCount: Math.max(0, Math.floor(Number(progress.cheeseCount) || 0)),
      testCheeseRemoved: true,
      ownedItems: Array.isArray(progress.ownedItems) ? [...new Set(progress.ownedItems)].map(String) : [],
      equippedItems: {
        hat: progress.equippedItems ? progress.equippedItems.hat || null : null,
        suit: progress.equippedItems ? progress.equippedItems.suit || null : null,
        jewelry: progress.equippedItems ? progress.equippedItems.jewelry || null : null,
      },
      savedAt: Date.now(),
    };
  }

  function copyLeaderboard(progress) {
    const playerName = typeof progress.playerName === "string"
      ? progress.playerName.trim().slice(0, 18)
      : "";

    return {
      playerName: playerName || "Pelaaja",
      cheeseCount: Math.max(0, Math.floor(Number(progress.cheeseCount) || 0)),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
    };
  }

  const config = window.CAT_AND_MOUSE_FIREBASE_CONFIG;
  if (
    !hasFirebaseConfig(config) ||
    !window.firebase ||
    !window.firebase.auth ||
    !window.firebase.firestore
  ) {
    window.catAndMouseCloudSave = fallbackSave;
    return;
  }

  let auth;
  let db;

  try {
    const app = window.firebase.apps.length
      ? window.firebase.app()
      : window.firebase.initializeApp(config);
    auth = window.firebase.auth(app);
    db = window.firebase.firestore(app);
  } catch (error) {
    console.warn("Cloud save could not start.", error);
    window.catAndMouseCloudSave = fallbackSave;
    return;
  }

  let playerId = null;

  const ready = auth.signInAnonymously()
    .then((credential) => {
      playerId = credential.user.uid;
      return { enabled: true, playerId };
    })
    .catch((error) => {
      console.warn("Cloud save is not ready.", error);
      return { enabled: false, error };
    });

  async function loadProgress() {
    await ready;
    if (!playerId) {
      return null;
    }

    const snapshot = await db.collection("players").doc(playerId).get();
    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data();
    return data && data.progress ? data.progress : null;
  }

  async function saveProgress(progress) {
    await ready;
    if (!playerId) {
      return;
    }

    await db.collection("players").doc(playerId).set({
      playerName: typeof progress.playerName === "string" ? progress.playerName : "",
      progress: copyProgress(progress),
      updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    try {
      await db.collection("leaderboard").doc(playerId).set(copyLeaderboard(progress), { merge: true });
    } catch (error) {
      console.warn("Leaderboard save failed.", error);
    }
  }

  async function loadLeaderboard() {
    await ready;
    if (!playerId) {
      return [];
    }

    const snapshot = await db.collection("leaderboard")
      .orderBy("cheeseCount", "desc")
      .limit(10)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        playerName: typeof data.playerName === "string" ? data.playerName : "Pelaaja",
        cheeseCount: Math.max(0, Math.floor(Number(data.cheeseCount) || 0)),
      };
    });
  }

  window.catAndMouseCloudSave = {
    enabled: true,
    ready,
    loadProgress,
    saveProgress,
    loadLeaderboard,
  };
})();
