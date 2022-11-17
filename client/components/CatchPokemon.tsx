import React, { useState } from 'react'
import { Pokemon, PokemonAbility, PokemonType, ColorTypes } from '../types';
import imageLoader from '../imageLoader'
import Image from 'next/image'
import { Button, Typography } from '@mui/material';
import CatchingPokemonRoundedIcon from '@mui/icons-material/CatchingPokemonRounded';

declare type ColorType = keyof typeof ColorTypes;

type Props = {
    teamId: number
    callBack: (pokemon: Pokemon) => Pokemon
}

function CatchPokemon({ teamId, callBack }: Props) {

    const [pokemon, setPokemon] = useState<Pokemon>();
    const [failed, setFailed] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const handleClick = () => {

        const randomId = Math.floor(Math.random() * 999) + 1;
        setSpinning(true);
        setTimeout(async function () {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`, {
                    method: 'GET'
                });

                const result = await res.json();
                let pokemonImage = result?.sprites?.other?.dream_world?.front_default || result?.sprites?.other['official-artwork']?.front_default;

                let pokemon: Pokemon = {
                    id: result?.id,
                    name: result?.name,
                    baseExp: result?.base_experience,
                    imageFront: pokemonImage,
                    imageBack: pokemonImage,
                    abilities: result?.abilities.map((x: PokemonAbility) => x.ability.name).join(", "),
                    types: result?.types.map((x: PokemonType) => x.type.name).join(", ")
                };

                setPokemon(pokemon);
                setFailed(false);
                await addPokemonToTeam(teamId, pokemon);
            } catch (err) {
                setFailed(true);
                console.log(err);
            }

            setSpinning(false);
        }, 2000);
    };


    const addPokemonToTeam = async (teamId: number, pokemon: Pokemon) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/pokemon/${teamId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemon)
        });

        const result = await res.json();
        console.log(result);
        callBack(pokemon);
    }


    const cardColor = (types: string): string => {
        const pokemonType: string = types.split(',')[0];
        let enumdata = ColorTypes[pokemonType as ColorType];
        return enumdata;
    }


    return (
        <>
            <Button className="catch-pokemon-button" disabled={spinning} variant="contained" onClick={handleClick}>Gotta Catch 'Em All</Button>

            <div className="pokemon-catch-process">

                {(pokemon && !failed && !spinning) ?
                    (<div key={pokemon.id} className="pokemon-container" style={{ margin: 'auto', width: '300px', backgroundColor: cardColor(pokemon.types) }}>
                        <div className="pokemons-background"></div>
                        <Image loader={imageLoader} unoptimized alt={pokemon.name} src={pokemon.imageFront} height="100" width="100" />
                        <label className="pokemon-number" style={{ backgroundColor: cardColor(pokemon.types) }}>#{String(pokemon.id).padStart(3, '0')}</label>
                        <p className="pokemon-name">{pokemon.name}</p>
                        <p className="pokemon-ability"><b>Base Experience:</b> {pokemon.baseExp}</p>
                        <p className="pokemon-ability"><b>Abilities:</b> {pokemon.abilities}</p>
                        <p className="pokemon-type"><b>Types:</b> {pokemon.types}</p>
                    </div>) : (
                        <CatchingPokemonRoundedIcon className={spinning ? `pokeball-spinning` : `pokeball`} sx={{ display: { xs: 'flex', md: 'flex' } }} />
                    )
                }
            </div>

            {(failed && !spinning) &&
                <Typography
                    variant="h5"
                    noWrap
                    component="p"
                    sx={{
                        fontWeight: 500,
                        textAlign: 'center',
                        color: 'black',
                        marginTop: '32px'
                    }}
                >Oh no, you missed it!</Typography>
            }

        </>
    )
}

export default CatchPokemon