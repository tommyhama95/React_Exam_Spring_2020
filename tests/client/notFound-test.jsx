/************************************************************
 *                                                          *
 *  Self written code, but some parts based on lecture code *
 *                                                          *
 * **********************************************************/
/** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/headerbar-test.jsx **/

const React = require("react");
const { mount } = require("enzyme");

const {NotFound} = require("../../src/client/notfound");

test("Render NotFound page", () => {
    const driver = mount(<NotFound/>);

    const html = driver.html();
    expect(html.includes("PAGE NOT FOUND")).toEqual(true);
    expect(html.includes("404")).toEqual(true);
    expect(html.includes("ERROR: The page requested is not available")).toEqual(true);
    expect(html.includes("Please try again or look for wished page from home page")).toEqual(true);
});