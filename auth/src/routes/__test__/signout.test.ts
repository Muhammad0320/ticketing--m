import supertest from "supertest";
import { app } from "../../app";

it("clears the cookie after signout", async () => {
  await supertest(app)
    .post("/api/users/signup")
    .send({ email: "foo@example.com", password: "passwords" })
    .expect(201);

  const response = await supertest(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  // if (!response) {
  //   return  ;

  //   // throw new Error(' ')
  // }

  expect(response.get("Set-Cookie")![0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
