# 💰 DuitKu - Personal Finance Tracker

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-2.89-3ECF8E?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> A modern, web-based Personal Finance Tracker designed to help users manage their income, expenses, and monthly budgets with real-time data visualization.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)

---

## 📖 Overview
**DuitKu** is a sleek financial management tool built to simplify how you track your money. By combining a powerful PostgreSQL backend with an interactive React frontend, this application provides users with immediate insights into their spending habits through visual charts and budget alerts.

---

## ✨ Key Features

### 🔐 Secure Authentication
- **User Management:** Secure Sign-In and Sign-Up powered by **Supabase Auth**.
- **Protected Routes:** Ensures that your financial data is only accessible to you.

### 📊 Financial Insights
- **Interactive Charts:** Visualizes spending by category using **Recharts** (Pie Charts).
- **Summary Cards:** Quick view of Total Balance, Total Income, and Total Expenses.
- **Transaction History:** A detailed list of all your past financial activities.

### 🎯 Budget Tracking
- **Budget Progress:** Monitor your spending against a set monthly limit with a dynamic progress bar.
- **Smart Alerts:** Automatically notifies you when your spending exceeds 90% of your allocated budget.

---

## 🛠️ Tech Stack

This project leverages a modern development stack for optimal performance and developer experience:

* **Frontend Framework:** React 19
* **Database & Auth:** Supabase (PostgreSQL)
* **Data Visualization:** Recharts
* **Styling:** Tailwind CSS & PostCSS
* **Icons:** Lucide React
* **Build Tool:** Vite
* **Routing:** React Router 7

---

## 📂 Project Structure

* **`src/pages/`**: Contains main view components like `Dashboard.jsx` and `Login.jsx`.
* **`src/components/`**: Modular UI elements including `ExpenseChart.jsx`, `TransactionList.jsx`, and `BudgetSection.jsx`.
* **`src/supabaseClient.js`**: Centralized configuration for Supabase connection.
* **`src/App.jsx`**: Main application logic and routing configuration.

---

Created with ❤️ by Syafa
