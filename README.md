# 🤖 Compatriot-AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Next.js](https://img.shields.io/badge/Next.js-15-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Stripe](https://img.shields.io/badge/Stripe-API-blue)

> 🚀 **Live Demo**: [compatriot-ai.vercel.app](https://compatriot-ai.vercel.app)

## 🧠 Overview

**Compatriot-AI** is an AI-powered companion application built with the latest web technologies. It integrates advanced AI capabilities to provide users with intelligent interactions, seamless experiences, and robust functionalities.

## 🔧 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React 18](https://reactjs.org/), [Tailwind CSS 3.3](https://tailwindcss.com/)
- **Backend**: [Prisma 5.0](https://www.prisma.io/), [MySQL 8.0](https://www.mysql.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Payments**: [Stripe API](https://stripe.com/docs/api)
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

Compatriot-AI/
├── prisma/ # Prisma schema and migrations
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js app directory
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utility functions and libraries
│ ├── styles/ # Global styles
│ └── pages/ # Application pages
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json

markdown
Copy
Edit

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- MySQL >= 8.0
- Stripe Account (for payment integration)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/garg-shiv/Compatriot-AI.git
   cd Compatriot-AI
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Set up environment variables:

Create a .env file in the root directory and add the following:

env
Copy
Edit
DATABASE_URL="mysql://user:password@localhost:3306/compatriot_ai"
NEXTAUTH_SECRET="your_nextauth_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_PUBLIC_KEY="your_stripe_public_key"
Run database migrations:

bash
Copy
Edit
npx prisma migrate dev --name init
Start the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to view the application.

🧪 Features
AI-Powered Interactions: Engage with intelligent AI companions.

User Authentication: Secure login and registration using NextAuth.js.

Payment Integration: Seamless transactions via Stripe.

Responsive Design: Optimized for all devices with Tailwind CSS.

Database Management: Efficient data handling with Prisma and MySQL.

📸 Screenshots
Coming soon...

🧑‍💻 Author
Shivanshu Garg – GitHub

📄 License
This project is licensed under the MIT License.

