const request = require("supertest");
const server = require("../api/server");

describe("jokes-router.js", () => {
  describe("GET /api/jokes", () => {
    it("Does it return a 400 status code. If no information for credentials is present badrequest", () => {
      return request(server).get("/api/jokes").expect(400);
    });
  });
});

describe("jokes-router.js", () => {
  describe("GET /api/jokes", () => {
    it("does it contain json?", () => {
      return request(server)
        .get("/api/jokes")
        .then((result) => {
          expect(result.type).toMatch(/json/i);
        });
    });
  });
});
