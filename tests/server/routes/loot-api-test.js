const request = require("supertest");
const {app} = require("../../../src/server/app");


test("#1 Create and get users lootbox", async () => {
    const user = "TestUserBox_1";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "BoxManiac35"})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200)

    response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(200);

    const lootBox = response.body.loot;
    expect(lootBox.id).toBe(0);
    expect(lootBox.item.length).toBe(3);
    expect(response.body.available).toBe(3);
});

test("#2 Add lootbox to user", async () => {
    const user = "TestUserBox_2";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "GiveMeTheVeryBest01"})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200)

    response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(200);

    response = await agent
        .post("/api/loots/item")
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(200);


    // Since we created a user before,
    // the next lootID starts at 3 instead of 0.
    // Previous user got lootId's 0, 1 and 2.

    const lootBox = response.body.loot;
    expect(lootBox.id).toBe(3);
    expect(lootBox.item.length).toBe(3);
    expect(response.body.available).toBe(4);
});


test("#3 Fail to remove loot that does not exist", async () => {
    const user = "TestUserBox_3";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "CatchAndThrowAway1"})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200)

    response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(200);


    // Should be lootId nr 7 since last user got 4 lootboxes
    // TestUserBox_1 => 0,1,2
    // TestUserBox_2 => 3,4,5,6

    const lootId = response.body.loot.id;
    expect(lootId).toBe(7);

    response = await agent
        .post("/api/loots/item/remove")
        .send({id: lootId})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    // LootId 7 is now deleted and used
    const deletedId = 7;

    response = await agent
        .post("/api/loots/item/remove")
        .send({id: deletedId})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(404);
});

test("#4 Get 'EMPTY' after opened all", async () => {
    const user = "TestUserBox_4";

    const agent = request.agent(app);

    let response = await agent
        .post("/api/signup")
        .send({userId: user, password: "FakeItTilYouMakeIt4"})
        .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");
    expect(response.statusCode).toBe(200)


    for(let i = 0; i < 3; i++) {
        response = await agent.get("/api/loots");
        expect(response.statusCode).toBe(200);

        const lootId = response.body.loot.id;

        response = await agent
            .post("/api/loots/item/remove")
            .send({id: lootId})
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(201);
    }

    // User has opened all available
    response = await agent.get("/api/loots");
    expect(response.statusCode).toBe(200);
    expect(response.body.loot).toEqual("EMPTY");
});