import request from "supertest";
import app from "../src/app";

jest.useFakeTimers();

describe("Message API", () => {
  const apiKey = "viceversa-secret-key";

  it("should return 401 without api key", async () => {
    const res = await request(app).get("/messages");
    expect(res.status).toBe(401);
  });

  it("should add a message", async () => {
    const res = await request(app)
      .post("/add-message")
      .set("x-api-key", apiKey)
      .send({
        user: "test@email.com",
        message: "Hello World",
      });

    expect(res.status).toBe(201);

    jest.advanceTimersByTime(1000);

    expect(res.body.user).toBe("test@email.com");
  });

  it("should list messages", async () => {
    const res = await request(app).get("/messages").set("x-api-key", apiKey);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should filter messages", async () => {
    await request(app)
      .post("/add-message")
      .set("x-api-key", apiKey)
      .send({ user: "unique@email.com", message: "findme" });

    const res = await request(app)
      .get("/messages?user=unique")
      .set("x-api-key", apiKey);

    expect(res.status).toBe(200);
    expect(res.body.data[0].user).toBe("unique@email.com");
  });
});
