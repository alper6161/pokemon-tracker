import React, {useEffect, useState} from 'react';
import {genericGetterService, getPokemonById, getPokemonSpeciesById} from "@/api/api";
import {useRouter} from "next/router";
import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {StatChart} from "@/components/StatChart";
import {getPokemonDetailView, prepareEvolutions} from "@/utils/pokemon";
import {EvolutionContainer} from "@/components/EvolutionContainer";
import {systemColors} from "@/utils/constants";

export const Pokemon = () => {
    const router = useRouter();
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [evolutionDetails, setEvolutionDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.query.id) {
            setIsLoading(true);
            getPokemonById(router.query.id).then(resp => {
                setPokemonDetails(resp.data);
                setIsLoading(false);
            });
            getPokemonSpeciesById(router.query.id).then(resp => {
                genericGetterService(resp.data.evolution_chain.url)
                    .then(chainDetails => {
                        setEvolutionDetails(prepareEvolutions(chainDetails));
                    });
            });
        }
    }, [router.query.id]);


    const getPokemonHeader = () => (
        <div style={{
            maxHeight: '3rem',
            fontWeight: 'bolder',
            padding: '1rem 0',
            fontSize: '30px',
            position: 'relative'
        }} className="centered">
            {
                router.query.id - 1 > 0 &&
                <IconButton style={{position: 'absolute', left: '2rem'}}
                            onClick={() => router.push(`/pokemon/${parseInt(router.query.id) - 1 || 1}`)}>
                    <NavigateBefore fontSize="large"/>
                </IconButton>
            }
            {capitilazeFirstLetter(pokemonDetails.name)} #{formatToThreeDigits(pokemonDetails.id)}
            <IconButton style={{position: 'absolute', right: '2rem'}}
                        onClick={() => router.push(`/pokemon/${parseInt(router.query.id) + 1}`)}>
                <NavigateNext fontSize="large"/>
            </IconButton>
        </div>);

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            {
                !isLoading && pokemonDetails?.name ?
                    (<>
                            {getPokemonHeader()}
                            <div style={{flex: 1, display: 'flex', margin: '1rem'}}>
                                <div className="details-card" style={{alignItems: 'center'}}>
                                    <div style={{flex: 2}} className="centered">
                                        <img src={`/pokemons/${formatToThreeDigits(pokemonDetails.id)}.png`}
                                             alt={pokemonDetails.name} height='340px'/>
                                    </div>
                                    <div className="details-card" style={{flexDirection: 'column'}}>
                                        {getPokemonDetailView(pokemonDetails)}
                                    </div>
                                </div>
                                <div className="details-card">
                                    <h2>Stats:</h2>
                                    <StatChart data={pokemonDetails?.stats} name={pokemonDetails?.name}></StatChart>
                                    <Button variant='contained'
                                            style={{
                                                position: 'absolute',
                                                background: systemColors.yellow,
                                                top: '.5rem',
                                                right: '.5rem'
                                            }}
                                            onClick={() => router.push(`/comparison?id=${pokemonDetails.id}`)}
                                    >
                                        Compare
                                    </Button>
                                </div>
                            </div>
                            <EvolutionContainer evolutionDetails={evolutionDetails} name={pokemonDetails.name}/>
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
