import supertest from "supertest";
import { app } from "../../app";

it("returns a 201 successful signup", async () => {
  return supertest(app)
    .post("/api/users/signup")
    .send({ email: "hello@test.com", password: "passwords" })
    .expect(201);
});

it("returns 400 on invalid email", async () => {
  return supertest(app)
    .post("/api/users/signup")
    .send({ email: "shitititititit", password: "passwords" })
    .expect(400);
});

it("returns 400 on invalid password", async () => {
  return supertest(app)
    .post("/api/users/signup")
    .send({ email: "test@example.com", password: "p" })
    .expect(400);
});

it("returns 400 on missing email or password", async () => {
  await supertest(app)
    .post("/api/users/signup")
    .send({ email: "test@example.com" })
    .expect(400);

  await supertest(app)
    .post("/api/users/signup")
    .send({ password: "passwords" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await supertest(app)
    .post("/api/users/signup")
    .send({ email: "foo@example.com", password: "passwords" })
    .expect(201);
  await supertest(app)
    .post("/api/users/signup")
    .send({ email: "foo@example.com", password: "passwords" })
    .expect(400);
});

it("sets cookie to the header when user successfully signup", async () => {
  const response = await supertest(app)
    .post("/api/users/signup")
    .send({ email: "foo@example.com", password: "passwords" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
