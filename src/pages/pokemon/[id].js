import React, {useEffect, useState} from 'react';
import {genericGetterService, getPokemonById, getPokemonSpeciesById} from "@/api/api";
import {useRouter} from "next/router";
import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {StatChart} from "@/components/StatChart";
import {prepareEvolutions} from "@/utils/pokemon";
import {EvolutionContainer} from "@/components/EvolutionContainer";

export const Pokemon = () => {
    const router = useRouter();
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [evolutionDetails, setEvolutionDetails] = useState([]);

    useEffect(() => {
        if (router.query.id) {
            getPokemonById(router.query.id).then(resp => {
                setPokemonDetails(resp.data);
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
    );

    return (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
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
                            <EvolutionContainer evolutionDetails={evolutionDetails} name={pokemonDetails.name} />
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
