import React from "react";
import {Link, withRouter} from "react-router-dom";



const pokemon = require("../server/db/pokemon");

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }

    countPokemonInDB() {
        return pokemon.countPokemonAvailable();
    }


    notLoggedInHTML() {
        const amount = this.countPokemonInDB();
        return(
            <React.Fragment>
                <div className={"main_container"}>
                    <h2 className={"home_title"}>Welcome to Pokemon Collection</h2>
                    <div className={"description"}>
                        <b>Hello and welcome to Pokemon Collection.</b> <p>On this website you mission
                        is to get loot boxes containing 3 pokemon cards inside. These three will be
                        chosen out of {amount} random pokemon available. Catch'em all!</p>
                    </div>
                    <div className={"little_description"}>
                        To start the game you need to make an account or log in to you existing account
                    </div>
                </div>
            </React.Fragment>
        )
    }

    loggedInHTML() {
        console.log(this.props.user)
        const user = `Welcome ${this.props.user}`

        return(
            <React.Fragment>
                <div className={"main_container"}>
                    <h2 className={"home_title"}>{user}</h2>
                    <div>
                        <Link className={"link bck_blue"} to={"/collection"}>
                            My Collection
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    renderPokemon() {
        const pokeArray = pokemon.getAllPokemon();

        return (
            <table className={"pokemon_table"}>
                <thead className={"table_head"}>
                <tr className={"tablehead_row"}>
                    <th>Name</th>
                    <th className={"border_left_white"}>Type 1</th>
                    <th className={"border_left_white"}>Type 2</th>
                </tr>
                </thead>
                <tbody className={"tablebody"}>
                {pokeArray.map((poke) => (
                    <tr className={"tablerow"} key={poke.name}>
                        <td className={"tb_name"}>{poke.name}</td>
                        <td className={`border_left_white ${poke.type[0]}`}>
                            {poke.type[0]}
                        </td>
                        <td className={`border_left_white ${poke.type[1]}`}>
                            {poke.type[1]}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    render() {

        let html;
        const user = this.props.user;

        if(user) {
            html = this.loggedInHTML();
        } else {
            html = this.notLoggedInHTML();
        }
        return(
            <>
                {html}
                <div className={"home_small_title"}>Available pokemon is in table below</div>
                <div className={"pokemon_collection"}>
                    {this.renderPokemon()}
                </div>
            </>
        )
    }
}