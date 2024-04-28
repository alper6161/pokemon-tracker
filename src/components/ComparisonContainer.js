import {capitilazeFirstLetter, formatToThreeDigits} from "@/utils/common";
import React from "react";
import {getPokemonDetailView} from "@/utils/pokemon";
import {Autocomplete, IconButton, TextField} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";
import {systemColors} from "@/utils/constants";
import {useRouter} from "next/router";


export const ComparisonContainer = ({pokemonDetails, allPokemons, onPokemonSelect, onCancel}) => {
    const router = useRouter();

    return pokemonDetails ?
        <div className="centered" style={{flex: 1, flexDirection: 'column', position: 'relative'}}>
            <h1 onClick={() => router.push(`/pokemon/${pokemonDetails.id}`)} style={{cursor: 'pointer'}}>
                {capitilazeFirstLetter(pokemonDetails.name)}</h1>
            <img src={`/pokemons/${formatToThreeDigits(pokemonDetails.id)}.png`}
                 alt={pokemonDetails.name} height='340px'/>
            {getPokemonDetailView(pokemonDetails)}
            <IconButton style={{position: 'absolute', right: 0, top: 0, padding: 0, color: systemColors.white}}
                        onClick={onCancel}>
                <CancelOutlined fontSize="large"/>
            </IconButton>
        </div> : <Autocomplete
            disablePortal
            disableListWrap
            disabledItemsFocusable
            size="small"
            id="pokemon-select-box"
            options={allPokemons}
            sx={{width: 300, color: systemColors.white}}
            renderInput={(params) => <TextField
                {...params} placeholder="Search" sx={{borderRadius: '4rem', background: systemColors.white}}/>}
            getOptionLabel={(option) => option.name}
            onChange={onPokemonSelect}
        />
}