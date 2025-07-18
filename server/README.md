# E-Commerce Backend Server

A robust Express.js TypeScript server with MongoDB and PostgreSQL integration for e-commerce applications.

## 🚀 Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Order processing
- Category management
- Revenue tracking
- Dual database support (MongoDB and PostgreSQL)
- TypeScript support
- Secure middleware implementation

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── config.ts     # App configuration
│   │   ├── mongodb.ts    # MongoDB connection
│   │   └── postgres.ts   # PostgreSQL connection
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── public/              # Static files
└── package.json         # Project dependencies
```

## 🛠️ Technologies Used

- Node.js & Express.js
- TypeScript
- MongoDB (Mongoose)
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing
- CORS enabled

## 🔧 Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   POSTGRES_CONNECTION_STRING=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📚 Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server
- `npm run build`: Build TypeScript code
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting
- `npm test`: Run tests

## 🛣️ API Routes

### Authentication Routes (`/auth`)

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### User Routes (`/user`)

- `POST /user` - Create new user
- `GET /user/:id` - Get user by ID
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Product Routes (`/product`)

- `POST /product` - Create product
- `GET /product/list` - Get all products
- `GET /product/:id` - Get product by ID
- `PUT /product/:id` - Update product
- `DELETE /product/:id` - Delete product

### Category Routes (`/category`)

- `GET /category/list` - Get all categories
- `GET /category/:id` - Get category by ID
- `POST /category` - Create category
- `PUT /category/:id` - Update category
- `DELETE /category/:id` - Delete category

### Cart Routes (`/cart`)

- `POST /cart` - Create cart
- `GET /cart/list` - Get user's cart list
- `POST /cart/add` - Add product to cart
- `POST /cart/remove` - Remove product from cart
- `DELETE /cart/clear` - Clear cart

### Order Routes (`/order`)

- `POST /order/place-order` - Place new order
- `GET /order/list` - Get order list
- `GET /order/:id` - Get order by ID
- `DELETE /order/:id` - Delete order

### Order Item Routes (`/order-item`)

- `POST /order-item` - Create order item
- `GET /order-item/:id` - Get order item by ID
- `GET /order-item/order/:orderId` - Get order items by order ID
- `PUT /order-item/:id` - Update order item
- `DELETE /order-item/:id` - Delete order item

### Revenue Routes (`/revenue`)

- `GET /revenue/last-7-days-revenue` - Get last 7 days revenue
- `GET /revenue/top-spenders` - Get top spenders list

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## 🛡️ Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Helmet security middleware
- CORS protection
- Environment variables for sensitive data

## 📝 Error Handling

The API implements a standardized error handling mechanism with appropriate HTTP status codes and error messages.
