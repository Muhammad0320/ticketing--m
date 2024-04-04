import supertest from "supertest";
import { app } from "../../app";

it("responds with details about current user", async () => {
  const cookie = await global.signin();

  const response = await supertest(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("foo@example.com");
});

it("responds with null for unauthenticated user", async () => {
  const response = await supertest(app)
    .get("/api/users/currentUser")
    .send()
    .expect(400);

  expect(response.body.currentUser).toEqual(null);
});
