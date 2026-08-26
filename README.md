# JobBoard API

A production-ready RESTful backend API for a job board platform built with Node.js, Express, and MongoDB.

## Features

- User registration and login
- JWT authentication
- Role-based access control
- Employer job management
- Job applications
- Resume file uploads
- Input validation
- Consistent error handling
- Pagination
- Job search
- Job filtering
- Rate limiting
- MongoDB persistence
- Integration testing
- Postman API documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Joi
- Multer
- express-rate-limit
- Jest
- Supertest
- Postman

## User Roles

### User

Users can:

- Register and login
- Browse jobs
- Search jobs
- Filter jobs
- Apply for jobs
- Upload resumes
- View their applications

### Employer

Employers can:

- Register and login
- Create jobs
- View jobs
- Update their own jobs
- Delete their own jobs
- View applications for their jobs
- Accept or reject applications

## API Endpoints

### Authentication

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |

### Jobs

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/jobs` | Public |
| GET | `/api/jobs/:id` | Public |
| POST | `/api/jobs` | Employer |
| PUT | `/api/jobs/:id` | Employer |
| DELETE | `/api/jobs/:id` | Employer |

### Applications

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/jobs/:id/applications` | User |
| GET | `/api/applications/my` | User |
| GET | `/api/jobs/:id/applications` | Employer |
| PATCH | `/api/applications/:id/status` | Employer |

### Health

| Method | Endpoint | Access |
|---|---|---|
| GET | `/health` | Public |

## Search and Filtering

Jobs support:

```text
GET /api/jobs?search=node
GET /api/jobs?location=Islamabad
GET /api/jobs?category=Backend

Pagination:

GET /api/jobs?page=1&limit=10

Parameters can also be combined:

GET /api/jobs?search=node&location=Islamabad&page=1&limit=5
Authentication

After login, the API returns a JWT token.

Protected endpoints require:

Authorization: Bearer YOUR_TOKEN
File Uploads

Applicants can upload:

PDF
DOC
DOCX

Maximum file size:

5 MB

Uploaded resumes are stored in:

/uploads
Validation

The API validates incoming data before processing requests.

Invalid requests return appropriate HTTP status codes and error messages.

Error Handling

The API uses consistent JSON responses.

Example:

{
  "success": false,
  "message": "Authentication required"
}
Rate Limiting

Authentication endpoints are protected by rate limiting.

Limit:

10 requests per 15 minutes

This helps protect login and signup endpoints from excessive requests.

Testing

The project uses:

Jest
Supertest

Run tests with:

npm test

Current test coverage includes:

Authentication
Protected routes
Job endpoints
Application endpoints
Authorization failures

Current integration tests:

12 passing
Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Enter the project:

cd jobboard-api

Install dependencies:

npm install

Create a .env file:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start development server:

npm run dev

Start production server:

npm start
Project Structure
jobboard-api/
│
├── controllers/
│   ├── authController.js
│   ├── jobController.js
│   └── applicationController.js
│
├── middleware/
│   ├── auth.js
│   ├── role.js
│   └── upload.js
│
├── models/
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── routes/
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
│
├── tests/
│   ├── auth.test.js
│   ├── jobs.test.js
│   ├── applications.test.js
│   └── setup.js
│
├── docs/
│   └── Postman_Collection.json
│
├── uploads/
│
├── app.js
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
Architecture

The application follows a layered architecture:

Client
   ↓
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Models
   ↓
MongoDB
Routes

Define API endpoints and connect requests to controllers.

Middleware

Handles:

Authentication
Authorization
File uploads
Rate limiting
Controllers

Contain business logic and API responses.

Models

Define MongoDB schemas using Mongoose.

Architecture Decisions
MongoDB

MongoDB was selected because job and application data are naturally represented as documents and relationships can be handled using ObjectId references.

JWT

JWT provides stateless authentication for protected API endpoints.

Role-Based Access Control

RBAC separates permissions between users and employers and prevents unauthorized operations.

Multer

Multer handles multipart/form-data requests for resume uploads.

Pagination

Pagination reduces the amount of data returned in large job listings.

Rate Limiting

Rate limiting reduces abuse of authentication endpoints.

API Documentation

The Postman collection is available at:

docs/Postman_Collection.json

Import the collection into Postman to test the API.

Environment Variables

Never commit .env to GitHub.

Required variables:

PORT
MONGODB_URI
JWT_SECRET
Future Improvements

Possible future improvements include:

Email notifications
Cloud file storage
Redis caching
Background job processing
Docker
CI/CD pipeline
Advanced employer dashboards
Job recommendations
Author

Safiullah Asif

License

This project is created as a capstone backend development project.


### Save it

```text
Ctrl + S

Then run:

git status