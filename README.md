🍔 Food-Del — MERN Food Delivery Web App

A full-stack MERN food delivery web application with ordering, payment integration, and an admin CRUD system for managing menu items and tracking orders.

🚀 [**Live Demo (Frontend)**] ( https://umbra-food-delivery-frontend.onrender.com )


🛠️ [**Live Demo (Admin Dashboard)**] ( https://umbra-fooddel-admin.onrender.com )

🚀 Features
👤 User Side (Frontend)

Browse food items by categories

Add/remove items from cart

Place orders with delivery address

Stripe integration for secure payments 💳

Track order status (Pending → Out for delivery → Delivered)

User authentication & order history

🛠️ Admin Side (Dashboard)

Add new food items with image,price & category

Update or delete food items (CRUD)

View all user orders

Update order status dynamically

⚙️ Backend (API)

RESTful API with Express

MongoDB with Mongoose models

JWT-based authentication

Stripe Checkout Session for payments

📂 Project Structure
food-del/
│
├── admin/ # React admin dashboard
│ ├── src/
│ │ ├── assets/ # Admin-specific icons/images
│ │ ├── components/ # Dashboard UI components
│ │ ├── pages/ # Admin pages (Orders, Add Food, Manage Food)
│ │ └── App.jsx # Admin entry point
│ └── package.json
│
├── backend/ # Node.js + Express backend
│ ├── config/ # Configuration files
│ │ └── db.js # MongoDB connection setup
│ ├── controllers/ # Order, food, user controllers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── middleware/ # JWT auth middleware
│ └── server.js # Backend entry point
│
├── frontend/ # React user-facing app
│ ├── src/
│ │ ├── assets/ # Images & icons
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Global state (Cart, Auth, etc.)
│ │ ├── pages/ # Pages (Home, Cart, Orders, Profile, etc.)
│ │ └── App.jsx # User app entry point
│ └── package.json
│
└── README.md

⚡ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/umbraobi/umbra-food-delivery.git
cd food-del

2️⃣ Backend Setup
cd backend
npm install

Create .env file in backend/ and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=4000

Run backend server:

npm run server

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

4️⃣ Admin Setup
cd admin
npm install
npm run dev

🔑 Sample Config (backend/config/db.js)
import mongoose from "mongoose";

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log("✅ MongoDB connected");
} catch (error) {
console.error("❌ MongoDB connection failed:", error.message);
process.exit(1);
}
};

export default connectDB;

🛣️ API Endpoints
User

POST /api/order/place → Place new order

POST /api/order/verify → Verify payment

POST /api/order/userorders → Get user’s orders

GET /api/order/list → List all orders (admin)

Admin

POST /api/food/add → Add new food item

POST /api/food/remove → Remove food item

GET /api/food/list → Get all foods

POST /api/order/status → Update order status

🔄 Step-by-Step Usage Flow

Here’s how the system works from User → Admin → User:

User Browses Menu

User opens the frontend and views available food items (fetched from backend).

User Adds to Cart

Items are added to cart using Context API for state management.

User Places Order

At checkout, the order details (items, amount, address) are sent to backend (/api/order/place).

Stripe Checkout session is created.

User Pays

Stripe opens a secure payment page.

On success → user redirected with success=true

On failure → user redirected with success=false.

Backend Verifies Payment

/api/order/verify updates the order in DB as payment: true or deletes if payment failed.

Admin Dashboard Shows Order

Admin logs into admin app.

Views list of all orders (/api/order/list).

Can update order status: Pending → Out for delivery → Delivered.

User Tracks Status

User checks My Orders page.

Status updates dynamically when Admin changes it.

🖥️ Tech Stack

Frontend: React, Context API, Axios

Admin: React (separate dashboard app)

Backend: Node.js, Express

Database: MongoDB + Mongoose

Payments: Stripe Checkout

Auth: JWT

🚀 Future Improvements

Add Paystack as alternative to Stripe

Add Delivery Partner app (driver view)

Push notifications on order updates

Product search and filtering

Dark mode support

License

This project is licensed under the MIT License.
You are free to use, modify, and distribute with attribution.

👨‍💻 Author

Developed by UMBRA OBI ✨
