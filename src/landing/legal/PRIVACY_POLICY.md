# Privacy Policy

Last Updated: 10 August 2026

This Privacy Policy explains how Samavet ePawati handles information when mandals, trusts, temples, organisations, societies, festival committees, admins, khajindars, group leaders, members, and collectors use ePawati.


## 1. ePawati Is Software, Not a Donation Processor

ePawati helps organisations record Vargani/donation collections and generate digital receipts/Pawati.

Donations are made directly by the donor to the organisation. The organisation may receive funds through its own UPI, cash, cheque, bank transfer, or other independently selected method.

Samavet/ePawati does not collect donation money, hold donation money, settle donation money, transfer donation money, operate a wallet, process UPI payments, process card payments, or charge a percentage/commission on donations.

## 2. Information ePawati Handles

The application handles information required to operate digital receipt, collection, member, expense, item donation, reporting, and organisation management workflows.

### Organisation and Mandal Information

This may include organisation/mandal name, Marathi name, slug, logo URL, address, locality, city, state, contact name, contact phone, plan, slip limit, WhatsApp template configuration, status, festivals, templates, and custom receipt fields.

### Admin, User, Member, and Collector Information

This may include name, phone number, email address, password hash, role, account status, last login time, mandal association, member display name, group, area name, and group leader relationship.

### Donor and Vargani Collection Information

When an organisation records a collection, ePawati may store contributor/donor name, phone number, address, shop name, collection amount, payment mode selected by the organisation, collector name/user, group, area, slip number, date/time, receipt image/PDF reference, share token hash, custom field data, status, and cancellation details.

### Item Donation Information

For non-cash item donations, ePawati may store receipt number, donor name, donor phone, donor address, donation date, category such as gold, silver, jewellery or other, item name, weight, weight unit, purity, quantity, storage location, notes, creator/updater, and timestamps.

### Expense and Accounting Information

The application may store expense category, amount, vendor name, expense date, notes, proof/bill image URL, status, creator, approver, and report outputs.

### Uploaded Files and Generated Assets

The repository supports organisation logos, template/background assets, receipt images, and expense proof images. Upload handling is limited to image formats in the inspected storage service.

Profile photos were not clearly established as a separate current database field in the inspected repository. If profile photo support is added or confirmed separately, this policy should be updated.

### Society Registration Information

Public society registration may collect society name, address, chairman/secretary names, mobile numbers, email, number of flats, and template file information if provided.

### Authentication and Security Information

The application stores session records including refresh token hash, IP address, user-agent, expiry time, revocation time, and login-related timestamps. These are used for authentication, security, fraud prevention, and session management.

### Product Analytics and Performance Telemetry

The current frontend mounts Vercel Analytics and Vercel Speed Insights. These services may process page usage and performance telemetry according to Vercel's service operation. The repository does not show advertising pixels, remarketing tags, or third-party ad identifiers.

## 3. Why This Information Is Used

ePawati uses information to:

- Create and manage organisation accounts.
- Authenticate users and protect sessions.
- Apply role-based and mandal-scoped access control.
- Record Vargani/donation collections entered by the organisation.
- Generate digital receipts/Pawati.
- Share receipts, including through WhatsApp where configured.
- Maintain member, group, collector, task, expense, item donation, and report workflows.
- Enforce slip generation limits.
- Provide customer support and operational administration.
- Keep audit records of important changes.
- Improve reliability, performance, and service quality.
- Comply with applicable law and valid legal requests.

## 4. Organisation Responsibility for Donor Information

The organisation determines the information it enters into ePawati and is responsible for its relationship with donors and the accuracy and lawful collection of donor information. Samavet processes that information as necessary to provide, secure and maintain the ePawati service.

The organisation is responsible for:

- Informing donors that their details may be entered into ePawati for receipt generation and recordkeeping.
- Entering accurate donor, collection, payment mode, and receipt details.
- Verifying receipt of cash, UPI, cheque, bank transfer, or other payment outside ePawati.
- Handling donor disputes about payment, receipt accuracy, refunds, or use of donation money.
- Using donor information only for lawful and appropriate organisation purposes.
- Ensuring its authorised users do not misuse donor data.

## 5. Who Can Access Information

Access depends on role and mandal scope implemented in the application.

