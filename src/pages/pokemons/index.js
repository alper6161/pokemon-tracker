import React, {useEffect, useState} from 'react';
import {PokemonGrid} from "@/components/PokemonGrid";
import {getPokemonList} from "@/api/api";

const Pokemons = () => {
    const [pokemonList, setPokemonList] = useState([]);
    useEffect( () => {
        getPokemonList().then(resp => {
            setPokemonList(resp);
        })
    }, [])

    return (
        <div style={{overflow: 'hidden'}}>
            <div className="centered">
                <img src={'/pokemon_logo.png'} alt={'Pokemon'} height={'100px'} />
            </div>
            <PokemonGrid pokemonList={pokemonList} />
        </div>
    );
};

export default Pokemons