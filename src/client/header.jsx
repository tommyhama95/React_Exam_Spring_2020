import React from "react";
import { Link, withRouter } from "react-router-dom"

/********************************************************************
 *    Most of code for fetching data and more from API is taken     *
 *          and based on code from lecture by lecturer:             *
 *                      arcuri82 on Github                          *
 * Link: https://github.com/arcuri82/web_development_and_api_design *
 ********************************************************************/

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    // User pressed "Logout" button in header
    doLogoutUser = async () => {
        const url = "/api/logout";
        let response;

        try{
            response = await fetch(url, {
                method: "post"
            })
        } catch (error) {
            alert(`Failed connection to server: ${error}`);
            return;
        }

        // Unkown reason User couldn't log out, 500 perhaps
        if(response.status !== 204) {
            alert(`Error when connecting to server with status code: ${response.status}`);
            return;
        }

        // Update user in session and redirect to Home page
        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    }

    // Renders when user is NOT logged in
    /*** Self written code ***/
    renderNotLoggedIn() {
        return (
            <React.Fragment>
                <Link className={"header_login link"} to={"/login"} tabIndex="0">Login</Link>
                <div className={"header_or"}> or </div>
                <Link className={"header_signup link"} to={"/signup"} tabIndex="0">Signup</Link>
            </React.Fragment>
        )
    }

    // Renders when user HAS logged in/signed up
    /*** Self written code ***/
    renderLoggedIn(userId) {
        return (
            <React.Fragment>
                <div className={"header_username"}>
                    {`User: ${userId}`}
                </div>
                <button
                    className={"button header_logout"}
                    onClick={this.doLogoutUser}
                    id={"logoutBtn"}
                >Logout</button>
            </React.Fragment>
        )
    }

    render() {

        const userId = this.props.userId;

        let content;
        if(!userId) {
            content = this.renderNotLoggedIn();
        } else {
            content = this.renderLoggedIn(userId);
        }

        return(
            <div className={"headerbar"}>
                <Link className={"header_home_btn black_text"} to={"/"} tabIndex="0">Home</Link>
                <h3 className={"header_title black_text"}>Pokemon Collection</h3>
                {content}
            </div>
        )
    }

}

export default withRouter(HeaderBar);