- Super Admin can manage mandals, users, templates, WhatsApp configuration, reports, item donations, partners, and registrations as implemented.
- Mandal Admin and Khajindar can access organisation workspace data, members, slips, expenses, item donations, reports, and related features according to role permissions.
- Group Leader and Member/collector roles have more limited access. Workspace views for collectors are filtered to their own slips/tasks and do not return full user, audit, expense, or item-donation data.
- Public receipt links may allow receipt viewing through a signed/shared receipt route.
- Third-party providers may process information only to provide hosting, storage, analytics, WhatsApp delivery, or optional translation services.

Operational database or infrastructure access by Samavet support staff outside the application was not fully determinable from the repository and should be confirmed before publication.

## 6. Third-party Service Providers Found in the Repository

The inspected repository references or uses:

- Supabase Postgres for database storage.
- Supabase Storage for uploaded assets and receipt-related files.
- Authkey WhatsApp API for WhatsApp receipt sending and template management when enabled.
- Vercel Analytics and Vercel Speed Insights in the frontend.
- Groq and OpenRouter as optional server-side Marathi transliteration providers when API keys are configured.
- Vercel deployment/public URL configuration.

No payment gateway, wallet, card processor, UPI processor, advertising SDK, or marketing remarketing tool was found in the repository.

## 7. WhatsApp and Message Delivery

When WhatsApp receipt delivery is enabled, ePawati may send the donor's phone number, receipt/template details, organisation name, donor/contributor name, media/header URL, and related message data to Authkey so the receipt message can be sent.

WhatsApp delivery may fail, be delayed, or depend on third-party template approval, provider availability, phone number validity, and WhatsApp platform rules. ePawati does not guarantee WhatsApp delivery.

## 8. Cookies, Local Storage, and Session Mechanisms

The application uses an essential HttpOnly refresh cookie for authentication. The default cookie name in configuration is `digital_vargani_refresh`.

The frontend uses local storage for a stripped session marker, language preference, entry field preferences, location-removal flag, and workspace cache. Access credentials are intentionally stripped before session data is stored in local storage.


## 9. Data Security

The repository shows security controls including Argon2 password hashing, JWT-based authentication, hashed refresh tokens, HttpOnly refresh cookies, role guards, tenant-scope checks, validation pipes, CORS configuration, Helmet security headers, request IDs, rate limiting, and audit events.

No internet service can be guaranteed completely secure. Organisations must keep account credentials safe, assign appropriate roles, remove access for users who should no longer use the system, and report suspected unauthorised access promptly.

## 10. Data Retention

The application stores records while needed to provide the service, maintain receipts and reports, support audits, enforce limits, and meet legal or operational requirements.

The code contains deletion and status mechanisms for mandals, users, slips, expenses, members, item donations, and related records. A formal production retention and backup deletion schedule was not determinable from the repository.

Legal review recommended before production publication for retention, backup, deletion, restoration, and offboarding commitments.

## 11. Access, Correction, and Deletion Requests

Organisations can use application features to correct or delete certain records where permissions allow. Donors should generally contact the organisation that received the donation because the organisation controls the underlying donor relationship and receipt accuracy.

For privacy questions or requests, contact:

[INSERT OFFICIAL PRIVACY CONTACT EMAIL]

Samavet may need to verify the request and may coordinate with the relevant organisation before changing donor or collection records.

## 12. Account Termination

Accounts may be suspended, archived, or deleted according to the Terms, applicable law, and operational requirements. Some historical records may be retained where necessary for legal, security, audit, dispute, or backup purposes.

Legal review recommended before production publication.

## 13. Children and Minors

ePawati is intended for use by organisations and authorised users, not by children as a consumer service. If an organisation records information about a minor donor, the organisation is responsible for ensuring it has a lawful basis and appropriate consent where required.

## 14. Indian Privacy and Data Protection Law

Samavet aims to handle personal data in line with applicable Indian privacy and data protection requirements, including the Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025, as applicable.

Legal review recommended before production publication to confirm roles, notices, consent practices, grievance handling, retention, and cross-border/provider obligations.

## 15. Changes to This Policy

Samavet may update this Privacy Policy as the product, law, or service providers change. The Last Updated date should be changed whenever this policy is revised.
