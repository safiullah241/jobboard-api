const request = require("supertest");
const app = require("../app");

describe("Applications API", () =>
{
    test("Get my applications without authentication", async () =>
    {
        const response = await request(app)
            .get("/api/applications/my");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test("Submit application without authentication", async () =>
    {
        const response = await request(app)
            .post("/api/jobs/invalid-id/applications")
            .send({
                coverLetter: "I am interested in this position."
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test("Get job applications without authentication", async () =>
    {
        const response = await request(app)
            .get("/api/jobs/invalid-id/applications");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test("Update application status without authentication", async () =>
    {
        const response = await request(app)
            .patch("/api/applications/invalid-id/status")
            .send({
                status: "accepted"
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });
});