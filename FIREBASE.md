# Firebase setup

The game still works with local browser saves when Firebase is empty. Cloud saves start after `firebase-config.js` has your Firebase web app settings.

1. Open Firebase Console.
2. Create a project.
3. Go to Authentication, Sign-in method, and enable Anonymous.
4. Go to Firestore Database and create a database.
5. Open Firestore Rules and paste the rules from `firestore.rules`.
6. Go to Project settings, add a Web app, and copy the `firebaseConfig` values into `firebase-config.js`.
7. Commit and push to GitHub.

Player saves are stored at:

```text
players/{playerId}
```

The current game saves cheese, finished levels, owned shop items, and equipped shop items.
