/********************************************************************
 *           Fully copied and based on code from lecturer.          *
 *                      arcuri82 on Github                          *
 * Link: https://github.com/arcuri82/web_development_and_api_design *
 ********************************************************************/

const {app} = require("./app");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Started server on port ' + port);
});