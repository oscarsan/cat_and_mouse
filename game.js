const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const startButton = document.getElementById("startButton");
const playerNameInput = document.getElementById("playerNameInput");
const levelSelect = document.getElementById("levelSelect");
const cheeseCount = document.getElementById("cheeseCount");
const shopButton = document.getElementById("shopButton");
const playShopButton = document.getElementById("playShopButton");
const leaderboardButton = document.getElementById("leaderboardButton");
const playLeaderboardButton = document.getElementById("playLeaderboardButton");
const shopPanel = document.getElementById("shopPanel");
const shopCloseButton = document.getElementById("shopCloseButton");
const leaderboardPanel = document.getElementById("leaderboardPanel");
const leaderboardCloseButton = document.getElementById("leaderboardCloseButton");
const leaderboardList = document.getElementById("leaderboardList");
const shopPreview = document.getElementById("shopPreview");
const shopItems = document.getElementById("shopItems");
const shopCheeseCount = document.getElementById("shopCheeseCount");
const shopCtx = shopPreview ? shopPreview.getContext("2d") : null;

const VIEW = { width: 960, height: 540 };
const GROUND_Y = 424;
const GRAVITY = 1650;
const PLAYER_SPEED = 360;
const JUMP_SPEED = 680;
const MEOW_INTERVAL = 5;
const BEAR_WAKE_DISTANCE = 185;
const BEAR_CHASE_DISTANCE = 330;
const BEAR_EAT_DISTANCE = 58;
const BEAR_SPEED = 185;
const BEAR_WAKE_DELAY = 0.95;
const BEAR_WAKE_UP_TIME = 0.35;
const OCTOPUS_WAKE_DISTANCE = 220;
const OCTOPUS_TENTACLE_RANGE = 285;
const OCTOPUS_GRAB_DISTANCE = 20;
const OCTOPUS_WAKE_DELAY = 1.25;
const OCTOPUS_STRIKE_SPEED = 0.9;
const UNDERWATER_PLAYER_SPEED = 215;
const UNDERWATER_JUMP_SPEED = 345;
const UNDERWATER_GRAVITY = 520;
const COBRA_WAKE_DISTANCE = 190;
const COBRA_STRIKE_RANGE = 240;
const COBRA_BITE_DISTANCE = 38;
const COBRA_WAKE_DELAY = 0.75;
const COBRA_STRIKE_SPEED = 1.65;
const BANANA_SLIP_DISTANCE = 54;
const BANANA_SPIN_TIME = 1.2;
const SPACE_PLAYER_SPEED = 330;
const SPACE_PLAYER_VERTICAL_SPEED = 260;
const SPACE_MIN_Y = 74;
const SPACE_MAX_Y = 354;
const SPACE_LASER_SPEED = 360;
const SPACE_LASER_INTERVAL = 2.45;
const SPACE_MONSTER_WAKE_DISTANCE = 360;
const SPACE_MONSTER_FORGET_DISTANCE = 720;
const SPACE_MONSTER_SPEED = 285;
const SPACE_MONSTER_CATCH_DISTANCE = 58;
const SPACE_MONSTER_PULI_INTERVAL = 1.15;
const PROGRESS_STORAGE_KEY = "catAndMouseProgressV1";
const START_CHEESE = 0;
const PLAYER_NAME_MAX_LENGTH = 18;
const OLD_TEST_CHEESE_GRANT = 30;
const ALL_LEVELS_CHEESE_BONUS = 5;
const SHOP_PRICE = 5;
const MORE_SHOP_UNLOCK_CHEESE = 10;
const BASE_SHOP_ITEMS = [
  { id: "cap", name: "LIPPI", category: "hat" },
  { id: "cowboy", name: "COWBOY", category: "hat" },
  { id: "pan", name: "PANNU", category: "hat" },
  { id: "egg", name: "MUNA", category: "hat" },
];
const MORE_SHOP_ITEMS = [
  { id: "stripeSuit", name: "RAITAPUKU", category: "suit", more: true },
  { id: "dotSuit", name: "PILKKUPUKU", category: "suit", more: true },
  { id: "starSuit", name: "TAHTIPUKU", category: "suit", more: true },
  { id: "boltSuit", name: "SALAMAPUKU", category: "suit", more: true },
  { id: "flowerSuit", name: "KUKKAPUKU", category: "suit", more: true },
  { id: "wizard", name: "TAIKAHATTU", category: "hat", more: true },
  { id: "crown", name: "KRUUNU", category: "hat", more: true },
  { id: "greenHat", name: "VIHERHATTU", category: "hat", more: true },
  { id: "winterHat", name: "TALVIHATTU", category: "hat", more: true },
  { id: "helmet", name: "KYPARA", category: "hat", more: true },
  { id: "goldNecklace", name: "KULTAKORU", category: "jewelry", more: true },
  { id: "pearls", name: "HELMET", category: "jewelry", more: true },
  { id: "starCharm", name: "TAHTIKORU", category: "jewelry", more: true },
  { id: "heartCharm", name: "SYDANKORU", category: "jewelry", more: true },
  { id: "bowTie", name: "RUSETTI", category: "jewelry", more: true },
];
const SHOP_ITEMS = [...BASE_SHOP_ITEMS, ...MORE_SHOP_ITEMS];

const LEVELS = [
  {
    worldWidth: 5200,
    catSpeeds: [250, 230],
    caves: [
      { x: 960, width: 390, height: 150, tone: "#73838d" },
      { x: 2450, width: 500, height: 172, tone: "#657782", bear: true },
      { x: 4350, width: 620, height: 205, tone: "#596b73", final: true },
    ],
    stoneWalls: [
      { x: 1900, width: 190, height: 178 },
    ],
    logs: [
      { x: 720, width: 154, height: 52 },
      { x: 1320, width: 154, height: 54 },
      { x: 1480, width: 116, height: 58 },
      { x: 1620, width: 116, height: 110 },
      { x: 1760, width: 122, height: 150 },
      { x: 2300, width: 162, height: 54 },
      { x: 3040, width: 194, height: 58 },
      { x: 3820, width: 172, height: 54 },
    ],
  },
  {
    worldWidth: 5600,
    catSpeeds: [278, 255],
    theme: "winter",
    caves: [
      { x: 900, width: 360, height: 150, tone: "#73838d" },
      { x: 2500, width: 470, height: 176, tone: "#657782", bear: true },
      { x: 4750, width: 610, height: 205, tone: "#596b73", final: true },
    ],
    stoneWalls: [
      { x: 1450, width: 220, height: 185 },
      { x: 3180, width: 250, height: 205 },
    ],
    logs: [
      { x: 670, width: 142, height: 54 },
      { x: 1050, width: 116, height: 62 },
      { x: 1190, width: 116, height: 116 },
      { x: 1330, width: 120, height: 160 },
      { x: 2100, width: 150, height: 56 },
      { x: 2700, width: 116, height: 65 },
      { x: 2850, width: 118, height: 125 },
      { x: 3000, width: 122, height: 174 },
      { x: 3900, width: 164, height: 58 },
      { x: 4320, width: 148, height: 60 },
    ],
  },
  {
    worldWidth: 6000,
    catSpeeds: [305, 282],
    theme: "underwater",
    caves: [
      { x: 970, width: 380, height: 154, tone: "#527b8b" },
      { x: 2740, width: 510, height: 184, tone: "#456c7d", octopus: true },
      { x: 5100, width: 630, height: 212, tone: "#3f6574", final: true },
    ],
    stoneWalls: [
      { x: 1600, width: 250, height: 205 },
      { x: 3680, width: 290, height: 220 },
    ],
    logs: [
      { x: 760, width: 146, height: 56 },
      { x: 1080, width: 132, height: 62 },
      { x: 1205, width: 114, height: 120 },
      { x: 1345, width: 118, height: 172 },
      { x: 1490, width: 118, height: 206 },
      { x: 2200, width: 156, height: 60 },
      { x: 3140, width: 118, height: 66 },
      { x: 3280, width: 116, height: 126 },
      { x: 3420, width: 118, height: 178 },
      { x: 3560, width: 122, height: 214 },
      { x: 4300, width: 160, height: 62 },
      { x: 4680, width: 138, height: 64 },
    ],
  },
  {
    worldWidth: 6500,
    catSpeeds: [335, 312],
    theme: "desert",
    caves: [
      { x: 930, width: 390, height: 158, tone: "#b99664" },
      { x: 2920, width: 500, height: 188, tone: "#a57b4d", cobra: true },
      { x: 5550, width: 650, height: 218, tone: "#8f6842", final: true },
    ],
    stoneWalls: [
      { x: 1500, width: 250, height: 205 },
      { x: 3000, width: 280, height: 226 },
      { x: 4480, width: 320, height: 232 },
    ],
    logs: [
      { x: 650, width: 142, height: 58 },
      { x: 990, width: 114, height: 66 },
      { x: 1130, width: 116, height: 126 },
      { x: 1270, width: 118, height: 176 },
      { x: 1410, width: 120, height: 208 },
      { x: 2350, width: 116, height: 70 },
      { x: 2490, width: 116, height: 132 },
      { x: 2630, width: 118, height: 190 },
      { x: 2800, width: 124, height: 226 },
      { x: 3860, width: 116, height: 70 },
      { x: 4010, width: 116, height: 135 },
      { x: 4160, width: 120, height: 194 },
      { x: 4320, width: 126, height: 232 },
      { x: 5050, width: 150, height: 62 },
    ],
  },
  {
    worldWidth: 7000,
    catSpeeds: [370, 345],
    theme: "rally",
    caves: [
      { x: 920, width: 400, height: 160, tone: "#6d7b86" },
      { x: 3050, width: 520, height: 192, tone: "#586771", banana: true },
      { x: 6000, width: 670, height: 224, tone: "#4e5d65", final: true },
    ],
    stoneWalls: [
      { x: 1380, width: 260, height: 212 },
      { x: 2700, width: 300, height: 232 },
      { x: 4100, width: 320, height: 238 },
      { x: 5300, width: 330, height: 240 },
    ],
    logs: [
      { x: 610, width: 142, height: 60 },
      { x: 880, width: 112, height: 70 },
      { x: 1020, width: 114, height: 132 },
      { x: 1160, width: 118, height: 190 },
      { x: 1300, width: 120, height: 214 },
      { x: 2100, width: 112, height: 72 },
      { x: 2240, width: 114, height: 138 },
      { x: 2380, width: 118, height: 198 },
      { x: 2540, width: 122, height: 232 },
      { x: 3470, width: 112, height: 74 },
      { x: 3620, width: 114, height: 140 },
      { x: 3770, width: 118, height: 202 },
      { x: 3930, width: 124, height: 238 },
      { x: 4670, width: 112, height: 78 },
      { x: 4820, width: 114, height: 146 },
      { x: 4970, width: 118, height: 208 },
      { x: 5140, width: 126, height: 240 },
    ],
  },
  {
    worldWidth: 7800,
    catSpeeds: [360, 338],
    theme: "space",
    caves: [
      { x: 1000, width: 420, height: 172, tone: "#6b5cc7", planet: true },
      { x: 3320, width: 580, height: 220, tone: "#8757c7", planet: true, spaceMonster: true },
      { x: 6660, width: 690, height: 230, tone: "#4d88d6", planet: true, final: true },
    ],
    stoneWalls: [
      { x: 1480, y: 118, width: 190, height: 128 },
      { x: 2920, y: 252, width: 230, height: 112 },
      { x: 4380, y: 105, width: 250, height: 135 },
      { x: 5740, y: 235, width: 220, height: 125 },
    ],
    logs: [
      { x: 690, y: 230, width: 96, height: 82 },
      { x: 1220, y: 118, width: 128, height: 88 },
      { x: 1860, y: 280, width: 112, height: 86 },
      { x: 2320, y: 92, width: 148, height: 104 },
      { x: 2700, y: 238, width: 106, height: 84 },
      { x: 3640, y: 170, width: 126, height: 94 },
      { x: 4060, y: 305, width: 112, height: 82 },
      { x: 4890, y: 102, width: 148, height: 102 },
      { x: 5280, y: 252, width: 112, height: 86 },
      { x: 6140, y: 155, width: 132, height: 98 },
    ],
  },
];

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let lastTime = performance.now();
let state = "menu";
let currentLevelIndex = 0;
let worldWidth = LEVELS[0].worldWidth;
let lives = 3;
let cameraX = 0;
let jumpQueued = false;
let winTimer = 0;
let captureTimer = 0;
let captureStyle = "cage";
let cheeseBites = 0;
let levelMessageTimer = 0;
let audioContext = null;
let lastBoingAt = 0;
let lastBearGrowlAt = 0;
let lastSpacePuliAt = 0;

const pointer = {
  active: false,
  viewX: 180,
  viewY: 260,
};

const player = {
  x: 130,
  y: GROUND_Y - 36,
  prevY: GROUND_Y - 36,
  width: 58,
  height: 34,
  vx: 0,
  vy: 0,
  grounded: true,
  facing: 1,
  stun: 0,
  safePlatform: null,
  hidden: false,
  spinTimer: 0,
};

const cats = [
  { x: -180, y: GROUND_Y - 48, width: 72, height: 46, speed: 250, phase: 0, facing: 1, heldAtGate: false, blockedByLog: false, meowTimer: 1.3, eaten: false },
  { x: -290, y: GROUND_Y - 48, width: 72, height: 46, speed: 230, phase: 0.55, facing: 1, heldAtGate: false, blockedByLog: false, meowTimer: 3.8, eaten: false },
];

let logs = [];
let stoneWalls = [];
let caves = [];
let bears = [];
let octopuses = [];
let cobras = [];
let bananas = [];
let catLasers = [];
let spaceMonsters = [];
let finalCave = null;

const cheese = {
  x: 0,
  y: GROUND_Y - 28,
};

const cloudSave = window.catAndMouseCloudSave || null;
let cloudProgressLoaded = false;
let cloudSaveTimer = 0;
let progress = loadProgress();
let selectedStartLevel = 0;
let levelButtons = [];
let showMoreShop = false;
let leaderboardRequestId = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDefaultProgress() {
  return {
    playerName: "",
    completedLevels: Array(LEVELS.length).fill(false),
    cheeseRunLevels: Array(LEVELS.length).fill(false),
    cheeseCount: START_CHEESE,
    testCheeseRemoved: true,
    ownedItems: [],
    equippedItems: {
      hat: null,
      suit: null,
      jewelry: null,
    },
  };
}

function normalizeProgress(saved) {
  const defaults = getDefaultProgress();
  if (!saved || typeof saved !== "object") {
    return defaults;
  }

  const playerName = sanitizePlayerName(saved.playerName || "");
  const savedItems = Array.isArray(saved.ownedItems) ? saved.ownedItems : [];
  const savedHats = Array.isArray(saved.ownedHats) ? saved.ownedHats : [];
  const ownedItems = [...new Set([...savedItems, ...savedHats])]
    .filter((itemId) => SHOP_ITEMS.some((item) => item.id === itemId));
  const oldEquippedHat = saved.equippedHat || null;
  const savedEquipped = saved.equippedItems && typeof saved.equippedItems === "object"
    ? saved.equippedItems
    : {};
  const equippedItems = {
    hat: savedEquipped.hat || oldEquippedHat,
    suit: savedEquipped.suit || null,
    jewelry: savedEquipped.jewelry || null,
  };

  Object.keys(equippedItems).forEach((category) => {
    const item = SHOP_ITEMS.find((shopItem) => shopItem.id === equippedItems[category]);
    if (!item || item.category !== category || !ownedItems.includes(item.id)) {
      equippedItems[category] = null;
    }
  });
  const savedCheeseCount = Math.max(0, Math.floor(Number(saved.cheeseCount) || 0));
  const cheeseCount = saved.testCheeseRemoved
    ? savedCheeseCount
    : Math.max(0, savedCheeseCount - OLD_TEST_CHEESE_GRANT);

  return {
    playerName,
    completedLevels: defaults.completedLevels.map((_, index) => Boolean(saved.completedLevels && saved.completedLevels[index])),
    cheeseRunLevels: defaults.cheeseRunLevels.map((_, index) => Boolean(saved.cheeseRunLevels && saved.cheeseRunLevels[index])),
    cheeseCount,
    testCheeseRemoved: true,
    ownedItems,
    equippedItems,
  };
}

function loadProgress() {
  try {
    return normalizeProgress(JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY)));
  } catch (error) {
    return getDefaultProgress();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    // Progress is still kept for the current session if browser storage is unavailable.
  }

  scheduleCloudProgressSave();
}

function sanitizePlayerName(name) {
  return String(name || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, PLAYER_NAME_MAX_LENGTH);
}

function hasPlayerName() {
  return sanitizePlayerName(progress.playerName).length > 0;
}

function savePlayerNameFromInput() {
  if (!playerNameInput) {
    return;
  }

  const playerName = sanitizePlayerName(playerNameInput.value);
  playerNameInput.value = playerName;
  playerNameInput.classList.toggle("is-needed", !playerName);
  if (progress.playerName !== playerName) {
    progress.playerName = playerName;
    saveProgress();
  }
}

function scheduleCloudProgressSave() {
  if (!cloudSave || !cloudSave.enabled || !cloudProgressLoaded) {
    return;
  }

  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = window.setTimeout(() => {
    cloudSave.saveProgress(progress).catch((error) => {
      console.warn("Cloud save failed.", error);
    });
  }, 350);
}

async function loadCloudProgress() {
  if (!cloudSave || !cloudSave.enabled) {
    return;
  }

  try {
    await cloudSave.ready;
    const savedProgress = await cloudSave.loadProgress();
    if (savedProgress) {
      progress = normalizeProgress(savedProgress);
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        // Local storage is optional when cloud save is available.
      }
      updateOverlayProgress();
    }
    await cloudSave.saveProgress(progress);
    cloudProgressLoaded = true;
  } catch (error) {
    console.warn("Cloud save could not load.", error);
  }
}

function setSelectedStartLevel(levelIndex) {
  selectedStartLevel = clamp(levelIndex, 0, LEVELS.length - 1);
  updateOverlayProgress();
}

function updateOverlayProgress() {
  if (playerNameInput) {
    playerNameInput.value = progress.playerName || "";
    playerNameInput.classList.toggle("is-needed", !hasPlayerName());
  }

  startButton.disabled = !hasPlayerName();

  if (cheeseCount) {
    cheeseCount.textContent = String(progress.cheeseCount);
  }

  if (shopCheeseCount) {
    shopCheeseCount.textContent = String(progress.cheeseCount);
  }

  levelButtons.forEach((button, index) => {
    button.classList.toggle("is-complete", Boolean(progress.completedLevels[index]));
    button.classList.toggle("is-selected", index === selectedStartLevel);
  });

  renderShopItems();
  drawShopPreview();
  updatePlayActionButtons();
}

function buildLevelSelect() {
  if (!levelSelect) {
    return;
  }

  levelSelect.innerHTML = "";
  levelButtons = LEVELS.map((_, index) => {
    const button = document.createElement("button");
    button.className = "level-dot";
    button.type = "button";
    button.textContent = String(index + 1);
    button.setAttribute("aria-label", `Taso ${index + 1}`);
    button.addEventListener("click", () => setSelectedStartLevel(index));
    levelSelect.appendChild(button);
    return button;
  });

  updateOverlayProgress();
}

function getShopItem(itemId) {
  return SHOP_ITEMS.find((item) => item.id === itemId);
}

function isShopItemOwned(itemId) {
  return progress.ownedItems.includes(itemId);
}

function openShop() {
  if (!shopPanel) {
    return;
  }

  closeLeaderboard();
  updateOverlayProgress();
  if (state === "playing") {
    state = "shopping";
    overlay.classList.add("is-panel-open");
    overlay.classList.remove("is-hidden");
  }
  shopPanel.classList.remove("is-hidden");
  updatePlayActionButtons();
}

