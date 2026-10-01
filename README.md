# 🛒 FreshMart Grocery App

A full-stack grocery shopping application where users can browse products, manage dynamic cart sessions, and place orders.

## 📸 Project Preview

<p align="center">
  <img src="./preview.png" alt="FreshMart Grocery App Preview" width="900">
</p>

## 🚀 Tech Stack

- **Frontend:** React 18, Vite, React Router DOM
- **Backend:** Node.js, Express
- **Storage:** In-memory storage
- **API:** RESTful API
- **Session Management:** Browser LocalStorage (`X-Session-Id`)
- **Tooling:** Concurrently

## ✨ Features

- 🛍️ Browse 16 grocery products across 6 categories
- 🔎 Filter products by category dynamically
- 🛒 Cart management (add, update quantities, remove items)
- 📦 Live stock validation
- 💳 Checkout flow with customer details and address
- ✅ Instant order confirmation with generated order ID
- 🔐 Cart sessions tracked using `X-Session-Id` header
- 📱 Fully responsive layout

## ⚙️ How to Setup and Run

### Prerequisites
- Node.js (v18.11.0 or higher)
- Git

### Quick Run (Single Command)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ByteShivam-45/Grocery_app-.git
   cd Grocery_app-
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

- Frontend runs at: `http://localhost:5173`
- Backend runs at: `http://localhost:3001`

---

### Manual Run (Separate Terminals)

If you prefer running the backend and frontend separately:

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔌 API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint | Description | Headers / Body |
|---|---|---|---|
| GET | `/api/products` | Get all products | — |
| GET | `/api/products/:id` | Get single product by ID | — |
| GET | `/api/cart` | Get current cart | `X-Session-Id: <uuid>` |
| POST | `/api/cart/items` | Add item to cart | `{"productId": "...", "quantity": 1}` |
| PATCH | `/api/cart/items/:productId` | Update item quantity | `{"quantity": 2}` |
| DELETE | `/api/cart/items/:productId` | Remove item from cart | `X-Session-Id: <uuid>` |
| POST | `/api/orders` | Place an order | `{"customer": {...}, "address": {...}}` |
| GET | `/api/orders/:id` | Get order details | — |

> Cart sessions are tracked using the `X-Session-Id` header stored in browser LocalStorage.

## 📂 Project Structure

```text
Grocery_app-/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── package-lock.json
│   └── package.json
├── preview.png
├── package.json          # Root orchestrator script
├── package-lock.json
├── .gitignore
└── README.md
```

## 💾 Data Storage

The application currently uses **in-memory storage** for products, carts, and orders.
> Data will reset whenever the backend server is restarted.

## 🌐 Live Demo

- Live URL: `[https://your-live-url.vercel.app](https://your-live-url.vercel.app)`

## 👨‍💻 Author

**Shivam Bhardwaj**
- GitHub: [@ByteShivam-45](https://github.com/ByteShivam-45)