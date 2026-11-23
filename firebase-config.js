// ─────────────────────────────────────────────────────────────
// Paste your Firebase web-app settings here.
// Firebase console → Project settings (gear icon) → General →
// "Your apps" → Web app → "SDK setup and configuration" → Config.
// These values are not secret: the security rules (firestore.rules)
// are what protect your data.
// ─────────────────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Employees sign in with a plain username such as "ccw-001".
// Behind the scenes it becomes "ccw-001@<LOGIN_DOMAIN>" in Firebase
// Authentication. No email is ever sent to this address, so it does
// not need to be a real mailbox. Set it once and do not change it
// later, or existing usernames will stop working.
export const LOGIN_DOMAIN = "staff.citycube.ae";

// Name shown on the login screen and in the side bar.
export const APP_NAME = "CityCube Group HR";
