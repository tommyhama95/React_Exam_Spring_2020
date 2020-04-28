import React from "react";
import { Link, withRouter } from "react-router-dom"

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

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

        if(response.status !== 204) {
            alert(`Error when connecting to server with status code: ${response.status}`);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    }

    renderNotLoggedIn() {

        return (
            <React.Fragment>
                <Link className={"header_login link"} to={"/login"} tabIndex="0">Login</Link>
                <div className={"header_or"}> or </div>
                <Link className={"header_signup link"} to={"/signup"} tabIndex="0">Signup</Link>
            </React.Fragment>
        )
    }

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