# Full Stack E-commerce Application

A modern e-commerce application built with Next.js, featuring user authentication, product management, shopping cart functionality, order processing, and revenue tracking.

## 🚀 Features

- **User Authentication**

  - Login and Registration system
  - Secure session management

- **Product Management**

  - Browse products catalog
  - View detailed product information
  - Dynamic product pages

- **Shopping Experience**

  - Add products to cart
  - Cart management
  - Seamless checkout process

- **Order Management**

  - View order history
  - Track order details
  - Real-time order status

- **Revenue Analytics**
  - Revenue history tracking
  - Top spenders analysis
  - Financial insights

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: Built-in React hooks
- **API Integration**: Custom API client
- **Code Quality**: ESLint

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/              # App Router
│   │   ├── (main)/       # Main application routes
│   │   │   ├── cart/     # Shopping cart page
│   │   │   ├── products/ # Product listing and details
│   │   │   ├── orders/   # Order management
│   │   │   └── revenue/  # Revenue analytics
│   │   ├── login/        # Authentication pages
│   │   └── register/     # User registration
│   │
│   ├── components/        # Reusable React components
│   │   ├── AddToCartButton.tsx
│   │   ├── CartList.tsx
│   │   ├── LoginForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── OrderDetails.tsx
│   │   ├── OrderList.tsx
│   │   ├── PlaceOrder.tsx
│   │   └── RegisterForm.tsx
│   │
│   ├── types/            # TypeScript type definitions
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── revenue.ts
│   │
│   └── utils/            # Utility functions
│       └── ApiClient.ts  # API communication layer
│
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🗂️ Key Directories Explained

### `/src/app`

Contains the main application routes using Next.js App Router. Each directory represents a route in the application:

- `(main)`: Groups main application features
- `cart`: Shopping cart functionality
- `products`: Product catalog and details
- `orders`: Order management system
- `revenue`: Revenue tracking and analytics
- `login/register`: Authentication pages

### `/src/components`

Houses reusable React components:

- `AddToCartButton.tsx`: Cart interaction
- `CartList.tsx`: Shopping cart display
- `LoginForm.tsx/RegisterForm.tsx`: Authentication forms
- `Navbar.tsx`: Navigation component
- `OrderDetails.tsx/OrderList.tsx`: Order management components
- `PlaceOrder.tsx`: Checkout component

### `/src/types`

TypeScript type definitions for:

- Cart functionality
- Order management
- Product data
- Revenue tracking

### `/src/utils`

Utility functions and services:

- `ApiClient.ts`: Handles API communication

## 🚦 Getting Started

- Create a `.env` file in the root directory with variables names same as `.env.sample`

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

## 🔧 Configuration

The project uses several configuration files:

- `next.config.ts`: Next.js configuration
- `eslint.config.mjs`: Code linting rules
- `postcss.config.mjs`: CSS processing
- `tsconfig.json`: TypeScript settings
