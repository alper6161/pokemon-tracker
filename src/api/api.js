import axios from 'axios';
import {formatToThreeDigits} from '../utils/common'

export const getPokemonList = () => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=60`).then(resp => {
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
            return resp;
        });
    } catch (error) {
        console.error(error);
    }
    return {}
}

export const getPokemonAbilitiesById = (pokeId) => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/ability/${pokeId}`).then(resp => {
            return resp;
        });
    } catch (error) {
        console.error(error);
    }
}

export const getPokemonSpeciesById = (pokeId) => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`).then(resp => {
            return resp;
        });
    } catch (error) {
        console.error(error);
    }
}

export const genericGetterService = (url) => {
    try {
        return axios.get(`${url}`).then(resp => {
            return resp.data;
        });
    } catch (error) {
        console.error(error);
    }
}
