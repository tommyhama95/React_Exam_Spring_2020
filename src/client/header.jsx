import React from "react";
import { Link, withRouter } from "react-router-dom"

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    doLogOutUser = async () => {

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
                <h3 className={"header_title black_text"}>Name of project</h3>
                {content}
            </div>
        )

    }

}

export default withRouter(HeaderBar);