function closeShop() {
  if (shopPanel) {
    shopPanel.classList.add("is-hidden");
  }

  if (state === "shopping") {
    overlay.classList.remove("is-panel-open");
    overlay.classList.add("is-hidden");
    state = "playing";
    updatePlayActionButtons();
    canvas.focus();
  }
}

function renderLeaderboardStatus(message) {
  if (!leaderboardList) {
    return;
  }

  leaderboardList.innerHTML = "";
  const empty = document.createElement("div");
  empty.className = "leaderboard-empty";
  empty.textContent = message;
  leaderboardList.appendChild(empty);
}

function getLocalLeaderboardEntries() {
  if (!hasPlayerName()) {
    return [];
  }

  return [{
    id: "local",
    playerName: progress.playerName,
    cheeseCount: progress.cheeseCount,
  }];
}

function renderLeaderboard(entries) {
  if (!leaderboardList) {
    return;
  }

  leaderboardList.innerHTML = "";
  if (!entries.length) {
    renderLeaderboardStatus("EI TULOKSIA VIELA");
    return;
  }

  entries.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";

    const rank = document.createElement("div");
    rank.className = "leaderboard-rank";
    rank.textContent = String(index + 1);

    const name = document.createElement("div");
    name.className = "leaderboard-name";
    name.textContent = sanitizePlayerName(entry.playerName) || "Pelaaja";

    const cheese = document.createElement("div");
    cheese.className = "leaderboard-cheese";
    const cheeseIcon = document.createElement("span");
    cheeseIcon.className = "cheese-mark";
    cheeseIcon.setAttribute("aria-hidden", "true");
    const cheeseValue = document.createElement("span");
    cheeseValue.textContent = String(Math.max(0, Math.floor(Number(entry.cheeseCount) || 0)));
    cheese.appendChild(cheeseIcon);
    cheese.appendChild(cheeseValue);

    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(cheese);
    leaderboardList.appendChild(row);
  });
}

async function openLeaderboard() {
  if (!leaderboardPanel) {
    return;
  }

  closeShop();
  const requestId = leaderboardRequestId + 1;
  leaderboardRequestId = requestId;
  renderLeaderboardStatus("LADATAAN...");

  if (state === "playing") {
    state = "leaderboard";
    overlay.classList.add("is-panel-open");
    overlay.classList.remove("is-hidden");
  }

  leaderboardPanel.classList.remove("is-hidden");
  updatePlayActionButtons();

  try {
    const entries = cloudSave && cloudSave.enabled && cloudSave.loadLeaderboard
      ? await cloudSave.loadLeaderboard()
      : getLocalLeaderboardEntries();
    if (leaderboardRequestId === requestId) {
      renderLeaderboard(entries);
    }
  } catch (error) {
    console.warn("Leaderboard load failed.", error);
    if (leaderboardRequestId === requestId) {
      renderLeaderboardStatus("TULOSTAULU EI TOIMI");
    }
  }
}

function closeLeaderboard() {
  leaderboardRequestId += 1;
  if (leaderboardPanel) {
    leaderboardPanel.classList.add("is-hidden");
  }

  if (state === "leaderboard") {
    overlay.classList.remove("is-panel-open");
    overlay.classList.add("is-hidden");
    state = "playing";
    updatePlayActionButtons();
    canvas.focus();
  }
}

function buyOrEquipItem(itemId) {
  const shopItem = getShopItem(itemId);
  if (!shopItem) {
    return;
  }

  if (isShopItemOwned(itemId)) {
    progress.equippedItems[shopItem.category] = itemId;
    saveProgress();
    updateOverlayProgress();
    return;
  }

  if (progress.cheeseCount < SHOP_PRICE) {
    return;
  }

  progress.cheeseCount -= SHOP_PRICE;
  progress.ownedItems.push(itemId);
  progress.equippedItems[shopItem.category] = itemId;
  saveProgress();
  updateOverlayProgress();
}

function createMoreShopButton() {
  const moreButton = document.createElement("button");
  moreButton.className = "shop-more-button";
  moreButton.type = "button";
  moreButton.textContent = "LISAA TAVAROITA";
  moreButton.addEventListener("click", () => {
    showMoreShop = true;
    renderShopItems();
  });
  return moreButton;
}

function renderShopItems() {
  if (!shopItems) {
    return;
  }

  shopItems.innerHTML = "";
  const visibleItems = showMoreShop ? SHOP_ITEMS : BASE_SHOP_ITEMS;
  shopItems.classList.toggle("is-expanded", showMoreShop);

  visibleItems.forEach((shopItem) => {
    const owned = isShopItemOwned(shopItem.id);
    const equipped = progress.equippedItems[shopItem.category] === shopItem.id;
    const canBuy = progress.cheeseCount >= SHOP_PRICE;
    const slot = document.createElement("div");
    slot.className = "shop-slot";
    const item = document.createElement("button");
    item.className = "shop-item";
    item.type = "button";
    item.disabled = !owned && !canBuy;
    item.classList.toggle("is-equipped", equipped);
    item.addEventListener("click", () => buyOrEquipItem(shopItem.id));

    const icon = document.createElement("canvas");
    icon.className = "hat-canvas";
    icon.width = 80;
    icon.height = 58;
    drawShopItemIcon(icon, shopItem.id);

    const name = document.createElement("span");
    name.className = "shop-item-name";
    name.textContent = shopItem.name;

    const status = document.createElement("span");
    status.className = "shop-item-status";
    status.textContent = equipped ? "KAYTOSSA" : owned ? "VALITSE" : `${SHOP_PRICE} JUUSTOA`;

    item.appendChild(icon);
    item.appendChild(name);
    item.appendChild(status);
    slot.appendChild(item);

    if (!showMoreShop && shopItem.id === "cap" && progress.cheeseCount >= MORE_SHOP_UNLOCK_CHEESE) {
      slot.appendChild(createMoreShopButton());
    }

    shopItems.appendChild(slot);
  });
}

function drawShopItemIcon(canvasElement, itemId) {
  const target = canvasElement.getContext("2d");
  target.clearRect(0, 0, canvasElement.width, canvasElement.height);
  target.save();
  target.translate(40, 32);
  const item = getShopItem(itemId);
  if (item && item.category === "suit") {
    drawSuitShape(target, itemId, 0, 0, 1.05);
  } else if (item && item.category === "jewelry") {
    drawJewelryShape(target, itemId, 0, 0, 1.15);
  } else {
    drawHatShape(target, itemId, 0, 0, 1.15);
  }
  target.restore();
}

function drawShopPreview() {
  if (!shopCtx || !shopPreview) {
    return;
  }

  shopCtx.clearRect(0, 0, shopPreview.width, shopPreview.height);

  const gradient = shopCtx.createLinearGradient(0, 0, 0, shopPreview.height);
  gradient.addColorStop(0, "#bfeaf4");
  gradient.addColorStop(1, "#7fbd67");
  shopCtx.fillStyle = gradient;
  shopCtx.fillRect(0, 0, shopPreview.width, shopPreview.height);

  shopCtx.fillStyle = "rgba(42, 31, 20, 0.16)";
  shopCtx.beginPath();
  shopCtx.ellipse(132, 129, 68, 11, 0, 0, Math.PI * 2);
  shopCtx.fill();

  shopCtx.save();
  shopCtx.translate(128, 84);
  shopCtx.scale(1.55, 1.55);
  drawShopMouse(shopCtx);
  if (progress.equippedItems.hat) {
    drawHatShape(shopCtx, progress.equippedItems.hat, 25, -7, 0.7);
  }
  if (progress.equippedItems.jewelry) {
    drawJewelryShape(shopCtx, progress.equippedItems.jewelry, 22, 22, 0.55);
  }
  shopCtx.restore();
}

function drawShopMouse(target) {
  target.strokeStyle = "#7d8386";
  target.lineWidth = 4;
  target.lineCap = "round";
  target.beginPath();
  target.moveTo(-25, 24);
  target.quadraticCurveTo(-47, 17, -54, 34);
  target.stroke();

  target.fillStyle = "#858b8e";
  target.beginPath();
  target.ellipse(0, 18, 29, 17, 0, 0, Math.PI * 2);
  target.fill();

  if (progress.equippedItems.suit) {
    drawSuitShape(target, progress.equippedItems.suit, 0, 18, 0.74);
  }

  target.fillStyle = "#9aa0a3";
  target.beginPath();
  target.ellipse(24, 12, 18, 14, -0.12, 0, Math.PI * 2);
  target.fill();

  target.fillStyle = "#d9a8af";
  target.beginPath();
  target.arc(20, 0, 10, 0, Math.PI * 2);
  target.arc(31, 3, 9, 0, Math.PI * 2);
  target.fill();

  target.fillStyle = "#9aa0a3";
  target.beginPath();
  target.arc(20, 0, 6, 0, Math.PI * 2);
  target.arc(31, 3, 5, 0, Math.PI * 2);
  target.fill();

  target.fillStyle = "#111b20";
  target.beginPath();
  target.arc(32, 9, 2.8, 0, Math.PI * 2);
  target.fill();

  target.fillStyle = "#e3a9b1";
  target.beginPath();
  target.ellipse(42, 16, 4.5, 3.2, 0, 0, Math.PI * 2);
  target.fill();
}

function completeLevel(levelIndex) {
  let changed = false;

  if (!progress.completedLevels[levelIndex]) {
    progress.completedLevels[levelIndex] = true;
    changed = true;
  }

  progress.cheeseCount += 1;
  changed = true;

  if (!progress.cheeseRunLevels[levelIndex]) {
    progress.cheeseRunLevels[levelIndex] = true;
  }

  if (progress.cheeseRunLevels.every(Boolean)) {
    progress.cheeseCount += ALL_LEVELS_CHEESE_BONUS;
    progress.cheeseRunLevels = Array(LEVELS.length).fill(false);
  }

  if (changed) {
    saveProgress();
    updateOverlayProgress();
  }
}

function isWinterLevel() {
  const level = LEVELS[currentLevelIndex];
  return level && level.theme === "winter";
}

function isUnderwaterLevel() {
  const level = LEVELS[currentLevelIndex];
  return level && level.theme === "underwater";
}

function isDesertLevel() {
  const level = LEVELS[currentLevelIndex];
  return level && level.theme === "desert";
}

function isRallyLevel() {
  const level = LEVELS[currentLevelIndex];
  return level && level.theme === "rally";
}

function isSpaceLevel() {
  const level = LEVELS[currentLevelIndex];
  return level && level.theme === "space";
}

function createBear(cave, index) {
  const homeX = cave.x + cave.width * 0.5;
  return {
    cave,
    x: homeX,
    homeX,
    y: GROUND_Y - 70,
    width: 112,
    height: 74,
    state: "sleeping",
    phase: index * 0.8,
    wakeTimer: 0,
    calmTimer: 0,
    eatTimer: 0,
    wakeTargetX: homeX,
    facing: -1,
  };
}

function createCobra(cave, index) {
  const homeX = cave.x + cave.width * 0.5;
  const homeY = GROUND_Y - 34;
  return {
    cave,
    x: homeX,
    y: homeY,
    homeX,
    homeY,
    state: "sleeping",
    phase: index * 0.5,
    wakeTimer: 0,
    strikeProgress: 0,
    strikeTargetX: homeX,
    strikeTargetY: homeY,
    facing: -1,
  };
}

function createOctopus(cave, index) {
  const homeX = cave.x + cave.width * 0.5;
  const homeY = GROUND_Y - 82;
  return {
    cave,
    x: homeX,
    y: homeY,
    homeX,
    homeY,
    state: "sleeping",
    phase: index * 0.7,
    wakeTimer: 0,
    strikeProgress: 0,
    tentacleX: homeX,
    tentacleY: homeY,
    target: null,
  };
}

function createBanana(cave, index) {
  const homeX = cave.x + cave.width * 0.5;
  return {
    cave,
    x: homeX,
    y: GROUND_Y - 17,
    width: 64,
    height: 30,
    phase: index * 0.6,
    used: false,
  };
}

function getSpaceMonsterHome(cave) {
  const centerX = cave.x + cave.width / 2;
  const centerY = 292;
  const radius = 94;
  return {
    x: centerX,
    y: centerY - radius - 14,
  };
}

function createSpaceMonster(cave, index) {
  const home = getSpaceMonsterHome(cave);
  return {
    cave,
    x: home.x,
    y: home.y,
    homeX: home.x,
    homeY: home.y,
    state: "sleeping",
    phase: index * 0.7,
    puliTimer: 0,
    facing: -1,
  };
}

function cloneLevelItems(items, kind) {
  return items.map((item) => ({ ...item, kind }));
}

function applyLevel(levelIndex) {
  const level = LEVELS[levelIndex];
  worldWidth = level.worldWidth;
  logs = cloneLevelItems(level.logs, "log");
  stoneWalls = cloneLevelItems(level.stoneWalls, "wall");
  caves = level.caves.map((cave) => ({ ...cave }));
  bears = caves.filter((cave) => cave.bear).map(createBear);
  octopuses = caves.filter((cave) => cave.octopus).map(createOctopus);
  cobras = caves.filter((cave) => cave.cobra).map(createCobra);
  bananas = caves.filter((cave) => cave.banana).map(createBanana);
  spaceMonsters = caves.filter((cave) => cave.spaceMonster).map(createSpaceMonster);
  finalCave = caves.find((cave) => cave.final) || caves[caves.length - 1];
  cheese.x = finalCave.x + finalCave.width - 160;
  cheese.y = level.theme === "space" ? 205 : GROUND_Y - 28;

  cats.forEach((cat, index) => {
    cat.speed = level.catSpeeds[index] || level.catSpeeds[0];
  });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = true;

  scale = Math.min(canvas.width / VIEW.width, canvas.height / VIEW.height);
  offsetX = (canvas.width - VIEW.width * scale) / 2;
  offsetY = (canvas.height - VIEW.height * scale) / 2;
}

function clientToView(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const cssX = clientX - rect.left;
  const cssY = clientY - rect.top;
  const canvasX = cssX * (canvas.width / rect.width);
  const canvasY = cssY * (canvas.height / rect.height);

  return {
    x: clamp((canvasX - offsetX) / scale, 0, VIEW.width),
    y: clamp((canvasY - offsetY) / scale, 0, VIEW.height),
  };
}

function resetRun(startLevelIndex = selectedStartLevel) {
  currentLevelIndex = clamp(startLevelIndex, 0, LEVELS.length - 1);
  applyLevel(currentLevelIndex);
  lives = 3;
  winTimer = 0;
  cheeseBites = 0;
  levelMessageTimer = 1.4;
  resetAfterLife();
}

function resetAfterLife() {
  player.x = 130;
  player.y = isSpaceLevel() ? 226 : GROUND_Y - player.height;
  player.prevY = player.y;
  player.vx = 0;
  player.vy = 0;
  player.grounded = !isSpaceLevel();
  player.facing = 1;
  player.stun = 0;
  player.safePlatform = null;
  player.hidden = false;
  player.spinTimer = 0;
  catLasers = [];
  cameraX = 0;
  captureTimer = 0;
  captureStyle = "cage";
  cats[0].x = -180;
  cats[1].x = -290;
  cats.forEach((cat, index) => {
    cat.y = isSpaceLevel() ? player.y + (index === 0 ? -48 : 54) : GROUND_Y - cat.height;
    cat.phase = index * 0.55;
    cat.facing = 1;
    cat.heldAtGate = false;
    cat.blockedByLog = false;
    cat.meowTimer = 1.3 + index * 2.5;
    cat.laserTimer = 1.35 + index * 0.8;
    cat.eaten = false;
  });
  bears.forEach((bear) => {
    bear.x = bear.homeX;
    bear.y = GROUND_Y - bear.height + 4;
    bear.state = "sleeping";
    bear.phase = 0;
    bear.wakeTimer = 0;
    bear.calmTimer = 0;
    bear.eatTimer = 0;
    bear.wakeTargetX = bear.homeX;
    bear.facing = -1;
  });
  octopuses.forEach((octopus) => {
    octopus.x = octopus.homeX;
    octopus.y = octopus.homeY;
    octopus.state = "sleeping";
    octopus.phase = 0;
    octopus.wakeTimer = 0;
    octopus.strikeProgress = 0;
    octopus.tentacleX = octopus.homeX;
    octopus.tentacleY = octopus.homeY;
    octopus.target = null;
  });
  cobras.forEach((cobra) => {
    cobra.x = cobra.homeX;
    cobra.y = cobra.homeY;
    cobra.state = "sleeping";
    cobra.phase = 0;
    cobra.wakeTimer = 0;
    cobra.strikeProgress = 0;
    cobra.strikeTargetX = cobra.homeX;
    cobra.strikeTargetY = cobra.homeY;
    cobra.facing = -1;
  });
  bananas.forEach((banana) => {
    banana.phase = 0;
    banana.used = false;
  });
  spaceMonsters.forEach((monster) => {
    monster.x = monster.homeX;
    monster.y = monster.homeY;
    monster.state = "sleeping";
    monster.phase = 0;
    monster.puliTimer = 0;
    monster.facing = -1;
  });
  pointer.viewX = 180;
  pointer.viewY = isSpaceLevel() ? 260 : pointer.viewY;
}

function startGame() {
  savePlayerNameFromInput();
  if (!hasPlayerName()) {
    if (playerNameInput) {
      playerNameInput.classList.add("is-needed");
      playerNameInput.focus();
    }
    return;
  }

  resumeAudio();
  closeShop();
  closeLeaderboard();
  resetRun(selectedStartLevel);
  state = "playing";
  overlay.classList.remove("is-panel-open");
  overlay.classList.add("is-hidden");
  updatePlayActionButtons();
  canvas.focus();
}

function showOverlay(title, buttonText) {
  overlay.classList.remove("is-panel-open");
  overlayTitle.textContent = title;
  startButton.textContent = buttonText;
  updateOverlayProgress();
  overlay.classList.remove("is-hidden");
}

function updatePlayActionButtons() {
  if (playShopButton) {
    playShopButton.classList.toggle("is-hidden", state !== "playing");
  }
  if (playLeaderboardButton) {
    playLeaderboardButton.classList.toggle("is-hidden", state !== "playing");
  }
}

function queueJump() {
  if (state === "playing") {
    jumpQueued = true;
  }
}

function handlePointerMove(event) {
  const point = clientToView(event.clientX, event.clientY);
  pointer.active = true;
  pointer.viewX = point.x;
  pointer.viewY = point.y;
}

function handlePointerDown(event) {
  handlePointerMove(event);
  resumeAudio();
  queueJump();
}

function resumeAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playBoing() {
  if (!audioContext) {
    resumeAudio();
  }

  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  if (now - lastBoingAt < 0.08) {
    return;
  }
  lastBoingAt = now;

  playBoingPart(now, 0, 360, 760);
  playBoingPart(now, 0.105, 300, 610);
}

function playBoingPart(now, delay, lowFreq, highFreq) {
  const start = now + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(lowFreq, start);
  oscillator.frequency.exponentialRampToValueAtTime(highFreq, start + 0.045);
  oscillator.frequency.exponentialRampToValueAtTime(lowFreq * 0.72, start + 0.18);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.18, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + 0.22);
}

function playCatMeow(index) {
  if (!audioContext) {
    resumeAudio();
  }

  if (!audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;
  const voice =
    index === 0
      ? { start: 430, peak: 760, end: 310, gain: 0.1, filter: 980 }
      : { start: 340, peak: 610, end: 255, gain: 0.09, filter: 840 };

  playMeowSyllable(now, 0, voice);
  playMeowSyllable(now, 0.32, {
    start: voice.start * 0.92,
    peak: voice.peak * 0.86,
    end: voice.end * 0.9,
    gain: voice.gain * 0.92,
    filter: voice.filter * 0.94,
  });
}

function playBearGrowl() {
  if (!audioContext) {
    resumeAudio();
  }

  if (!audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;
  if (now - lastBearGrowlAt < 0.9) {
    return;
  }
  lastBearGrowlAt = now;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(120, now);
  oscillator.frequency.exponentialRampToValueAtTime(58, now + 0.5);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(420, now);
  filter.Q.setValueAtTime(3, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.65);
}

function playSpacePuli() {
  if (!audioContext) {
    resumeAudio();
  }

  if (!audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;
  if (now - lastSpacePuliAt < 0.28) {
    return;
  }
  lastSpacePuliAt = now;

  playPuliSyllable(now, 0, 360);
  playPuliSyllable(now, 0.16, 260);
  playPuliSyllable(now, 0.34, 320);
}

function playPuliSyllable(now, delay, baseFreq) {
  const start = now + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(baseFreq, start);
  oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 1.55, start + 0.055);
  oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.72, start + 0.18);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(780, start);
  filter.Q.setValueAtTime(4, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.2, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.24);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + 0.26);
}

