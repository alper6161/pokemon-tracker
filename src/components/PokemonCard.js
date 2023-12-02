export const PokemonCard = ({pokemon}) => (
    <div className="pokemon-card">
        <div className="centered" style={{flex: 3}}>
            <img src={`/pokemons/${pokemon.id}.png`} alt={pokemon.name} height='170px'/>
        </div>
        <div className="centered" style={{flex: 1}}>
            <h3>{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</h3>
        </div>
        <div className="centered" style={{flex: 1}}>
            {
                pokemon?.type &&
                <img src={`/elements/${pokemon.type.toLowerCase()}.svg`} alt={pokemon.name} height='15px'/>
            }
        </div>
    </div>
);
