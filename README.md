# Backend - Tour Booking Platform

## Overview
This is the backend of the Tour Booking Platform, built with Node.js and Express.js. It provides RESTful APIs to manage tour packages, handle user bookings, and process related data.

---

## Features
- API endpoints to manage tour packages.
- Booking functionality with proper data validation.
- Integration with a MongoDB database for data persistence.
- Error handling for invalid requests and server-side issues.
- Deployed on Vercel for seamless accessibility.

---

## Tech Stack
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM/ODM**: Mongoose
- **Environment Management**: dotenv
- **API Testing**: Postman

---

## Setup Instructions

### Clone the repository:
   
 
   git clone https://github.com/khadar-oothuru/The_Inceptioners_Backend

   cd The_Inceptioners_Backend

## Install dependencies:

npm install


## Configure the environment:
Create a .env file in the root folder with the following content:


MONGO_URI=<your-mongodb-connection-string>
PORT=5000
Replace <your-mongodb-connection-string> with your actual MongoDB connection string.

## Start the development server:

npm run dev  

## The backend server will be running at:


http://localhost:5000


## Deployed Backend URL:

https://the-inceptioners-backend.vercel.app/