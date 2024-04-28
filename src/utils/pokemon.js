import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import React from "react";

export const prepareEvolutions = (chainResponse) => {
    const evolutions = [];
    let chainStart = chainResponse.chain;
    let index = 0;
    while (chainStart?.species?.name) {
        const pokeId = chainStart.species.url.split('/')[6];
        evolutions.push(
            {
                name: chainStart.species.name,
                image: <img src={`/pokemons/${formatToThreeDigits(pokeId)}.png`}
                            alt={chainStart?.species?.name} height='150px'/>,
                pokeId
            })
        chainStart = chainStart.evolves_to[0];
        index++;
    }
    return evolutions;
};

export const getPokemonDetailView = (pokemonDetails) => <>
    {getDetailsContainer(pokemonDetails)}
    {getAbilityContainer(pokemonDetails.abilities)}
    {getTypeContainer(pokemonDetails.types)}
</>

const getTypeContainer = (types) => (
    <div style={{flex: 1}}>
        <h2>Types:</h2>
        <div style={{display: 'flex'}}>
            {
                types.map((type) => (
                    <div key={type.type.name} style={{
                        display: 'flex',
                        width: '8rem',
                        margin: '1rem',
                        border: '1px solid black',
                        padding: '.25rem',
                        borderRadius: '3rem',
                        borderColor: 'white'
                    }}>
                        <img src={`/elements/${type.type.name}.svg`}
                             alt={type.type.name} height='40px' style={{flex: 1}}/>
                        <div className='centered' style={{flex: 1}}>
                            {capitilazeFirstLetter(type.type.name)}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
);

const getAbilityContainer = (abilities) => (
    <div style={{flex: 1}}>
        <h2>Abilities:</h2>
        <div style={{display: 'flex'}}>
            {
                abilities.map((ability) => (
                    <div key={ability.ability.name} style={{
                        display: 'flex',
                        width: '8rem',
                        margin: '1rem',
                        border: '1px solid black',
                        padding: '.25rem',
                        borderRadius: '3rem',
                        borderColor: 'white'
                    }}>
                        <div className='centered' style={{flex: 1}}>
                            {capitilazeFirstLetter(ability.ability.name)}
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
);

const getDetailsContainer = (pokemonDetails) => (
    <div style={{flex: 1, flexDirection: 'column'}}>
        <h2>Details:</h2>
        <div style={{display: 'flex'}}>
            <div key='weight' style={{
                display: 'flex',
                width: '8rem',
                margin: '1rem',
                border: '1px solid black',
                padding: '.25rem',
                borderRadius: '3rem',
                borderColor: 'white'
            }}>
                <div className='centered' style={{flex: 1}}>
                    {capitilazeFirstLetter('Weight')}
                </div>
                <div className='centered' style={{flex: 1}}>
                    {pokemonDetails.weight / 10} kg
                </div>
            </div>
            <div key='height' style={{
                display: 'flex',
                width: '8rem',
                margin: '1rem',
                border: '1px solid black',
                padding: '.25rem',
                borderRadius: '3rem',
                borderColor: 'white'
            }}>
                <div className='centered' style={{flex: 1}}>
                    {capitilazeFirstLetter('Height')}
                </div>
                <div className='centered' style={{flex: 1}}>
                    {pokemonDetails.height} m
                </div>
            </div>
        </div>
    </div>
);

