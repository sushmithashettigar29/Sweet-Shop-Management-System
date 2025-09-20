# Sweet Shop Management System

This project is a full-stack Sweet Shop Management System, built as a TDD (Test-Driven Development) kata. It demonstrates skills in API development, database management, frontend implementation, and modern development workflows, including the responsible use of AI tools.

The application allows for the management of sweet inventory and provides a public-facing storefront for users to view and purchase sweets. It features a robust RESTful backend API and a modern Single-Page Application (SPA) frontend. The project was developed following a TDD mindset: tests were written for critical backend flows (auth, purchase, stock checks) prior to implementation.

Live Demo - [Live Project Link](https://sweet-ten.vercel.app/)

# Project Overview
This application is a small e-commerce-style Sweet Shop. Users can register and log in, browse sweets, search and filter sweets, and purchase sweets (which lowers stock and records purchases in the user's profile). Admin users can create, update, delete, and restock sweets via protected endpoints and an admin UI.

The project was developed following a TDD mindset: tests were written for critical backend flows (auth, purchase, stock checks) prior to implementation. See the test reports section for details.

# Features
- User registration and login (JWT authentication).
- Role-based access control (admin vs user).
- Add / Update / Delete sweets (admin).
- Get all sweets (public/protected depending on server config).
- Search sweets by name, category, and price range.
- Purchase sweets (quantity validated and decreased; purchase recorded on user).
- Restock sweets (admin).
- Responsive React SPA:

    - Views: Home, All Sweets, Sweet Detail, Profile, Admin Dashboard, Add Sweet, About, Contact.
    - Search and filter with instant (debounced) searching.
    - Purchase flow in Sweet Detail; disabled Purchase button if out of stock.
    - Admin UI for CRUD operations and restocking.
- Test coverage for backend endpoints (unit + integration / API tests).

# Tech Stack
- Backend: Node.js + Express
- Database: MongoDB (Atlas or local)
- Auth: JWT
- Frontend: React (Vite / Create React App — repo uses React app structure)
- Styling: Tailwind CSS (utility-first styling)
- HTTP client: axios
- Testing: Jest + Supertest (backend); React Testing Library / Jest (frontend)
- Version control & CI: GitHub (commits include AI co-author metadata where AI-assisted)
