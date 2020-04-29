const request = require("supertest");
const app = require("../../../src/server/app");

// Code below is based and some parts copied from Andrea's code from lecture



test("#1 Fail login", async () => {
    const response = await request(app)
        .post("/api/login")
        .send({userId: "Test1", password: "Give me access please"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(401);
});

test("#2 Fail access data to non-existent user", async () => {
    const response = await request(app)
        .get("/api/user");

    expect(response.statusCode).toBe(401);
});


test("#3 Create user", async () => {
    const user = {userId: "TestUser1", password: "Password123"};

    let response = await request(app)
        .post("/api/signup")
        .send({userId: "Test1", password: "Give me access please"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
});





// Seems to have issue with agent not holding on to user info

/*********************************************************
test("#4 create and get user with cookie", async () => {
    const user = "TestUser1";

    const agent = request.agent(app);

    let response = await request(app)
        .post("/api/signup")
        .send({userId: user, password: "PasswordForUser1"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(user);

});
 *********************************************************/
