const request = require("supertest");
const {app} = require("../../../src/server/app");

test("#1 Get box, and store pokemons", async () => {
    const user = "TestStorageUser_1";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "BoxMani23"})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200);

    // Get empty box since we havent "Opened" the first one
    response = await agent.get("/api/storage");
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toEqual("EMPTY");

    // Simulate opening in order to store pokemons
    response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(200);

    const pokemon = response.body.loot.item;

    response = await agent
        .post("/api/storage")
        .send({array: pokemon})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    // Now retrieve filled out pokemonBox
    response = await agent.get("/api/storage");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
});