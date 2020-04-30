import React from "react";

/********************************************************************
 *    Most of code for fetching data and more from API is taken     *
 *          and based on code from lecture by lecturer:             *
 *                      arcuri82 on Github                          *
 * Link: https://github.com/arcuri82/web_development_and_api_design *
 ********************************************************************/

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: "",
            errorMsg: null
        }

    }

    // Saves username to state for later
    onUsernameHandler = event => {
        this.setState({userId: event.target.value})
    }

    // Saves password to state for later
    onPasswordHandler = event => {
        this.setState({password: event.target.value})
    }

    // Log in user with previous set states of username and password
    doLogIn = async () => {
        const {userId, password} = this.state;

        const url = "/api/login";
        let response;
        const payload = {userId: userId, password: password};

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
        } catch (error) {
            this.setState({errorMsg:
                    `Failed to connect to server: ${error}`
            });
            return;
        }

        // Username and/or password not correct
        if(response.status === 401) {
            this.setState({errorMsg: "Invalid username/password"});
            return;
        }

        // Other unkown reason for not valid login
        if(response.status !== 204) {
            this.setState({errorMsg:
                    `Error when connecting to server: Status code: ${response.status}`
            });
            return;
        }

        // Login success, update parent component and redirect to Home page
        this.setState({errorMsg: null});
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push("/");
    }

    render() {
        const errormsg = this.state.errorMsg ? this.state.errorMsg : "";

        /*** Self written code ***/
        return(
            <div className={"login_container"}>
                <h3 className={"login_title"}>Login</h3>
                <div className={"login_errorMsg"}>{errormsg}</div>
                <div className={"login_input_container"}>
                    <div className={"login_userTitle"}>Username:</div>
                    <input className={"login_username input"}
                           placeholder={"Enter username"}
                           value={this.state.userId}
                           onChange={this.onUsernameHandler}
                           type={"text"}
                    />
                    <div className={"login_pswTitle"}>Password:</div>
                    <input className={"login_password input"}
                           placeholder={"Enter password"}
                           value={this.state.password}
                           onChange={this.onPasswordHandler}
                           type={"password"}
                    />
                    <button className={"button login_button"}
                            onClick={this.doLogIn}
                    >Login</button>
                </div>
            </div>
        )
    }
}