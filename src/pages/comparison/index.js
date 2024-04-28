import React, {useEffect, useState} from 'react';
import {getPokemonById, getPokemonList} from "@/api/api";
import {useRouter} from "next/router";
import {WarningAmberOutlined} from "@mui/icons-material";
import {StatChart} from "@/components/StatChart";
import {ComparisonContainer} from "@/components/ComparisonContainer";

export const Comparison = () => {
    const router = useRouter();
    const [allPokemons, setAllPokemons] = useState();
    const [pokemon1, setPokemon1] = useState();
    const [pokemon2, setPokemon2] = useState();

    useEffect(() => {
        getPokemonList().then(resp => {
            setAllPokemons(resp);
        });
        if (router.query.id) {
            getPokemonById(router.query.id).then(resp => {
                setPokemon1(resp.data);
            });
        }
    }, [router.query]);

    const onPokemon1Select = (e, value) => {
        getPokemonById(value.originalId).then(resp => {
            setPokemon1(resp.data);
        });
    }

    const onPokemon2Select = (e, value) => {
        getPokemonById(value.originalId).then(resp => {
            setPokemon2(resp.data);
        });
    }

    return (
        <div style={{flex: 1, display: 'flex'}}>
            <div className="details-card" style={{flex: 2}}>
                <ComparisonContainer pokemonDetails={pokemon1} allPokemons={allPokemons}
                                     onPokemonSelect={onPokemon1Select} onCancel={() => setPokemon1(null)}/>
            </div>
            <div className="centered details-card" style={{flex: 3}}>
                {
                    pokemon1?.stats || pokemon2?.stats ?
                        <StatChart data={pokemon1?.stats || []} data2={pokemon2?.stats || []} name={pokemon1?.name}
                                   name2={pokemon2?.name}></StatChart>
                        : <div className="centered">
                            <WarningAmberOutlined style={{marginRight: '.5rem'}}/>
                            Please select at least one pokemon
                        </div>
                }

            </div>
            <div className="details-card" style={{flex: 2}}>
                <ComparisonContainer pokemonDetails={pokemon2} allPokemons={allPokemons}
                                     onPokemonSelect={onPokemon2Select} onCancel={() => setPokemon2(null)}/>
            </div>
        </div>
    );
};

export default Comparison
