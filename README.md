# music-app
 test task: React, MUI, Express. 

!!!CLIENT INSTALLATION!!!
npm i --legacy-peer-deps

This project is a full-stack music application built with a Node.js/Express backend and a React frontend. The application allows users to search for songs, view song details, and manage their favorite songs after authentication.
Backend Architecture
Technology Stack

Framework: Express.js with TypeScript
Data Storage: JSON files (in-memory storage)
Authentication: JWT (JSON Web Tokens)

Core Components
1. Models
The backend implements three main models:

User: Stores user credentials and authentication data
Song: Represents music tracks with details like title, artist, album, etc.
Favorite: Maps relationships between users and their favorite songs
SearchHistory: Tracks user search queries

2. Services
Services handle the business logic and file operations:

UserService: User management and authentication
SongService: Song data management and searching
FavoriteService: Handling favorite songs operations
SearchHistoryService: Managing search history

3. Controllers
Controllers translate HTTP requests to service calls:

UserController: Handles user registration and login
SearchController: Processes song searches and search history
FavoriteController: Manages favorite song operations

4. API Endpoints

Authentication:

POST /api/users/register: Create new user account
POST /api/users/login: Authenticate user


Songs & Search:

GET /api/search: Search songs by query
GET /api/search/history: Get authenticated user's search history


Favorites:

GET /api/favorites: Get authenticated user's favorite songs
POST /api/favorites: Add song to favorites
DELETE /api/favorites/:songId: Remove song from favorites



5. Middleware

authMiddleware: Validates JWT tokens and protects routes that require authentication

Frontend Architecture
Technology Stack

Framework: React with TypeScript
UI Library: Material UI
State Management: React Context API and React Hooks
Routing: React Router
Form Handling: Formik with Yup validation
HTTP Client: Axios


Communication Between Frontend and Backend

REST API calls using Axios
JWT-based authentication
Frontend stores authentication token in localStorage