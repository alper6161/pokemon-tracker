import {PokemonCard} from "@/components/PokemonCard";

export const PokemonGrid = ({ pokemonList }) => (
    <div className="pokemon-grid">
        {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
        ))}
    </div>
);