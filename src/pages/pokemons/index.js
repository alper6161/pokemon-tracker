import React, {useEffect, useState} from 'react';
import {PokemonGrid} from "@/components/PokemonGrid";
import {getPokemonList} from "@/api/api";

const Pokemons = () => {
    const [pokemonList, setPokemonList] = useState([]);
    useEffect( () => {
        getPokemonList().then(resp => {
            setPokemonList(resp);
        })
    }, []);

    return (
        <div>
            <PokemonGrid pokemonList={pokemonList} />
        </div>
    );
};

export default Pokemons
