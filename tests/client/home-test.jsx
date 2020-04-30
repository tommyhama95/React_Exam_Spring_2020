/********************************************************************
 *      Most of code is based on code from lecture by lecturer:     *
 *                      arcuri82 on Github                          *
 * Link: https://github.com/arcuri82/web_development_and_api_design *
 ********************************************************************/

const React = require("react");
const {mount} = require("enzyme");
const {MemoryRouter} = require("react-router-dom");

const {Home} = require("../../src/client/home");

// Checks if basic components are rendered in driver
function checkHomeRendered(driver) {
    const title = driver.find(".home_title");
    expect(title.text()).toBe("Welcome to Pokemon Collection");

    const description = driver.find(".description");
    expect(description).toBeDefined();

    const tableBody = driver.find(".pokemon_table");
    expect(tableBody).toBeDefined();

    const tableRows = driver.find(".tablerow");
    expect(tableRows.length).toBe(20);

    return true;
}


test("#1. Rendered in", () => {
    const driver = mount(<Home/>);

    const rendered = checkHomeRendered(driver);
    expect(rendered).toEqual(true);
});


test("#2. Rendered in with logged in user", () => {
    const user = {id: "Test1", password: "Testtest12", lootId: 0, storageId: 0};

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());

    const driver = mount(
        <MemoryRouter>
            <Home fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} user={user}/>
        </MemoryRouter>
    );

    const html = driver.html();
    expect(html.includes(`Welcome ${user.id}`));
});