function playLaserShot(index) {
  if (!audioContext) {
    resumeAudio();
  }

  if (!audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(1180 + index * 120, now);
  oscillator.frequency.exponentialRampToValueAtTime(360 + index * 45, now + 0.16);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.13, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.2);
}

function playMeowSyllable(now, delay, voice) {
  const start = now + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(voice.start, start);
  oscillator.frequency.exponentialRampToValueAtTime(voice.peak, start + 0.08);
  oscillator.frequency.exponentialRampToValueAtTime(voice.end, start + 0.34);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(voice.filter, start);
  filter.Q.setValueAtTime(6, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(voice.gain, start + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + 0.4);
}

function updatePlayer(dt) {
  if (isSpaceLevel()) {
    updateSpacePlayer(dt);
    return;
  }

  const targetX = cameraX + pointer.viewX;
  const distance = targetX - player.x;
  const underwater = isUnderwaterLevel();
  const playerSpeed = underwater ? UNDERWATER_PLAYER_SPEED : PLAYER_SPEED;
  const jumpSpeed = underwater ? UNDERWATER_JUMP_SPEED : JUMP_SPEED;
  const gravity = underwater ? UNDERWATER_GRAVITY : GRAVITY;

  if (Math.abs(distance) > 12 && player.stun <= 0) {
    const desired = clamp(distance * 4.2, -playerSpeed, playerSpeed);
    player.vx += (desired - player.vx) * clamp(dt * (underwater ? 5.5 : 10), 0, 1);
  } else {
    player.vx *= Math.pow(underwater ? 0.2 : 0.08, dt);
  }

  if (player.stun > 0) {
    player.stun -= dt;
    player.vx *= Math.pow(0.04, dt);
  }

  if (jumpQueued && (player.grounded || underwater)) {
    player.vy = Math.min(player.vy, -jumpSpeed);
    player.grounded = false;
    player.safePlatform = null;
    playBoing();
  }
  jumpQueued = false;

  player.prevY = player.y;
  player.vy += gravity * dt;
  if (underwater) {
    player.vy *= Math.pow(0.55, dt);
  }
  player.x = clamp(player.x + player.vx * dt, 80, worldWidth - 90);
  player.y += player.vy * dt;
  player.grounded = false;

  if (player.y + player.height >= GROUND_Y) {
    player.y = GROUND_Y - player.height;
    player.vy = 0;
    player.grounded = true;
  }

  resolvePlatformCollisions();

  if (Math.abs(player.vx) > 24) {
    player.facing = player.vx > 0 ? 1 : -1;
  }
}

function updateSpacePlayer(dt) {
  const targetX = cameraX + pointer.viewX;
  const targetY = clamp(pointer.viewY - player.height / 2, SPACE_MIN_Y, SPACE_MAX_Y);
  const distanceX = targetX - player.x;
  const distanceY = targetY - player.y;

  player.safePlatform = null;
  player.grounded = false;
  jumpQueued = false;

  const desiredVx = clamp(distanceX * 3.6, -SPACE_PLAYER_SPEED, SPACE_PLAYER_SPEED);
  const desiredVy = clamp(distanceY * 4.4, -SPACE_PLAYER_VERTICAL_SPEED, SPACE_PLAYER_VERTICAL_SPEED);
  player.vx += (desiredVx - player.vx) * clamp(dt * 8, 0, 1);
  player.vy += (desiredVy - player.vy) * clamp(dt * 8, 0, 1);

  player.prevY = player.y;
  player.x = clamp(player.x + player.vx * dt, 80, worldWidth - 90);
  player.y = clamp(player.y + player.vy * dt, SPACE_MIN_Y, SPACE_MAX_Y);

  if (Math.abs(player.vx) > 16) {
    player.facing = player.vx > 0 ? 1 : -1;
  }
}

function getPlatformTop(platform) {
  if (typeof platform.y === "number") {
    return platform.y;
  }

  return GROUND_Y - platform.height;
}

function getPlatforms() {
  return [...logs, ...stoneWalls];
}

function resolvePlatformCollisions() {
  player.safePlatform = null;

  const playerLeft = player.x - player.width / 2;
  const playerRight = player.x + player.width / 2;
  const playerTop = player.y;
  const playerBottom = player.y + player.height;
  const previousBottom = player.prevY + player.height;

  getPlatforms().forEach((platform) => {
    const platformLeft = platform.x;
    const platformRight = platform.x + platform.width;
    const platformTop = getPlatformTop(platform);

    const overlaps =
      playerRight > platformLeft &&
      playerLeft < platformRight &&
      playerBottom > platformTop &&
      playerTop < GROUND_Y;

    if (!overlaps) {
      return;
    }

    if (previousBottom <= platformTop + 8 && player.vy >= 0) {
      player.y = platformTop - player.height;
      player.vy = 0;
      player.grounded = true;
      player.safePlatform = platform;
      return;
    }

    if (player.x < platform.x + platform.width / 2) {
      player.x = platformLeft - player.width / 2 - 1;
      player.vx = -120;
    } else {
      player.x = platformRight + player.width / 2 + 1;
      player.vx = 90;
    }
    player.stun = Math.max(player.stun, 0.34);
  });
}

function getStandingPlatform() {
  if (player.safePlatform) {
    return player.safePlatform;
  }

  const feetY = player.y + player.height;

  return getPlatforms().find((platform) => {
    const platformTop = getPlatformTop(platform);
    const feetOnTop = Math.abs(feetY - platformTop) < 10;
    const centerOnLog =
      player.x > platform.x - player.width * 0.25 &&
      player.x < platform.x + platform.width + player.width * 0.25;

    return player.grounded && feetOnTop && centerOnLog;
  });
}

function updateCats(dt) {
  if (isSpaceLevel()) {
    updateSpaceCats(dt);
    return;
  }

  const gateX = finalCave.x + 62;
  const safePlatform = getStandingPlatform();
  const underwater = isUnderwaterLevel();

  cats.forEach((cat, index) => {
    if (cat.eaten) {
      return;
    }

    const boost = player.stun > 0 ? 1.38 : 1;
    const targetGap = index === 0 ? 24 : 88;
    let desiredX = player.x - targetGap;
    const speed = cat.speed * boost * (underwater ? 0.58 : 1);
    const previousX = cat.x;

    cat.phase += dt * (Math.abs(speed) / 64);
    cat.blockedByLog = false;

    if (safePlatform) {
      const leftStop = safePlatform.x - cat.width * 0.55 - index * 26;
      const rightStop = safePlatform.x + safePlatform.width + cat.width * 0.55 + index * 26;
      desiredX = cat.x < safePlatform.x + safePlatform.width / 2 ? leftStop : rightStop;
      cat.blockedByLog = Math.abs(cat.x - desiredX) < 5;
    }

    if (cat.x < desiredX) {
      cat.x = Math.min(desiredX, cat.x + speed * dt);
    } else {
      cat.x = Math.max(desiredX, cat.x - speed * 0.45 * dt);
    }

    if (cat.x > gateX && player.x > finalCave.x + 70) {
      cat.x = gateX - index * 60;
      cat.heldAtGate = true;
    } else {
      cat.heldAtGate = false;
    }

    const movedX = cat.x - previousX;
    if (Math.abs(movedX) > 0.1) {
      cat.facing = movedX > 0 ? 1 : -1;
    }

    cat.meowTimer -= dt;
    if (cat.meowTimer <= 0) {
      playCatMeow(index);
      cat.meowTimer += MEOW_INTERVAL;
    }

    if (underwater) {
      cat.y = GROUND_Y - cat.height - 12 + Math.sin(cat.phase * 4 + index) * 8;
    } else {
      cat.y = GROUND_Y - cat.height + Math.sin(cat.phase * 5) * (cat.facing > 0 ? 2 : 1);
    }
  });
}

function updateSpaceCats(dt) {
  cats.forEach((cat, index) => {
    if (cat.eaten) {
      return;
    }

    const targetGap = index === 0 ? 150 : 235;
    const targetX = player.x - targetGap;
    const targetY = clamp(player.y + (index === 0 ? -48 : 54) + Math.sin(cat.phase * 2.2) * 26, SPACE_MIN_Y + 8, SPACE_MAX_Y + 6);
    const previousX = cat.x;

    cat.phase += dt * 3.2;
    cat.x += (targetX - cat.x) * clamp(dt * 2.1, 0, 1);
    cat.y += (targetY - cat.y) * clamp(dt * 2.6, 0, 1);
    cat.facing = cat.x - previousX >= -0.1 ? 1 : -1;
    cat.heldAtGate = false;
    cat.blockedByLog = false;

    cat.meowTimer -= dt;
    if (cat.meowTimer <= 0) {
      playCatMeow(index);
      cat.meowTimer += MEOW_INTERVAL;
    }

    cat.laserTimer -= dt;
    if (cat.laserTimer <= 0 && player.x > cat.x + 95 && state === "playing") {
      fireCatLaser(cat, index);
      cat.laserTimer = SPACE_LASER_INTERVAL + index * 0.6 + Math.random() * 0.75;
    }
  });
}

function fireCatLaser(cat, index) {
  const startX = cat.x + 48;
  const startY = cat.y + 24;
  const aimY = player.y + player.height * 0.5;
  const driftY = clamp((aimY - startY) * 1.25, -170, 170);

  catLasers.push({
    x: startX,
    y: startY,
    vx: SPACE_LASER_SPEED + index * 24,
    vy: driftY,
    life: 2.4,
    phase: index * 0.8,
  });
  playLaserShot(index);
}

function updateCatLasers(dt) {
  catLasers.forEach((laser) => {
    laser.x += laser.vx * dt;
    laser.y += laser.vy * dt;
    laser.life -= dt;
    laser.phase += dt;
  });

  catLasers = catLasers.filter((laser) => {
    if (laser.life <= 0 || laser.x < cameraX - 160 || laser.x > cameraX + VIEW.width + 220 || laser.y < 20 || laser.y > VIEW.height - 30) {
      return false;
    }

    if (!player.hidden && state === "playing") {
      const dx = laser.x - player.x;
      const dy = laser.y - (player.y + player.height * 0.45);
      if (Math.hypot(dx, dy) < 31) {
        spaceDamagePlayer();
        return false;
      }
    }

    return true;
  });
}

function getBearTargets() {
  const targets = [];

  if (!player.hidden && state === "playing") {
    targets.push({
      type: "player",
      body: player,
      x: player.x,
      y: player.y + player.height / 2,
    });
  }

  cats.forEach((cat, index) => {
    if (cat.eaten) {
      return;
    }

    targets.push({
      type: "cat",
      body: cat,
      index,
      x: cat.x,
      y: cat.y + cat.height / 2,
    });
  });

  return targets;
}

function getClosestBearTarget(bear, maxDistance) {
  let closest = null;
  let closestDistance = maxDistance;

  getBearTargets().forEach((target) => {
    const dx = target.x - bear.x;
    const dy = (target.y - (bear.y + bear.height / 2)) * 0.45;
    const distance = Math.hypot(dx, dy);

    if (distance < closestDistance) {
      closest = target;
      closestDistance = distance;
    }
  });

  return closest;
}

function bearEatTarget(bear, target) {
  bear.state = "eating";
  bear.eatTimer = 0.85;
  bear.facing = target.x > bear.x ? 1 : -1;
  playBearGrowl();

  if (target.type === "player") {
    lives -= 1;
    captureTimer = 1.55;
    captureStyle = "hidden";
    state = "captured";
    player.hidden = true;
    player.vx = 0;
    player.vy = 0;
    return;
  }

  target.body.eaten = true;
}

function updateBears(dt) {
  bears.forEach((bear) => {
    bear.phase += dt;

    if (bear.state === "sleeping") {
      const target = getClosestBearTarget(bear, BEAR_WAKE_DISTANCE);
      if (target) {
        bear.state = "stirring";
        bear.wakeTimer = BEAR_WAKE_DELAY;
        bear.calmTimer = 0;
        bear.wakeTargetX = target.x;
      }
      return;
    }

    if (bear.state === "stirring") {
      bear.wakeTimer -= dt;
      if (bear.wakeTimer <= 0) {
        bear.state = "waking";
        bear.wakeTimer = BEAR_WAKE_UP_TIME;
        bear.facing = bear.wakeTargetX > bear.x ? 1 : -1;
        playBearGrowl();
      }
      return;
    }

    if (bear.state === "waking") {
      const target = getClosestBearTarget(bear, BEAR_CHASE_DISTANCE);
      if (target) {
        bear.facing = target.x > bear.x ? 1 : -1;
      }
      bear.wakeTimer -= dt;
      if (bear.wakeTimer <= 0) {
        bear.state = "awake";
      }
      return;
    }

    if (bear.state === "eating") {
      bear.eatTimer -= dt;
      if (bear.eatTimer <= 0) {
        bear.state = "awake";
      }
      return;
    }

    const target = getClosestBearTarget(bear, BEAR_CHASE_DISTANCE);
    if (target) {
      const dx = target.x - bear.x;
      bear.calmTimer = 0;
      bear.facing = dx > 0 ? 1 : -1;

      if (Math.abs(dx) > 8) {
        bear.x = clamp(
          bear.x + Math.sign(dx) * BEAR_SPEED * dt,
          bear.homeX - 340,
          bear.homeX + 340
        );
      }

      const closeEnough =
        Math.abs(target.x - bear.x) < BEAR_EAT_DISTANCE &&
        Math.abs(target.y - (bear.y + bear.height / 2)) < 72;
      if (closeEnough) {
        bearEatTarget(bear, target);
      }
      return;
    }

    bear.calmTimer += dt;
    const homeDx = bear.homeX - bear.x;
    if (Math.abs(homeDx) > 4) {
      bear.x += Math.sign(homeDx) * BEAR_SPEED * 0.55 * dt;
      bear.facing = homeDx > 0 ? 1 : -1;
    } else if (bear.calmTimer > 1.6) {
      bear.x = bear.homeX;
      bear.state = "sleeping";
      bear.wakeTimer = 0;
    }
  });
}

function getOctopusTargets() {
  const targets = [];

  if (!player.hidden && state === "playing") {
    targets.push({
      type: "player",
      body: player,
      x: player.x,
      y: player.y + player.height * 0.35,
    });
  }

  cats.forEach((cat, index) => {
    if (cat.eaten) {
      return;
    }

    targets.push({
      type: "cat",
      body: cat,
      index,
      x: cat.x,
      y: cat.y + cat.height * 0.5,
    });
  });

  return targets;
}

function getClosestOctopusTarget(octopus, maxDistance) {
  let closest = null;
  let closestDistance = maxDistance;

  getOctopusTargets().forEach((target) => {
    const dx = target.x - octopus.x;
    const dy = (target.y - octopus.y) * 0.75;
    const distance = Math.hypot(dx, dy);

    if (distance < closestDistance) {
      closest = target;
      closestDistance = distance;
    }
  });

  return closest;
}

function octopusGrabTarget(octopus, target) {
  octopus.state = "sleeping";
  octopus.strikeProgress = 0;
  octopus.target = null;

  if (target.type === "player") {
    lives -= 1;
    captureTimer = 1.55;
    captureStyle = "hidden";
    state = "captured";
    player.hidden = true;
    player.vx = 0;
    player.vy = 0;
    return;
  }

  target.body.eaten = true;
}

function updateOctopuses(dt) {
  octopuses.forEach((octopus) => {
    octopus.phase += dt;

    if (octopus.state === "sleeping") {
      const target = getClosestOctopusTarget(octopus, OCTOPUS_WAKE_DISTANCE);
      octopus.tentacleX += (octopus.x - octopus.tentacleX) * clamp(dt * 4, 0, 1);
      octopus.tentacleY += (octopus.y - octopus.tentacleY) * clamp(dt * 4, 0, 1);
      if (target) {
        octopus.state = "stirring";
        octopus.wakeTimer = OCTOPUS_WAKE_DELAY;
      }
      return;
    }

    if (octopus.state === "stirring") {
      octopus.wakeTimer -= dt;
      if (octopus.wakeTimer <= 0) {
        octopus.state = "awake";
      }
      return;
    }

    const target = getClosestOctopusTarget(octopus, OCTOPUS_TENTACLE_RANGE);
    if (!target) {
      octopus.state = "sleeping";
      octopus.strikeProgress = 0;
      octopus.target = null;
      return;
    }

    octopus.target = target;
    octopus.strikeProgress = clamp(octopus.strikeProgress + dt * OCTOPUS_STRIKE_SPEED, 0, 1);
    const reach = octopus.strikeProgress;
    octopus.tentacleX = octopus.x + (target.x - octopus.x) * reach;
    octopus.tentacleY = octopus.y + (target.y - octopus.y) * reach;

    const grabDistance = Math.hypot(target.x - octopus.tentacleX, target.y - octopus.tentacleY);
    if (grabDistance < OCTOPUS_GRAB_DISTANCE) {
      octopusGrabTarget(octopus, target);
    }
  });
}

function cobraPlayerDistance(cobra, maxDistance) {
  if (player.hidden || state !== "playing") {
    return null;
  }

  const targetX = player.x;
  const targetY = player.y + player.height * 0.62;
  const distance = Math.hypot(targetX - cobra.x, (targetY - cobra.y) * 0.55);

  if (distance > maxDistance) {
    return null;
  }

  return { x: targetX, y: targetY, distance };
}

function cobraBitePlayer(cobra) {
  cobra.state = "resting";
  cobra.wakeTimer = 0.75;
  cobra.strikeProgress = 0;

  lives -= 1;
  captureTimer = 1.55;
  captureStyle = "hidden";
  state = "captured";
  player.hidden = true;
  player.vx = 0;
  player.vy = 0;
}

function updateCobras(dt) {
  cobras.forEach((cobra) => {
    cobra.phase += dt;

    if (cobra.state === "sleeping") {
      const target = cobraPlayerDistance(cobra, COBRA_WAKE_DISTANCE);
      if (target) {
        cobra.state = "stirring";
        cobra.wakeTimer = COBRA_WAKE_DELAY;
        cobra.facing = target.x > cobra.x ? 1 : -1;
      }
      return;
    }

    if (cobra.state === "stirring") {
      const target = cobraPlayerDistance(cobra, COBRA_STRIKE_RANGE);
      if (target) {
        cobra.facing = target.x > cobra.x ? 1 : -1;
        cobra.strikeTargetX = target.x;
        cobra.strikeTargetY = target.y;
      }

      cobra.wakeTimer -= dt;
      if (cobra.wakeTimer <= 0) {
        cobra.state = "striking";
        cobra.strikeProgress = 0;
      }
      return;
    }

    if (cobra.state === "striking") {
      cobra.strikeProgress = clamp(cobra.strikeProgress + dt * COBRA_STRIKE_SPEED, 0, 1);
      const tipX = cobra.x + (cobra.strikeTargetX - cobra.x) * cobra.strikeProgress;
      const tipY = cobra.y + (cobra.strikeTargetY - cobra.y) * cobra.strikeProgress;
      const biteDistance = Math.hypot(player.x - tipX, player.y + player.height * 0.62 - tipY);

      if (!player.hidden && state === "playing" && cobra.strikeProgress > 0.55 && biteDistance < COBRA_BITE_DISTANCE) {
        cobraBitePlayer(cobra);
        return;
      }

      if (cobra.strikeProgress >= 1) {
        cobra.state = "resting";
        cobra.wakeTimer = 0.75;
      }
      return;
    }

    cobra.wakeTimer -= dt;
    cobra.strikeProgress = Math.max(0, cobra.strikeProgress - dt * 2.2);
    if (cobra.wakeTimer <= 0) {
      cobra.state = "sleeping";
      cobra.strikeProgress = 0;
    }
  });
}

function bananaSlipPlayer(banana) {
  banana.used = true;
  lives -= 1;
  captureTimer = 1.45;
  captureStyle = "spin";
  state = "captured";
  player.hidden = false;
  player.spinTimer = BANANA_SPIN_TIME;
  player.vx = 0;
  player.vy = 0;
  player.y = GROUND_Y - player.height;
  player.grounded = true;
}

function updateBananas(dt) {
  bananas.forEach((banana) => {
    banana.phase += dt;

    if (banana.used || player.hidden || state !== "playing") {
      return;
    }

    const playerBottom = player.y + player.height;
    const dx = Math.abs(player.x - banana.x);
    const closeToGround = playerBottom > GROUND_Y - 12;

    if (dx < BANANA_SLIP_DISTANCE && closeToGround) {
      bananaSlipPlayer(banana);
    }
  });
}

function spaceDamagePlayer() {
  if (state !== "playing") {
    return;
  }

  lives -= 1;
  captureTimer = 1.25;
  captureStyle = "hidden";
  state = "captured";
  player.hidden = true;
  player.vx = 0;
  player.vy = 0;
  catLasers = [];
}

function updateSpaceHazards() {
  if (!isSpaceLevel() || player.hidden || state !== "playing") {
    return;
  }

  const playerBounds = {
    x: player.x - player.width * 0.42,
    y: player.y + 2,
    width: player.width * 0.84,
    height: player.height + 18,
  };

  const hit = [...logs, ...stoneWalls].some((hazard) => {
    const hazardTop = getPlatformTop(hazard);
    return rectsOverlap(playerBounds, {
      x: hazard.x + 8,
      y: hazardTop + 8,
      width: hazard.width - 16,
      height: hazard.height - 16,
    });
  });

  if (hit) {
    spaceDamagePlayer();
  }
}

function updateSpaceMonsters(dt) {
  if (!isSpaceLevel() || state !== "playing") {
    return;
  }

  spaceMonsters.forEach((monster) => {
    monster.phase += dt;

    const dx = player.x - monster.x;
    const dy = player.y + player.height * 0.4 - monster.y;
    const distance = Math.hypot(dx, dy);

    if (monster.state === "sleeping") {
      monster.x = monster.homeX;
      monster.y = monster.homeY;
      if (!player.hidden && distance < SPACE_MONSTER_WAKE_DISTANCE) {
        monster.state = "chasing";
        monster.puliTimer = 0;
        playSpacePuli();
      }
      return;
    }

    if (monster.state === "returning") {
      moveSpaceMonsterToward(monster, monster.homeX, monster.homeY, dt, SPACE_MONSTER_SPEED * 0.72);
      if (!player.hidden && distance < SPACE_MONSTER_WAKE_DISTANCE * 0.78) {
        monster.state = "chasing";
        monster.puliTimer = 0;
        playSpacePuli();
        return;
      }
      if (Math.hypot(monster.homeX - monster.x, monster.homeY - monster.y) < 8) {
        monster.x = monster.homeX;
        monster.y = monster.homeY;
        monster.state = "sleeping";
      }
      return;
    }

    if (player.hidden || distance > SPACE_MONSTER_FORGET_DISTANCE) {
      monster.state = "returning";
      return;
    }

    moveSpaceMonsterToward(monster, player.x - 20, player.y + 10, dt, SPACE_MONSTER_SPEED);
    monster.puliTimer -= dt;
    if (monster.puliTimer <= 0) {
      playSpacePuli();
      monster.puliTimer = SPACE_MONSTER_PULI_INTERVAL;
    }

    if (distance < SPACE_MONSTER_CATCH_DISTANCE) {
      spaceDamagePlayer();
    }
  });
}

function moveSpaceMonsterToward(monster, targetX, targetY, dt, speed) {
  const dx = targetX - monster.x;
  const dy = targetY - monster.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 0.001) {
    return;
  }

  const step = Math.min(distance, speed * dt);
  monster.x += (dx / distance) * step;
  monster.y += (dy / distance) * step;
  monster.facing = dx >= 0 ? 1 : -1;
}

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function updateCamera(dt) {
  const desired = clamp(player.x - VIEW.width * 0.38, 0, worldWidth - VIEW.width);
  cameraX += (desired - cameraX) * clamp(dt * 5.5, 0, 1);
}

