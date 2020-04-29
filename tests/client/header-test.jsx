const React = require("react");
const { mount } = require("enzyme");
const {StaticRouter} = require("react-router-dom")

const {HeaderBar} = require("../../src/client/header");
const app = require("../../src/server/app");
const { overrideFetch, asyncCheckCondition } = require("../mytest-utils");


// Todo: make it async later and with corresponding function call
test("1. User not logged in, all rendered", () => {
    const userId = null;

    const driver = mount(
        <StaticRouter context={{}} location={"localhost:8080"}>
            <HeaderBar userId={userId}/>
        </StaticRouter>
    )

    const html = driver.html();
    expect(html.includes("Login")).toEqual(true);
    expect(html.includes("Signup")).toEqual(true);
    expect(html.includes("Home")).toEqual(true);
});

// Todo: make it async later and with corresponding function call
test("2. User logged in, all rendered", () => {
    const userId = "Test";

    const driver = mount(
        <StaticRouter context={{}} location={"localhost:8080"}>
            <HeaderBar userId={userId}/>
        </StaticRouter>
    )

    const html = driver.html();
    expect(html.includes(`User: ${userId}`)).toEqual(true);
    expect(html.includes("Logout")).toEqual(true);
});


test("#3 User signed in, then out", async () => {
    overrideFetch(app)

    const userId = "TestUser1";
    const password = "Password12345";

    const signedUp = await fetch("/api/signup", {
       method: "post",
       headers: {
           "Content-Type": "application/json"
       },
        body: JSON.stringify({userId: userId, password: password})
    });

    expect(signedUp.status).toBe(201);
});