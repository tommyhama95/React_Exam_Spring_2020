const React = require("react");
const {mount} = require("enzyme");
const {MemoryRouter} = require("react-router-dom");

const {Login} = require("../../src/client/login");
const {overrideFetch, asyncCheckCondition} = require("../mytest-utils");
const app = require("../../src/server/app");

const {createUser, resetAllUsers, getUser} = require("../../src/server/db/users");

beforeEach(resetAllUsers);

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

function fillInLoginInputs(driver, user, password) {
    const userInput = driver.find(".login_username").at(0);
    const pswdInput = driver.find(".login_password").at(0);

    userInput.instance().value = user;
    userInput.simulate("change");
    pswdInput.instance().value = password;
    pswdInput.simulate("change");

    const button = driver.find(".login_button")
    button.simulate("click");
}

test("#1. Rendered in", () => {
    const driver = mount(<Login/>);
    checkLoginRendered(driver);
});


// NB! This test doesnt 100% test out login functionality since the redirecting
// and actual creation of user isn't tested. Tried this in test #3 below
test("#2. Login fields entered value, valid login", async () => {
    overrideFetch(app);

    const user = "Test";
    const password = "Foooootball1";
    createUser(user, password);


    const driver = mount(<Login user={user}/>);
    checkLoginRendered(driver);
    fillInLoginInputs(driver, user, password);

    driver.update();

    expect(driver.state().userId).toBe(user);
    expect(driver.state().password).toBe(password);
});




/** Test I could not get to work because of issues about it saying     **/
/**  "await this.props.fetchAndUpdateUserInfo() <= is not a function"  **/

/*******************************************************************
 test("3. Login fields entered value, valid login", async () => {
    overrideFetch(app);

    const user = "Test";
    const password = "Foooootball1";
    const created = createUser(user, password);
    expect(created).toEqual(true)

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
        <MemoryRouter initialEntries={["/"]}>
            <Login fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} />
        </MemoryRouter>
    );
    checkLoginRendered(driver);
    fillInLoginInputs(driver, user, password);

    const redirected = await asyncCheckCondition(() => {
        return page === "/"
    }, 2000, 200);


    expect(page).toEqual("/")
    expect(redirected).toEqual(true);

    expect(driver.state().userId).toBe(user);
    expect(driver.state().password).toBe(password);
});

 *******************************************************************/
