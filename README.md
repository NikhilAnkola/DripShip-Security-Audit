# DripShip Security Audit Lab

## Overview
A security assessment project built on a MERN e-commerce application to identify and demonstrate real-world web vulnerabilities based on OWASP Top 10 principles.

This project includes:
- Vulnerability discovery
- Exploitation proof-of-concepts
- Security impact analysis
- Remediation recommendations

---

## Tech Stack
- MongoDB
- Express.js
- React
- Node.js
- JWT Authentication
- Postman (API testing)
- Burp Suite (planned)

---

## Security Findings

- [x] Broken Access Control / User Enumeration
- [x] Insecure JWT Storage (Token Theft Risk)
- [x] Missing Server-Side Brute Force Protection
- [x] Weak JWT Secret & Token Forgery Risk
- [ ] Additional findings TBD

---

## Repository Structure

```text
findings/            Individual vulnerability writeups
screenshots/         Evidence and proof-of-concepts
SECURITY_REPORT.md   Consolidated security report
backend/             Application backend
src/                 Frontend
```

## Current Findings

### Finding 01 — Broken Access Control
Endpoint:
GET /api/users

Issue:
Users can be enumerated without authentication.

Detailed writeup:
findings/finding-01-broken-access-control.md


### Finding 02 — Insecure JWT Storage
Issue:
JWT authentication tokens are stored in browser localStorage and accessible to JavaScript.

Risk:
Potential token theft through XSS.

Detailed writeup:
findings/finding-02-insecure-jwt-storage.md

### Finding 03 — Authentication Endpoint Lacks Brute Force Protections

Endpoint:
POST /api/users/login

Issue:
Login API allows unlimited repeated authentication attempts.

Risk:
Brute-force and password spraying exposure.

Detailed writeup:
findings/finding-03-brute-force-protection.md

## Finding 04 — Weak JWT Secret & Token Trust

Issue:
JWT uses fallback hardcoded secret and lacks strict validation.

Risk:
Token forgery → full account takeover.

Detailed writeup:
findings/finding-04-jwt-secret-misconfiguration.md

## Planned Work
- Add additional OWASP vulnerabilities (e.g., NoSQL Injection)
- Implement secure remediations in separate branch
- Compare vulnerable vs remediated versions

## Author
Nikhil Ankola