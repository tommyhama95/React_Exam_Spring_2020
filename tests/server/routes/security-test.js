const request = require("supertest");
const {app} = require("../../../src/server/app");

/***********************************************************
 * This file is for testing against 401 status codes       *
 *                                                         *
 * In this implementation of the assignment there have     *
 * been no usage of difference in accounts, so there is    *
 *                  no testing for 403                     *
 **********************************************************/
const status = 401;

// Auth-api
test("User 401: Not logged in, no access", async () => {
    const agent = request.agent(app);

    // GET -> /api/user
    let response = await agent.get("/api/user");
    expect(response.statusCode).toBe(status);
});


// Loot-api
test("Loot 401: Not logged in, no access", async () => {
    const agent = request.agent(app);

    // GET -> /api/loots
    let response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(status);

    // POST -> /api/loots/item
    response = await agent
        .post("/api/loots/item")
        .send({lootId: 0})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(status);

    // POST -> /api/loots/item/remove
    response = await agent
        .post("/api/loots/item/remove")
        .send({id: 0})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(status);
});


// PokeStorage-api
test("Pokestorage 401: Not logged in, no access", async () => {
    const agent = request.agent(app);

    // GET -> /api/storage
    let response = await agent.get("/api/storage");
    expect(response.statusCode).toBe(status);

    // POST -> /api/storage
    response = await agent
        .post("/api/storage")
        .send({array: ["Give access"]})
        .set("Conten-Type", "application/json");
    expect(response.statusCode).toBe(status);
});