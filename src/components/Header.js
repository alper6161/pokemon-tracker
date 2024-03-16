import {useRouter} from "next/router";
import {Autocomplete, TextField} from "@mui/material";
import {getPokemonList} from "@/api/api";
import {useState, useEffect} from "react";
import {systemColors} from "@/utils/constants";

export const Header = () => {
    const router = useRouter();
    const [pokemons, setAllPokemons] = useState([]);

    useEffect( () => {
        getPokemonList().then(resp => {
            setAllPokemons(resp);
        })
    }, []);

    return (
        <div className="centered header-bar" onClick={() => router.push(`/pokemons`)}>
            <img src={'/pokemon_logo.png'} alt={'Pokemon'} height={'85px'}
                 style={{cursor: 'pointer', padding: '.75rem 0'}}/>
            <div style={{position: 'absolute', right: '1rem', background: systemColors.white}}>
                <Autocomplete
                    disablePortal
                    disableListWrap
                    disabledItemsFocusable
                    size="small"
                    id="pokemon-select-box"
                    options={pokemons}
                    sx={{ width: 300, color: systemColors.white }}
                    renderInput={(params) => <TextField
                        {...params} placeholder="Search" sx={{borderRadius: '4rem'}}/>}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                        if(value?.originalId) {
                            router.push(`/pokemon/${value.originalId}`)
                        }
                    }}
                />
            </div>
        </div>
    );
}
