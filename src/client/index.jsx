import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import HeaderBar from "./header";
import {NotFound} from "./notfound";
import {Login} from "./login";
import {SignUp} from "./signup";
import {Home} from "./home";

class App extends React.Component {
    constructor(props) {
        super(props);

        // TODO: add state if needed
        this.state = {
            user: null,
            errorMsg: null,
            userCount: 1
        }
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();

        let protocol = "ws:";
        if(window.location.protocol.toLowerCase() === "https:") {
            protocol = "wss:";
        }

        this.socket = new WebSocket(protocol + "//" + window.location.host);

        this.socket.onmessage = (event) => {
            const dto = JSON.parse(event.data);

            if(!dto || !dto.userCount) {
                this.setState({userCount: "ERROR"});
                return;
            }

            this.setState({userCount: dto.userCount});
        }
    }

    componentWillUnmount() {
        this.socket.close();
    }

    // TODO: make async call
    fetchAndUpdateUserInfo = async () => {
        const url = "/api/user";
        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (error) {
            this.setState({errorMsg: `Error when connecting to server: ${error}`});
            return;
        }

        if(response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        if(response.status !== 200) {
            this.setState({ errorMsg: `Different status caught: ${response.status}` });
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }

    }

    updateLoggedInUser = (user) => {
        this.setState({user: user})
    }

    render() {

        const user = this.state.user ? this.state.user.id : null;

        return (
            <BrowserRouter>
                <div>
                    <HeaderBar userId={user}/>
                </div>
                <Switch>
                    <Route exact path={"/login"}
                           render={(props) => (
                               <Login
                                   {...props}
                                   fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                               />
                           )}
                    />
                    <Route exact path={"/signup"}
                           render={(props) => (
                               <SignUp
                                   {...props}
                                   fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                               />
                           )}
                    />
                    <Route exact path={"/"}
                           render={(props) => (
                               <Home
                                   {...props}
                                   user={this.state.user}
                                   fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                               />
                           )}
                    />
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("root"));