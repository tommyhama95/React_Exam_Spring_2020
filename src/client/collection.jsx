import React from "react";

const {getAllPokemon} = require("../server/db/pokemon");

export class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loot: null,
            lootMsg: null,
            errorMsg: null,
            buttonClass: "button_show",
            pokemon: null,
            available: null
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
            this.getLootBox();
            this.updateTable();
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
        console.log(lootBox)
        if(lootBox.loot === "EMPTY") {
            // User is out of lootboxes
            this.setState({loot: null, lootMsg: true, available: null});
        } else {
            this.setState({
                loot: lootBox.loot, lootMsg: false, available: lootBox.available
            });
        }
    }

    getAnotherLootItem = async () => {

        const url = "/api/loots/item";
        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                  "Content-Type": "application/json"
                }
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

        this.setState({lootMsg: null});
        this.getLootBox();
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
        await this.addToStorage();
    }

    addToStorage = async () => {
        const {pokemon} = this.state;

        const url = "/api/storage";
        let response;

        const payload = {array: pokemon};

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

        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if(response.status !== 201) {
            this.setState({errorMsg:
                    `Error when connecting to server: Status code: ${response.status}`
            });
            return ;
        }

        await this.updateTable();
    }

    updateTable = async () => {
        const url = "/api/storage";
        let response;

        try {
            response = await fetch(url, {
                method: "get"
            })
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

        if(response.status !== 200) {
            this.setState({errorMsg:
                    `Error when connecting to server: Status code: ${response.status}`
            });
            return ;
        }

        const payload = await response.json();
        this.setState({tableContent: payload});
    }

    renderLootElements() {
        const lootBox = this.state.loot;
        return (
            <>
                <div className={"lootbox_main_container"}>
                    <button className={`${this.state.buttonClass} button coll_button`}
                            onClick={() => {this.openLoot("button_hide")}}
                    >Open 1 loot</button>
                    <div className={"loot_amount"}>Lootboxes available: {this.state.available}</div>
                </div>
            </>
        )
    }

    renderTable() {
        const pokemonContent = this.state.tableContent;
        const pokemonArray = getAllPokemon();

        // If the same name is found, add to its number
        if(pokemonContent.length !== 0) {
            for(let i = 0; i < pokemonArray.length; i++) {
                for(let n = 0; n < pokemonContent.length; n++) {
                    if(pokemonArray[i].name === pokemonContent[n].name){
                        pokemonArray[i].amount = pokemonContent[n].amount;
                    }
                }
            }

        }

        return(
            <div>
                <table className={"pokemon_table"}>
                    <thead className={"table_head"}>
                    <tr className={"tablehead_row"}>
                        <th>Name</th>
                        <th>Type 1</th>
                        <th>Type 2</th>
                        <th>You have</th>
                    </tr>
                    </thead>
                    <tbody className={"tablebody"}>
                    {pokemonArray.map((poke) => (
                        <tr className={"tablerow"} key={poke.name}>
                            <td className={"tb_name"}>{poke.name}</td>
                            <td className={`tb_type ${poke.type[0]}`}>
                                {poke.type[0]}
                            </td>
                            <td className={`tb_type2 ${poke.type[1]}`}>
                                {poke.type[1]}
                            </td>
                            <td>
                                {poke.amount}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
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
                <div className={"loot_opened"}>
                    <button className={"coll_button button"}
                        onClick={this.getAnotherLootItem}>Buy one more</button>
                    <div className={"loot_amount"}>You are out of Lootboxes for Pokemon =(</div>
                </div>
        }

        console.log(this.state.pokemon)
        const pokemon = this.state.pokemon;

        let openedLoot = <div></div>;
        if(pokemon) {

            openedLoot =
                <div className={"loot_opened"}>
                    <button className={"coll_button button"}
                        onClick={() => {
                        this.setState({buttonClass: "button_show", pokemon: null})
                        this.getLootBox();
                    }}>OK</button>
                    <div className={"loot_msg"}>You got:</div>
                    <div className={"pokemon_1"}>{pokemon[0].name}</div>
                    <div className={"pokemon_2"}>{pokemon[1].name}</div>
                    <div className={"pokemon_3"}>{pokemon[2].name}</div>
                </div>
        }

        let tableHTML = <div></div>;
        if(this.state.tableContent) {
            tableHTML = this.renderTable();
        }

        return(
            <div className={"collection_container"}>
                <div className={"collection_title"}>Your collection</div>
                {lootHTML}
                {openedLoot}
                <div className={"table_container_collection"}>
                    {tableHTML}
                </div>
            </div>
        )
    }
}