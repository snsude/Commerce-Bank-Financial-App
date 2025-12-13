# ClariFi: Personal & Business Financial Management App

## 📌 Overview
ClariFi is a user-friendly financial tracking and goal-setting platform designed for both personal users and business teams. It provides an intuitive dashboard, AI-powered chat assistance, and powerful tools to manage expenses, set goals, and monitor financial progress.

---

## 🎯 Key Features
- **Personal & Business Dashboards** – Tailored views for individual and team financial tracking.
- **Goal Management** – Set, edit, and track financial goals with visual progress indicators.
- **Expense & Income Tracking** – Categorized spending insights with visual charts.
- **LLM-Powered Chat Assistant** – Get personalized financial advice and insights.
- **Secure User Management** – Account creation, profile editing, and password updates.
- **Multi-User Business Support** – Separate views for business admins and sub-users.

---

## 🚀 Getting Started

### System Requirements
- Personal Computer
- Node.js & npm (for frontend)
- Python 3.12.x (for backend)
- Ollama (for local LLM support)
- VS Code (recommended)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```

2. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. In a separate terminal, navigate to the backend folder and install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend folder with:
   ```
   SECRET_KEY=your_secret_key
   DATABASE_URL=your_database_url
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. Install Ollama and run the model:
   ```bash
   ollama run Ollama3
   ```

6. Start the frontend development server:
   ```bash
   cd frontend/src
   npm run dev
   ```

7. Open your browser and go to the localhost link displayed.

---

## 📖 How to Use ClariFi

### 1. Creating an Account
- Choose between **Personal** or **Business** account.
- Fill in required details (name, email, password).
- Confirm and proceed to login.

### 2. Logging In
- Enter credentials on the login screen.
- Access your personalized dashboard with:
  - Recent transactions
  - Expense breakdown (pie chart)
  - Goals overview

### 3. Using the Chat Assistant
- Click **Chat Assistant** in the left navigation bar.
- Choose from suggested prompts or type your own.
- Receive AI-generated financial insights based on your data.

### 4. Setting a Goal
- Navigate to **Goals** in the sidebar.
- Click **Create Goal** and enter:
  - Goal name
  - Target amount
  - Current saved amount (optional)

### 5. Editing Profile & Settings
- Go to **Settings** (bottom of sidebar).
- Update:
  - Display name
  - Email address
  - Password
  - Delete chat history (admin only)

---

## 👥 User Types
| Role            | Permissions                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| Personal User   | Manage personal expenses, goals, and chat history                           |
| Business Admin  | Full access to business dashboard, team goals, and chat deletion            |
| Business Sub-User | View business income/expenses and budget; limited chat permissions          |

---

## 🔒 Security Notes
- Passwords must meet complexity requirements.
- Chat deletion is permanent and restricted to admins.
- Session tokens expire after 30 minutes.

---

## 🛠️ Support
For issues or questions, refer to the full [ClariFi User Guide](./ClariFi%20User%20Guide.pdf) or contact support through the platform.

---

## 📄 License
© Team Nova, 2025. All rights reserved.

---

*ClariFi — Clarify your finances, achieve your goals.*
