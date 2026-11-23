# CityCube Group HR

A web-based HR and payroll system for CityCube Warehousing & Storage Management & Operation LLC,
CityCube General Trading FZ LLC, Wahid Karak Cafe LLC and any company you add later. It follows UAE
Labour Law (Federal Decree-Law 33/2021 as amended).

It runs as a static website on **GitHub Pages**. Logins and data are handled by **Firebase**
(Authentication and Cloud Firestore). The free Spark plan is enough for this app.

There are two kinds of login:

| Role | Who | What they see |
|---|---|---|
| **HR admin** | HR / management | Everything: all companies, employees, salaries, documents, leave, payroll and WPS, loans, end of service, portal logins |
| **Employee** | Staff, with a username and password issued by HR | Only their own leave (balance, requests, cancel a pending request), their own payslips and their own profile (and changing their password) |

The rules in `firestore.rules` enforce this on Google's servers, so an employee can't read anyone else's
data even if they tamper with the web page.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `firebase-config.js` | Your Firebase project settings. **Edit this.** |
| `firestore.rules` | Database security rules. Paste into the Firebase console. |
| `firebase.json`, `firestore.indexes.json` | Only needed if you deploy with the Firebase CLI |
| `manifest.webmanifest`, `sw.js` | Make the site installable as a phone app and let it open offline |
| `logos/` | CityCube mark (app logo and favicon) and the CityCube Warehousing and CityCube General Trading logos. Upload this folder too. |

---

## Setup (about 20 minutes, one time only)

### 1. Create the Firebase project
1. Go to <https://console.firebase.google.com> → **Add project** (e.g. `citycube-hr`). Google Analytics is not needed.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
   (Leave "Email link" off.)
3. **Build → Firestore Database → Create database** → choose **production mode** and the location
   closest to the UAE that the console offers. The location can't be changed later. Employee data is
   personal data under the UAE PDPL, so check that the location suits your data policy.

### 2. Add the security rules
**Firestore Database → Rules**. Delete what's there, paste the whole content of `firestore.rules`, then click **Publish**.

### 3. Connect the app to your project
1. **Project settings (gear icon) → General → Your apps → Web (`</>`)**. Register an app called `CityCube HR`. Hosting is not needed.
2. Copy the values from the `firebaseConfig` it shows into `firebase-config.js`.
3. Optionally, change `LOGIN_DOMAIN`. It's only an internal label for employee usernames: `cw-001` is stored as
   `cw-001@staff.citycube.ae`, and no email is ever sent there. **Don't change it after logins have been created.**

### 4. Create the first HR admin (once, by hand)
1. **Authentication → Users → Add user.** Enter your real work email and a strong password.
2. Copy the **User UID** shown in the list.
3. **Firestore Database → Data → Start collection**:
   - Collection ID: `users`
   - Document ID: *paste the User UID*
   - Fields:
     - `role` (string) = `admin`
     - `active` (boolean) = `true`
     - `username` (string) = your email
4. Save. After this, you can add more HR admins from inside the app (**Portal logins → Add HR admin**).

### 5. Publish on GitHub Pages
1. Create a GitHub repository, e.g. `citycube-hr`. A **private** repository needs a paid GitHub plan for Pages;
   a public one is fine because the code and config contain no secrets and the rules protect the data.
   **Never commit backup files or exports to the repository.**
2. Upload **all** files: `index.html`, `firebase-config.js`, `manifest.webmanifest`, `sw.js`, `firestore.rules`, `firestore.indexes.json`, `firebase.json`, `README.md` and the whole `logos` folder.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save.**
4. After a minute the site is live at `https://<your-github-name>.github.io/citycube-hr/`.

### 6. Allow your website to sign in
Firebase console → **Authentication → Settings → Authorized domains → Add domain** →
`<your-github-name>.github.io` (or your own domain if you connect one).

### 7. First sign-in
1. Open the site and sign in with the admin email from step 4.
2. On the dashboard, click **Create CityCube Warehousing, CityCube Trading & Wahid Karak Cafe**.
   Or, if you already have data in the earlier Claude version, use its **Setup & data → Download full backup**
   and then **Setup & data → Restore from backup** here.
3. **Companies → Edit**: upload the **Wahid Karak Cafe logo**. The two CityCube logos are already built in, and any company you add later can have its own logo uploaded the same way. Then add the trade licence, its expiry, the 13-digit MOHRE establishment ID, the bank routing
   code and the weekly rest days for each company.
4. **Employees**: add staff one by one, or import a CSV. For existing staff, fill in **Leave balance at go-live**
   and the go-live date (Edit → Salary & bank), so annual leave starts from the right balance.

---

## Giving employees a login
1. **Employees** → open the employee → **Portal login**.
2. The username is suggested from the employee number (e.g. `cw-001`) and a random temporary password is generated. Click **Create login**.
3. Copy the details shown and give them to the employee privately (e.g. by WhatsApp). The password is not shown again.
4. The employee signs in at your site link and should change the password under **My profile**.

