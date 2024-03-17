import {formatToThreeDigits} from "@/utils/common";
import React from "react";

export const prepareEvolutions = (chainResponse) => {
    const evolutions = [];
    let chainStart = chainResponse.chain;
    let index = 0;
    while (chainStart?.species?.name) {
        const pokeId = chainStart.species.url.split('/')[6];
        evolutions.push(
            {
                name: chainStart.species.name,
                image: <img src={`/pokemons/${formatToThreeDigits(pokeId)}.png`}
                            alt={chainStart?.species?.name} height='150px'/>,
                pokeId
            })
        chainStart = chainStart.evolves_to[0];
        index++;
    }
    return evolutions;
};

