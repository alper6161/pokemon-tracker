import React, {useEffect, useState} from 'react';
import {PokemonGrid} from "@/components/PokemonGrid";
import {getPokemonList} from "@/api/api";

const Pokemons = () => {
    const [pokemonList, setPokemonList] = useState([
        { name: 'Bulbasaur', type: 'Grass', image: 'bulbasaur.jpg' },
        { name: 'Charmander', type: 'Fire', image: 'charmander.jpg' },
        { name: 'Squirtle', type: 'Water', image: 'squirtle.jpg' },
        { name: 'Squirtle', type: 'Water', image: 'squirtle.jpg' },
        { name: 'Squirtle', type: 'Water', image: 'squirtle.jpg' },
    ]);
    useEffect( () => {
        getPokemonList().then(resp => {
            console.log(resp);
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