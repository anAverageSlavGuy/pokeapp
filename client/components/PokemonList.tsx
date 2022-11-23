import React, { useState } from 'react'
import { Pokemon, ColorTypes, TeamPokemonParameters } from '../types';
import Image from 'next/image'
import imageLoader from '../imageLoader'
import { Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

declare type ColorType = keyof typeof ColorTypes;

type Props = {
    teamId: number
    pokemons: Pokemon[]
    title?: string
    handleDelete: (pokemons: Pokemon[]) => void
    canDelete?: boolean
}

function PokemonList({ teamId, pokemons, title, handleDelete, canDelete = true }: Props) {

    console.log(pokemons);


    const cardColor = (types: string): string => {
        const pokemonType: string = types.split(',')[0];
        let enumdata = ColorTypes[pokemonType as ColorType];
        return enumdata;
    }

    const deletePokemon = async (e: { preventDefault: () => void }, pokemonId: number) => {
        e.preventDefault();
        console.log(teamId, pokemonId)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/teamPokemon`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "teamId": teamId, "pokemonId": pokemonId })
        });

        const result = (await res.json()) as TeamPokemonParameters;
        let newPokemons = pokemons.filter(p => p.id != result.pokemonId)
        handleDelete(newPokemons);
    }

    return (
        <>
            {pokemons.length > 0 ? (
                <div style={{ width: '100%', overflow: 'hidden', flex: 8 }}>
                    {title && <Typography
                        variant="h6"
                        noWrap
                        component="p"
                        sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                            color: 'black',
                            marginTop: '32px',
                            padding: '16px 0',
                        }}
                    >{title}</Typography>
                    }
                    <Paper elevation={1} className="pokemons" sx={{ margin: '0 16px', justifyContent: { xs: 'flex-start' } }}>
                        {
                            pokemons.map(pokemon => {
                                return (
                                    <div key={pokemon.id} className="pokemon-container" style={{ backgroundColor: cardColor(pokemon.types), maxWidth: '134px' }}>
                                        { canDelete && <DeleteIcon className="delete-pokemon-button" sx={{ position: 'absolute', top: '4px', right: '4px', zIndex: 2 }} onClick={(e) => deletePokemon(e, pokemon.id)} />}
                                        <div className="pokemons-background"></div>
                                        <Image loader={imageLoader} unoptimized alt={pokemon.name} src={pokemon.imageFront} height="100" width="100" />
                                        <label className="pokemon-number" style={{ backgroundColor: cardColor(pokemon.types) }}>#{String(pokemon.id).padStart(3, '0')}</label>
                                        <p className="pokemon-name">{pokemon.name}</p>
                                        <p className="pokemon-type">{pokemon.types}</p>
                                    </div>
                                )

                            })
                        }
                    </Paper>
                </div>) : (
                <Typography
                    variant="h6"
                    noWrap
                    component="p"
                    sx={{
                        fontWeight: 500,
                        textAlign: 'center',
                        color: 'black',
                        marginTop: '32px'
                    }}
                >This team doesn't have any pokemon yet</Typography>
            )

            }
        </>
    )
}

export default PokemonList