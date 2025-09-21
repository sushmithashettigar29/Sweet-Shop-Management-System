# Sweet Shop Management System

This project is a full-stack **Sweet Shop Management System**, built as a **TDD (Test-Driven Development) kata**.  
It demonstrates skills in API development, database management, frontend implementation, and modern development workflows, including the responsible use of AI tools.

The application allows for the management of sweet inventory and provides a public-facing storefront for users to view and purchase sweets.  
It features a robust RESTful backend API and a modern Single-Page Application (SPA) frontend.

Live Demo 👉 [Sweet Shop on Vercel](https://sweet-ten.vercel.app/)

---

## 📖 Project Overview
This application is a small e-commerce-style Sweet Shop.

- Users can register and log in.
- Browse sweets, search & filter sweets.
- Purchase sweets (lowers stock & records purchases in profile).
- Admin users can **create, update, delete, and restock** sweets.

The project was developed following a **TDD mindset**:  
Tests were written for critical backend flows (auth, purchase, stock checks) **before** implementation.  
See the **Test Reports** section for details.

---

## ✨ Features

### User
- ✅ Register & Login (JWT authentication)
- ✅ View sweets
- ✅ Search/filter sweets (name, category, price range)
- ✅ Purchase sweets (with stock validation, purchase history stored in profile)

### Admin
- 🔑 Role-based access control (admin vs user)
- 🔑 Add / Update / Delete sweets
- 🔑 Restock sweets

### Frontend
- Built with **React + Tailwind CSS**
- Pages: `Home`, `All Sweets`, `Sweet Detail`, `Profile`, `Admin Dashboard`, `Add Sweet`, `About`, `Contact`
- Debounced searching & filtering
- Responsive SPA with clean UI
- Purchase flow (disabled when out of stock)

### Testing
- Jest + Supertest for backend
- React Testing Library for frontend
- High coverage for critical paths (auth, purchase, inventory)

---

## 🛠 Tech Stack
- **Backend:** Node.js + Express  
- **Database:** MongoDB (local / Atlas)  
- **Auth:** JWT  
- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **HTTP Client:** axios  
- **Testing:** Jest, Supertest, React Testing Library  
- **Deployment:** Vercel  
- **Version Control:** GitHub (AI co-author metadata where AI-assisted)  

---

## 📸 Screenshots
### Hero Section  
![Hero Section](/Screenshots/hero.png)

### Popular Sweets  
![Popular Sweets](/Screenshots/popular-sweets.png)

### About Us  
![About Us](/Screenshots/about-us.png)

### Why Us :
![Why Us](/Screenshots/why-us.png)

### Contact Us :
![Contact Us](/Screenshots/contactus.png)

### Footer :
![Footer](/Screenshots/footer.png)

### Login Page :
![Login page](/Screenshots/login.png)

### Sign Up :
![Sign Up](/Screenshots/signup.png)

### All Sweets :
![All Sweets](/Screenshots/all-sweets.png)

### Buy Sweets :
![Buy Sweets](/Screenshots/buy-sweet.png)

### Profile :
![Profile](/Screenshots/profile.png)

### Admin Dashboard :
![Admin Dashboard](/Screenshots/admin-dashboard.png)

### Add New Sweet :
![Add New Sweet](/Screenshots/add-new-sweet.png)

---

## 🏗 Architecture
High-level flow:
[React SPA] <--> [Express API (JWT auth, routes)] <--> [MongoDB]
- API endpoints live under /api/*.
-  Authentication middleware verifies JWT and injects req.user.
- Admin middleware checks req.user.role === 'admin'.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v16+ recommended) and npm or yarn
- MongoDB: either a local MongoDB instance or MongoDB Atlas (connection URI)
- Git


### Repository Structure (Top Level)
```
/ Sweet-Shop-Management-System
├─ backend/                # Express API
│  ├─ src/
│  └─ package.json
├─ frontend/               # React app 
│  ├─ src/
│  └─ package.json
└─ README.md        
```

### Environment Variables
Backend .env file
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/candycloud
JWT_SECRET=change_this_secret
NODE_ENV=development
JWT_EXPIRE=1d
ADMIN_USERNAME=username-here
ADMIN_PASSWORD=password-here
```

### Backend Setup & Run
```
# 1. cd into backend
cd backend

# 2. install dependencies
npm install

# 3. start in development (with nodemon)
npm run dev
```
The API will be available at http://localhost:5000

### Frontend Setup & Run
```
# 1. cd into frontend
cd frontend

# install frontend deps
npm install

# start frontend dev server
npm run dev 
```
open http://localhost:3000 (or whatever the dev server reports)

### API Reference / Endpoints
All endpoints prefixed with /api. Replace http://localhost:5000 with your API_URL.

### Auth
- **POST /api/auth/register** → Register user
- **POST /api/auth/login** → Login user
- **GET /api/auth/me** → Get current user (with purchases)

### Sweets (some endpoints protected — see middleware)
- **GET /api/sweets** → All sweets
- **GET /api/sweets/search?name=&category=&minPrice=&maxPrice=** → Search sweets
- **GET /api/sweets/:id** → Get sweet by ID
- **POST /api/sweets** → Admin add sweet
- **PUT /api/sweets/:id** → Admin update sweet
- **DELETE /api/sweets/:id** → Admin delete sweet

### Inventory / Actions
- **POST /api/sweets/:id/purchase** → Purchase sweet
- **POST /api/sweets/:id/restock** → Restock sweet (Admin only)

--- 

### 🗄 Database Schema
### User
```
{
  "username": "string",
  "password": "string",
  "role": "admin | user",
  "purchases": [
    {
      "name": "string",
      "price": "number",
      "quantity": "number",
      "image": "string",
      "total": "number",
      "date": "Date"
    }
  ]
}

```
### Sweet
```
{
  "name": "string",
  "category": "string",
  "price": "number",
  "quantity": "number",
  "image": "string"
}

```
---

## 🧪 Testing (TDD) & Test Reports
- The project follows Test-Driven Development principles. Backend tests typically cover:
- Auth flows (register / login / JWT)
- Protected routes (ensuring unauthorized access is blocked)
- Sweets CRUD endpoints (create / read / update / delete)
- Purchase flow (stock deduction, user purchase record)
- Search endpoint (filters and price-range)
### Run Backend Tests
```
cd backend
npm install
npm test
```
---

### 🌐 Deployment
Deployed via Vercel 👉 [Live Demo](https://sweet-ten.vercel.app/)

---


## 🤖 My AI Usage
This project used AI tools to help speed up scaffolding, brainstorming, debugging, and writing tests. I have been transparent about where AI assisted me and included co-author notes in relevant commits.
## Tools Used
- ChatGPT (OpenAI): This tool was used for backend development and project planning.
- Gemini (Google): This tool was used specifically for UI design.

## How I Used Them
- I used these AI tools as a co-pilot throughout the development process:
Project Planning and Backend Logic (ChatGPT): I leveraged ChatGPT to brainstorm the initial idea and plan the overall project architecture. It helped in drafting the API contract and endpoint structures, which laid the foundation for the backend. When implementing the backend logic, I used ChatGPT to generate boilerplate code and to help debug issues, such as interpreting Axios errors and suggesting fixes. For several test cases, I asked ChatGPT to propose edge cases and sample test code, which I then manually edited and ran locally.

- UI Design (Gemini): For the frontend, I used Gemini to brainstorm UI design ideas. It provided suggestions for layout, color schemes, and component styling, helping me create a visually appealing and user-friendly interface.

## Reflection on AI's Impact
AI tools significantly accelerated the initial development phase by handling repetitive and boilerplate tasks. This allowed me to focus my time and effort on the core business logic, testing, and refining the user experience. While AI provided the initial code and ideas, I was responsible for reviewing, modifying, and integrating the code to ensure it met project requirements and followed best practices. The final code and its functionality are my own work, augmented by these modern tools. I maintained transparency by including an AI co-author trailer in relevant commits, as documented in the project's commit history.

---

## Commit / Git Conventions & AI Co-authorship Example
Use small, focused commits with messages describing what and why. If you used AI for a commit, add the co-author trailer at the end of the commit message:
` Co-authored-by: <AI Tool Name> <AI@users.noreply.github.com>

Example commit (when using git commit -m):
```
feat: implement user register endpoint
Used ChatGPT to draft input validation and error handling. Adjusted logic and tests manually.
Co-authored-by: ChatGPT <chatgpt@openai.com>
```
