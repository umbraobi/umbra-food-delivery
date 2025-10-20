# 🍔 Umbra Food Delivery (MERN)

Full-stack food delivery web application with a React user app, React admin dashboard, and an Express + MongoDB backend. Features ordering, Stripe payments, JWT auth, and an admin CRUD for menu items and orders.

## ⚡ Highlights

- User-facing React app (frontend) with cart, checkout and order history
- Admin React dashboard (admin) to manage food items and update orders
- Backend REST API (backend) using Express + Mongoose
- Stripe Checkout integration for payments

## Project structure

```
admin/      # React admin dashboard
backend/    # Express API server
frontend/   # React user-facing app
README.md   # This file
```

High level responsibilities

- `backend/` — API, auth, database models, Stripe integration
- `frontend/` — user app (Home, Cart, PlaceOrder, MyOrders)
- `admin/` — admin dashboard (Add food, List foods, Orders)

## Quick start

Requirements: Node.js (16+ recommended), npm, a MongoDB database, Stripe account (for payments).

1. Clone

```powershell
git clone https://github.com/umbraobi/umbra-food-delivery.git
cd umbra-food-delivery
```

2. Backend

```powershell
cd backend
npm install
```

Create a `.env` file in `backend/` with these variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=4000
```

Start the backend (uses nodemon):

```powershell
npm run server
```

3. Frontend (user app)

```powershell
cd ../frontend
npm install
npm run dev
```

Open the URL shown by Vite (commonly http://localhost:5173).

4. Admin dashboard

```powershell
cd ../admin
npm install
npm run dev
```

Open the admin app URL shown by Vite.

## Screenshots

Add screenshots to `docs/screenshots/` (create the folder if it doesn't exist). Example files used here:

- `docs/screenshots/home-hero.png` — hero section
- `docs/screenshots/menu-cards.png` — menu / cards section

You can copy the two images you attached into that folder. To embed them in GitHub, they should be committed to the repo. Example Markdown to include an image:

```markdown
![Home hero](docs/screenshots/home-hero.png)
![Menu cards](docs/screenshots/menu-cards.png)
```

## Available scripts

- backend: `npm run server` (runs `nodemon server.js`)
- frontend: `npm run dev` (Vite dev server)
- admin: `npm run dev` (Vite dev server)

## Configuration

Backend expects these env vars (in `backend/.env`):

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `STRIPE_SECRET_KEY` — Stripe secret key for creating Checkout Sessions
- `PORT` — backend port (default 4000)

If you don't want to use Stripe while developing, mock or stub payment-related calls in the backend controllers.

## API overview

Note: This is a high-level summary. Inspect `backend/routes` and `backend/controllers` for exact request/response shapes.

User endpoints (examples):

- POST /api/order/place — create an order and start Stripe checkout session
- POST /api/order/verify — webhook/endpoint to confirm payment and finalize order
- POST /api/order/userorders — returns orders for authenticated user

Admin endpoints (examples):

- GET /api/food/list — list all food items
- POST /api/food/add — add a food item (admin)
- POST /api/food/remove — remove a food item (admin)
- GET /api/order/list — list all orders (admin)
- POST /api/order/status — update order status

Authentication: protected endpoints use JWT. See `backend/middleware/auth.js`.

## Development notes

- The frontend and admin apps use React + Vite. They run on separate dev servers and communicate with the backend API via Axios.
- File uploads (food images) use `multer` in the backend and are stored under `backend/uploads`.
- MongoDB models are in `backend/models`.

## Testing & Linting

- Frontend and admin include ESLint configs; run `npm run lint` in the respective folders.

## Troubleshooting

- If the backend can't connect to MongoDB, verify `MONGO_URI` and that your MongoDB instance accepts connections.
- If Stripe payments fail, check `STRIPE_SECRET_KEY` and ensure webhook/redirect URLs are configured if using Checkout webhooks.

## Future improvements

- Add alternative payment providers (Paystack)
- Add driver/delivery partner app
- Push notifications for order updates
- Search filters
 - Add social login (Google Sign-In) so users can create accounts using their Google account. (Currently users register with email, password and name.)


## License

MIT

## Author

Developed by UMBRA OBI