function checkCapture() {
  if (player.x > finalCave.x + 70) {
    return;
  }

  if (getStandingPlatform()) {
    return;
  }

  const caught = cats.some((cat) => {
    if (cat.eaten) {
      return false;
    }

    const dx = Math.abs(cat.x - player.x);
    const dy = Math.abs(cat.y - player.y);
    return dx < 46 && dy < 52;
  });

  if (!caught) {
    return;
  }

  lives -= 1;
  captureTimer = 1.55;
  captureStyle = "cage";
  state = "captured";
  player.vx = 0;
  player.vy = 0;
}

function updateCaptured(dt) {
  if (player.spinTimer > 0) {
    player.spinTimer = Math.max(0, player.spinTimer - dt);
  }

  captureTimer -= dt;
  if (captureTimer > 0) {
    return;
  }

  if (lives <= 0) {
    state = "gameOver";
    showOverlay("GAME OVER", "START");
    return;
  }

  resetAfterLife();
  state = "playing";
}

function advanceToNextLevel() {
  currentLevelIndex += 1;
  applyLevel(currentLevelIndex);
  lives = 3;
  winTimer = 0;
  cheeseBites = 0;
  levelMessageTimer = 1.6;
  resetAfterLife();
  state = "playing";
}

function checkWin(dt) {
  if (player.x < cheese.x - 28) {
    return;
  }

  completeLevel(currentLevelIndex);
  state = "win";
  winTimer += dt;
  cheeseBites = clamp(cheeseBites + dt * 2.2, 0, 1);
}

function updateWin(dt) {
  winTimer += dt;
  cheeseBites = clamp(cheeseBites + dt * 2.2, 0, 1);
  cats.forEach((cat, index) => {
    if (cat.eaten) {
      return;
    }

    cat.x = Math.min(cat.x, finalCave.x + 32 - index * 58);
  });

  if (winTimer > 2.4) {
    if (currentLevelIndex < LEVELS.length - 1) {
      advanceToNextLevel();
    } else {
      state = "gameComplete";
      showOverlay("VOITTO!", "START");
    }
  }
}

function update(dt) {
  if (levelMessageTimer > 0) {
    levelMessageTimer = Math.max(0, levelMessageTimer - dt);
  }

  if (state === "playing") {
    updatePlayer(dt);
    updateCats(dt);
    updateCatLasers(dt);
    updateOctopuses(dt);
    updateBears(dt);
    updateCobras(dt);
    updateBananas(dt);
    updateSpaceMonsters(dt);
    updateSpaceHazards();
    updateCamera(dt);
    if (state === "playing") {
      checkCapture();
      checkWin(dt);
    }
  } else if (state === "captured") {
    updateCaptured(dt);
    updateCamera(dt);
  } else if (state === "win") {
    updateWin(dt);
    updateCamera(dt);
  }

  updatePlayActionButtons();
}

function roundedRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawSnowCap(x, y, width, height) {
  roundedRect(x, y, width, height, Math.min(9, height / 2));
  ctx.fillStyle = "#f8fdff";
  ctx.fill();

  ctx.fillStyle = "rgba(148, 187, 207, 0.22)";
  ctx.fillRect(x + 8, y + height - 4, Math.max(0, width - 16), 3);
}

function drawSky() {
  if (isUnderwaterLevel()) {
    drawUnderwaterSky();
    return;
  }

  if (isWinterLevel()) {
    drawWinterSky();
    return;
  }

  if (isDesertLevel()) {
    drawDesertSky();
    return;
  }

  if (isRallyLevel()) {
    drawRallySky();
    return;
  }

  if (isSpaceLevel()) {
    drawSpaceSky();
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
  gradient.addColorStop(0, "#83d4f0");
  gradient.addColorStop(0.58, "#d8f5fb");
  gradient.addColorStop(0.58, "#82b957");
  gradient.addColorStop(1, "#5d8e37");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  drawCloud(170 - cameraX * 0.16, 86, 1.06);
  drawCloud(620 - cameraX * 0.11, 64, 0.86);
  drawCloud(1110 - cameraX * 0.13, 116, 1.15);

  ctx.fillStyle = "#497d47";
  drawHills(0.2, 320, 110, "#5e9652");
  drawHills(0.34, 360, 85, "#467c47");
}

function drawWinterSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
  gradient.addColorStop(0, "#a6d6ee");
  gradient.addColorStop(0.55, "#e7f5fb");
  gradient.addColorStop(1, "#f4fbff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  drawCloud(160 - cameraX * 0.14, 82, 1.02);
  drawCloud(610 - cameraX * 0.1, 66, 0.82);
  drawCloud(1080 - cameraX * 0.12, 114, 1.1);

  drawHills(0.18, 318, 102, "#d5eaf0");
  drawHills(0.32, 362, 82, "#bdd9e1");
  drawSnowyForest(0.42, GROUND_Y + 8, 150, 0.78, true);
  drawSnowyForest(0.62, GROUND_Y + 12, 118, 1.02, false);
  drawSnowfall();
}

function drawDesertSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
  gradient.addColorStop(0, "#75c7e5");
  gradient.addColorStop(0.48, "#f4d68d");
  gradient.addColorStop(1, "#d49c54");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  ctx.fillStyle = "rgba(255, 238, 168, 0.95)";
  ctx.beginPath();
  ctx.arc(790 - cameraX * 0.04, 82, 46, 0, Math.PI * 2);
  ctx.fill();

  drawDesertDunes(0.18, 336, 82, "#d9ad68");
  drawDesertDunes(0.32, 372, 68, "#c9924e");
  drawPalmGrove(0.45, GROUND_Y + 10, 250, 0.82);
  drawPalmGrove(0.62, GROUND_Y + 18, 360, 1.05);
}

function drawRallySky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
  gradient.addColorStop(0, "#7fc8ee");
  gradient.addColorStop(0.52, "#dff2f6");
  gradient.addColorStop(0.52, "#74906d");
  gradient.addColorStop(1, "#485b52");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  drawCloud(190 - cameraX * 0.13, 78, 0.92);
  drawCloud(710 - cameraX * 0.1, 94, 1.06);

  drawHills(0.18, 320, 96, "#66865b");
  drawHills(0.32, 364, 72, "#526f55");

  ctx.strokeStyle = "rgba(244, 245, 230, 0.72)";
  ctx.lineWidth = 6;
  for (let worldX = Math.floor(cameraX / 220) * 220; worldX < cameraX + VIEW.width + 260; worldX += 220) {
    const x = worldX - cameraX * 0.42;
    ctx.beginPath();
    ctx.moveTo(x - 70, GROUND_Y - 72);
    ctx.lineTo(x + 38, GROUND_Y - 92);
    ctx.stroke();
  }
}

function drawSpaceSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
  gradient.addColorStop(0, "#090a26");
  gradient.addColorStop(0.52, "#17124a");
  gradient.addColorStop(1, "#24135c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  drawStarField(0.12, 62, 0.9);
  drawStarField(0.28, 44, 1.35);
  drawSpacePlanets();
  drawFlyingSaucers();
}

