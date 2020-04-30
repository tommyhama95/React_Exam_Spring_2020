const React = require("react");
const {mount} = require("enzyme");

const {SignUp} = require("../../src/client/signup");

// Checks rendering of Password criteria information on page
function checkPasswordCriteriaInfo(driver) {
    const html = driver.html();

    // Password criteria rendering check
    expect(html.includes("At least 8 characters")).toEqual(true);
    expect(html.includes("At least 1 big letter [A-Z]")).toEqual(true);
    expect(html.includes("At least 1 small letter [a-z]")).toEqual(true);
    expect(html.includes("At least 1 number [0-9]")).toEqual(true);

    const infoHolder = driver.find(".signup_pswrd_info");
    expect(infoHolder).toBeDefined();

    const infoTitle = driver.find(".signup_requirement");
    expect(infoTitle.text()).toBe("Password must contain following:");
}

// Checks rendering of signup form for user
function checkInputForm(driver) {
    const html = driver.html();

    expect(html.includes("Username:")).toEqual(true);
    expect(html.includes("Password:")).toEqual(true);
    expect(html.includes("Confirm password:")).toEqual(true);

    const userInput = driver.find(".signup_username");
    expect(userInput).toBeDefined();

    const pswdInput = driver.find(".signup_password");
    expect(pswdInput).toBeDefined();

    const cnfmInput = driver.find(".signup_confirm");
    expect(cnfmInput).toBeDefined();

    const message = driver.find(".signup_message");
    expect(message).toBeDefined();

    const button = driver.find(".signup_button");
    expect(button).toBeDefined();
};

// Fills out information on signup form
function fillInSignUpFields(driver, user, password, confirmPsw) {
    const userInput = driver.find(".signup_username");
    userInput.instance().value = user;
    userInput.simulate("change");

    const pswdInput = driver.find(".signup_password");
    pswdInput.instance().value = password;
    pswdInput.simulate("change");

    const cnfmInput = driver.find(".signup_confirmPWD");
    cnfmInput.instance().value = confirmPsw;
    cnfmInput.simulate("change");

    driver.update();

    const button = driver.find(".signup_button");
    button.simulate("click");
}


test("#1. Render password info components", () => {
    const driver = mount(<SignUp/>);
    checkPasswordCriteriaInfo(driver);
});


test("#2. Render input form components", () => {
   const driver = mount(<SignUp/>);
   checkInputForm(driver);
});


test("#3. Signup fields entered value & Criteria Approved", () => {
    const driver = mount(<SignUp/>);
    checkInputForm(driver);

    const user = "Test";
    const password = "FoobarFoo43";
    const confirmPsw = password;

    fillInSignUpFields(driver, user, password, confirmPsw)

    expect(driver.state().username).toBe(user);
    expect(driver.state().password).toBe(password);
    expect(driver.state().confirmPsw).toBe(confirmPsw);
});


test("#4. Password not matching", () => {
    const driver = mount(<SignUp/>);
    checkInputForm(driver);

    const user = "Test2";
    const password = "FoobarFoo43";
    const confirm = "Chocolate cause why not";

    fillInSignUpFields(driver, user, password, confirm)

    expect(driver.state().username).toBe(user);
    expect(driver.state().password).toBe(password);
    expect(driver.state().confirmPsw).toBe(confirm);
    expect(driver.state().pswMessage).toBe("Password not matching");
});


test("#5. Password not meeting criteria", () => {
    const driver = mount(<SignUp/>);
    checkInputForm(driver);

    const user = "Test3";
    const password = "Boo";
    const confirmPsw = "Boo";

    fillInSignUpFields(driver, user, password, confirmPsw);

    expect(driver.state().username).toBe(user);
    expect(driver.state().password).toBe(password);
    expect(driver.state().confirmPsw).toBe(confirmPsw);
    expect(driver.state().pswMessage).toBe("Password Criteria not met");
});