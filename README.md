# FundNest

FundNest is a user management and startup tracking platform that allows users to create, manage, and explore startups. It features authentication, startup management, financial transactions, and order tracking.

## Features

- **User Authentication** (Sign up, Login, Logout)
- **Startup Management** (Create, Edit, View, and List Startups)
- **Cloudinary for Image Storage**
- **Mongoose ORM with MongoDB**
- **Mailtrap for Email Notifications**
- **Secure API Endpoints**
- **Add Money to Account**
- **View Share Prices and Available Quantities**
- **Buy Shares**
- **Order Page to Track User's Purchase History**

## Tech Stack

### **Frontend:**

- Next.js
- Tailwind CSS
- React.js

### **Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose as ORM)
- Cloudinary (for image storage)
- Mailtrap (for email notifications)

## 📂 Project Structure

```
FundNest/
│── src/               # src folder
│      |── app/        # app file
|           │──(root)  #Forntend Router
|           │──api     #Backend Api
│── .env               # Environment variables
│── package.json       # Dependencies
│── README.md          # Project documentation
```

## ⚙️ Setup and Installation

### **1. Clone the repository**

```bash
 git clone https://github.com/DikshantJatrana/User_Management.git
 cd User_Management
```

### **2. Install dependencies**

#### **Backend**

```bash
 cd backend
 npm install
```

#### **Frontend**

```bash
 cd frontend
 npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the **backend** folder and add the following:

```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
JWT_SECRET=your_jwt_secret
```

### **4. Run the Project**

#### **Backend**

```bash
npm start
```

#### **Frontend**

```bash
npm run dev
```

## 📌 API Endpoints

### **User Authentication**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/profile` - Fetch user profile with populated orders and startups

### **Startup Management**

- `POST /api/startup/create` - Create a new startup
- `GET /api/startup/:id` - Fetch a single startup by ID
- `GET /api/startups` - Fetch all startups
- `PUT /api/startup/:id` - Edit an existing startup

### **Financial Transactions**

- `POST /api/user/add-money` - Add money to user's balance

### **Orders and Share Management**

- `POST /api/orders/create/:id` - Buy shares from a startup
- `GET /api/orders/user/:id` - Fetch all orders made by a user

## 📩 Email Notifications (Mailtrap)

Mailtrap is used for sending emails, such as **verification emails** and **notifications**.

## 💡 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 📜 License

This project is licensed under the **MIT License**.

---

Made with ❤️ by [Dikshant Jatrana](https://github.com/DikshantJatrana)