function drawStarField(parallax, count, size) {
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < count; i += 1) {
    const rawX = i * 151 + Math.sin(i * 8.13) * 58 - cameraX * parallax;
    const x = ((rawX % (VIEW.width + 160)) + VIEW.width + 160) % (VIEW.width + 160) - 80;
    const y = 24 + ((i * 89 + Math.cos(i * 4.7) * 24) % 390);
    const twinkle = 0.45 + Math.sin(performance.now() / 360 + i) * 0.25;
    ctx.globalAlpha = clamp(twinkle + (i % 3) * 0.12, 0.28, 0.92);
    ctx.beginPath();
    ctx.arc(x, y, size + (i % 3) * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawSpacePlanets() {
  const planets = [
    { x: 620, y: 108, r: 42, color: "#f07a9d", ring: "#ffd26f", parallax: 0.06 },
    { x: 1660, y: 185, r: 58, color: "#50c7d9", ring: "#d6f7ff", parallax: 0.09 },
    { x: 2780, y: 92, r: 34, color: "#f2b64b", ring: null, parallax: 0.07 },
    { x: 4320, y: 150, r: 52, color: "#8d6ff0", ring: "#f0d8ff", parallax: 0.08 },
  ];

  planets.forEach((planet) => {
    const x = planet.x - cameraX * planet.parallax;
    const screenX = ((x % (VIEW.width + 240)) + VIEW.width + 240) % (VIEW.width + 240) - 120;
    ctx.save();
    ctx.translate(screenX, planet.y);

    if (planet.ring) {
      ctx.strokeStyle = planet.ring;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(0, 2, planet.r * 1.55, planet.r * 0.34, -0.12, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(0, 0, planet.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.beginPath();
    ctx.ellipse(-planet.r * 0.25, -planet.r * 0.22, planet.r * 0.28, planet.r * 0.16, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawFlyingSaucers() {
  for (let i = 0; i < 4; i += 1) {
    const rawX = i * 470 + 240 - cameraX * (0.18 + i * 0.03);
    const x = ((rawX % (VIEW.width + 180)) + VIEW.width + 180) % (VIEW.width + 180) - 90;
    const y = 70 + i * 78 + Math.sin(performance.now() / 650 + i) * 8;
    const scale = 0.72 + i * 0.1;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(120, 240, 235, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 22, 20, 34, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#8ec8d5";
    ctx.beginPath();
    ctx.ellipse(0, 0, 48, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#cfefff";
    ctx.beginPath();
    ctx.arc(0, -6, 18, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f6df6c";
    [-22, 0, 22].forEach((dotX) => {
      ctx.beginPath();
      ctx.arc(dotX, 3, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }
}

function drawDesertDunes(parallax, baseY, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, VIEW.height);
  for (let screenX = -100; screenX <= VIEW.width + 140; screenX += 80) {
    const worldX = screenX + cameraX * parallax;
    const y = baseY - Math.sin(worldX / 260) * height * 0.38 - Math.cos(worldX / 170) * height * 0.2;
    ctx.lineTo(screenX, y);
  }
  ctx.lineTo(VIEW.width, VIEW.height);
  ctx.closePath();
  ctx.fill();
}

function drawPalmGrove(parallax, baseY, spacing, size) {
  const parallaxX = cameraX * parallax;
  const start = Math.floor((parallaxX - 180) / spacing) * spacing;

  for (let worldX = start; worldX < parallaxX + VIEW.width + 220; worldX += spacing) {
    const x = worldX - parallaxX + Math.sin(worldX * 0.02) * 22;
    const treeSize = size * (0.9 + (Math.sin(worldX * 0.013) + 1) * 0.14);
    drawPalmTree(x, baseY + Math.sin(worldX * 0.017) * 7, treeSize);
  }
}

function drawPalmTree(x, baseY, size) {
  ctx.save();
  ctx.translate(x, baseY);
  ctx.scale(size, size);

  ctx.strokeStyle = "#8b5d31";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-12, -62, 6, -118);
  ctx.stroke();

  ctx.strokeStyle = "rgba(90, 55, 24, 0.45)";
  ctx.lineWidth = 2;
  for (let y = -12; y > -108; y -= 18) {
    ctx.beginPath();
    ctx.moveTo(-7, y);
    ctx.lineTo(8, y - 5);
    ctx.stroke();
  }

  ctx.fillStyle = "#2f8a55";
  for (let i = 0; i < 8; i += 1) {
    const angle = -Math.PI / 2 + i * (Math.PI * 2 / 8);
    ctx.save();
    ctx.translate(7, -120);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(38, 0, 42, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.fillStyle = "#7b4a25";
  ctx.beginPath();
  ctx.arc(4, -112, 7, 0, Math.PI * 2);
  ctx.arc(13, -116, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawUnderwaterSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW.height);
  gradient.addColorStop(0, "#62abc0");
  gradient.addColorStop(0.52, "#2f7f96");
  gradient.addColorStop(1, "#19576e");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);

  ctx.strokeStyle = "rgba(220, 251, 255, 0.2)";
  ctx.lineWidth = 3;
  for (let worldX = Math.floor(cameraX / 180) * 180; worldX < cameraX + VIEW.width + 220; worldX += 180) {
    const x = worldX - cameraX * 0.35;
    ctx.beginPath();
    ctx.moveTo(x - 90, 54 + Math.sin(worldX * 0.01) * 8);
    ctx.quadraticCurveTo(x - 10, 32, x + 78, 56);
    ctx.stroke();
  }

  drawUnderwaterPlants(0.22, 78, "#2a6f77", 0.7);
  drawUnderwaterPlants(0.44, 58, "#1f5d64", 1);
  drawTropicalFish(0.16, 18, 0.74);
  drawTropicalFish(0.28, 14, 1);
  drawBubbles();
}

function drawTropicalFish(parallax, count, size) {
  const colors = [
    ["#ffcf3f", "#1f5d8c"],
    ["#ff8f3d", "#ffffff"],
    ["#4be0c6", "#173d72"],
    ["#f25fa7", "#ffe36e"],
  ];
  const range = VIEW.width + 220;

  for (let i = 0; i < count; i += 1) {
    const palette = colors[i % colors.length];
    const direction = i % 2 === 0 ? 1 : -1;
    const rawX = i * 173 + Math.sin(i * 3.7) * 42 - cameraX * parallax * direction;
    const x = ((rawX % range) + range) % range - 110;
    const y = 76 + ((i * 61 + Math.sin(cameraX * 0.01 + i) * 18) % 245);
    const fishSize = size * (0.75 + (i % 3) * 0.18);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(direction * fishSize, fishSize);

    ctx.fillStyle = palette[0];
    ctx.beginPath();
    ctx.ellipse(0, 0, 21, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette[1];
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(-34, -11);
    ctx.lineTo(-32, 11);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = palette[1];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-4, -8);
    ctx.lineTo(3, 8);
    ctx.moveTo(8, -7);
    ctx.lineTo(15, 6);
    ctx.stroke();

    ctx.fillStyle = "#132a35";
    ctx.beginPath();
    ctx.arc(13, -2, 2.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function drawBubbles() {
  ctx.strokeStyle = "rgba(226, 252, 255, 0.55)";
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 58; i += 1) {
    const drift = Math.sin(i * 6.1 + cameraX * 0.01) * 18;
    const rawX = i * 133 + drift - cameraX * 0.18;
    const x = ((rawX % (VIEW.width + 160)) + VIEW.width + 160) % (VIEW.width + 160) - 80;
    const y = 26 + ((i * 71 - cameraX * 0.035) % 355);
    const radius = 2 + (i % 4) * 1.2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawUnderwaterPlants(parallax, spacing, color, size) {
  const parallaxX = cameraX * parallax;
  const start = Math.floor((parallaxX - 120) / spacing) * spacing;

  ctx.strokeStyle = color;
  ctx.lineWidth = 6 * size;
  ctx.lineCap = "round";
  for (let worldX = start; worldX < parallaxX + VIEW.width + 140; worldX += spacing) {
    const x = worldX - parallaxX;
    const baseY = GROUND_Y + 20 + Math.sin(worldX * 0.017) * 8;
    const height = 62 * size + (Math.sin(worldX * 0.023) + 1) * 18;
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.quadraticCurveTo(x + 20 * size, baseY - height * 0.45, x - 6 * size, baseY - height);
    ctx.stroke();
  }
}

function drawSnowfall() {
  const range = VIEW.width + 140;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 86; i += 1) {
    const rawX = i * 97 + Math.sin(i * 12.7) * 34 - cameraX * 0.2;
    const x = ((rawX % range) + range) % range - 70;
    const y = 26 + ((i * 53 + cameraX * 0.025) % 335);
    const radius = 1 + (i % 3) * 0.45;

    ctx.globalAlpha = 0.42 + (i % 4) * 0.12;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawSnowyForest(parallax, baseY, gap, baseScale, muted) {
  const parallaxX = cameraX * parallax;
  const start = Math.floor((parallaxX - 220) / gap) * gap;

  for (let worldX = start; worldX < parallaxX + VIEW.width + 220; worldX += gap) {
    const wave = Math.sin(worldX * 0.017);
    const x = worldX - parallaxX + Math.sin(worldX * 0.011) * 18;
    const treeBaseY = baseY + Math.sin(worldX * 0.019) * 8;
    const size = baseScale + (wave + 1) * 0.12;
    drawSnowyPine(x, treeBaseY, size, muted);
  }
}

function drawSnowyPine(x, baseY, size, muted) {
  ctx.save();
  ctx.translate(x, baseY);
  ctx.scale(size, size);

  ctx.fillStyle = muted ? "#6d817c" : "#6a5946";
  ctx.fillRect(-7, -42, 14, 42);

  const green = muted ? "#2d5a51" : "#1f6a56";
  const darkGreen = muted ? "#234841" : "#185244";
  const snow = muted ? "rgba(246, 252, 255, 0.86)" : "rgba(249, 253, 255, 0.96)";
  const layers = [
    { y: -142, width: 48, height: 78 },
    { y: -112, width: 64, height: 86 },
    { y: -78, width: 78, height: 92 },
  ];

  layers.forEach((layer, index) => {
    ctx.fillStyle = index % 2 === 0 ? green : darkGreen;
    ctx.beginPath();
    ctx.moveTo(0, layer.y);
    ctx.lineTo(-layer.width, layer.y + layer.height);
    ctx.lineTo(layer.width, layer.y + layer.height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = snow;
    ctx.beginPath();
    ctx.moveTo(0, layer.y + 5);
    ctx.lineTo(-layer.width * 0.38, layer.y + layer.height * 0.38);
    ctx.quadraticCurveTo(-layer.width * 0.1, layer.y + layer.height * 0.3, 0, layer.y + layer.height * 0.34);
    ctx.quadraticCurveTo(layer.width * 0.14, layer.y + layer.height * 0.42, layer.width * 0.38, layer.y + layer.height * 0.36);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(-layer.width * 0.42, layer.y + layer.height * 0.82, layer.width * 0.2, 5, -0.08, 0, Math.PI * 2);
    ctx.ellipse(layer.width * 0.28, layer.y + layer.height * 0.77, layer.width * 0.18, 5, 0.08, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawCloud(x, y, size) {
  const cloudX = ((x % (VIEW.width + 360)) + VIEW.width + 360) % (VIEW.width + 360) - 180;
  ctx.beginPath();
  ctx.ellipse(cloudX, y, 48 * size, 22 * size, 0, 0, Math.PI * 2);
  ctx.ellipse(cloudX + 36 * size, y + 3 * size, 38 * size, 20 * size, 0, 0, Math.PI * 2);
  ctx.ellipse(cloudX - 35 * size, y + 6 * size, 32 * size, 17 * size, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawHills(parallax, baseY, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, VIEW.height);
  for (let screenX = -80; screenX <= VIEW.width + 120; screenX += 120) {
    const worldX = screenX + cameraX * parallax;
    const y = baseY - Math.sin(worldX / 210) * height * 0.28;
    ctx.lineTo(screenX, y);
  }
  ctx.lineTo(VIEW.width, VIEW.height);
  ctx.closePath();
  ctx.fill();
}

function drawGround() {
  if (isUnderwaterLevel()) {
    drawUnderwaterGround();
    return;
  }

  if (isWinterLevel()) {
    drawWinterGround();
    return;
  }

  if (isDesertLevel()) {
    drawDesertGround();
    return;
  }

  if (isRallyLevel()) {
    drawRallyGround();
    return;
  }

  if (isSpaceLevel()) {
    drawSpaceGround();
    return;
  }

  ctx.fillStyle = "#6da143";
  ctx.fillRect(0, GROUND_Y, VIEW.width, VIEW.height - GROUND_Y);

  ctx.fillStyle = "#4f7932";
  for (let worldX = Math.floor(cameraX / 46) * 46; worldX < cameraX + VIEW.width + 60; worldX += 46) {
    const x = Math.round(worldX - cameraX);
    ctx.fillRect(x, GROUND_Y + 16, 24, 5);
    ctx.fillRect(x + 13, GROUND_Y + 58, 28, 4);
  }

  ctx.fillStyle = "#7f522d";
  ctx.fillRect(0, GROUND_Y + 80, VIEW.width, VIEW.height - GROUND_Y - 80);
  ctx.fillStyle = "#5e3921";
  for (let worldX = Math.floor(cameraX / 70) * 70; worldX < cameraX + VIEW.width + 80; worldX += 70) {
    ctx.fillRect(worldX - cameraX + 5, GROUND_Y + 100, 38, 5);
  }
}

function drawWinterGround() {
  ctx.fillStyle = "#f6fbff";
  ctx.fillRect(0, GROUND_Y - 7, VIEW.width, VIEW.height - GROUND_Y + 7);

  ctx.fillStyle = "#dceef6";
  ctx.fillRect(0, GROUND_Y + 62, VIEW.width, 40);
  ctx.fillStyle = "#876f58";
  ctx.fillRect(0, GROUND_Y + 98, VIEW.width, VIEW.height - GROUND_Y - 98);

  ctx.fillStyle = "#ffffff";
  for (let worldX = Math.floor(cameraX / 76) * 76; worldX < cameraX + VIEW.width + 90; worldX += 76) {
    const x = Math.round(worldX - cameraX);
    ctx.beginPath();
    ctx.ellipse(x + 36, GROUND_Y + 4, 46, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(145, 184, 204, 0.2)";
  for (let worldX = Math.floor(cameraX / 58) * 58; worldX < cameraX + VIEW.width + 80; worldX += 58) {
    const x = Math.round(worldX - cameraX);
    ctx.fillRect(x + 8, GROUND_Y + 24, 28, 4);
    ctx.fillRect(x + 22, GROUND_Y + 56, 34, 3);
  }
}

function drawDesertGround() {
  ctx.fillStyle = "#ddb66b";
  ctx.fillRect(0, GROUND_Y, VIEW.width, VIEW.height - GROUND_Y);

  ctx.fillStyle = "#b9793f";
  ctx.fillRect(0, GROUND_Y + 88, VIEW.width, VIEW.height - GROUND_Y - 88);

  ctx.fillStyle = "rgba(255, 230, 150, 0.45)";
  for (let worldX = Math.floor(cameraX / 72) * 72; worldX < cameraX + VIEW.width + 90; worldX += 72) {
    const x = Math.round(worldX - cameraX);
    ctx.beginPath();
    ctx.ellipse(x + 32, GROUND_Y + 11 + Math.sin(worldX * 0.025) * 4, 44, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(130, 82, 39, 0.28)";
  ctx.lineWidth = 3;
  for (let worldX = Math.floor(cameraX / 96) * 96; worldX < cameraX + VIEW.width + 120; worldX += 96) {
    const x = Math.round(worldX - cameraX);
    ctx.beginPath();
    ctx.moveTo(x + 8, GROUND_Y + 42);
    ctx.quadraticCurveTo(x + 38, GROUND_Y + 34, x + 72, GROUND_Y + 44);
    ctx.stroke();
  }
}

function drawRallyGround() {
  ctx.fillStyle = "#5e6d50";
  ctx.fillRect(0, GROUND_Y, VIEW.width, VIEW.height - GROUND_Y);

  ctx.fillStyle = "#45484a";
  ctx.fillRect(0, GROUND_Y + 18, VIEW.width, 84);

  ctx.fillStyle = "#303235";
  ctx.fillRect(0, GROUND_Y + 102, VIEW.width, VIEW.height - GROUND_Y - 102);

  ctx.strokeStyle = "#f1e05a";
  ctx.lineWidth = 6;
  ctx.setLineDash([34, 28]);
  ctx.beginPath();
  ctx.moveTo(-20, GROUND_Y + 62);
  ctx.lineTo(VIEW.width + 20, GROUND_Y + 62);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#2f4032";
  for (let worldX = Math.floor(cameraX / 90) * 90; worldX < cameraX + VIEW.width + 120; worldX += 90) {
    const x = Math.round(worldX - cameraX);
    ctx.fillRect(x + 18, GROUND_Y + 2, 36, 7);
    ctx.fillRect(x + 42, GROUND_Y + 116, 42, 6);
  }
}

function drawSpaceGround() {
  ctx.strokeStyle = "rgba(133, 226, 255, 0.16)";
  ctx.lineWidth = 2;
  for (let worldX = Math.floor(cameraX / 140) * 140; worldX < cameraX + VIEW.width + 160; worldX += 140) {
    const x = worldX - cameraX;
    ctx.beginPath();
    ctx.moveTo(x, VIEW.height - 30);
    ctx.lineTo(x + 55, VIEW.height - 48);
    ctx.stroke();
  }
}

function drawUnderwaterGround() {
  ctx.fillStyle = "#d0b777";
  ctx.fillRect(0, GROUND_Y, VIEW.width, VIEW.height - GROUND_Y);

  ctx.fillStyle = "#b8955a";
  ctx.fillRect(0, GROUND_Y + 74, VIEW.width, VIEW.height - GROUND_Y - 74);

  ctx.fillStyle = "rgba(255, 245, 196, 0.34)";
  for (let worldX = Math.floor(cameraX / 64) * 64; worldX < cameraX + VIEW.width + 80; worldX += 64) {
    const x = Math.round(worldX - cameraX);
    ctx.beginPath();
    ctx.ellipse(x + 24, GROUND_Y + 14 + Math.sin(worldX * 0.03) * 3, 35, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#d97968";
  for (let worldX = Math.floor(cameraX / 260) * 260; worldX < cameraX + VIEW.width + 280; worldX += 260) {
    const x = worldX - cameraX + 46;
    ctx.beginPath();
    ctx.arc(x, GROUND_Y + 38, 15, Math.PI, Math.PI * 2);
    ctx.arc(x + 20, GROUND_Y + 39, 12, Math.PI, Math.PI * 2);
    ctx.arc(x + 36, GROUND_Y + 40, 9, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function drawCave(cave) {
  if (isSpaceLevel()) {
    drawSpacePlanet(cave);
    return;
  }

  const x = cave.x - cameraX;
  const y = GROUND_Y - cave.height;
  const w = cave.width;
  const h = cave.height;

  if (x > VIEW.width + 80 || x + w < -80) {
    return;
  }

  ctx.save();
  ctx.fillStyle = cave.tone;
  ctx.beginPath();
  ctx.moveTo(x, GROUND_Y);
  ctx.lineTo(x + 25, y + h * 0.46);
  ctx.quadraticCurveTo(x + w * 0.5, y - h * 0.35, x + w - 25, y + h * 0.46);
  ctx.lineTo(x + w, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#2c3438";
  ctx.beginPath();
  ctx.moveTo(x + 54, GROUND_Y);
  ctx.lineTo(x + 88, y + h * 0.56);
  ctx.quadraticCurveTo(x + w * 0.5, y + h * 0.06, x + w - 88, y + h * 0.56);
  ctx.lineTo(x + w - 54, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x + 34, GROUND_Y - 10);
  ctx.lineTo(x + 56, y + h * 0.48);
  ctx.quadraticCurveTo(x + w * 0.5, y - h * 0.24, x + w - 56, y + h * 0.48);
  ctx.lineTo(x + w - 34, GROUND_Y - 10);
  ctx.stroke();

  if (cave.final) {
    ctx.strokeStyle = "#b0834b";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x + 44, GROUND_Y);
    ctx.lineTo(x + 82, y + h * 0.57);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 42, GROUND_Y - 54);
    ctx.lineTo(x + 112, GROUND_Y - 54);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSpacePlanet(cave) {
  const x = cave.x - cameraX;
  const centerX = x + cave.width / 2;
  const centerY = cave.final ? 260 : cave.spaceMonster ? 292 : 320;
  const radius = cave.spaceMonster ? 94 : cave.final ? 104 : 72;

  if (centerX + radius < -90 || centerX - radius > VIEW.width + 90) {
    return;
  }

  ctx.save();
  ctx.translate(centerX, centerY);

  if (!cave.spaceMonster) {
    ctx.strokeStyle = cave.final ? "rgba(203, 238, 255, 0.58)" : "rgba(255, 232, 164, 0.46)";
    ctx.lineWidth = cave.final ? 9 : 6;
    ctx.beginPath();
    ctx.ellipse(0, 4, radius * 1.48, radius * 0.34, -0.15, 0, Math.PI * 2);
    ctx.stroke();
  }

  const gradient = ctx.createRadialGradient(-radius * 0.35, -radius * 0.35, radius * 0.1, 0, 0, radius);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.35)");
  gradient.addColorStop(0.22, cave.tone);
  gradient.addColorStop(1, cave.final ? "#245089" : "#3a266d");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  [
    [-radius * 0.28, -radius * 0.12, radius * 0.14],
    [radius * 0.22, radius * 0.18, radius * 0.1],
    [-radius * 0.05, radius * 0.42, radius * 0.08],
  ].forEach(([craterX, craterY, craterR]) => {
    ctx.beginPath();
    ctx.arc(craterX, craterY, craterR, 0, Math.PI * 2);
    ctx.fill();
  });

  if (cave.final) {
    ctx.fillStyle = "#f5ce3d";
    ctx.strokeStyle = "#8a6518";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-12, -radius - 4);
    ctx.lineTo(-12, -radius - 55);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-9, -radius - 52);
    ctx.lineTo(42, -radius - 38);
    ctx.lineTo(-9, -radius - 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawSpaceMonsterEntity(monster) {
  const x = monster.x - cameraX;
  if (x < -130 || x > VIEW.width + 130) {
    return;
  }

  drawSpaceMonster(x, monster.y, monster.phase, monster.state !== "sleeping", monster.facing);
}

function drawSpaceMonster(x, y, phase, awake, facing) {
  ctx.save();
  ctx.translate(x, y + Math.sin(phase) * 2);
  ctx.scale(facing || 1, 1);

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 44, 52, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#69c08c";
  ctx.strokeStyle = "#2d6d51";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 14, 48, 38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#2d6d51";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  [-30, -12, 12, 30].forEach((legX, index) => {
    ctx.beginPath();
    ctx.moveTo(legX, 39);
    ctx.quadraticCurveTo(legX + Math.sin(phase + index) * 8, 55, legX + (index % 2 === 0 ? -8 : 8), 67);
    ctx.stroke();
  });

  ctx.strokeStyle = "#2d6d51";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-20, -14);
  ctx.quadraticCurveTo(-35, -38, -52, -48);
  ctx.moveTo(20, -14);
  ctx.quadraticCurveTo(35, -38, 52, -48);
  ctx.stroke();

  ctx.fillStyle = "#f6e56a";
  ctx.beginPath();
  ctx.arc(-55, -49, 7, 0, Math.PI * 2);
  ctx.arc(55, -49, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#17372b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (awake) {
    ctx.arc(-10, 5, 6, 0, Math.PI * 2);
    ctx.moveTo(30, 5);
    ctx.arc(24, 5, 6, 0, Math.PI * 2);
  } else {
    ctx.moveTo(-15, 4);
    ctx.quadraticCurveTo(-7, 8, 0, 4);
    ctx.moveTo(11, 4);
    ctx.quadraticCurveTo(18, 8, 25, 4);
  }
  ctx.stroke();

  if (awake) {
    ctx.fillStyle = "#17372b";
    ctx.beginPath();
    ctx.ellipse(7, 22, 13, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawStoneWall(wall) {
  const x = wall.x - cameraX;
  const y = getPlatformTop(wall);
  if (x > VIEW.width + 80 || x + wall.width < -80) {
    return;
  }

  if (isUnderwaterLevel()) {
    drawShipwreckWall(x, y, wall.width, wall.height);
    return;
  }

  if (isSpaceLevel()) {
    drawSpaceJunk(x, y, wall.width, wall.height, wall.x);
    return;
  }

  if (isDesertLevel()) {
    drawRuinedBuilding(x, y, wall.width, wall.height);
    return;
  }

  if (isRallyLevel()) {
    drawWarningPostWall(x, y, wall.width, wall.height);
    return;
  }

  ctx.save();
  roundedRect(x, y, wall.width, wall.height, 4);
  ctx.fillStyle = "#757f83";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#4c565b";
  ctx.stroke();

  const blockH = 30;
  const blockW = 56;
  ctx.strokeStyle = "rgba(39, 48, 52, 0.38)";
  ctx.lineWidth = 2;
  for (let rowY = y + 10; rowY < GROUND_Y - 8; rowY += blockH) {
    const row = Math.floor((rowY - y) / blockH);
    const startX = x + (row % 2 === 0 ? 0 : -blockW / 2);
    for (let blockX = startX; blockX < x + wall.width; blockX += blockW) {
      ctx.strokeRect(blockX, rowY, blockW, blockH);
    }
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(x + 8, y + 8, wall.width - 16, 7);

  if (isWinterLevel()) {
    drawSnowCap(x + 5, y - 8, wall.width - 10, 16);
  }
  ctx.restore();
}

function drawWarningPostWall(x, y, width, height) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "rgba(18, 22, 21, 0.24)";
  ctx.beginPath();
  ctx.ellipse(width / 2, height + 8, width * 0.5, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  const postCount = Math.max(3, Math.floor(width / 58));
  const gap = width / postCount;

  ctx.fillStyle = "#2b2d2f";
  roundedRect(8, height - 12, width - 16, 14, 4);
  ctx.fill();

  for (let i = 0; i < postCount; i += 1) {
    const postX = gap * (i + 0.5);
    const postWidth = Math.min(34, gap * 0.56);

    ctx.save();
    roundedRect(postX - postWidth / 2, 0, postWidth, height, 6);
    ctx.fillStyle = "#ef7d2c";
    ctx.fill();
    ctx.strokeStyle = "#3a332f";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.clip();

    ctx.strokeStyle = "#fff1d5";
    ctx.lineWidth = 10;
    for (let stripeY = -height; stripeY < height + 40; stripeY += 34) {
      ctx.beginPath();
      ctx.moveTo(postX - postWidth, stripeY);
      ctx.lineTo(postX + postWidth, stripeY + 34);
      ctx.stroke();
    }

    ctx.restore();

    ctx.fillStyle = "#2b2d2f";
    roundedRect(postX - postWidth * 0.66, height - 6, postWidth * 1.32, 16, 4);
    ctx.fill();
  }

  ctx.strokeStyle = "#2b2d2f";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(18, height * 0.38);
  ctx.lineTo(width - 18, height * 0.38);
  ctx.moveTo(18, height * 0.68);
  ctx.lineTo(width - 18, height * 0.68);
  ctx.stroke();

  ctx.restore();
}

function drawRuinedBuilding(x, y, width, height) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "rgba(92, 55, 30, 0.24)";
  ctx.beginPath();
  ctx.ellipse(width / 2, height + 8, width * 0.5, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#b77b49";
  ctx.strokeStyle = "#7a4a2d";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, 28);
  ctx.lineTo(width * 0.18, 10);
  ctx.lineTo(width * 0.36, 28);
  ctx.lineTo(width * 0.53, 5);
  ctx.lineTo(width * 0.72, 24);
  ctx.lineTo(width * 0.9, 12);
  ctx.lineTo(width, 34);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#d39a5d";
  ctx.fillRect(8, 42, width - 16, 12);
  ctx.fillRect(8, 92, width - 16, 10);

  ctx.strokeStyle = "rgba(93, 54, 31, 0.45)";
  ctx.lineWidth = 2;
  for (let rowY = 22; rowY < height - 14; rowY += 26) {
    const offset = Math.floor(rowY / 26) % 2 === 0 ? 0 : 22;
    for (let brickX = -offset; brickX < width; brickX += 44) {
      ctx.strokeRect(brickX, rowY, 44, 22);
    }
  }

  ctx.fillStyle = "#61402c";
  roundedRect(width * 0.15, height - 70, 36, 70, 4);
  ctx.fill();

  ctx.fillStyle = "#513625";
  [
    [width * 0.52, height * 0.42],
    [width * 0.76, height * 0.54],
    [width * 0.32, height * 0.28],
  ].forEach(([holeX, holeY]) => {
    ctx.beginPath();
    ctx.moveTo(holeX - 18, holeY + 16);
    ctx.lineTo(holeX - 12, holeY - 12);
    ctx.lineTo(holeX + 18, holeY - 18);
    ctx.lineTo(holeX + 24, holeY + 8);
    ctx.lineTo(holeX + 4, holeY + 22);
    ctx.closePath();
    ctx.fill();
  });

  ctx.fillStyle = "#a4693d";
  for (let rubble = 0; rubble < 9; rubble += 1) {
    const rubbleX = (rubble * 37 + width * 0.17) % width;
    const rubbleY = height - 8 - (rubble % 3) * 5;
    ctx.fillRect(rubbleX, rubbleY, 18, 8);
  }

  ctx.restore();
}

function drawShipwreckWall(x, y, width, height) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "rgba(20, 33, 36, 0.2)";
  ctx.beginPath();
  ctx.ellipse(width / 2, height + 10, width * 0.48, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5c3824";
  ctx.strokeStyle = "#2e1f18";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(width * 0.12, 26);
  ctx.lineTo(width * 0.82, 0);
  ctx.lineTo(width, height * 0.25);
  ctx.lineTo(width * 0.88, height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(42, 28, 20, 0.62)";
  ctx.lineWidth = 4;
  for (let plankY = 24; plankY < height - 12; plankY += 30) {
    ctx.beginPath();
    ctx.moveTo(12, plankY);
    ctx.lineTo(width - 16, plankY + Math.sin(plankY * 0.08) * 7);
    ctx.stroke();
  }

  ctx.strokeStyle = "#332118";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(width * 0.32, 10);
  ctx.lineTo(width * 0.22, height - 12);
  ctx.moveTo(width * 0.66, 14);
  ctx.lineTo(width * 0.75, height - 18);
  ctx.stroke();

  ctx.fillStyle = "#27454d";
  ctx.strokeStyle = "#201813";
  ctx.lineWidth = 4;
  for (let i = 0; i < 3; i += 1) {
    const portholeX = width * (0.28 + i * 0.2);
    const portholeY = height * 0.42 + Math.sin(i) * 8;
    ctx.beginPath();
    ctx.arc(portholeX, portholeY, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.strokeStyle = "#1f6b64";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width * 0.12, height);
  ctx.quadraticCurveTo(width * 0.1, height - 34, width * 0.18, height - 58);
  ctx.moveTo(width * 0.9, height);
  ctx.quadraticCurveTo(width * 0.82, height - 36, width * 0.88, height - 68);
  ctx.stroke();

  ctx.restore();
}

function drawWoodLayer(x, y, width, height) {
  roundedRect(x, y, width, height, Math.min(20, height / 2));
  ctx.fillStyle = "#8c5832";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#5d351d";
  ctx.stroke();

  ctx.fillStyle = "#b87743";
  ctx.beginPath();
  ctx.ellipse(x + 18, y + height / 2, 17, Math.max(8, height / 2 - 4), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6d4125";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.strokeStyle = "rgba(75, 39, 20, 0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 38, y + 12);
  ctx.lineTo(x + width - 18, y + 9);
  ctx.moveTo(x + 42, y + height - 12);
  ctx.lineTo(x + width - 26, y + height - 14);
  ctx.stroke();
}

function drawLog(log) {
  const x = log.x - cameraX;
  const y = getPlatformTop(log);
  if (x > VIEW.width + 80 || x + log.width < -80) {
    return;
  }

  if (isUnderwaterLevel()) {
    drawJellyfishPlatform(x, y, log.width, log.height, log.x);
    return;
  }

  if (isSpaceLevel()) {
    drawAsteroid(x, y, log.width, log.height, log.x);
    return;
  }

  if (isDesertLevel()) {
    drawSandDunePlatform(x, y, log.width, log.height, log.x);
    return;
  }

  if (isRallyLevel()) {
    drawTirePlatform(x, y, log.width, log.height, log.x);
    return;
  }

  ctx.save();
  if (log.height > 76) {
    const layerHeight = 32;
    for (let layerY = y; layerY < GROUND_Y - 10; layerY += layerHeight - 3) {
      const row = Math.floor((layerY - y) / (layerHeight - 3));
      const offset = row % 2 === 0 ? 0 : 8;
      const height = Math.min(layerHeight, GROUND_Y - layerY);
      drawWoodLayer(x + offset, layerY, log.width - offset * 2, height);
    }
  } else {
    drawWoodLayer(x, y, log.width, log.height);
  }

  if (isWinterLevel()) {
    drawSnowCap(x + 4, y - 7, log.width - 8, 14);
  }
  ctx.restore();
}

function drawAsteroid(x, y, width, height, seed) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const radiusX = width * 0.5;
  const radiusY = height * 0.5;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.sin(seed * 0.02) * 0.35 + performance.now() / 9000);

  ctx.fillStyle = "rgba(0, 0, 0, 0.26)";
  ctx.beginPath();
  ctx.ellipse(6, 10, radiusX * 0.95, radiusY * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#88716a";
  ctx.strokeStyle = "#4d3d3a";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-radiusX * 0.9, -radiusY * 0.12);
  ctx.lineTo(-radiusX * 0.55, -radiusY * 0.72);
  ctx.lineTo(radiusX * 0.04, -radiusY * 0.88);
  ctx.lineTo(radiusX * 0.82, -radiusY * 0.46);
  ctx.lineTo(radiusX * 0.92, radiusY * 0.2);
  ctx.lineTo(radiusX * 0.38, radiusY * 0.85);
  ctx.lineTo(-radiusX * 0.4, radiusY * 0.72);
  ctx.lineTo(-radiusX * 0.95, radiusY * 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(45, 34, 32, 0.32)";
  [
    [-radiusX * 0.3, -radiusY * 0.15, 8],
    [radiusX * 0.28, radiusY * 0.16, 10],
    [radiusX * 0.16, -radiusY * 0.46, 6],
  ].forEach(([craterX, craterY, craterR]) => {
    ctx.beginPath();
    ctx.ellipse(craterX, craterY, craterR, craterR * 0.68, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawSpaceJunk(x, y, width, height, seed) {
  ctx.save();
  ctx.translate(x, y);

  ctx.strokeStyle = "rgba(120, 220, 255, 0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.08, height * 0.2);
  ctx.lineTo(width * 0.92, height * 0.78);
  ctx.moveTo(width * 0.16, height * 0.82);
  ctx.lineTo(width * 0.82, height * 0.16);
  ctx.stroke();

  ctx.fillStyle = "#8c9baa";
  ctx.strokeStyle = "#303a46";
  ctx.lineWidth = 4;
  roundedRect(width * 0.22, height * 0.22, width * 0.56, height * 0.4, 5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#304e8c";
  ctx.strokeStyle = "#142850";
  ctx.lineWidth = 3;
  roundedRect(width * 0.04, height * 0.1, width * 0.2, height * 0.6, 4);
  ctx.fill();
  ctx.stroke();
  roundedRect(width * 0.76, height * 0.28, width * 0.2, height * 0.6, 4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f0d85d";
  for (let dot = 0; dot < 4; dot += 1) {
    const dotX = width * (0.36 + dot * 0.09);
    const dotY = height * (0.33 + Math.sin(seed * 0.03 + dot) * 0.06);
    ctx.beginPath();
    ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawTirePlatform(x, y, width, height, worldX) {
  ctx.save();

  if (height > 76) {
    const layerHeight = 38;
    for (let layerY = y; layerY < GROUND_Y - 8; layerY += layerHeight - 2) {
      const row = Math.floor((layerY - y) / (layerHeight - 2));
      const offset = row % 2 === 0 ? 0 : 14;
      drawTireLayer(x + offset, layerY, width - offset * 2, Math.min(layerHeight, GROUND_Y - layerY), worldX + row * 47);
    }
  } else {
    drawTireLayer(x, y, width, height, worldX);
  }

  ctx.restore();
}

function drawTireLayer(x, y, width, height, seed) {
  const tireRadius = clamp(height * 0.43, 18, 27);
  const count = Math.max(1, Math.round(width / (tireRadius * 1.55)));
  const spacing = width / count;
  const centerY = y + height * 0.53;

  ctx.fillStyle = "rgba(16, 18, 18, 0.2)";
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height + 5, width * 0.48, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < count; i += 1) {
    const tireX = x + spacing * (i + 0.5);
    drawTire(tireX, centerY + Math.sin(seed * 0.03 + i) * 1.5, tireRadius, seed + i * 19);
  }
}

function drawTire(cx, cy, radius, seed) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(seed * 0.04);

  ctx.fillStyle = "#181b1d";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#303437";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#5f676d";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#2b3033";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#7f8990";
  ctx.lineWidth = 3;
  for (let spoke = 0; spoke < 4; spoke += 1) {
    const angle = spoke * Math.PI * 0.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * radius * 0.26, Math.sin(angle) * radius * 0.26);
    ctx.lineTo(Math.cos(angle) * radius * 0.4, Math.sin(angle) * radius * 0.4);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSandDunePlatform(x, y, width, height, worldX) {
  ctx.save();

  if (height > 76) {
    const layerHeight = 32;
    for (let layerY = y; layerY < GROUND_Y - 10; layerY += layerHeight - 3) {
      const row = Math.floor((layerY - y) / (layerHeight - 3));
      const offset = row % 2 === 0 ? 0 : 8;
      const layerWidth = width - offset * 2;
      const currentHeight = Math.min(layerHeight, GROUND_Y - layerY);
      drawSandDuneLayer(x + offset, layerY, layerWidth, currentHeight, worldX + row * 51);
    }
  } else {
    drawSandDuneLayer(x, y, width, height, worldX);
  }

  ctx.restore();
}

function drawSandDuneLayer(x, y, width, height, seed) {
  ctx.fillStyle = "#d8a85d";
  ctx.beginPath();
  ctx.moveTo(x, y + height);
  ctx.quadraticCurveTo(x + width * 0.18, y + height * 0.2, x + width * 0.46, y + 7);
  ctx.quadraticCurveTo(x + width * 0.76, y - 3, x + width, y + height * 0.42);
  ctx.lineTo(x + width, y + height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#efca79";
  ctx.beginPath();
  ctx.moveTo(x + 8, y + height * 0.54);
  ctx.quadraticCurveTo(x + width * 0.25, y + height * 0.18, x + width * 0.52, y + 10);
  ctx.quadraticCurveTo(x + width * 0.36, y + height * 0.52, x + 8, y + height * 0.9);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(130, 82, 39, 0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 18, y + height * 0.62);
  ctx.quadraticCurveTo(x + width * 0.4, y + height * 0.52 + Math.sin(seed) * 4, x + width - 18, y + height * 0.68);
  ctx.moveTo(x + 28, y + height * 0.82);
  ctx.quadraticCurveTo(x + width * 0.55, y + height * 0.76, x + width - 26, y + height * 0.86);
  ctx.stroke();
}

function drawJellyfishPlatform(x, y, width, height, worldX) {
  ctx.save();

  if (height > 76) {
    const step = 46;
    for (let jellyY = y + 6; jellyY < GROUND_Y - 8; jellyY += step) {
      const row = Math.floor((jellyY - y) / step);
      const centerX = x + width / 2 + (row % 2 === 0 ? -10 : 10);
      drawJellyfish(centerX, jellyY + 18, width * 0.62, 34, worldX + row * 41);
    }
  } else {
    const count = Math.max(1, Math.round(width / 90));
    for (let i = 0; i < count; i += 1) {
      const centerX = x + ((i + 0.5) * width) / count;
      drawJellyfish(centerX, y + height * 0.52, width / count * 0.92, height * 0.82, worldX + i * 37);
    }
  }

  ctx.restore();
}

function drawJellyfish(cx, cy, width, height, seed) {
  const pulse = Math.sin(performance.now() / 420 + seed * 0.03) * 3;
  const bellW = Math.max(42, width);
  const bellH = Math.max(24, height + pulse);

  ctx.fillStyle = "rgba(237, 139, 214, 0.58)";
  ctx.strokeStyle = "rgba(255, 223, 248, 0.78)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(cx, cy, bellW / 2, bellH / 2, 0, Math.PI, Math.PI * 2);
  ctx.lineTo(cx + bellW / 2, cy + bellH * 0.12);
  ctx.quadraticCurveTo(cx, cy + bellH * 0.34, cx - bellW / 2, cy + bellH * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 245, 255, 0.34)";
  ctx.beginPath();
  ctx.ellipse(cx - bellW * 0.16, cy - bellH * 0.12, bellW * 0.16, bellH * 0.18, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 192, 237, 0.72)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (let i = -3; i <= 3; i += 1) {
    const tentacleX = cx + i * (bellW / 8);
    const sway = Math.sin(performance.now() / 520 + seed * 0.05 + i) * 8;
    ctx.beginPath();
    ctx.moveTo(tentacleX, cy + bellH * 0.12);
    ctx.quadraticCurveTo(tentacleX + sway, cy + bellH * 0.58, tentacleX - sway * 0.3, cy + bellH * 1.05);
    ctx.stroke();
  }
}

function drawCheese() {
  const x = cheese.x - cameraX;
  const y = cheese.y;
  const bite = cheeseBites;
  if (x < -80 || x > VIEW.width + 80) {
    return;
  }

  ctx.save();
  const size = 48 * (1 - bite * 0.62);
  ctx.translate(x, y + bite * 18);
  ctx.fillStyle = "#f5ce3d";
  ctx.strokeStyle = "#b17d18";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-size * 0.5, size * 0.35);
  ctx.lineTo(size * 0.48, size * 0.1);
  ctx.lineTo(-size * 0.2, -size * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#c68d21";
  ctx.beginPath();
  ctx.arc(-size * 0.12, size * 0.08, size * 0.07, 0, Math.PI * 2);
  ctx.arc(size * 0.14, size * 0.02, size * 0.055, 0, Math.PI * 2);
  ctx.arc(-size * 0.21, size * 0.24, size * 0.045, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHeadJar(cx, cy, width, height) {
  ctx.save();
  ctx.globalAlpha = 0.72;
  roundedRect(cx - width / 2, cy - height / 2, width, height, 9);
  ctx.fillStyle = "rgba(212, 248, 255, 0.32)";
  ctx.fill();
  ctx.lineWidth = 2.4;
  ctx.strokeStyle = "rgba(232, 255, 255, 0.82)";
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.fillRect(cx - width * 0.22, cy - height * 0.38, width * 0.11, height * 0.72);
  ctx.fillStyle = "rgba(74, 107, 116, 0.35)";
  ctx.fillRect(cx - width / 2 - 2, cy - height / 2 + 4, width + 4, 5);
  ctx.restore();
}

function drawDesertVeil(cx, cy, scale) {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(cx / scale, cy / scale);

  ctx.fillStyle = "rgba(255, 255, 245, 0.92)";
  ctx.strokeStyle = "rgba(198, 171, 126, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-22, -14);
  ctx.quadraticCurveTo(4, -30, 28, -12);
  ctx.lineTo(24, 12);
  ctx.quadraticCurveTo(5, 4, -18, 15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(244, 235, 210, 0.94)";
  ctx.beginPath();
  ctx.moveTo(-18, 10);
  ctx.quadraticCurveTo(-2, 18, 16, 12);
  ctx.lineTo(14, 34);
  ctx.quadraticCurveTo(-4, 39, -21, 29);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(183, 145, 91, 0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-18, -4);
  ctx.quadraticCurveTo(2, 5, 25, -2);
  ctx.stroke();

  ctx.restore();
}

function drawEquippedMouseHat(cx, cy, size) {
  if (!progress.equippedItems.hat) {
    return;
  }

  drawHatShape(ctx, progress.equippedItems.hat, cx, cy, size);
}

function drawEquippedMouseSuit(cx, cy, size) {
  if (!progress.equippedItems.suit) {
    return;
  }

  drawSuitShape(ctx, progress.equippedItems.suit, cx, cy, size);
}

function drawEquippedMouseJewelry(cx, cy, size) {
  if (!progress.equippedItems.jewelry) {
    return;
  }

  drawJewelryShape(ctx, progress.equippedItems.jewelry, cx, cy, size);
}

function drawHatShape(target, hatId, cx, cy, size) {
  target.save();
  target.translate(cx, cy);
  target.scale(size, size);
  target.lineCap = "round";
  target.lineJoin = "round";

  if (hatId === "cap") {
    target.fillStyle = "#2c75d6";
    target.strokeStyle = "#173f7c";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(-23, 2);
    target.quadraticCurveTo(-14, -21, 14, -16);
    target.quadraticCurveTo(28, -10, 24, 5);
    target.quadraticCurveTo(1, 8, -23, 2);
    target.fill();
    target.stroke();

    target.fillStyle = "#f5d34d";
    target.beginPath();
    target.ellipse(27, 4, 18, 5, -0.12, 0, Math.PI * 2);
    target.fill();
    target.stroke();

    target.strokeStyle = "rgba(255, 255, 255, 0.45)";
    target.lineWidth = 2;
    target.beginPath();
    target.moveTo(-3, -16);
    target.quadraticCurveTo(1, -7, 2, 5);
    target.stroke();
  } else if (hatId === "cowboy") {
    target.fillStyle = "#8a5428";
    target.strokeStyle = "#4f2e18";
    target.lineWidth = 3;
    target.beginPath();
    target.ellipse(0, 4, 36, 8, 0, 0, Math.PI * 2);
    target.fill();
    target.stroke();

    target.fillStyle = "#a86934";
    target.beginPath();
    target.moveTo(-18, 2);
    target.quadraticCurveTo(-16, -28, 0, -29);
    target.quadraticCurveTo(18, -28, 20, 2);
    target.quadraticCurveTo(3, 9, -18, 2);
    target.fill();
    target.stroke();

    target.strokeStyle = "#f0c15a";
    target.lineWidth = 4;
    target.beginPath();
    target.moveTo(-16, -4);
    target.quadraticCurveTo(1, 1, 19, -5);
    target.stroke();
  } else if (hatId === "pan") {
    target.fillStyle = "#565f66";
    target.strokeStyle = "#242a2e";
    target.lineWidth = 4;
    target.beginPath();
    target.ellipse(-2, 0, 29, 12, -0.08, 0, Math.PI * 2);
    target.fill();
    target.stroke();

    target.fillStyle = "#7c878f";
    target.beginPath();
    target.ellipse(-5, -2, 19, 6, -0.08, 0, Math.PI * 2);
    target.fill();

    target.strokeStyle = "#242a2e";
    target.lineWidth = 8;
    target.beginPath();
    target.moveTo(24, -2);
    target.lineTo(54, -12);
    target.stroke();

    target.strokeStyle = "#8c969e";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(26, -4);
    target.lineTo(50, -12);
    target.stroke();
  } else if (hatId === "egg") {
    target.fillStyle = "#fff7df";
    target.strokeStyle = "#c9b884";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(-25, 7);
    target.lineTo(-18, -8);
    target.lineTo(-9, 0);
    target.lineTo(1, -16);
    target.lineTo(11, -1);
    target.lineTo(21, -11);
    target.lineTo(29, 6);
    target.quadraticCurveTo(5, 16, -25, 7);
    target.fill();
    target.stroke();

    target.fillStyle = "#f5c64a";
    target.beginPath();
    target.arc(3, 0, 8, 0, Math.PI * 2);
    target.fill();
  } else if (hatId === "wizard") {
    target.fillStyle = "#5b4cc4";
    target.strokeStyle = "#24195f";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(-22, 8);
    target.lineTo(2, -42);
    target.lineTo(26, 8);
    target.closePath();
    target.fill();
    target.stroke();

    target.fillStyle = "#f5d34d";
    target.beginPath();
    target.arc(0, -18, 4, 0, Math.PI * 2);
    target.moveTo(8, -2);
    target.lineTo(13, 7);
    target.lineTo(4, 4);
    target.closePath();
    target.fill();

    target.fillStyle = "#3b2c91";
    target.fillRect(-23, 4, 48, 9);
  } else if (hatId === "crown") {
    target.fillStyle = "#f5c83b";
    target.strokeStyle = "#8a6518";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(-27, 9);
    target.lineTo(-22, -17);
    target.lineTo(-7, 0);
    target.lineTo(0, -24);
    target.lineTo(9, 0);
    target.lineTo(24, -17);
    target.lineTo(28, 9);
    target.closePath();
    target.fill();
    target.stroke();

    target.fillStyle = "#df443a";
    [-18, 0, 20].forEach((gemX) => {
      target.beginPath();
      target.arc(gemX, 3, 3, 0, Math.PI * 2);
      target.fill();
    });
  } else if (hatId === "greenHat") {
    target.fillStyle = "#2f9a4d";
    target.strokeStyle = "#145128";
    target.lineWidth = 3;
    target.beginPath();
    target.ellipse(0, 7, 34, 8, 0, 0, Math.PI * 2);
    target.fill();
    target.stroke();
    target.fillStyle = "#39b15c";
    target.beginPath();
    target.moveTo(-18, 4);
    target.quadraticCurveTo(-10, -26, 15, -21);
    target.quadraticCurveTo(26, -13, 20, 5);
    target.closePath();
    target.fill();
    target.stroke();
  } else if (hatId === "winterHat") {
    target.fillStyle = "#df443a";
    target.strokeStyle = "#7d1f1c";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(-22, 4);
    target.quadraticCurveTo(-11, -28, 17, -17);
    target.quadraticCurveTo(29, -9, 21, 6);
    target.closePath();
    target.fill();
    target.stroke();
    target.fillStyle = "#ffffff";
    target.beginPath();
    target.ellipse(0, 8, 31, 7, 0, 0, Math.PI * 2);
    target.arc(23, -15, 7, 0, Math.PI * 2);
    target.fill();
  } else if (hatId === "helmet") {
    target.fillStyle = "#f2c34a";
    target.strokeStyle = "#6e5115";
    target.lineWidth = 3;
    target.beginPath();
    target.arc(0, 5, 28, Math.PI, Math.PI * 2);
    target.lineTo(28, 8);
    target.lineTo(-28, 8);
    target.closePath();
    target.fill();
    target.stroke();
    target.strokeStyle = "#ffffff";
    target.lineWidth = 4;
    target.beginPath();
    target.moveTo(0, -20);
    target.lineTo(0, 8);
    target.stroke();
  }

  target.restore();
}

function drawSuitShape(target, suitId, cx, cy, size) {
  target.save();
  target.translate(cx, cy);
  target.scale(size, size);

  target.fillStyle = getSuitBaseColor(suitId);
  target.strokeStyle = "rgba(34, 42, 42, 0.45)";
  target.lineWidth = 3;
  target.beginPath();
  target.ellipse(0, 0, 31, 18, 0, 0, Math.PI * 2);
  target.fill();
  target.stroke();

  if (suitId === "stripeSuit") {
    target.strokeStyle = "#f4f2d7";
    target.lineWidth = 5;
    [-18, 0, 18].forEach((stripeX) => {
      target.beginPath();
      target.moveTo(stripeX - 10, -15);
      target.lineTo(stripeX + 3, 15);
      target.stroke();
    });
  } else if (suitId === "dotSuit") {
    target.fillStyle = "#f4f2d7";
    [[-14, -5], [0, 6], [16, -3], [9, 12], [-21, 9]].forEach(([dotX, dotY]) => {
      target.beginPath();
      target.arc(dotX, dotY, 3.3, 0, Math.PI * 2);
      target.fill();
    });
  } else if (suitId === "starSuit") {
    target.fillStyle = "#f5d34d";
    drawTinyStar(target, -13, -2, 7);
    drawTinyStar(target, 9, 7, 6);
  } else if (suitId === "boltSuit") {
    target.fillStyle = "#f5d34d";
    target.beginPath();
    target.moveTo(2, -16);
    target.lineTo(-11, 3);
    target.lineTo(2, 3);
    target.lineTo(-4, 18);
    target.lineTo(16, -5);
    target.lineTo(3, -5);
    target.closePath();
    target.fill();
  } else if (suitId === "flowerSuit") {
    target.fillStyle = "#f5d34d";
    [[-14, -1], [10, 5]].forEach(([flowerX, flowerY]) => {
      for (let petal = 0; petal < 5; petal += 1) {
        const angle = petal * Math.PI * 0.4;
        target.beginPath();
        target.ellipse(flowerX + Math.cos(angle) * 5, flowerY + Math.sin(angle) * 5, 4, 2.5, angle, 0, Math.PI * 2);
        target.fill();
      }
      target.fillStyle = "#df443a";
      target.beginPath();
      target.arc(flowerX, flowerY, 2.7, 0, Math.PI * 2);
      target.fill();
      target.fillStyle = "#f5d34d";
    });
  }

  target.restore();
}

function getSuitBaseColor(suitId) {
  if (suitId === "stripeSuit") {
    return "#3467b7";
  }
  if (suitId === "dotSuit") {
    return "#d85b87";
  }
  if (suitId === "starSuit") {
    return "#413a8f";
  }
  if (suitId === "boltSuit") {
    return "#2c9a8f";
  }
  return "#5da64b";
}

function drawJewelryShape(target, jewelryId, cx, cy, size) {
  target.save();
  target.translate(cx, cy);
  target.scale(size, size);
  target.lineCap = "round";
  target.lineJoin = "round";

  if (jewelryId === "bowTie") {
    target.fillStyle = "#df443a";
    target.strokeStyle = "#7d1f1c";
    target.lineWidth = 3;
    target.beginPath();
    target.moveTo(-3, 0);
    target.lineTo(-28, -12);
    target.lineTo(-26, 12);
    target.closePath();
    target.moveTo(3, 0);
    target.lineTo(28, -12);
    target.lineTo(26, 12);
    target.closePath();
    target.fill();
    target.stroke();
    target.fillStyle = "#f2c34a";
    target.fillRect(-5, -6, 10, 12);
  } else {
    target.strokeStyle = jewelryId === "pearls" ? "#fff7df" : "#f2c34a";
    target.lineWidth = 5;
    target.beginPath();
    target.arc(0, -4, 24, 0.15, Math.PI - 0.15);
    target.stroke();

    if (jewelryId === "goldNecklace") {
      target.fillStyle = "#f2c34a";
      target.beginPath();
      target.ellipse(0, 20, 6, 9, 0, 0, Math.PI * 2);
      target.fill();
    } else if (jewelryId === "pearls") {
      target.fillStyle = "#fff7df";
      for (let pearl = -3; pearl <= 3; pearl += 1) {
        target.beginPath();
        target.arc(pearl * 7, 14 + Math.abs(pearl) * 1.4, 3.2, 0, Math.PI * 2);
        target.fill();
      }
    } else if (jewelryId === "starCharm") {
      target.fillStyle = "#f5d34d";
      drawTinyStar(target, 0, 20, 8);
    } else if (jewelryId === "heartCharm") {
      target.fillStyle = "#df443a";
      target.beginPath();
      target.moveTo(0, 27);
      target.bezierCurveTo(-18, 15, -10, 4, 0, 11);
      target.bezierCurveTo(10, 4, 18, 15, 0, 27);
      target.fill();
    }
  }

  target.restore();
}

function drawTinyStar(target, cx, cy, radius) {
  target.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const angle = -Math.PI / 2 + point * Math.PI / 5;
    const r = point % 2 === 0 ? radius : radius * 0.42;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (point === 0) {
      target.moveTo(x, y);
    } else {
      target.lineTo(x, y);
    }
  }
  target.closePath();
  target.fill();
}

function drawRocketMouse(x, y, facing) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);

  drawRocketBody("#2f8ee6", "#185aa0", 0, 36, 1);

  ctx.fillStyle = "#858b8e";
  ctx.beginPath();
  ctx.ellipse(0, 14, 25, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  drawEquippedMouseSuit(0, 14, 0.62);

  ctx.fillStyle = "#9aa0a3";
  ctx.beginPath();
  ctx.ellipse(22, 8, 16, 13, -0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d9a8af";
  ctx.beginPath();
  ctx.arc(18, -4, 8, 0, Math.PI * 2);
  ctx.arc(29, -2, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#111b20";
  ctx.beginPath();
  ctx.arc(30, 6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e3a9b1";
  ctx.beginPath();
  ctx.ellipse(39, 12, 4, 2.8, 0, 0, Math.PI * 2);
  ctx.fill();

  drawEquippedMouseJewelry(20, 19, 0.34);
  drawEquippedMouseHat(24, -12, 0.5);

  ctx.restore();
}

function drawRocketCat(cat, index) {
  const x = cat.x - cameraX;
  const y = cat.y;
  if (x < -150 || x > VIEW.width + 150) {
    return;
  }

  const fur = index === 0 ? "#f3eadb" : "#eadfcd";

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(cat.facing, 1);

  drawRocketBody(index === 0 ? "#e24b43" : "#bf3e8f", index === 0 ? "#8e211f" : "#6c2456", 0, 42, 0.96);

  ctx.fillStyle = fur;
  ctx.beginPath();
  ctx.ellipse(0, 18, 32, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(26, 9, 20, 17, 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(12, -2);
  ctx.lineTo(20, -20);
  ctx.lineTo(28, -2);
  ctx.moveTo(31, -1);
  ctx.lineTo(44, -17);
  ctx.lineTo(45, 5);
  ctx.fill();

  ctx.fillStyle = "#17242a";
  ctx.beginPath();
  ctx.ellipse(32, 7, 3, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#2b3038";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(37, 22);
  ctx.lineTo(66, 18);
  ctx.stroke();

  ctx.strokeStyle = "#788491";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(42, 20);
  ctx.lineTo(63, 17);
  ctx.stroke();

  ctx.strokeStyle = "#17242a";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-26, 17);
  ctx.quadraticCurveTo(-54, 0, -45, -15);
  ctx.stroke();

  ctx.restore();
}

function drawRocketBody(primary, shadow, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);

  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(0, 22, 56, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = primary;
  ctx.strokeStyle = shadow;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-42, 0);
  ctx.quadraticCurveTo(-12, -20, 34, -13);
  ctx.quadraticCurveTo(52, -4, 34, 13);
  ctx.quadraticCurveTo(-12, 20, -42, 0);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#dcefff";
  ctx.beginPath();
  ctx.arc(15, -2, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.moveTo(-12, 12);
  ctx.lineTo(-28, 32);
  ctx.lineTo(3, 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffcf3f";
  ctx.beginPath();
  ctx.moveTo(-45, 0);
  ctx.lineTo(-74, -13);
  ctx.lineTo(-62, 0);
  ctx.lineTo(-74, 13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ff6a2e";
  ctx.beginPath();
  ctx.moveTo(-47, 0);
  ctx.lineTo(-64, -7);
  ctx.lineTo(-56, 0);
  ctx.lineTo(-64, 7);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawRallyMouse(x, y, facing) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);

  if (captureStyle === "spin") {
    const spin = (BANANA_SPIN_TIME - player.spinTimer) * 10.5;
    const sideSlide = Math.sin(spin) * 24;
    const turn = Math.cos(spin);
    const widthScale = 0.28 + Math.abs(turn) * 0.72;
    ctx.translate(sideSlide, 0);
    ctx.scale(turn < 0 ? -widthScale : widthScale, 1);
  }

  drawRallyCar("#2479df", "#15529c", "mouse", 0);
  ctx.restore();
}

function drawRallyCat(cat, index) {
  const x = cat.x - cameraX;
  const y = cat.y + 10;
  if (x < -130 || x > VIEW.width + 130) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(cat.facing, 1);
  drawRallyCar(index === 0 ? "#d74235" : "#c73531", "#8d211d", "cat", index);
  ctx.restore();
}

function drawRallyCar(primary, shadow, driver, index) {
  ctx.fillStyle = "rgba(13, 17, 17, 0.22)";
  ctx.beginPath();
  ctx.ellipse(0, 41, 55, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  drawRallyWheel(-31, 37, 12);
  drawRallyWheel(31, 37, 12);

  ctx.fillStyle = primary;
  ctx.strokeStyle = shadow;
  ctx.lineWidth = 4;
  roundedRect(-49, 14, 98, 25, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.moveTo(-28, 14);
  ctx.lineTo(-11, -2);
  ctx.lineTo(24, -2);
  ctx.lineTo(39, 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(210, 242, 255, 0.86)";
  roundedRect(-8, 1, 31, 15, 4);
  ctx.fill();

  ctx.fillStyle = "#fff2c7";
  ctx.beginPath();
  ctx.ellipse(48, 25, 5, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#53201d";
  ctx.fillRect(-50, 26, 7, 9);

  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillRect(-32, 19, 16, 4);
  ctx.fillRect(10, 19, 19, 4);

  if (driver === "mouse") {
    drawMouseDriver();
  } else {
    drawCatDriver(index);
  }
}

function drawRallyWheel(x, y, radius) {
  ctx.fillStyle = "#151718";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#697179";
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.46, 0, Math.PI * 2);
  ctx.fill();
}

function drawMouseDriver() {
  ctx.fillStyle = "#8f9699";
  ctx.beginPath();
  ctx.ellipse(8, 3, 13, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d9a8af";
  ctx.beginPath();
  ctx.arc(2, -6, 6, 0, Math.PI * 2);
  ctx.arc(14, -6, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#111b20";
  ctx.beginPath();
  ctx.arc(14, 1, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e3a9b1";
  ctx.beginPath();
  ctx.ellipse(22, 5, 3.8, 2.6, 0, 0, Math.PI * 2);
  ctx.fill();

  drawEquippedMouseJewelry(8, 9, 0.32);
  drawEquippedMouseHat(8, -11, 0.46);
}

function drawCatDriver(index) {
  const fur = index === 0 ? "#f2dfc5" : "#e0caa8";

  ctx.fillStyle = fur;
  ctx.beginPath();
  ctx.ellipse(9, 2, 15, 11, 0, 0, Math.PI * 2);
  ctx.moveTo(-2, -4);
  ctx.lineTo(3, -17);
  ctx.lineTo(10, -4);
  ctx.moveTo(13, -4);
  ctx.lineTo(23, -15);
  ctx.lineTo(23, 0);
  ctx.fill();

  ctx.fillStyle = "#17242a";
  ctx.beginPath();
  ctx.ellipse(15, 1, 2.4, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d79791";
  ctx.beginPath();
  ctx.ellipse(25, 6, 3.6, 2.6, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawOctopus(octopus) {
  const x = octopus.x - cameraX;
  if (x < -180 || x > VIEW.width + 180) {
    return;
  }

  const sleepy = octopus.state === "sleeping";
  const stirring = octopus.state === "stirring";
  const awake = !sleepy && !stirring;
  const bob = Math.sin(octopus.phase * (awake ? 4.5 : 1.6)) * (awake ? 3 : 1.2);
  const bodyY = octopus.y + bob;

  ctx.save();
  ctx.translate(x, bodyY);

  if (awake || octopus.strikeProgress > 0.01) {
    const tipX = octopus.tentacleX - cameraX - x;
    const tipY = octopus.tentacleY - bodyY;
    ctx.strokeStyle = "rgba(115, 51, 132, 0.88)";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(8, 32);
    ctx.bezierCurveTo(tipX * 0.32, tipY - 52, tipX * 0.72, tipY + 40, tipX, tipY);
    ctx.stroke();

    ctx.strokeStyle = "rgba(218, 151, 222, 0.82)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(8, 32);
    ctx.bezierCurveTo(tipX * 0.32, tipY - 52, tipX * 0.72, tipY + 40, tipX, tipY);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(29, 16, 37, 0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 70, 62, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#8e4ca3";
  ctx.beginPath();
  ctx.ellipse(0, 18, 44, 39, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#a963bb";
  ctx.beginPath();
  ctx.ellipse(-10, 0, 26, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#733384";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  for (let i = -3; i <= 3; i += 1) {
    const startX = i * 12;
    const sway = Math.sin(octopus.phase * 4 + i) * 8;
    ctx.beginPath();
    ctx.moveTo(startX, 48);
    ctx.quadraticCurveTo(startX + sway, 66, startX + i * 7, 82);
    ctx.stroke();
  }

  ctx.strokeStyle = "#211629";
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  if (awake) {
    ctx.moveTo(-16, 10);
    ctx.lineTo(-6, 8);
    ctx.moveTo(12, 8);
    ctx.lineTo(22, 10);
  } else {
    ctx.moveTo(-18, 10);
    ctx.quadraticCurveTo(-12, 14, -6, 10);
    ctx.moveTo(10, 10);
    ctx.quadraticCurveTo(16, 14, 22, 10);
  }
  ctx.stroke();

  if (sleepy || stirring) {
    ctx.strokeStyle = "rgba(224, 252, 255, 0.72)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(-52, -2, 4, 0, Math.PI * 2);
    ctx.arc(-66, -20, 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawBanana(banana) {
  if (banana.used && captureStyle !== "spin") {
    return;
  }

  const x = banana.x - cameraX;
  if (x < -120 || x > VIEW.width + 120) {
    return;
  }

  const wobble = Math.sin(banana.phase * 5) * 1.4;

  ctx.save();
  ctx.translate(x, banana.y + wobble);

  ctx.fillStyle = "rgba(18, 19, 18, 0.24)";
  ctx.beginPath();
  ctx.ellipse(0, 18, 38, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#d99b16";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-25, 8);
  ctx.quadraticCurveTo(-6, -17, 18, 6);
  ctx.stroke();

  ctx.strokeStyle = "#ffd744";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-23, 7);
  ctx.quadraticCurveTo(-5, -13, 16, 6);
  ctx.stroke();

  ctx.strokeStyle = "#f3c43a";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-8, 7);
  ctx.quadraticCurveTo(1, 29, 29, 16);
  ctx.moveTo(-8, 7);
  ctx.quadraticCurveTo(-12, 30, -38, 20);
  ctx.stroke();

  ctx.strokeStyle = "#6e4c12";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(17, 6);
  ctx.lineTo(25, 1);
  ctx.stroke();

  ctx.restore();
}

function drawCatLaser(laser) {
  const x = laser.x - cameraX;
  if (x < -140 || x > VIEW.width + 140) {
    return;
  }

  ctx.save();
  ctx.translate(x, laser.y);
  const angle = Math.atan2(laser.vy, laser.vx);
  ctx.rotate(angle);

  ctx.strokeStyle = "rgba(255, 65, 86, 0.28)";
  ctx.lineWidth = 16;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-34, 0);
  ctx.lineTo(34, 0);
  ctx.stroke();

  ctx.strokeStyle = "#ff365f";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-31, 0);
  ctx.lineTo(31, 0);
  ctx.stroke();

  ctx.strokeStyle = "#fff1f5";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-22, 0);
  ctx.lineTo(22, 0);
  ctx.stroke();

  ctx.restore();
}

function drawCobra(cobra) {
  const x = cobra.x - cameraX;
  if (x < -160 || x > VIEW.width + 160) {
    return;
  }

  const awake = cobra.state === "stirring" || cobra.state === "striking" || cobra.state === "resting";
  const strikeProgress = cobra.state === "striking" || cobra.state === "resting" ? cobra.strikeProgress : 0;
  const tipX = x + (cobra.strikeTargetX - cobra.x) * strikeProgress;
  const tipY = cobra.y + (cobra.strikeTargetY - cobra.y) * strikeProgress;
  const hoodX = strikeProgress > 0.05 ? tipX : x + cobra.facing * 24;
  const hoodY = strikeProgress > 0.05 ? tipY : cobra.y - (awake ? 28 : 10);

  ctx.save();

  ctx.fillStyle = "rgba(52, 35, 21, 0.22)";
  ctx.beginPath();
  ctx.ellipse(x, GROUND_Y - 6, 54, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#6e8c30";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 36, cobra.y + 16);
  ctx.bezierCurveTo(x - 62, cobra.y - 8, x + 16, cobra.y - 6, x + 32, cobra.y + 12);
  ctx.bezierCurveTo(x + 50, cobra.y + 32, x - 16, cobra.y + 36, x - 4, cobra.y + 14);
  ctx.stroke();

  if (strikeProgress > 0.05) {
    ctx.strokeStyle = "#7f9b35";
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(x, cobra.y + 5);
    ctx.quadraticCurveTo((x + tipX) / 2, cobra.y - 56, tipX, tipY);
    ctx.stroke();
  } else if (awake) {
    ctx.strokeStyle = "#7f9b35";
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(x, cobra.y + 7);
    ctx.quadraticCurveTo(x + cobra.facing * 8, cobra.y - 34, hoodX, hoodY);
    ctx.stroke();
  }

  ctx.save();
  ctx.translate(hoodX, hoodY);
  ctx.scale(cobra.facing, 1);

  ctx.fillStyle = "#8aa53a";
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.quadraticCurveTo(32, -14, 29, 15);
  ctx.quadraticCurveTo(12, 26, 0, 15);
  ctx.quadraticCurveTo(-12, 26, -29, 15);
  ctx.quadraticCurveTo(-32, -14, 0, -22);
  ctx.fill();

  ctx.fillStyle = "#e5c45f";
  ctx.beginPath();
  ctx.ellipse(0, 2, 12, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1f2110";
  ctx.beginPath();
  ctx.ellipse(10, -4, 2.4, 3.8, 0, 0, Math.PI * 2);
  ctx.ellipse(-10, -4, 2.4, 3.8, 0, 0, Math.PI * 2);
  ctx.fill();

  if (awake) {
    ctx.strokeStyle = "#b33c2e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 14);
    ctx.lineTo(14, 21);
    ctx.moveTo(14, 21);
    ctx.lineTo(20, 18);
    ctx.moveTo(14, 21);
    ctx.lineTo(20, 25);
    ctx.stroke();
  }

  ctx.restore();

  if (cobra.state === "sleeping") {
    ctx.strokeStyle = "rgba(255, 246, 211, 0.8)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(x - 46, cobra.y - 17, 4, 0, Math.PI * 2);
    ctx.arc(x - 59, cobra.y - 31, 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawBear(bear) {
  const x = bear.x - cameraX;
  if (x < -150 || x > VIEW.width + 150) {
    return;
  }

  const sleepy = bear.state === "sleeping" || bear.state === "stirring";
  const waking = bear.state === "waking";
  const eating = bear.state === "eating";
  const bob = sleepy ? Math.sin(bear.phase * 2) * 1.2 : Math.sin(bear.phase * 9) * 1.7;
  const bodyY = bear.y + bob;

  ctx.save();
  ctx.translate(x, bodyY);
  ctx.scale(bear.facing, 1);

  ctx.fillStyle = "rgba(34, 24, 16, 0.22)";
  ctx.beginPath();
  ctx.ellipse(0, 69, 62, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#6a442c";
  ctx.beginPath();
  ctx.ellipse(-12, 35, 50, sleepy ? 24 : 30, -0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#7c5132";
  ctx.beginPath();
  ctx.ellipse(28, 24, 31, 26, 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4a2f20";
  ctx.beginPath();
  ctx.arc(15, 1, 10, 0, Math.PI * 2);
  ctx.arc(42, 2, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#9a6b46";
  ctx.beginPath();
  ctx.ellipse(48, 31, 18, 13, 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#201713";
  ctx.beginPath();
  ctx.ellipse(62, 28, 6, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#201713";
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  if (sleepy) {
    ctx.moveTo(27, 19);
    ctx.quadraticCurveTo(33, 23, 39, 19);
  } else {
    ctx.moveTo(29, 19);
    ctx.lineTo(39, 18);
  }
  ctx.stroke();

  if (waking || eating) {
    ctx.strokeStyle = "#f2d1a2";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(61, 39);
    ctx.lineTo(66, 43);
    ctx.moveTo(54, 41);
    ctx.lineTo(57, 47);
    ctx.stroke();
  }

  ctx.strokeStyle = "#4a2f20";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(14, 58);
  ctx.lineTo(26, 68);
  ctx.moveTo(-31, 56);
  ctx.lineTo(-45, 67);
  ctx.stroke();

  ctx.strokeStyle = "#201713";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(26, 68);
  ctx.lineTo(31, 65);
  ctx.moveTo(26, 68);
  ctx.lineTo(29, 72);
  ctx.moveTo(-45, 67);
  ctx.lineTo(-50, 64);
  ctx.moveTo(-45, 67);
  ctx.lineTo(-49, 71);
  ctx.stroke();

  if (sleepy) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
    ctx.beginPath();
    ctx.arc(-54, -8, 4, 0, Math.PI * 2);
    ctx.arc(-39, -22, 3, 0, Math.PI * 2);
    ctx.arc(-25, -34, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawMouse() {
  if (player.hidden) {
    return;
  }

  const x = player.x - cameraX;
  const y = player.y;
  const facing = player.facing;

  if (isSpaceLevel()) {
    drawRocketMouse(x, y, facing);
    if (state === "captured" && captureStyle === "cage") {
      drawCage(x, y);
    }
    return;
  }

  if (isRallyLevel()) {
    drawRallyMouse(x, y, facing);
    if (state === "captured" && captureStyle === "cage") {
      drawCage(x, y);
    }
    return;
  }

  const runCycle = performance.now() / 95;
  const foot = Math.sin(runCycle) * (Math.abs(player.vx) > 30 && player.grounded ? 5 : 1);

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);

  ctx.strokeStyle = "#7d8386";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-26, 24);
  ctx.quadraticCurveTo(-48, 17, -55, 34);
  ctx.stroke();

  ctx.fillStyle = "#858b8e";
  ctx.beginPath();
  ctx.ellipse(0, 18, 29, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  drawEquippedMouseSuit(0, 18, 0.74);

  ctx.fillStyle = "#9aa0a3";
  ctx.beginPath();
  ctx.ellipse(24, 12, 18, 14, -0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#7d8386";
  ctx.beginPath();
  ctx.ellipse(10, 34, 8, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(-17, 34 + foot, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d9a8af";
  ctx.beginPath();
  ctx.arc(20, 0, 10, 0, Math.PI * 2);
  ctx.arc(31, 3, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#9aa0a3";
  ctx.beginPath();
  ctx.arc(20, 0, 6, 0, Math.PI * 2);
  ctx.arc(31, 3, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#111b20";
  ctx.beginPath();
  ctx.arc(32, 9, 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#111b20";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(37, 16);
  ctx.lineTo(47, 12);
  ctx.moveTo(37, 18);
  ctx.lineTo(48, 18);
  ctx.moveTo(37, 20);
  ctx.lineTo(47, 24);
  ctx.stroke();

  ctx.fillStyle = "#e3a9b1";
  ctx.beginPath();
  ctx.ellipse(42, 16, 4.5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  if (isUnderwaterLevel()) {
    drawHeadJar(28, 9, 44, 36);
  }

  if (isDesertLevel()) {
    drawDesertVeil(26, 5, 0.74);
  }

  drawEquippedMouseJewelry(24, 24, 0.42);
  drawEquippedMouseHat(26, -9, 0.64);

  ctx.restore();

  if (state === "captured" && captureStyle === "cage") {
    drawCage(x, y);
  }
}

function drawCage(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = "#8b5a2b";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  roundedRect(-46, -10, 92, 70, 8);
  ctx.stroke();

  ctx.strokeStyle = "#5b361d";
  ctx.lineWidth = 5;
  for (let bar = -30; bar <= 30; bar += 20) {
    ctx.beginPath();
    ctx.moveTo(bar, -8);
    ctx.lineTo(bar, 58);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(-42, 15);
  ctx.lineTo(42, 15);
  ctx.moveTo(-42, 38);
  ctx.lineTo(42, 38);
  ctx.stroke();
  ctx.restore();
}

function drawCat(cat, index) {
  if (cat.eaten) {
    return;
  }

  if (isSpaceLevel()) {
    drawRocketCat(cat, index);
    return;
  }

  if (isWinterLevel()) {
    drawLynx(cat, index);
    return;
  }

  if (isRallyLevel()) {
    drawRallyCat(cat, index);
    return;
  }

  const x = cat.x - cameraX;
  const y = cat.y;
  if (x < -120 || x > VIEW.width + 120) {
    return;
  }

  const runCycle = cat.phase;
  const foot = Math.sin(runCycle * 6) * 5;
  const pale = index === 0 ? "#f3eadb" : "#eadfcd";
  const shadow = index === 0 ? "#d2c4ad" : "#cbbda8";

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(cat.facing, 1);

  ctx.fillStyle = "rgba(42, 31, 20, 0.16)";
  ctx.beginPath();
  ctx.ellipse(0, 47, 48, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = shadow;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-28, 26);
  ctx.quadraticCurveTo(-70, 2, -52, -22);
  ctx.stroke();

  ctx.fillStyle = pale;
  ctx.beginPath();
  ctx.ellipse(0, 25, 38, 21, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f8f1e6";
  ctx.beginPath();
  ctx.ellipse(30, 13, 23, 20, 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = pale;
  ctx.beginPath();
  ctx.moveTo(15, -1);
  ctx.lineTo(24, -20);
  ctx.lineTo(32, 0);
  ctx.moveTo(35, 0);
  ctx.lineTo(50, -16);
  ctx.lineTo(50, 9);
  ctx.fill();

  ctx.fillStyle = "#dfb7b0";
  ctx.beginPath();
  ctx.moveTo(26, -3);
  ctx.lineTo(25, -12);
  ctx.lineTo(30, -2);
  ctx.moveTo(40, 1);
  ctx.lineTo(48, -8);
  ctx.lineTo(47, 6);
  ctx.fill();

  ctx.fillStyle = "#17242a";
  ctx.beginPath();
  ctx.ellipse(36, 11, 3.2, 4.4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#17242a";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(48, 20);
  ctx.lineTo(60, 15);
  ctx.moveTo(49, 22);
  ctx.lineTo(62, 23);
  ctx.moveTo(48, 24);
  ctx.lineTo(59, 31);
  ctx.stroke();

  ctx.fillStyle = "#d79791";
  ctx.beginPath();
  ctx.ellipse(54, 19, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  if (isUnderwaterLevel()) {
    drawHeadJar(35, 10, 52, 42);
  }

  if (isDesertLevel()) {
    drawDesertVeil(32, 8, 1.05);
  }

  ctx.strokeStyle = shadow;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(22, 42);
  ctx.lineTo(30, 51 + foot);
  ctx.moveTo(-12, 42);
  ctx.lineTo(-20, 51 - foot);
  ctx.stroke();

  if (cat.heldAtGate || cat.blockedByLog) {
    ctx.strokeStyle = "#17242a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(22, 30);
    ctx.quadraticCurveTo(34, 36, 46, 29);
    ctx.stroke();
  }

  ctx.restore();
}

function drawLynx(cat, index) {
  const x = cat.x - cameraX;
  const y = cat.y;
  if (x < -120 || x > VIEW.width + 120) {
    return;
  }

  const runCycle = cat.phase;
  const foot = Math.sin(runCycle * 6) * 5;
  const coat = index === 0 ? "#c58b55" : "#b77a49";
  const lightCoat = index === 0 ? "#ead1ae" : "#dec09b";
  const shadow = index === 0 ? "#8a5f3b" : "#774f33";
  const dark = "#2a211c";

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(cat.facing, 1);

  ctx.fillStyle = "rgba(42, 31, 20, 0.18)";
  ctx.beginPath();
  ctx.ellipse(0, 47, 50, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = shadow;
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-30, 24);
  ctx.quadraticCurveTo(-52, 14, -43, 4);
  ctx.stroke();

  ctx.strokeStyle = dark;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-43, 4);
  ctx.quadraticCurveTo(-50, 2, -43, -4);
  ctx.stroke();

  ctx.fillStyle = coat;
  ctx.beginPath();
  ctx.ellipse(0, 25, 39, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(48, 32, 22, 0.6)";
  [
    [-24, 18, 3],
    [-14, 31, 2.4],
    [-7, 15, 2.6],
    [5, 28, 3],
    [14, 18, 2.4],
    [24, 30, 2.7],
  ].forEach((spot) => {
    ctx.beginPath();
    ctx.ellipse(spot[0], spot[1], spot[2], spot[2] * 0.75, 0.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = coat;
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(23, -25);
  ctx.lineTo(32, 2);
  ctx.moveTo(35, 1);
  ctx.lineTo(48, -22);
  ctx.lineTo(50, 9);
  ctx.fill();

  ctx.strokeStyle = dark;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(23, -24);
  ctx.lineTo(20, -35);
  ctx.moveTo(47, -21);
  ctx.lineTo(51, -33);
  ctx.stroke();

  ctx.fillStyle = "#2f2520";
  ctx.beginPath();
  ctx.moveTo(22, -12);
  ctx.lineTo(25, -20);
  ctx.lineTo(29, -9);
  ctx.moveTo(42, -9);
  ctx.lineTo(47, -17);
  ctx.lineTo(48, -5);
  ctx.fill();

  ctx.fillStyle = coat;
  ctx.beginPath();
  ctx.ellipse(30, 13, 24, 20, 0.06, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = lightCoat;
  ctx.beginPath();
  ctx.moveTo(16, 17);
  ctx.lineTo(8, 26);
  ctx.lineTo(18, 24);
  ctx.lineTo(13, 34);
  ctx.lineTo(27, 28);
  ctx.lineTo(35, 35);
  ctx.lineTo(39, 25);
  ctx.lineTo(50, 27);
  ctx.lineTo(42, 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f1dfc4";
  ctx.beginPath();
  ctx.ellipse(42, 19, 13, 10, 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.ellipse(37, 11, 3.1, 4.4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = dark;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(48, 20);
  ctx.lineTo(62, 15);
  ctx.moveTo(49, 22);
  ctx.lineTo(64, 23);
  ctx.moveTo(48, 24);
  ctx.lineTo(61, 31);
  ctx.stroke();

  ctx.fillStyle = "#241914";
  ctx.beginPath();
  ctx.ellipse(54, 19, 4.3, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = shadow;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(22, 42);
  ctx.lineTo(31, 51 + foot);
  ctx.moveTo(-13, 42);
  ctx.lineTo(-23, 51 - foot);
  ctx.stroke();

  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.ellipse(33, 51 + foot, 8, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(-25, 51 - foot, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  if (cat.heldAtGate || cat.blockedByLog) {
    ctx.strokeStyle = dark;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(22, 30);
    ctx.quadraticCurveTo(34, 36, 46, 29);
    ctx.stroke();
  }

  ctx.restore();
}

function drawLives() {
  ctx.save();
  ctx.translate(24, 24);
  for (let i = 0; i < 3; i += 1) {
    const x = i * 42;
    const alive = i < lives;
    ctx.fillStyle = alive ? "#d9433c" : "rgba(255, 255, 255, 0.38)";
    ctx.strokeStyle = alive ? "#8f2020" : "rgba(52, 68, 70, 0.28)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 16, 30);
    ctx.bezierCurveTo(x - 9, 12, x + 3, -4, x + 16, 8);
    ctx.bezierCurveTo(x + 29, -4, x + 41, 12, x + 16, 30);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawProgress() {
  const barX = 730;
  const barY = 28;
  const barW = 190;
  const barH = 10;
  const progress = clamp(player.x / (cheese.x + 30), 0, 1);

  ctx.save();
  roundedRect(barX, barY, barW, barH, 5);
  ctx.fillStyle = "rgba(27, 50, 44, 0.24)";
  ctx.fill();
  roundedRect(barX, barY, barW * progress, barH, 5);
  ctx.fillStyle = "#f0cf3b";
  ctx.fill();

  ctx.fillStyle = "#6d5930";
  ctx.beginPath();
  ctx.moveTo(barX + barW + 8, barY + 13);
  ctx.lineTo(barX + barW + 27, barY + 7);
  ctx.lineTo(barX + barW + 14, barY - 5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLevelBadge() {
  ctx.save();
  ctx.font = "800 18px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  roundedRect(VIEW.width / 2 - 56, 20, 112, 32, 8);
  ctx.fillStyle = "rgba(28, 46, 44, 0.36)";
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`TASO ${currentLevelIndex + 1}/${LEVELS.length}`, VIEW.width / 2, 36);

  if (levelMessageTimer > 0 && state === "playing") {
    const alpha = clamp(levelMessageTimer / 0.7, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.font = "900 54px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(26, 43, 44, 0.38)";
    ctx.lineWidth = 8;
    ctx.strokeText(`TASO ${currentLevelIndex + 1}`, VIEW.width / 2, 126);
    ctx.fillText(`TASO ${currentLevelIndex + 1}`, VIEW.width / 2, 126);
  }
  ctx.restore();
}

function drawPointerSpark() {
  if (!pointer.active || state !== "playing") {
    return;
  }

  ctx.save();
  ctx.translate(pointer.viewX, clamp(pointer.viewY, 46, GROUND_Y - 22));
  ctx.strokeStyle = "rgba(255, 255, 255, 0.84)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, Math.PI * 2);
  ctx.moveTo(-15, 0);
  ctx.lineTo(-5, 0);
  ctx.moveTo(5, 0);
  ctx.lineTo(15, 0);
  ctx.moveTo(0, -15);
  ctx.lineTo(0, -5);
  ctx.moveTo(0, 5);
  ctx.lineTo(0, 15);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1e3038";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

  drawSky();
  caves.forEach(drawCave);
  drawGround();
  stoneWalls.forEach(drawStoneWall);
  logs.forEach(drawLog);
  drawCheese();
  spaceMonsters.forEach(drawSpaceMonsterEntity);
  octopuses.forEach(drawOctopus);
  bears.forEach(drawBear);
  cobras.forEach(drawCobra);
  bananas.forEach(drawBanana);
  catLasers.forEach(drawCatLaser);
  cats.forEach(drawCat);
  drawMouse();
  drawPointerSpark();
  drawLives();
  drawProgress();
  drawLevelBadge();
}

function frame(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.033);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(frame);
}

window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("pointermove", handlePointerMove);
canvas.addEventListener("pointerdown", handlePointerDown);
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    queueJump();
  }
});
if (playerNameInput) {
  playerNameInput.addEventListener("input", () => {
    const playerName = sanitizePlayerName(playerNameInput.value);
    playerNameInput.classList.toggle("is-needed", !playerName);
    startButton.disabled = !playerName;
    if (progress.playerName !== playerName) {
      progress.playerName = playerName;
      saveProgress();
    }
  });
  playerNameInput.addEventListener("change", savePlayerNameFromInput);
}
startButton.addEventListener("click", startGame);
if (shopButton) {
  shopButton.addEventListener("click", openShop);
}
if (playShopButton) {
  playShopButton.addEventListener("click", openShop);
}
if (leaderboardButton) {
  leaderboardButton.addEventListener("click", openLeaderboard);
}
if (playLeaderboardButton) {
  playLeaderboardButton.addEventListener("click", openLeaderboard);
}
if (shopCloseButton) {
  shopCloseButton.addEventListener("click", closeShop);
}
if (leaderboardCloseButton) {
  leaderboardCloseButton.addEventListener("click", closeLeaderboard);
}

resizeCanvas();
buildLevelSelect();
loadCloudProgress();
resetRun();
draw();
requestAnimationFrame(frame);
