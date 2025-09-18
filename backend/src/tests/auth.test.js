const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const User = require("../models/User");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });

    expect(res.statusCode).toBe(201); // expect success
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body.user).toHaveProperty("username", "testuser");
  });

  it("should fail if username already exists", async () => {
    await User.create({ username: "testuser", password: "password123" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Username already exists");
  });

  it("should fail if password is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "newuser" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});