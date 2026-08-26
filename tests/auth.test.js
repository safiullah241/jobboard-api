const request = require("supertest");
const app = require("../app");

describe("Authentication API", () =>
{
    let email;

    beforeAll(() =>
    {
        email = `test${Date.now()}@example.com`;
    });

    test("Signup should create a user", async () =>
    {
        const response = await request(app)
            .post("/api/auth/signup")
            .send({
                name: "Test User",
                email,
                password: "123456",
                role: "user"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
    });

    test("Login should return a JWT token", async () =>
    {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "123456"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test("Login should reject wrong password", async () =>
    {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "wrongpassword"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test("Protected route should reject missing token", async () =>
    {
        const response = await request(app)
            .get("/api/auth/me");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });
});