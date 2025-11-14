🏡 Real Estate Price Prediction

A Full-Stack Machine Learning Web Application using FastAPI, XGBoost, React, and Tailwind CSS

🌟 Overview

The Real Estate Price Prediction System is a full-stack, AI-driven web application designed to predict house prices based on key property features such as location, area (sq.ft), number of bedrooms, and amenities.

The project integrates a FastAPI backend with a trained XGBoost ML model, and a React + Tailwind CSS frontend to provide an interactive and user-friendly evaluation tool.

This system helps buyers, sellers, brokers, and investors make data-driven decisions by providing accurate, instant, and transparent price predictions through a modern UI.

📘 Table of Contents

Introduction

Key Features

Project Architecture

Tech Stack

Project Workflow

Installation & Setup

API Endpoints

Screenshots

Model Details

Results

Future Enhancements

Contributors

License

🧠 Introduction

Real estate pricing is often influenced by multiple unpredictable factors, making it difficult to estimate the true value of a property. Traditional appraisal methods rely heavily on broker experience, manual comparison, and subjective judgment — often leading to inconsistencies.

This project solves that problem by using machine learning regression techniques (XGBoost) trained on real housing datasets to predict accurate price estimates.
Combined with a clean and modern React UI, users can interact with the system effortlessly and obtain instant predictions.

✨ Key Features

✅ AI-Based Price Prediction using XGBoost
✅ FastAPI Backend for lightning-fast performance
✅ Responsive React + Tailwind UI
✅ Real-time Result Visualization
✅ REST API Endpoint for Integrations
✅ Model trained on structured property dataset
✅ Scalable architecture suitable for real-estate portals
✅ Modular Codebase (separate ML model, backend, and UI)

🏗️ Project Architecture
          ┌─────────────────────────┐
          │     User Interface      │
          │  (React + Tailwind CSS) │
          └─────────────▲──────────┘
                        │Axios
                        │HTTP Requests
                        ▼
           ┌────────────────────────┐
           │     FastAPI Backend    │
           │    (main.py + Uvicorn) │
           └─────────────▲──────────┘
                         │Model Input
                         ▼
           ┌────────────────────────┐
           │ Trained XGBoost Model  │
           │    (model.pkl via ML)  │
           └─────────────▲──────────┘
                         │Prediction
                         ▼
           ┌────────────────────────┐
           │   JSON Prediction API   │
           └────────────────────────┘

🧩 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

Vite

Backend

FastAPI

Python

Uvicorn

Pydantic

Machine Learning

XGBoost

Pandas

NumPy

Scikit-learn

Joblib

Tools

VS Code

Git & GitHub

Swagger UI (/docs)

🔄 Project Workflow

1️⃣ Data Collection & Cleaning
– Loaded dataset from Kaggle
– Handled missing values, encoding, normalization

2️⃣ Model Training
– Trained XGBoost Regressor
– Tuned hyperparameters
– Saved final model as model.pkl

3️⃣ Backend Development
– Built /predict endpoint in FastAPI
– Loaded model.pkl
– Processed JSON data → returned predicted price

4️⃣ Frontend Development
– Created UI with React + Tailwind
– Linked backend using Axios
– Displayed results using styled cards & components

5️⃣ Testing
– Unit testing for API
– Manual UI testing
– Swagger testing

6️⃣ Deployment (optional)
– Backend: Uvicorn / Render
– Frontend: Vercel / Netlify

⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/real-estate-price-prediction.git
cd real-estate-price-prediction

2. Backend Setup (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at:
👉 http://127.0.0.1:8000

Swagger Docs at:
👉 http://127.0.0.1:8000/docs

3. Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔌 API Endpoints
POST /predict

Predicts house price based on user input.

Request:
{
  "area": 1200,
  "bhk": 3,
  "bathrooms": 2,
  "location": "Mumbai"
}

Response:
{
  "predicted_price": 8450000
}

🖼️ Screenshots



Figure 1 — Homepage (React UI)
![Home Page](https://github.com/Scar-PG/Real-Estate-Final-Project/blob/72cf30feb92bd915bb2558cb41d8184384edad9a/Screenshot%202025-11-14%20134448.png)

Figure 2 — Prediction Form Interface

Figure 3 — Login/Profile Page

🤖 Model Details

Model Type: XGBoost Regressor

Input Features:

Area (sq.ft)

Location

BHK

Bathrooms

Amenities

Achieved low MAE & high prediction consistency

Exported using joblib.dump()

📊 Results

✔ Highly accurate predictions during testing
✔ Smooth and fast API response
✔ Strong integration between ML model and UI
✔ Clean, modern, responsive website

🚀 Future Enhancements

🔹 Power BI dashboard integration

🔹 Live real-estate market API integration

🔹 Google Maps heat-maps for location impact

🔹 Advanced algorithms (CatBoost, LightGBM)

🔹 User authentication & saved predictions

🔹 Admin dashboard for dataset retraining

👨‍💻 Contributors
Name	Role
Parth Goyal	Full Stack + ML Integration
Pukhraj Soni	Model Training + Backend
Guide: Mr. Vivek S. Parmar	Project Mentor
📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute with attribution.
