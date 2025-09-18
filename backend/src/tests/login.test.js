const request = require("supertest");
const app = require("../index"); // your Express app
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/auth/login", () => {
  it("should login an existing user with correct credentials", async () => {
    // hash the password before saving
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({ username: "testuser", password: hashedPassword });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with incorrect password", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({ username: "testuser", password: hashedPassword });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  it("should fail if username does not exist", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "nouser", password: "password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  it("should fail if fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser" }); // missing password

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});