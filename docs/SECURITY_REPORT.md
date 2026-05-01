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
| 03 | Authentication Endpoint Lacks Brute Force Protections | Medium | Confirmed |
| 04 | Weak JWT Secret & Token Forgery Risk | High | Confirmed |

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

### Finding 03 — Authentication Endpoint Lacks Brute Force Protections

Description:
Backend login endpoint accepts unlimited authentication attempts without rate limiting or server-side lockout.

Impact:
- Brute-force attacks
- Password spraying
- Frontend lockout bypass

Detailed writeup:

[Finding 03 Report](findings/finding-03-brute-force-protection.md)

---

### Finding 04 — Weak JWT Secret & Token Trust
Description:
JWT implementation uses fallback secret and lacks strict validation.

Risk:
Token forgery → full authentication bypass.

[Finding 04 Report](findings/finding-04-jwt-secret-misconfiguration.md)

---

## Current Security Issues Confirmed
- Missing authorization control on user listing endpoint
- JWT stored insecurely in localStorage
- Missing backend brute-force protections
- Weak JWT secret handling and trust model

---

## Recommendations Summary

- Enforce authentication on all sensitive endpoints
- Store tokens securely (HttpOnly cookies)
- Implement rate limiting and lockout mechanisms
- Use strong JWT secrets with no fallback
- Add token validation and lifecycle management

---

## Disclaimer
This repository is an educational security assessment project intended to demonstrate secure coding review and web application testing methodology.