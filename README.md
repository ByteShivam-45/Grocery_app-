# 🛒 FreshMart Grocery App

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</p>

<p align="center">

A modern **Full Stack Grocery Shopping Application** built using **React, Vite, Node.js, and Express** where users can browse products, manage carts, and place orders.

</p>

---

# ✨ Features

- 🛍️ Browse grocery products
- 📂 Category-wise filtering
- 🛒 Add & Remove products from cart
- ➕ Update product quantity
- 📦 Stock validation
- 💳 Checkout system
- 📍 Delivery address support
- ✅ Order confirmation page
- 🔄 Session based cart
- ⚡ Fast React + Vite frontend

---

# 🛠 Tech Stack

| Frontend | Backend | Storage |
|----------|----------|----------|
| React | Node.js | In-Memory |
| Vite | Express.js | Local Session |
| JavaScript | REST API | |

---

# 📁 Project Structure

```text
FreshMart/
│
├── backend/
│   ├── src/
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/ByteShivam-45/Grocery_app-.git
```

## Move into Project

```bash
cd Grocery_app-
```

## Install Dependencies

```bash
npm run install:all
```

## Run Project

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Product details |
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/items` | Add item |
| PATCH | `/api/cart/items/:productId` | Update quantity |
| DELETE | `/api/cart/items/:productId` | Remove item |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Get order |

---

# 🎯 Future Improvements

- ❤️ Wishlist
- 🔐 User Authentication
- 💳 Online Payment
- 🗄 Database Integration
- 👤 User Profiles
- 📱 Responsive Mobile UI
- 🔍 Product Search
- ⭐ Ratings & Reviews

---

# 📷 Screenshots

> Add screenshots here

```
Home Page
Cart Page
Checkout Page
Order Confirmation
```

---

# 👨‍💻 Author

**Shivam Bhardwaj**

[![GitHub](https://img.shields.io/badge/GitHub-ByteShivam--45-181717?style=for-the-badge&logo=github)](https://github.com/ByteShivam-45)

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.