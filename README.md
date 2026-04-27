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

## Security Findings (In Progress)
- [x] Broken Access Control / Information Disclosure
- [ ] JWT Forgery
- [ ] IDOR
- [ ] NoSQL Injection
- [ ] Additional findings TBD

## Repository Structure

```text
findings/            Individual vulnerability writeups
screenshots/         Evidence and proof-of-concepts
SECURITY_REPORT.md   Consolidated security report
backend/             Application backend
src/                 Frontend
```

## Current Finding
### Finding 01 — Unauthenticated User Enumeration
Endpoint:

GET /api/users

Issue:
Users can be enumerated without authentication.

Status:
Documented, exploitation validated.

Detailed writeup:
See:
`findings/finding-01-broken-access-control.md`

## Planned Work
- Exploit JWT trust issues
- Test IDOR through cart functionality
- Attempt NoSQL injection
- Implement secure fixes
- Compare vulnerable vs remediated versions

## Author
Nikhil Ankola