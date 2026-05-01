![OWASP](https://img.shields.io/badge/OWASP-Top%2010-red)
![Security](https://img.shields.io/badge/Focus-Web%20Security-blue)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

# 🔐 DripShip Security Audit Lab

## 📌 Overview

This project is a **manual security assessment** of a MERN-based e-commerce application, focused on identifying and exploiting vulnerabilities aligned with the **OWASP Top 10**.

The goal is to simulate real-world attacker behavior, demonstrate exploitability, and document security risks with clear remediation strategies.

---

## 🚀 Key Highlights

* Identified multiple **critical security vulnerabilities**
* Demonstrated **real exploit scenarios**
* Performed **API-level testing using Postman**
* Analyzed **authentication and authorization flows**
* Produced structured **security audit reports**

---

## 🛠 Tech Stack

* MongoDB
* Express.js
* React.js
* Node.js
* JWT Authentication
* Postman (API testing)

---

## ⚠️ Security Findings

| ID | Finding                                    | Severity |
| -- | ------------------------------------------ | -------- |
| 01 | Broken Access Control (User Enumeration)   | High     |
| 02 | Insecure JWT Storage (Token Theft Risk)    | Medium   |
| 03 | Missing Server-Side Brute Force Protection | Medium   |
| 04 | Weak JWT Secret & Token Trust              | High     |

---

## 🧪 Exploitation Summary

This project demonstrates:

* 🔓 Unauthenticated access to sensitive user data
* 🔑 JWT token exposure via localStorage
* 🔁 Unlimited login attempts (no backend protection)
* 🧬 Ability to forge tokens if JWT secret is weak or exposed

---

## 📂 Repository Structure

```
findings/            Detailed vulnerability reports
screenshots/         Proof-of-concept evidence
backend/             Vulnerable backend application
src/                 Frontend application
SECURITY_REPORT.md   Consolidated audit report
```

---

## 📄 Detailed Reports

* Finding 01 → Broken Access Control
* Finding 02 → Insecure JWT Storage
* Finding 03 → Brute Force Vulnerability
* Finding 04 → Weak JWT Secret & Token Trust

(See `/findings` folder)

---

## 🧠 What This Project Demonstrates

* Security mindset (thinking like an attacker)
* Understanding of authentication flaws
* Practical OWASP Top 10 application
* Ability to document real vulnerabilities professionally

---

## ⚠️ Disclaimer

This project is created **strictly for educational purposes** to demonstrate web security concepts and should not be used for unauthorized testing.

---

## 👨‍💻 Author

**Nikhil Ankola**
