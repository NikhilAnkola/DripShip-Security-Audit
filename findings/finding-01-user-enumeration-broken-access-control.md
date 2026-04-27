# Finding 01 — Broken Access Control

## Severity
Medium-High

## Risk Summary
Confidentiality: High  
Integrity: Low  
Availability: None

## Category
OWASP Broken Access Control

## Endpoint
GET /api/users

## Description
The endpoint exposes all registered users without authentication.

No JWT is required.

## Proof of Concept

Request:

GET http://localhost:5000/api/users

Result:
User names, usernames, emails, cart data, and IDs are disclosed.

## Impact
An attacker can:

- Enumerate users
- Harvest user IDs
- Support later IDOR attacks
- Leak sensitive metadata

## Root Cause

Route lacks authentication middleware protection.

Current vulnerable implementation:

```javascript
router.get('/', async (req,res) => {
```

Expected secure pattern:

```javascript
router.get('/', verifyToken, async (req,res) => {
```

## Evidence

### 1. Route lacks authentication middleware
![Route Missing Authentication](../screenshots/f1-route-without-auth.png)

---

### 2. Unauthenticated user enumeration
![API Response Exposure](../screenshots/f1-unauthenticated-api-response.png)

---

### 3. Sensitive data disclosure impact
![Exposed User Data](../screenshots/f1-exposed-user-data-impact.png)

## Remediation (Planned)
- Protect endpoint using JWT authentication middleware
- Restrict user listing to admin roles only
- Apply least privilege access control
- Return only current authenticated user data when possible