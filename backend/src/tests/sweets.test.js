const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Sweet = require("../models/Sweet");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");

let mongoServer;
let adminToken, userToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Create test users
  const adminPassword = await bcrypt.hash("adminpass", 10);
  const userPassword = await bcrypt.hash("userpass", 10);

  const admin = await User.create({
    username: "admin",
    password: adminPassword,
    role: "admin",
  });

  const user = await User.create({
    username: "user",
    password: userPassword,
    role: "user",
  });

  // Generate JWT tokens with role included
  adminToken = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  userToken = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

//
// ADMIN ROUTES
//
describe("POST /api/sweets", () => {
  it("should allow admin to add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Chocolate", category: "Candy", price: 10, quantity: 50 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Sweet added successfully");
    expect(res.body.data).toHaveProperty("name", "Chocolate");
  });

  it("should deny access if user is not admin", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Candy", category: "Sugar", price: 5, quantity: 20 });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error", "Admin access required");
  });
});

//
// USER ROUTES
//
describe("GET /api/sweets", () => {
  it("should return all sweets", async () => {
    await Sweet.create([
      { name: "Chocolate", category: "Candy", price: 10, quantity: 50 },
      { name: "Lollipop", category: "Candy", price: 2, quantity: 100 },
    ]);

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });
});

describe("GET /api/sweets/search", () => {
  beforeEach(async () => {
    await Sweet.create([
      { name: "Chocolate", category: "Candy", price: 10, quantity: 50 },
      { name: "Lollipop", category: "Candy", price: 2, quantity: 100 },
      { name: "Gummy Bears", category: "Gummies", price: 5, quantity: 30 },
    ]);
  });

  it("should return sweets matching name query", async () => {
    const res = await request(app)
      .get("/api/sweets/search")
      .set("Authorization", `Bearer ${userToken}`)
      .query({ name: "Chocolate" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data[0]).toHaveProperty("name", "Chocolate"); 
  });
});

//
// UPDATE, DELETE, PURCHASE, RESTOCK
//
describe("PUT /api/sweets/:id", () => {
  let sweet;
  beforeEach(async () => {
    sweet = await Sweet.create({
      name: "Chocolate",
      category: "Candy",
      price: 10,
      quantity: 50,
    });
  });

  it("should update sweet if admin", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Dark Chocolate", price: 12 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("name", "Dark Chocolate");
  });

  it("should deny update for normal user", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Forbidden Candy" });

    expect(res.statusCode).toBe(403);
  });
});

describe("DELETE /api/sweets/:id", () => {
  let sweet;
  beforeEach(async () => {
    sweet = await Sweet.create({
      name: "Chocolate",
      category: "Candy",
      price: 10,
      quantity: 50,
    });
  });

  it("should delete sweet if admin", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Sweet deleted successfully");
  });

  it("should deny delete for user", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });
});

describe("POST /api/sweets/:id/purchase", () => {
  let sweet;
  beforeEach(async () => {
    sweet = await Sweet.create({
      name: "Chocolate",
      category: "Candy",
      price: 10,
      quantity: 5,
    });
  });

  it("should allow user to purchase sweets", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.quantity).toBe(3);
  });
});

describe("POST /api/sweets/:id/restock", () => {
  let sweet;
  beforeEach(async () => {
    sweet = await Sweet.create({
      name: "Chocolate",
      category: "Candy",
      price: 10,
      quantity: 5,
    });
  });

  it("should allow admin to restock sweets", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.quantity).toBe(15);
  });
});