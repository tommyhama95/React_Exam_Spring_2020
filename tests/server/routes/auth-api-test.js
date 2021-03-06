/********************************************************************
 *      Most of code is based on code from lecture by lecturer:     *
 *                      arcuri82 on Github                          *
 ********************************************************************/
/** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/server/routes/auth-api-test.js **/

const request = require("supertest");
const {app} = require("../../../src/server/app");


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


test("#3 Create user and get user", async () => {
    const user = "Test1"

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "Give me access please"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(user);
});


test("#4", async () => {
    const user = "TesterFester";

    let response = await request(app)
        .post("/api/signup")
        .send({userId: user, password: "SomethingCreative3"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);

    const agent = request.agent(app);

    response = await agent
        .post("/api/login")
        .send({userId: user, password: "SomethingCreative3"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(204);

    response = await agent.get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(user);
});


test("#5 Login after logout", async  () => {
    const user = "TestingMesting";
    const password = "NotSoSecretPassword69";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: password})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);


    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200);

    response = await agent.post("/api/logout");
    expect(response.statusCode).toBe(204);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(401);

    response = await agent
        .post("/api/login")
        .send({userId: user, password: password})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(204);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200);
});


test("#4 create and get user with cookie", async () => {
    const user = "TestUser154";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "PasswordForUser1"})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(user);
});

