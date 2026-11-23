// ─────────────────────────────────────────────────────────────
// Paste your Firebase web-app settings here.
// Firebase console → Project settings (gear icon) → General →
// "Your apps" → Web app → "SDK setup and configuration" → Config.
// These values are not secret: the security rules (firestore.rules)
// are what protect your data.
// ─────────────────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey: "AIzaSyD4T6y97oDQZ7hIXDjTEOAjscTSurlTplY",
  authDomain: "citycube-hr.firebaseapp.com",
  projectId: "citycube-hr",
  storageBucket: "citycube-hr.firebasestorage.app",
  messagingSenderId: "357152631180",
  appId: "1:357152631180:web:3e1865e95e82a4addb8ea9"
};

// Employees sign in with a plain username such as "ccw-001".
// Behind the scenes it becomes "ccw-001@<LOGIN_DOMAIN>" in Firebase
// Authentication. No email is ever sent to this address, so it does
// not need to be a real mailbox. Set it once and do not change it
// later, or existing usernames will stop working.
export const LOGIN_DOMAIN = "staff.citycube.ae";

// Name shown on the login screen and in the side bar.
export const APP_NAME = "CityCube Group HR";
