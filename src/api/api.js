import axios from 'axios';


export function getRequest(path) {
    try {
         axios.get( `https://pokeapi.co/api/v2/${path || 'pokemon'}`).then( resp => {
             const pokemonList = resp.data.results;
             console.log(pokemonList);
         });
    } catch (error) {
        console.error(error);
    }
}