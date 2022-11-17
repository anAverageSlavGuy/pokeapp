import React from 'react'
import { Pokemon, ColorTypes } from '../types';
import Image from 'next/image'
import imageLoader from '../imageLoader'
import { Typography, Paper } from '@mui/material';

declare type ColorType = keyof typeof ColorTypes;

type Props = {
    pokemons: Pokemon[]
    title?: string
}

function PokemonList({ pokemons, title }: Props) {

    const cardColor = (types: string): string => {
        const pokemonType: string = types.split(',')[0];
        let enumdata = ColorTypes[pokemonType as ColorType];
        return enumdata;
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
                                    <div key={pokemon.id} className="pokemon-container" style={{ backgroundColor: cardColor(pokemon.types), maxWidth: '134px'}}>
                                        <div className="pokemons-background"></div>
                                        <Image loader={imageLoader} unoptimized alt={pokemon.name} src={pokemon.imageFront} height="100" width="100" />
                                        <label className="pokemon-number" style={{ backgroundColor: cardColor(pokemon.types)}}>#{String(pokemon.id).padStart(3, '0')}</label>
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