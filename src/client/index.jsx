import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import HeaderBar from "./header";
import {NotFound} from "./notfound";
import {Login} from "./login";
import {SignUp} from "./signup";

class App extends React.Component {
    constructor(props) {
        super(props);

        // TODO: add state if needed
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.fetchAndUpdateUserLoggedIn();
    }

    // TODO: make async call
    fetchAndUpdateUserLoggedIn = async () => {
        const url = "/api/user";
        let response;

        try{
            response = await fetch(url,{
                method: "GET"
            });
        } catch (error) {
            this.setState({errorMsg:
                    `Failed to connect to server ${error}`})
        }

        if(response.status === 401) {
            // Will fail on first load up
            this.updateLoggedInUser(null);
            return;
        }

        if(response.status !== 200){
            // TODO: Make errorMsg to user
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
                                   fetchAndUpdateUserLoggedIn={this.fetchAndUpdateUserLoggedIn}
                               />
                           )}
                    />
                    <Route exact path={"/signup"}
                           render={(props) => (
                               <SignUp
                                   {...props}
                                   fetchAndUpdateUserLoggedIn={this.fetchAndUpdateUserLoggedIn}
                               />
                           )}
                    />
                    <Route exact path={"/"}
                           render={(props) => (
                               <Home
                                   {...props}
                                   user={this.state.user}
                                   fetchAndUpdateUserLoggedIn={this.fetchAndUpdateUserLoggedIn}
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