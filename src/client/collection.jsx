import React from "react";

export class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loot: null,
            errorMsg: null,
            buttonVisible: true,
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

        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if(response.status !== 200) {
            this.setState({errorMsg:
                    `Failed connection to server: Status code: ${response.status}`
            });
            return;
        }

        const lootBox = await response.json();
        console.log(lootBox)
        this.setState({
            loot: lootBox
        });
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


    displayLoot() {


    }

    openLoot = async (style, lootBox) => {
        /*  For some unknown reason as of now the lootbox gets packed inside more
            object per sent as parameter. As such im getting a lootbox-ception unpacking.
            TODO: Figure out and make better or keep comment above
        */
        const pokemon = lootBox.lootBox.map((loot) => {return loot.item});
        this.setState({pokemon: pokemon, buttonClass: "button_hide"});

        const url = "/api/loots/item";
        let response;

        try{

        } catch (error) {
            response = await fetch(url, {
                method: "delete",

            })
        }

    }

    renderElements() {
        const lootBox = this.state.loot;
        return (
            <>
                <div className={"lootbox_main_container"}>
                    <div className={"loot_amount"}>Lootboxes available: {lootBox.length}</div>
                    <button className={this.state.buttonClass}
                            onClick={() => {this.openLoot("button_hide", {lootBox})}}
                    >Open 1 loot</button>

                </div>
                <div className={"collection_main_container"}>

                </div>
            </>
        )
    }


    render() {
        const lootBox = this.state.loot;

        let html = <div></div>;
        if(lootBox) {
            html = this.renderElements();
        }

        if(this.state.buttonClass === "button_hide") {

        }

        console.log(this.state.pokemon)
        const pokemon = this.state.pokemon;


        // TODO: Take a look at how to not get pack-ception
        let openedLoot = <div></div>;
        if(pokemon) {
            openedLoot =
                <div className={"loot_opened"}>
                    <div className={"pokemon_1"}>{pokemon[0][0].name}</div>
                    <div className={"pokemon_2"}>{pokemon[0][1].name}</div>
                    <div className={"pokemon_3"}>{pokemon[0][2].name}</div>
                </div>
        }

        return(
            <div>
                <div className={"collection_title"}>Your collection</div>
                {html}
                {openedLoot}
            </div>
        )
    }
}