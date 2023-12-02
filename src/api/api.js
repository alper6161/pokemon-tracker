import axios from 'axios';
import {formatToThreeDigits} from '../utils/common'

export const getPokemonList = () => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=60`).then(resp => {
            return resp.data.results.map((pokemon, index) => ({
                ...pokemon,
                id: formatToThreeDigits(index + 1),
            }));
        });
    } catch (error) {
        console.error(error);
    }
    return {}
}