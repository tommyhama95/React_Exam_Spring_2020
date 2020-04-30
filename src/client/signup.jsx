import React from "react";
import { withRouter } from "react-router-dom";

/********************************************************************
 *    Most of code for fetching data and more from API is taken     *
 *          and based on code from lecture by lecturer:             *
 *                      arcuri82 on Github                          *
 * Link: https://github.com/arcuri82/web_development_and_api_design *
 ********************************************************************/

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPsw: "",
            errorMsg: null,
            pswMessage: ""
        }

    }

    // Saves username in state for later use
    onHandleUsername = event => {
        this.setState({username: event.target.value})
    }

    // Save password in state for later user
    onHandlePassword = event => {
        this.setState({password: event.target.value});
    }

    // Save second input of password for
    onHandleConfirm = event => {
        this.setState({confirmPsw: event.target.value});
    }


    // Get saved states, check if password meets criteria
    // and if password & confirm are identical, THEN sign up
    onHandleSignUp = async () => {
        const {username, password, confirmPsw} = this.state;

        const criteriaMet = this.checkCriteriaForPassword(password);

        if(criteriaMet){
            if(confirmPsw !== password) {
                this.setState({pswMessage: "Password not matching"})
            } else {
                //-----All ok, start requesting server-----//
                const payload = {userId: username, password: password};

                const url = "/api/signup"
                let response;

                try {
                    response = await fetch(url, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                } catch (error) {
                    this.setState({errorMsg:
                        `Failed to connect to server ${error}`
                    });
                    return;
                }

                if(response.status === 400) {
                    this.setState({ errorMsg: `Invalid username/password`});
                }

                if(response.status !== 201) {
                    this.setState({
                        errorMsg:
                            `Error when connecting to server: Status code: ${response.status}`
                    });
                }

                await this.props.fetchAndUpdateUserInfo();
                this.props.history.push("/");
            }
        } else {
            this.setState({pswMessage: "Password Criteria not met"});
        }

    }

    // Checks for password criteria using regex, found on StackOverflow
    // Link: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    checkCriteriaForPassword = (password) => {
        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regexp.test(password);
    }

    /*** Self written code ***/
    render() {

        return(
            <div className={"signup_container"}>
                <div className={"signup_pswrd_info"}>
                    <div className={"signup_requirement"}>Password must contain following:</div>
                    <ul>
                        <li>At least 8 characters</li>
                        <li>At least 1 big letter [A-Z]</li>
                        <li>At least 1 small letter [a-z]</li>
                        <li>At least 1 number [0-9]</li>
                    </ul>
                </div>
                <div className={"signup_form"}>
                    <h3 className={"signup_title"}>Sign up</h3>
                    <div className={"signup_userTitle"}>Username:</div>
                    <input className={"signup_username input"}
                           onChange={this.onHandleUsername}
                           type={"text"}
                           placeholder={"Choose username"}
                    />
                    <div className={"signup_pswTitle"}>Password:</div>
                    <input className={"signup_password input"}
                           onChange={this.onHandlePassword}
                           type={"password"}
                           placeholder={"Enter password"}
                    />
                    <div className={"signup_confTitle"}>Confirm password:</div>
                    <input className={"signup_confirmPWD input"}
                           onChange={this.onHandleConfirm}
                           type={"password"}
                           placeholder={"Confirm password"}
                    />
                    <div className={"signup_message"}>{this.state.pswMessage}</div>
                    <button className={"signup_button button"}
                            onClick={this.onHandleSignUp}
                    >Sign up</button>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);