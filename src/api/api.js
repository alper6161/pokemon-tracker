import axios from 'axios';
import {formatToThreeDigits} from '../utils/common'

export const getPokemonList = () => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=905`).then(resp => {
            return resp.data.results.map((pokemon, index) => ({
                ...pokemon,
                originalId: index + 1,
                id: formatToThreeDigits(index + 1),
            }));
        });
    } catch (error) {
        console.error(error);
    }
    return {}
}

export const getPokemonById = (pokeId) => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(resp => {
            console.log(resp);
            return resp;
        });
    } catch (error) {
        console.error(error);
    }
    return {}
}