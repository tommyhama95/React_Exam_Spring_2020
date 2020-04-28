const React = require("react");
const {mount} = require("enzyme");

const {Login} = require("../../src/client/login");


function checkLoginRendered(driver) {
    const html = driver.html();
    expect(html.includes("Username:")).toEqual(true)
    expect(html.includes("Password:")).toEqual(true)

    const loginTitle = driver.find(".login_title").at(0);
    expect(loginTitle.text()).toBe("Login");

    const userInput = driver.find(".login_username").at(0);
    expect(userInput).toBeDefined();

    const passwordInput = driver.find(".login_password").at(0);
    expect(passwordInput).toBeDefined();

    const button = driver.find(".login_button").at(0);
    expect(button).toBeDefined()
};

test("1. Rendered in", () => {
    const driver = mount(<Login/>);
    checkLoginRendered(driver);
});

test("2. Login fields entered value", () => {
    //TODO: make user
    const user = "Test";
    const password = "Foo";

    const driver = mount(<Login/>);
    checkLoginRendered(driver);

    const userInput = driver.find(".login_username").at(0);
    const pswdInput = driver.find(".login_password").at(0);

    userInput.instance().value = user;
    userInput.simulate("change");
    pswdInput.instance().value = password;
    pswdInput.simulate("change");

    driver.update();

    const button = driver.find(".login_button")
    button.simulate("click");

    expect(driver.state().userId).toBe(user);
    expect(driver.state().password).toBe(password);

})