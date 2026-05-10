# NorthStar CAD Bank

A final-year online banking prototype built with AngularJS and Node.js. It includes a login screen, dummy account data, CAD checking and savings accounts, one active credit card, four credit-card offers, E-Transfer send and receive flows, biometric login toggle, help centre, and profile page.

## Dummy Logins

All dummy accounts use the password `Bank@2026`.

- `demo@northstar.ca`
- `maya@northstar.ca`
- `liam@northstar.ca`
- `sara@northstar.ca`
- `noah@northstar.ca`

To test transfers, log in as one user, send an E-Transfer to another dummy email, log out, then log in as the recipient. The recipient checking balance and recent activity will show the received transfer.

## Run

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

This is a prototype only and does not connect to real banking services.
