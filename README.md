# 🚀 BRUNT REVERSAL JUST-IN-TIME GLITCH – PROPHECY

## 📦 Project Overview

**BRUNT REVERSAL JUST-IN-TIME GLITCH – PROPHECY** is a QR Code-based Warehouse Management System developed using **Angular (Frontend)** and **Spring Boot (Backend)** with a **MySQL** database. This project facilitates streamlined warehouse operations through robust product management, real-time tracking, staff allocation, QR-based scanning, and issue reporting.

---

## 🛠️ Technologies Used

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | Angular                                   |
| Backend    | Spring Boot (REST APIs)                   |
| Database   | MySQL                                     |
| QR Code    | [qrcode](https://www.npmjs.com/package/qrcode) (installed via `npm install qrcode`) |
| Tools      | Visual Studio Code, Eclipse, Postman      |

---

## 🧑‍💻 How to Run the Project

### ✅ Backend Setup (Spring Boot)

1. Open Eclipse or IntelliJ.
2. Import the `warehouse-backend` folder as a Maven project.
3. Configure your database credentials in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/warehouse_management
    spring.datasource.username=YOUR_USERNAME
    spring.datasource.password=YOUR_PASSWORD
    ```
4. Create the database `warehouse_management` manually.
5. Import the provided `warehouse_management.sql` file to populate tables.
6. Run the application via `WarehouseManagementApplication.java`.

---

### ✅ Frontend Setup (Angular)

1. Open the `warehouse-frontend` folder in Visual Studio Code.
2. Run the following commands in terminal:
    ```bash
    npm install
    ng serve
    ```
3. Navigate to `http://localhost:4200` in your browser to view the application.

---

## 📂 Project Modules

### 👤 Admin Panel
- Login / Logout with tracking
- Add / View / Update / Delete Products
- Generate QR Codes for Products
- Assign Products to Staff
- Add / View / Update / Delete Staff
- View Low Stock Alerts
- View / Manage Product Issue Reports
- Download QR Code / Product Reports

### 👷 Staff Dashboard
- Login / Logout with tracking
- View Assigned Products
- Scan QR Code for Product Details
- Report Product Issues to Admin

---


## 🔐 Login Credentials (Example)

> Replace these with your own after deploying.

### Admin
- **Email:** `admin@gmail.com`
- **Password:** `admin123`

### Staff
- **Email:** `staff1@gmail.com`
- **Password:** `staff123`




