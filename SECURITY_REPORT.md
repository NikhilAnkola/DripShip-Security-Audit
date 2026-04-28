# Security Assessment Report

## Project
DripShip Security Audit  
Security assessment of a MERN e-commerce application derived from my original DripShip project.

---

## Scope
Target:
DripShip MERN E-Commerce Application

Assessment Type:
Manual Web Application Security Review

Methodology:
Testing mapped loosely against:
- OWASP Top 10
- Authentication testing
- Authorization testing
- Basic API abuse testing

Out of Scope:
- Infrastructure testing
- Network exploitation
- Dependency CVE scanning
- Production deployment testing

---

## Findings Summary

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| 01 | User Enumeration via Broken Access Control | Medium-High | Confirmed |
| 02 | Insecure JWT Storage (Token Theft Risk) | Medium | Confirmed |
| 03 | Insecure Direct Object Reference (IDOR) | TBD | Planned |
| 04 | Hardcoded JWT Secret Fallback | TBD | Planned |

---

## Detailed Findings

### Finding 01 — User Enumeration via Broken Access Control
Description:
Unauthenticated users can query:

GET /api/users

and retrieve registered user metadata.

Impact:
- User enumeration
- Sensitive metadata exposure
- Potential support for future IDOR abuse

Detailed writeup:

[Finding 01 Report](findings/finding-01-user-enumeration-broken-access-control.md)

---

### Finding 02 — Insecure JWT Storage

Description:
JWT session tokens are stored in browser localStorage and are accessible to client-side JavaScript.

Impact:
- Session theft via XSS
- Token replay risk
- Account hijacking potential

Detailed writeup:

[Finding 02 Report](findings/finding-02-insecure-jwt-storage.md)

---

## Current Security Issues Confirmed
- Missing authorization control on user listing endpoint
- JWT stored insecurely in localStorage

---

## Planned Assessments
- IDOR testing against cart functionality
- Hardcoded JWT secret assessment
- Additional authorization checks

---

## Disclaimer
This repository is an educational security assessment project intended to demonstrate secure coding review and web application testing methodology.