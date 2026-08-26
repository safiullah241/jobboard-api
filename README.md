# JobBoard API

A production-ready RESTful Job Board API built with **Node.js, Express.js, and MongoDB**. The API provides authentication, JWT authorization, role-based access control, job management, job applications, resume uploads, validation, rate limiting, automated testing, and API documentation.

## Live API

https://jobboardapi-tq77fijy.b4a.run

## GitHub Repository

https://github.com/safiullah241/jobboard-api

## Features

* User signup and login
* JWT-based authentication
* Protected routes
* Role-Based Access Control (RBAC)
* Admin and user roles
* Job CRUD operations
* Job search and pagination
* Job applications
* Resume upload using Multer
* DOCX resume support
* Cover letter validation
* Duplicate application prevention
* Request validation
* Authentication rate limiting
* MongoDB persistence with Mongoose
* Swagger/API documentation
* Automated Jest and Supertest tests
* Production deployment using Back4app Buildpacks

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* Joi
* express-rate-limit
* Jest
* Supertest
* Swagger
* dotenv
* CORS

## Project Structure

```text
jobboard-api/
├── config/
│   └── db.js
├── controllers/
├── docs/
├── middleware/
├── models/
├── routes/
├── tests/
├── validation/
├── app.js
├── server.js
├── swagger.js
├── package.json
├── package-lock.json
├── ARCHITECTURE.md
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/safiullah241/jobboard-api.git
cd jobboard-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the API

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Testing

Run the complete test suite:

```bash
npm test
```

Current test result:

```text
Test Suites: 3 passed, 3 total
Tests: 12 passed, 12 total
```

## Authentication

### Signup

**POST**

```text
/api/auth/signup
```

Example:

```json
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
```

### Login

**POST**

```text
/api/auth/login
```

Example:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

The login response provides a JWT token.

Use the token for protected endpoints:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Current User

**GET**

```text
/api/auth/me
```

Requires authentication.

## Roles and Permissions

### User

A regular user can:

* View jobs
* Search jobs
* Apply for jobs
* View protected user information

### Admin

An administrator can:

* Create jobs
* Update jobs
* Delete jobs
* Manage job listings

Unauthorized role access returns:

```text
403 Forbidden
```

Example:

```json
{
  "success": false,
  "message": "Forbidden: insufficient permissions"
}
```

## Job Endpoints

| Method | Endpoint        | Authentication | Access   |
| ------ | --------------- | -------------- | -------- |
| GET    | `/api/jobs`     | No             | Everyone |
| GET    | `/api/jobs/:id` | No             | Everyone |
| POST   | `/api/jobs`     | Yes            | Admin    |
| PUT    | `/api/jobs/:id` | Yes            | Admin    |
| DELETE | `/api/jobs/:id` | Yes            | Admin    |

## Job Search & Pagination

Example:

```text
GET /api/jobs?page=1&limit=5
```

The endpoint supports pagination for job listings.

## Job Applications

Authenticated users can apply for jobs.

**POST**

```text
/api/jobs/:jobId/apply
```

Use:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Request type:

```text
multipart/form-data
```

Fields:

| Field         | Type | Description              |
| ------------- | ---- | ------------------------ |
| `coverLetter` | Text | Applicant's cover letter |
| `resume`      | File | Applicant's DOCX resume  |

The API validates the cover letter and prevents duplicate applications.

Successful application:

```text
201 Created
```

## File Upload

Resume uploads are handled using **Multer**.

The expected multipart field name is:

```text
resume
```

Supported resume format:

```text
.docx
```

## Validation

The API validates incoming data before processing requests.

Validation is implemented for:

* User registration
* Login
* Jobs
* Applications
* Cover letters
* Uploaded resumes

Invalid requests return an appropriate client error response.

## Rate Limiting

Authentication endpoints use rate limiting to prevent excessive authentication attempts.

Configuration:

```text
10 requests per 15 minutes
```

The application is configured to trust the deployment proxy so forwarded client IP addresses can be handled correctly.

## Health Check

**GET**

```text
/health
```

Example response:

```json
{
  "status": "OK",
  "message": "JobBoard API is running"
}
```

## API Documentation

Swagger/API documentation is included in the project under:

```text
swagger.js
docs/
```

## Production Deployment

The API is deployed on **Back4app using Node.js Buildpacks**.

Production environment variables should be configured through the hosting platform rather than committed to GitHub.

The application uses:

```javascript
process.env.PORT || 3000
```

so the hosting platform can provide the production port.

## Security

* Passwords are hashed using bcryptjs
* JWT authentication protects private routes
* Role-based authorization protects admin operations
* Authentication endpoints are rate-limited
* Environment variables are stored outside source control
* Input validation is applied to API requests
* Uploaded files are validated

## Automated Test Coverage

The project includes automated tests for:

* Authentication
* Job endpoints
* Application endpoints
* Validation
* Authorization/RBAC

Final test result:

**3 test suites passed — 12 tests passed.**

## Production Verification

The deployed API has been manually verified for:

* Health check — `200 OK`
* User signup — `201 Created`
* User login — `200 OK`
* Protected `/me` route — `200 OK`
* Unauthorized RBAC action — `403 Forbidden`
* Job listing — `200 OK`
* Pagination — `200 OK`
* Job application with DOCX upload — `201 Created`

## Author

**Safiullah Asif**

Bachelor of Science in Computer Science

## License

This project is developed for educational and internship purposes.
