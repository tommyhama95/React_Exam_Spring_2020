import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import HeaderBar from "./header";
import {NotFound} from "./notfound";
import {Login} from "./login";
import {SignUp} from "./signup";
import {Home} from "./home";
import {Collection} from "./collection";

/********************************************************************
 *    Most of code for fetching data and more from API is taken     *
 *          and based on code from lecture by lecturer:             *
 *                      arcuri82 on Github                          *
 ********************************************************************/
 /** Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/index.jsx **/

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            errorMsg: null,
            userCount: 1
        }
    }

    // When component mounts, fetch user if session is still on
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

    // Gets user IF logged/signed in
    // Called by self or by child components of Index
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

        // User not logged in, update data
        if(response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        // Unkown reason could not aquire user
        if(response.status !== 200) {
            this.setState({ errorMsg: `Different status caught: ${response.status}` });
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    }

    // Sets state of user which is sent as props to child components
    // or update by child components
    updateLoggedInUser = (user) => {
        this.setState({user: user})
    }

    render() {
        const user = this.state.user ? this.state.user.id : null;

        return (
            <BrowserRouter>
                <div>
                    <HeaderBar userId={user} updateLoggedInUser={this.updateLoggedInUser}/>
                </div>
                <Switch>
                    <Route exact path={"/collection"}
                           render={(props) => (
                               <Collection
                                   {...props}
                                   user={user}
                                   fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                               />
                           )}

                    />
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
                                   user={user}
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