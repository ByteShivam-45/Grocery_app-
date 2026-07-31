# FreshMart Grocery App

A full-stack grocery shopping application where users can browse products, manage a cart, and place orders.

## Tech Stack

- **Frontend:** React + Vite (port 5173)
- **Backend:** Node.js + Express (port 3001)
- **Storage:** In-memory (resets on server restart)

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Start both backend and frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

## Features

- Browse 16 grocery products across 6 categories
- Filter products by category
- Add items to cart with stock validation
- Update quantities and remove items
- Checkout with name and delivery address
- Order confirmation with order ID

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/items` | Add to cart |
| PATCH | `/api/cart/items/:productId` | Update quantity |
| DELETE | `/api/cart/items/:productId` | Remove item |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Get order |

Cart sessions are tracked via the `X-Session-Id` header (stored in browser localStorage).

## Project Structure

```
grocery-app/
├── backend/          # Express API
├── frontend/         # React + Vite UI
└── package.json      # Root scripts
```
