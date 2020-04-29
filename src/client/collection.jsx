import React from "react";

export class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loot: null,
            lootMsg: null,
            errorMsg: null,
            buttonClass: "button_show",
            pokemon: null
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
            this.getLootBox();
        } else {
            this.props.history.push("/");
        }
    }

    getLootBox = async () => {
        const url = "/api/loots";
        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (error) {
            this.setState({errorMsg:
                `Failed to connect to server: ${error}`
            });
        }

        // User not logged in and is forced to Home page
        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        // Something else unexpected happened, maybe 500
        if(response.status !== 200) {
            this.setState({errorMsg:
                    `Failed connection to server: Status code: ${response.status}`
            });
            return;
        }

        // Lootbox was retrieved
        const lootBox = await response.json();
        if(lootBox.loot === "EMPTY") {
            // User is out of lootboxes
            this.setState({loot: null, lootMsg: true});
        } else {
            this.setState({loot: lootBox});
        }
    }

    getAnotherLootItem = async () => {
        const payload = {amount: 1};

        const url = "/api/loots/item";
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

        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if(response.status !== 201) {
            this.setState({errorMsg:
                `Error when connecting to server: Status code: ${response.status}`
            });
            return;
        }

        console.log("Bottom of api loots item call")
    }





    // Opens loot from this state earlier retrieved from getLootBox function
    openLoot = async (style) => {
        const {loot} = this.state;

        const pokemon = loot.item;
        const lootId = loot.id

        // Since pokemon is saved it is safe to remove loot to have it ready for
        // next lootbox if user has one

        const url = `/api/loots/item/remove`;
        let response;
        const payload = {id: lootId};

        try{
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            this.setState({errorMsg:
                    `Failed to connect to server: ${error}`
            });
            return;
        }

        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if(response.status !== 201){
            console.log(response.status);
        }

        this.setState({pokemon: pokemon, buttonClass: "button_hide", loot: null});
    }

    renderLootElements() {
        const lootBox = this.state.loot;
        return (
            <>
                <div className={"lootbox_main_container"}>
                    <div className={"loot_amount"}>Lootboxes available: {lootBox.length}</div>
                    <button className={`${this.state.buttonClass} button`}
                            onClick={() => {this.openLoot("button_hide")}}
                    >Open 1 loot</button>
                </div>
            </>
        )
    }


    render() {
        const lootBox = this.state.loot;

        let lootHTML = <div></div>;
        if(lootBox) {
            lootHTML = this.renderLootElements();
        }

        if(this.state.lootMsg) {
            lootHTML =
                <div>
                    <div>You are out of Lootboxes for Pokemon =(</div>
                    <button onClick={this.getAnotherLootItem}>Buy one more</button>
                </div>
        }

        console.log(this.state.pokemon)
        const pokemon = this.state.pokemon;


        // TODO: Take a look at how to not get pack-ception
        let openedLoot = <div></div>;
        if(pokemon) {
            openedLoot =
                <div className={"loot_opened"}>
                    <div className={"loot_msg"}>You got:</div>
                    <div className={"pokemon_1"}>{pokemon[0].name}</div>
                    <div className={"pokemon_2"}>{pokemon[1].name}</div>
                    <div className={"pokemon_3"}>{pokemon[2].name}</div>
                    <button onClick={() => {
                        this.setState({buttonClass: "button_show", pokemon: null})
                        this.getLootBox();
                    }}>OK</button>
                </div>
        }

        return(
            <div>
                <div className={"collection_title"}>Your collection</div>
                {lootHTML}
                {openedLoot}
            </div>
        )
    }
}