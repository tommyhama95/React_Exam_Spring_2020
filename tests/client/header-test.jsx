const React = require("react");
const { mount } = require("enzyme");
const {StaticRouter} = require("react-router-dom")

const {HeaderBar} = require("../../src/client/header");
const app = require("../../src/server/app");


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
    const userId = "Tommy";

    const driver = mount(
        <StaticRouter context={{}} location={"localhost:8080"}>
            <HeaderBar userId={userId}/>
        </StaticRouter>
    )

    const html = driver.html();
    expect(html.includes("User: Tommy")).toEqual(true);
    expect(html.includes("Logout")).toEqual(true);
});