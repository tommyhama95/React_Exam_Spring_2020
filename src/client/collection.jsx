import React from "react";

const {getAllPokemon} = require("../server/db/pokemon");

/********************************************************************
 *    Most of code for fetching data and more from API is taken     *
 *          and based on code from lecture by lecturer:             *
 *                      arcuri82 on Github                          *
 ********************************************************************/
/** Link:https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/match.jsx **/

export class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            this.getLootBox(); // loads up 1 lootbox at the time
            this.updateTable(); // Updates table wether loot opened or not
        } else {
            this.props.history.push("/");
        }
    }

    // Async function to call for 1 lootbox to be ready for opening
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

        // User not in session or logged in, forced to home page
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

        /*** Self written code ***/
        if(lootBox.loot === "EMPTY") {
            // User is out of lootboxes
            this.setState({loot: null, lootMsg: true, available: null});
        } else {
            // User still has lootbox available
            this.setState({
                loot: lootBox.loot, lootMsg: false, available: lootBox.available
            });
        }
    }

    // When user is empty if available lootboxes and requestes another one
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

        // User not in session or logged in, forced to home page
        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        // Lootbox was added to user because of unkown reason
        if(response.status !== 201) {
            this.setState({errorMsg:
                `Error when connecting to server: Status code: ${response.status}`
            });
            return;
        }

        // Lootbox available to get
        this.setState({lootMsg: null});
        this.getLootBox();
    }

    // Opens loot from this state earlier retrieved from getLootBox function
    openLoot = async () => {
        const {loot} = this.state;

        const pokemon = loot.item;
        const lootId = loot.id

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

        // User not in session or logged in, forced to home page
        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        // Unkown status happened while deleting lootId from user
        if(response.status !== 201){
            console.log(response.status);
        }

        // LootId is deleted, show pokemon and save them to user
        this.setState({pokemon: pokemon, buttonClass: "button_hide", loot: null});
        await this.addToStorage();
    }

    // Save the revealed Pokemon on users pokestorage db
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

        // User not in session or logged in, forced to home page
        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        // Unkown error happened while saving pokemon to pokeStorage
        if(response.status !== 201) {
            this.setState({errorMsg:
                    `Error when connecting to server: Status code: ${response.status}`
            });
            return ;
        }

        // Show update to catched table
        await this.updateTable();
    }


    // Get Pokemon from pokestorage to render what is aquired and not
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

        // User not in session or logged in, forced to home page
        if(response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        // Did not get pokemons from pokeStorage db for unkown reason
        if(response.status !== 200) {
            this.setState({errorMsg:
                    `Error when connecting to server: Status code: ${response.status}`
            });
            return ;
        }

        // Update state for tableContent to be loaded on webpage
        const payload = await response.json();
        this.setState({tableContent: payload});
    }

    // HTML for when user can open a Lootbox
    /*** Self written code ***/
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

    // Renders same table as in Home page, but with aquired pokemons updated
    /*** Self written code ***/
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

    /*** Self written code ***/
    render() {
        const lootBox = this.state.loot;

        let lootHTML = <div></div>;
        if(lootBox) {
            lootHTML = this.renderLootElements();
        }

        // What is state lootMsg?
        // lootMsg is when the user is out of lootboxes to open.
        // When that happens this lootHTMl version will be rendered.
        if(this.state.lootMsg) {
            lootHTML =
                <div className={"loot_opened"}>
                    <button className={"coll_button button"}
                        onClick={this.getAnotherLootItem}>Buy one more</button>
                    <div className={"loot_amount"}>You are out of Lootboxes for Pokemon =(</div>
                </div>
        }


        let openedLoot = <div></div>;
        const pokemon = this.state.pokemon;

        // What is state pokemon?
        // The 3 pokemon obtained from Lootbox opened
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