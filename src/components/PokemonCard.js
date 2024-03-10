import {useRouter} from 'next/router';

export const PokemonCard = ({pokemon}) => {
    const router = useRouter();

    return (
        <div className="pokemon-card"  style={{cursor: 'pointer'}} onClick={() => router.push(`/pokemon/${pokemon.originalId}`)}>
            <div style={{position: 'absolute', left: '.5rem', top: '.5rem'}}>
                #{pokemon.id}
            </div>
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
};
