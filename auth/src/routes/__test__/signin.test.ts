import supertest from "supertest";
import { app } from "../../app";

it("returns 400 on invalid email", async () => {
  return supertest(app)
    .post("api/users/signin")
    .send({ email: "test@example.com", password: "password" })
    .expect(400);
});

it("returns 400 in invalid password", async () => {
  await supertest(app)
    .post("api/users/signup")
    .send({ email: "test@test.com", password: "passwords" })
    .expect(201);

  await supertest(app)
    .post("api/users/signin")
    .send({ email: "test@test.com", password: "shittttttt" })
    .expect(400);
});

it("set a cookie when user successfully signups", async () => {
  await supertest(app)
    .post("api/users/signup")
    .send({ email: "test@test.com", password: "passwords" })
    .expect(201);

  const response = await supertest(app)
    .post("api/users/signin")
    .send({ email: "test@test.com", password: "passwords" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