**Forgotten password:** Firebase does not allow one person to change another person's password from a web page.
Open the employee → **Portal login → Issue new credentials**. This creates a new username (e.g. `cw-001-2`)
with a new password, and the old login stops working at once.
(HR admins who sign in with a real email can use **Forgot password?** on the login page instead.)

**Leavers:** saving an end-of-service settlement disables that employee's login automatically.
You can also disable or re-enable any login under **Portal logins**.

## The staff mobile app
The site installs as an app on staff phones. There's nothing to download from an app store.

**What staff do (once):**
- **iPhone:** open the link in **Safari**, tap **Share** (square with an arrow), then **Add to Home Screen**.
- **Android:** open the link in **Chrome**, then tap **Install app** on the banner, or **⋮ → Install app / Add to Home screen**.

The CityCube HR icon then appears on the home screen and opens full-screen with four tabs: **Leave**, **Payslips**,
**Documents** and **Profile**. Staff stay signed in on their own phone until they tap **Sign out**.

- **Documents → Upload renewed document → Take photo** opens the phone camera. Staff should lay the document
  flat in good light. The photo is compressed and sent to HR for checking.
- **Offline:** the app still opens with a weak or no connection and shows the last saved leave, payslips and
  documents. Requests and uploads need a connection; the app says so clearly. Signing out clears the saved copy
  from the phone.
- **Updates:** replace the files on GitHub as usual. Phones pick up the new version the next time the app is
  opened online. If you change `sw.js` itself, raise `VERSION` at the top of it (e.g. `cc-hr-v2`).
- **Not included on the free plan:** push notifications. Staff see approvals the next time they open the app.

## How leave requests work
1. The employee signs in → **My leave** → **Request leave**. The form shows their balance and warns about
   problems: not enough balance, sick leave during probation, over the legal maximum, overlapping dates and so on.
2. The request appears for HR under **Leave → Pending**, tagged *via portal*, with a count next to the menu item.
3. HR clicks **Approve** or **Reject**. The employee sees the result straight away. Approved unpaid, sick or maternity
   days flow into payroll deductions and into the leave balance.
4. While a request is still pending, the employee can cancel it. They cannot approve or change it.

## Employee photos and document files
Photos and scans (passport, visa, Emirates ID, contract, certificates and so on) are stored **inside the Firestore
database**, so everything stays on the free Spark plan. Firebase's separate file storage service now needs the paid
Blaze plan.

- **Photo:** open the employee → **Add photo**. It's cropped square and compressed. A small copy shows in lists and
  the employee portal; **Download photo** gives the 480 px version.
- **Documents:** open the employee → **Files** tab → **Upload document**. PDF, JPG or PNG, up to 5 MB.
  Photos of documents are compressed automatically to about 0.3–1 MB. Larger files are split into parts behind
  the scenes. If you give an expiry date for a passport, visa, Emirates ID, work permit, contract, health insurance
  or ILOE, the employee's record and the expiry alerts update too.
- **Employees** can view their own files under **My profile** and upload renewed documents. These arrive marked
  *awaiting HR check* and show on the dashboard. **Accept** applies the new expiry date; **Delete** removes the file.
  Only HR and the employee themself can open a file.
- **Space:** the free plan includes 1 GB of database storage. **Setup & data** shows how much the files use.
  As a guide, 300 employees with a photo and 8 compressed scans each comes to roughly 0.5–1 GB, so keep
  scans compact: phone photos or 150 dpi PDFs. If you outgrow it, move to Blaze (pay-as-you-go).
- **Optional, saves space:** in **Firestore → Indexes → Single field → Add exemption**, turn off indexing for
  the field `data` in collections `fileChunks` and `photos`, and `thumb` in `employees`.
  (`firestore.indexes.json` does the same if you use the Firebase CLI.)
- **Backups:** **Download full backup** includes photos and files unless you untick that option.

## Payslips
When HR clicks **Finalise payroll**, every employee's payslip is published to their **My payslips** page.
**Reopen** hides those payslips again until the payroll is finalised once more.

---

## Good to know
- **Cost:** the free Spark plan allows 50,000 document reads and 20,000 writes a day. That's plenty for a few hundred
  employees. HR admins load all records when they open the app.
- **Backups:** Firestore has no automatic backups on the free plan. Use **Setup & data → Download full backup**
  every month and store the file somewhere safe, but **not** in GitHub.
- **Extra protection (optional):** turn on **Firebase App Check** with reCAPTCHA so only your website can call your
  Firebase project.
- **Updating the app:** replace `index.html` in GitHub. Your data stays in Firebase.
- **Free-zone company:** check whether your free zone uses MOHRE's WPS or its own payroll system before you
  upload SIF files for CityCube General Trading FZ LLC.
- The calculations follow UAE Labour Law as summarised on the **Labour law guide** page. They are guidance, not
  legal advice. Check unusual cases with MOHRE or a lawyer.
