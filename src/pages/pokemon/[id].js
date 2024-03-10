import React, {useEffect, useState} from 'react';
import {getPokemonById} from "@/api/api";
import {useRouter} from "next/router";
import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import {IconButton} from "@mui/material";

const Pokemon = () => {
    const router = useRouter();
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
        if (router.query.id) {
            getPokemonById(router.query.id).then(resp => {
                console.log(resp.data);
                setPokemonDetails(resp.data);
            });
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
                            <div style={{flex: 10, display: 'flex'}}>
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