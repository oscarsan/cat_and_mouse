# Firebase setup

The game still works with local browser saves when Firebase is empty. Cloud saves start after `firebase-config.js` has your Firebase web app settings.

Use **Firestore Database**, not **Storage**. Firebase Storage is for files like images, audio, and video, and it needs the paid Blaze plan. This game only needs Firestore for small save data, like cheese, levels, and shop items.

It is okay if `firebase-config.js` has a `storageBucket` line. Firebase prints it in the web app config, but the game does not use Storage because it does not load the Storage script or call `firebase.storage()`.

1. Open Firebase Console.
2. Create a project.
3. Go to Authentication, Sign-in method, and enable Anonymous.
4. Go to Firestore Database and create a database. Do not open Storage.
5. Open Firestore Rules and paste the rules from `firestore.rules`.
6. Go to Project settings, add a Web app, and copy the `firebaseConfig` values into `firebase-config.js`.
7. Commit and push to GitHub.

Player saves are stored at:

```text
players/{playerId}
```

Leaderboard rows are stored at:

```text
leaderboard/{playerId}
```

The current game saves player name, cheese, finished levels, owned shop items, equipped shop items, and a public leaderboard row with only player name and cheese count.

## Test it

1. Open the live game.
2. Open the browser console.
3. Run this:

```js
await window.catAndMouseCloudSave.ready
```

Good result:

```js
{ enabled: true, playerId: "some-long-id" }
```

If it says `CONFIGURATION_NOT_FOUND`, open Firebase Console, go to Authentication, click Get started, and enable Anonymous sign-in.

After winning a level or buying a shop item, open Firestore and look for:

```text
players/{playerId}
```

The player name is saved as `playerName`, so the player list is easier to read in Firebase.

For the leaderboard, paste the newest `firestore.rules` into Firebase Rules. The leaderboard is public to read, but each player can only write their own row.
