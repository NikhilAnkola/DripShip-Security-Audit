# DripShip Security Audit Lab

## Overview
A security assessment project built on a MERN e-commerce application to study and demonstrate real-world web vulnerabilities based on OWASP Top 10 principles.

This project includes:
- Vulnerability discovery
- Exploitation proof-of-concepts
- Remediation implementations
- Security documentation

## Tech Stack
- MongoDB
- Express.js
- React
- Node.js
- JWT Authentication
- Postman (for API testing)
- Burp Suite (planned)

## Security Findings
- [x] Broken Access Control / User Enumeration
- [x] Insecure JWT Storage (Token Theft Risk)
- [x] Missing Server-Side Brute Force Protection
- [ ] IDOR (Planned)
- [ ] Additional findings TBD

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

## Planned Work
- Test IDOR in cart ownership logic
- Assess JWT trust boundary weaknesses
- Implement remediations in secure branch
- Compare vulnerable vs remediated versions
- Expand toward additional OWASP findings

## Author
Nikhil Ankola