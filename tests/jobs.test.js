const request = require("supertest");
const app = require("../app");

describe("Jobs API", () =>
{
    test("Get all jobs", async () =>
    {
        const response = await request(app)
            .get("/api/jobs");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("Get job with invalid ID", async () =>
    {
        const response = await request(app)
            .get("/api/jobs/invalid-id");

        expect(response.statusCode).toBe(500);
        expect(response.body.success).toBe(false);
    });

    test("Create job without authentication", async () =>
    {
        const response = await request(app)
            .post("/api/jobs")
            .send({
                title: "Test Developer",
                description: "Test job description",
                company: "Test Company",
                location: "Islamabad",
                salary: 100000,
                category: "Backend"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test("Update job without authentication", async () =>
    {
        const response = await request(app)
            .put("/api/jobs/invalid-id")
            .send({
                title: "Updated Job"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });
});