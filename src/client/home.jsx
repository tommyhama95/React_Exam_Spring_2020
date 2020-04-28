import React from "react";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homeTitle: "Welcome to Pokemon Collection"
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }

    render() {

        const user = this.props.user;

        return(
            <div className={"main_container"}>
                <h2>{this.state.homeTitle}</h2>
                <p>Some info about the game here:</p>
            </div>
        )
    }
}