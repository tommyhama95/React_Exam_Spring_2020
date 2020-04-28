import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: "",
            errorMsg: null
        }

    }

    onUsernameHandler = event => {
        this.setState({userId: event.target.value})
    }

    onPasswordHandler = event => {
        this.setState({password: event.target.value})
    }

    //TODO: call to api to log in
    doLogIn = () => {
        const {userId, password} = this.state;

        // TODO: remove and update


        // TODO: Uncomment
        // this.props.history.push("/");
    }


    render() {
        return(
            <div className={"login_container"}>
                <h3 className={"login_title"}>Login</h3>
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
                    >
                        Login</button>
                </div>
            </div>
        )
    }
}