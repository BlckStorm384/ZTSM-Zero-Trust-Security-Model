# 🔒 ZTSM - Zero Trust Security Model

A Node.js application implementing a **Zero Trust Security Model** using **AWS IAM**, **MFA Authentication**, and **Role-Based Access Control (RBAC)**.

> "Never trust, always verify." — Zero Trust Principle

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | Backend server |
| AWS IAM | Role-based access control |
| MFA (Speakeasy) | Multi-factor authentication |
| HTML + CSS | Frontend login & dashboard pages |

---

## 🔐 Features

- ✅ User authentication with email & password
- ✅ Multi-factor authentication (MFA) using TOTP
- ✅ AWS IAM roles fetched and enforced
- ✅ Role-based access control (Admin & User)
- ✅ Protected routes — only verified users can access
- ✅ Admin dashboard blocked for regular users

---

## ⚙️ How to Run

### 1. Clone the repository
```bash
git clone https://github.com/BlckStorm384/ZTSM-Zero-Trust-Security-Model.git
cd ZTSM-Zero-Trust-Security-Model
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
AWS_REGION=us-east-1
PORT=3000
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

### 4. Run the server
```bash
node index.js
```

### 5. Open in browser
```
http://localhost:3000/index.html
```

---

## 👤 Test Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@ztsm.com | Admin@1234 |
| User | user@ztsm.com | User@1234 |

---

## 🔄 How It Works

```
User enters email & password
        ↓
✅ Credentials verified
        ↓
📱 MFA code generated & verified
        ↓
🛡️ IAM role assigned (admin/user)
        ↓
🔐 Access granted to authorized resources only
```

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login%20page.png)

### MFA Verification
![MFA](screenshots/MFA%20codes%20generated%20for%20every%20login.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin%20login%20dashboard.png)

### User Dashboard
![User Dashboard](screenshots/user%20login%20dashboard.png)

### Access Denied
![Access Denied](screenshots/admin%20dashboard%20not%20accessible%20for%20user.png)

---

## ☁️ AWS IAM Setup

- Created **ztsm-admin-role** with AdministratorAccess policy
- Created **ztsm-user-role** with ReadOnlyAccess policy
- Created **ztsm-app-user** with IAMReadOnlyAccess to connect Node.js to AWS

---

## 📄 License

This project is for educational purposes.
