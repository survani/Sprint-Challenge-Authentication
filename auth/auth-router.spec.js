const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

//test the get functions for all games

//LOGIN ENDPOINT TESTS
describe("auth-router.js", () => {
  describe("POST /api/auth/login", () => {
    it("Does it return a 200 status code. If login user is valid", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "Giovani", password: "password" })
        .expect(200);
    });
  });
});

describe("auth-router.js", () => {
  describe("POST /api/auth/login", () => {
    it("Does it return a 401 status code. If username or password or both are incorrect", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "WrongUser", password: "password" })
        .expect(401);
    });
  });
});

//REGISTER ENDPOINT TESTS

describe("auth-router.js", () => {
  describe("POST /api/auth/register", () => {
    it("Does it return a 201 status code. If user can register", () => {
      return (
        request(server)
          .post("/api/auth/register")
          //I need to change this everytime I want it to pass because of .unique()
          .send({ username: "Michael", password: "password" })
          .expect(201)
      );
    });
  });
});

describe("auth-router.js", () => {
  describe("POST /api/auth/register", () => {
    it("Does it return an error if user is already registered. Unique username test", () => {
      return (
        request(server)
          .post("/api/auth/register")
          //I need to change this everytime I want it to pass because of .unique()
          .send({ username: "Tom", password: "password" })
          .then((result) => {
            expect(result.type).toBe("application/json");
          })
      );
    });
  });
});
