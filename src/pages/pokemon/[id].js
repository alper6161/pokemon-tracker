import React, {useEffect, useState} from 'react';
import {genericGetterService, getPokemonById, getPokemonSpeciesById} from "@/api/api";
import {useRouter} from "next/router";
import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import {IconButton} from "@mui/material";

const Pokemon = () => {
    const router = useRouter();
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [evolutionDetails, setEvolutionDetails] = useState([]);
    const [pokemonSpecies, setPokemonSpecies] = useState({});

    useEffect(() => {
        if (router.query.id) {
            getPokemonById(router.query.id).then(resp => {
                setPokemonDetails(resp.data);
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
            })
        }
    }, [router.query.id])

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            {
                pokemonDetails?.name ?
                    (<>
                            <div style={{
                                flex: 1,
                                maxHeight: '3rem',
                                fontWeight: 'bolder',
                                fontSize: '30px',
                                position: 'relative'
                            }}
                                 className="centered">
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
                            </div>
                            <div style={{flex: 1, display: 'flex'}}>
                                <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                                    <img src={`/pokemons/${formatToThreeDigits(pokemonDetails.id)}.png`}
                                         alt={pokemonDetails.name} height='340px'/>
                                </div>
                                <div style={{
                                    flex: 1,
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    background: 'gray',
                                    color: 'white',
                                    margin: '1rem',
                                    padding: '1rem'
                                }}>
                                    <div>
                                        <span> Height: </span> <span> {pokemonDetails.height}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{flex: 1, background: '#2C3035', display: 'flex', alignItems: 'center', margin: '2rem', borderRadius: '2rem'}}>
                                {
                                    evolutionDetails?.map((evolution, index) => <>
                                            <div className="centered"
                                                 style={{flex: 1, color: 'white', flexDirection: 'column', cursor: 'pointer'}}
                                                 onClick={() => router.push(`/pokemon/${evolution.pokeId}`)}>
                                                <div style={{padding: '1.5rem', border: '1px solid white',
                                                    background: evolution.name === pokemonDetails.name ? '#E1911A' : 'gray', borderRadius: '10rem'}}>
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
