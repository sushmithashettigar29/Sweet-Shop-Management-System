# Sweet Shop Management System

This project is a full-stack Sweet Shop Management System, built as a TDD (Test-Driven Development) kata. It demonstrates skills in API development, database management, frontend implementation, and modern development workflows, including the responsible use of AI tools.

The application allows for the management of sweets inventory, including adding, updating, and deleting items. It also provides a public-facing storefront for users to view and purchase sweets, with a separate set of functionalities for administrative users.

### Core Features
## Backend API (RESTful)
- Technology: Built with Node.js and Express.js, connected to a MongoDB database.

- User Authentication: Secure token-based authentication (JWT) for user registration and login.

- API Endpoints:

    POST /api/auth/register: Register a new user.

    POST /api/auth/login: Log in and receive an authentication token.

    POST /api/sweets: Add a new sweet (Protected).

    GET /api/sweets: View all available sweets.

    GET /api/sweets/search: Search for sweets by name, category, or price range.

    PUT /api/sweets/:id: Update a sweet's details (Protected).

    DELETE /api/sweets/:id: Delete a sweet (Admin only).

    POST /api/sweets/:id/purchase: Purchase a sweet, decreasing its quantity (Protected).

    POST /api/sweets/:id/restock: Restock a sweet (Admin only).

## Frontend Application (SPA)
- Technology: Developed using React and TailwindCSS.

## Functionality:

    User registration and login forms.

    A dashboard displaying all available sweets.

    Search and filter functionality for sweets.

    A "Purchase" button that is automatically disabled when a sweet is out of stock.

    Administrative forms/UI for adding, updating, and deleting sweets.


### My AI Usage
I believe AI tools are an integral part of the modern software development lifecycle. I have used them responsibly and transparently throughout this project.

- Which AI tools were used?

    ChatGPT: Used for generating boilerplate code for backend logic, brainstorming the initial structure of API routes, and debugging specific issues.

    Gemini: Used for brainstorming and generating ideas for the frontend UI design, including color schemes, layout suggestions, and component styling.

- How were they used?

    I used ChatGPT to get a starting point for my controllers and services in the backend. I would then review, modify, and add my custom validation and business logic on top of the generated code. It helped accelerate the initial setup, allowing me to focus more on the core TDD cycle.

    I leveraged Gemini to explore various UI design patterns and to get CSS snippets for components like the sweet cards, search bar, and user forms. I iterated on its suggestions to create the final responsive and visually appealing design.

    My reflection on how AI impacted my workflow:

    AI significantly sped up the initial development phase, especially for routine tasks like setting up Express routes and designing CSS layouts.

    It allowed me to quickly prototype ideas and test different approaches without getting bogged down in boilerplate code.

However, the most critical part was my role in reviewing and refining the AI-generated code. I was always in control, ensuring the code was clean, followed best practices, and correctly implemented the project's specific requirements. AI served as a powerful co-pilot, but the final, well-tested code is my own work.