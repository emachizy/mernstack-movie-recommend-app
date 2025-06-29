# MERN Stack Movie Recommendation App

![MERN Badge](https://img.shields.io/badge/MERN-4EAA25?style=for-the-badge&logo=mern&logoColor=white)
![Last Commit](https://img.shields.io/github/last-commit/emachizy/mernstack-movie-recommend-app?style=for-the-badge)

A full-stack movie recommendation application built with the MERN stack (MongoDB, Express, React, Node.js) that provides personalized movie suggestions based on user ratings.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Recommendation Algorithm](#recommendation-algorithm)
- [License](#license)

---

## 🌟 Features

- **Personalized Recommendations**
  - Hybrid recommendation engine (collaborative + content-based filtering)
  - Discover movies based on your rating history
- **User Management**
  - Secure JWT authentication
  - User registration/login functionality
  - Rating history tracking
- **Movie Database**
  - Browse movies by genre, year, and popularity
  - Detailed movie information pages
  - Rate movies on a 5-star scale
- **Modern UI/UX**
  - Responsive design with Material-UI components
  - Intuitive rating interface
  - Clean movie browsing experience

---

## 🛠️ Tech Stack

| Component  | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React, ContextApi, Material-UI, Axios      |
| Backend    | Node.js, Express.js, Mongoose, Bcrypt, JWT |
| Database   | MongoDB (MongoDB Atlas)                    |
| Deployment | Render/Vercel (Frontend), Render (Backend) |
| Tools      | Concurrently, Nodemon                      |

---

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/emachizy/mernstack-movie-recommend-app.git
   cd mernstack-movie-recommend-app
   ```

2. **Install dependencies**

   ```bash
   npm run install-all
   # Installs both client and server dependencies
   ```

3. **Environment Setup**

   Create a `.env` file in the `/server` directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Seed the database**

   ```bash
   cd server
   npm run seed
   ```

5. **Run the application**
   ```bash
   npm run dev
   # Starts both frontend (localhost:3000) and backend (localhost:5000)
   ```

---

## 📂 Project Structure

```
mernstack-movie-recommend-app/
├── client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/         # Context API calls
│   │   ├── pages/            # Application views
│   │   ├── App.js            # Main application component
│   │   └── index.js          # Entry point
│
├── server/                   # Express backend
│   ├── config/               # Database configuration
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Authentication and validation
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── seed/                 # Database seeding scripts
│   ├── server.js             # Server entry point
│   └── .env                  # Environment variables
│
├── .gitignore
└── package.json              # Root project configuration
```

---

## 🌐 API Endpoints

| Endpoint               | Method | Description                      |
| ---------------------- | ------ | -------------------------------- |
| `/api/users/register`  | POST   | Register new user                |
| `/api/users/login`     | POST   | Authenticate user                |
| `/api/movies`          | GET    | Get all movies                   |
| `/api/movies/:id`      | GET    | Get single movie details         |
| `/api/movies/rate`     | POST   | Submit movie rating              |
| `/api/recommendations` | GET    | Get personalized recommendations |

---

## 🔍 Recommendation Algorithm

The hybrid recommendation system combines:

- **Collaborative Filtering**

  - Finds users with similar rating patterns
  - Recommends movies liked by similar users

- **Content-Based Filtering**
  - Analyzes movie attributes (genre, director, actors)
  - Recommends movies similar to those the user rated highly

```javascript
// Simplified recommendation logic
function generateRecommendations(userId) {
  // 1. Find similar users
  const similarUsers = findSimilarUsers(userId);

  // 2. Get movies rated by similar users
  const similarMovies = getMoviesFromUsers(similarUsers);

  // 3. Filter by content similarity
  const contentFiltered = filterByContent(userId, similarMovies);

  // 4. Combine and rank recommendations
  return rankRecommendations(contentFiltered);
}
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Developed by emachizy**
_For educational purposes - clone and customize for your own projects!ERN Stack Movie Recommendation App_
