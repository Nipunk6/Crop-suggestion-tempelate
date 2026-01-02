# 🌾 Agri Help – Smart Farming Assistance Platform for India

Agri Help is a full-stack web platform designed to empower Indian farmers with data-driven crop recommendations, plant disease detection, and access to expert support and government schemes. By combining machine learning, real-time weather data, and a modern web stack, Agri Help helps farmers make informed and profitable decisions based on their local conditions.

---

## 🚀 Features

### 🌱 Crop Recommendation System
- Predicts the most profitable crop based on:
  - Soil conditions (NPK values, pH, soil type)
  - Climate parameters (temperature, rainfall, humidity)
  - Land area and geographical location
- Automatically fetches climate data using OpenWeather API
- Farmer details are stored, so users do not need to fill the form repeatedly
- Stores previous crop recommendations for future reference
- Dynamic forms adaptable for different regions across India

---

### 🦠 Plant Disease Identification
- Detects plant diseases by uploading leaf images
- Uses a ResNet-based deep learning model implemented in PyTorch
- Image upload handled using Multer
- Images are securely stored on Cloudinary
- Cloudinary image URLs are sent to the ML service hosted on Render
- Gemini API integration provides:
  - Disease description
  - Preventive measures
  - Treatment and cure suggestions

---

### 💬 Farmer–Expert Support System
- Interactive chat system between farmers and experts/admins
- Personalized support for crop, soil, and disease-related issues
- MongoDB aggregation pipelines used to fetch and organize user-specific chats
- Secure and persistent chat history for each farmer

---

### 🏛 Government Schemes Portal
- Dedicated section listing useful government schemes for farmers
- Schemes displayed based on farmer profile, land size, and location
- Helps farmers discover benefits and subsidies they are eligible for

---

### 🔐 Authentication & Security
- Farmer registration with detailed profile information
- JWT-based authentication system
- Secure middleware for:
  - Token verification
  - Protected routes
  - Centralized error handling and validation

---

## 🛠 Tech Stack

### Frontend
- React (Vite Bundler)
- TypeScript (TSX)

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose ODM
- Aggregation Pipelines

### Machine Learning
- ResNet model for plant disease detection (PyTorch)
- Custom-trained crop recommendation model
- ML services hosted on Render

### APIs & Services
- OpenWeather API (real-time weather data)
- Gemini API (AI-powered disease insights)
- Cloudinary (image storage)
- Multer (image upload handling)

---

## 🔄 System Workflow

1. Farmer registers and provides details such as location, land area, and soil information.
2. Backend fetches real-time weather data using OpenWeather API based on location.
3. Combined data is sent to the ML model through Express APIs.
4. The ML model predicts the most suitable and profitable crop.
5. Prediction results are stored and can be revisited anytime by the farmer.
6. For disease detection:
   - Farmer uploads plant images.
   - Images are stored on Cloudinary.
   - ML model predicts the disease.
   - Gemini API generates additional insights and recommendations.
7. Farmers can chat with experts or browse relevant government schemes.

---

## 📁 Project Structure (High Level)

agri-help/
│
├── frontend/        # React + Vite + TypeScript
├── backend/         # Express.js server
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   ├── middleware/  # Auth & error handling
│
├── ml-services/
│   ├── crop-model/     # Crop recommendation model
│   ├── disease-model/ # ResNet-based disease detection
│
└── README.md

---

## 🌍 Target Audience
- Indian farmers
- Agricultural experts
- Agri-tech organizations
- NGOs and government agriculture initiatives

---

## 📈 Future Enhancements
- Multi-language support (Hindi and regional languages)
- Crop market price prediction
- Offline SMS-based recommendations
- Mobile application support
- IoT-based real-time soil data integration

---

## 🤝 Contributors
This project is developed as a group project with the goal of using technology to improve agricultural decision-making and farmer livelihoods in India.

---

