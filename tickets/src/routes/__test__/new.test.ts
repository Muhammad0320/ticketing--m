import supertest from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await supertest(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only we accessed if user is authenticated", async () => {});

it("return an error if user inputs an invalid title", async () => {});

it("return an error when user inputs an invlid price", async () => {});

it("creates a ticket with valid inputs", async () => {});
