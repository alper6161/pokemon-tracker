import React, {useEffect, useState} from 'react';
import {genericGetterService, getPokemonAbilitiesById, getPokemonById, getPokemonSpeciesById} from "@/api/api";
import {useRouter} from "next/router";
import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {systemColors} from "@/utils/constants";
import {StatChart} from "@/components/StatChart";

const Pokemon = () => {
    const router = useRouter();
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [evolutionDetails, setEvolutionDetails] = useState([]);
    const [pokemonSpecies, setPokemonSpecies] = useState({});

    useEffect(() => {
        if (router.query.id) {
            getPokemonById(router.query.id).then(resp => {
                setPokemonDetails(resp.data);
                console.log(resp.data);
            });
            getPokemonSpeciesById(router.query.id).then(resp => {
                setPokemonSpecies(resp.data);
                genericGetterService(resp.data.evolution_chain.url)
                    .then(chainDetails => {
                        const evolutions = [];
                        let chainStart = chainDetails.chain;
                        let index = 0;
                        while (chainStart?.species?.name) {
                            const pokeId = chainStart.species.url.split('/')[6];
                            evolutions.push(
                                {
                                    name: chainStart.species.name,
                                    image: <img src={`/pokemons/${formatToThreeDigits(pokeId)}.png`}
                                                alt={chainStart?.species?.name} height='170px'/>,
                                    pokeId
                                })
                            chainStart = chainStart.evolves_to[0];
                            index++;
                        }
                        setEvolutionDetails(evolutions);
                    });
            });
        }
    }, [router.query.id]);


    const getPokemonHeader = () => (
        <div style={{
            maxHeight: '3rem',
            fontWeight: 'bolder',
            fontSize: '30px',
            position: 'relative'
        }} className="centered">
            {
                router.query.id - 1 > 0 &&
                <IconButton style={{position: 'absolute', left: '2rem'}}
                            onClick={() => router.push(`/pokemon/${parseInt(router.query.id) - 1 || 1}`)}>
                    <NavigateBefore/>
                </IconButton>
            }
            {capitilazeFirstLetter(pokemonDetails.name)} #{formatToThreeDigits(pokemonDetails.id)}
            <IconButton style={{position: 'absolute', right: '2rem'}}
                        onClick={() => router.push(`/pokemon/${parseInt(router.query.id) + 1}`)}>
                <NavigateNext/>
            </IconButton>
        </div>);

    const getTypeContainer = (types) => (
        <div style={{flex: 1, flexDirection: 'column'}}>
            <h2>Types:</h2>
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
    );

    const getAbilityContainer = (abilities) => (
        <div style={{flex: 1, flexDirection: 'column'}}>
            <h2>Abilities:</h2>
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
    );

    const getDetailsContainer = () => (
        <div style={{flex: 1, flexDirection: 'column'}}>
            <h2>Details:</h2>
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
                    {pokemonDetails.weight /10} kg
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
    );

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            {
                pokemonDetails?.name ?
                    (<>
                            {getPokemonHeader()}
                            <div style={{flex: 1, display: 'flex', margin: '1rem'}}>
                                <div className="details-card" style={{alignItems: 'center'}}>
                                    <div style={{flex: 2}} className="centered">
                                        <img src={`/pokemons/${formatToThreeDigits(pokemonDetails.id)}.png`}
                                             alt={pokemonDetails.name} height='340px'/>
                                    </div>
                                    <div className="details-card" style={{flexDirection: 'column'}}>
                                        {getDetailsContainer()}
                                        {getAbilityContainer(pokemonDetails.abilities)}
                                        {getTypeContainer(pokemonDetails.types)}
                                    </div>
                                </div>
                                <div className="details-card">
                                    <h2>Stats:</h2>
                                    <StatChart data={pokemonDetails?.stats} name={pokemonDetails?.name}></StatChart>
                                </div>
                            </div>
                            <div style={{
                                flex: 1,
                                background: systemColors.darkGray,
                                display: 'flex',
                                alignItems: 'center',
                                margin: '1rem',
                                borderRadius: '2rem'
                            }}>
                                {
                                    evolutionDetails?.map((evolution, index) => <>
                                            <div className="centered"
                                                 style={{
                                                     flex: 1,
                                                     color: 'white',
                                                     flexDirection: 'column',
                                                     cursor: 'pointer'
                                                 }}
                                                 onClick={() => router.push(`/pokemon/${evolution.pokeId}`)}>
                                                <div style={{
                                                    padding: '1.5rem',
                                                    border: '1px solid white',
                                                    background: evolution.name === pokemonDetails.name ? systemColors.yellow : 'gray',
                                                    borderRadius: '10rem'
                                                }}>
                                                    {evolution.image}
                                                </div>
                                                {capitilazeFirstLetter(evolution.name)}
                                            </div>
                                            {
                                                index < evolutionDetails.length - 1 &&
                                                <NavigateNext sx={{color: 'white', fontSize: '96px'}}>
                                                </NavigateNext>
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </>
                    ) :
                    <div className="centered" style={{flex: 1}}>
                        <div className="loading"></div>
                    </div>
            }
        </div>
    );
};

export default Pokemon
