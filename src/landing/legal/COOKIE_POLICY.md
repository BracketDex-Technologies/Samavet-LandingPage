# Cookie and Tracking Policy

Last Updated: 10 August 2026

This Cookie and Tracking Policy explains the cookies, local storage, and telemetry mechanisms found in the current Samavet ePawati repository.

This is a draft for product publication. Legal review recommended before production publication.

## 1. Summary

The inspected application uses essential authentication/session mechanisms and frontend local storage. It also mounts Vercel Analytics and Vercel Speed Insights.

The repository does not show advertising cookies, remarketing pixels, payment-provider cookies, or third-party ad tracking SDKs.

## 2. Essential Authentication Cookie

The application uses an HttpOnly refresh cookie for login sessions.

Observed configuration:

- Default cookie name: `digital_vargani_refresh`
- Purpose: maintain authenticated sessions and refresh access tokens.
- Scope: `/api/v1/auth`
- HttpOnly: yes.
- Secure: enabled in production by configuration.
- SameSite: configurable, default `lax`.
- Max age: configurable, default 30 days.

This cookie is essential for login and security. If blocked, authenticated use may not work correctly.

## 3. Local Storage

The frontend uses browser local storage for:

- A stripped session marker under `digital-vargani-admin-session`.
- Language preference.
- Entry field preferences.
- A location-removal flag.
- Workspace cache.

The inspected client code strips access and refresh credentials before storing the session object in local storage.

## 4. Analytics and Performance Telemetry

The current client root mounts:

- Vercel Analytics.
- Vercel Speed Insights.

These tools are used for product usage and performance measurement. They are not payment processors and are not donation processors.

The repository does not show advertising or remarketing use. Confirm Vercel's current product behavior and your deployed settings before publishing final wording.

## 5. Server-side Session Metadata

ePawati stores limited technical/session security information as part of authentication and account security.

## 6. Managing Cookies and Storage

Users may control cookies and local storage through browser settings. Blocking essential cookies or clearing local storage may log users out, remove preferences, or reduce application functionality.

## 7. Changes

This policy should be updated if Samavet adds advertising pixels, marketing trackers, customer chat tools, payment widgets, cookie consent tools, or any new analytics/tracking service.
