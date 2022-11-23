import React, { useState, useEffect } from 'react'
import { Team, Pokemon } from '../../types';
import PokemonList from '../../components/PokemonList'
import FilterPokemon from '../../components/FilterPokemon'
import ToggleTeamsOrder from '../../components/ToggleTeamsOrder'
import { Container, Stack, Link, Paper, Divider, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    data: Team[]
};


export default function List({ data }: Props) {

    const [teams, setTeams] = useState<Team[]>(data);

    useEffect(() => {
        var newTeams: Team[] = [];
        teams.forEach((team) => {
            newTeams.push({ ...team, pokemonTypes: getTypesList(team.id), visible: true });
        });
        setTeams(newTeams);
    }, [])


    const getTypesList = (id: number) => {

        let team = teams.find(team => team.id === id);
        var arr: string[] = [];
        if (team) {
            for (let i = 0; i < team.pokemons.length; i++) {
                let types = team.pokemons[i].types.split(/[\s,]+/);
                arr = [...new Set([...arr, ...types])];
            }
        }

        return arr;
    }


    const handleCallbackFilter = (list: string[]): void => {
        console.log('callback', list)
        let visibleTeams: Team[] = [];

        if (list.length) {
            teams.forEach((team) => {

                let types: string[] | undefined = team.pokemonTypes?.filter((type => list.includes(type)));
                if (types?.length) {
                    console.log('team', team.id, 'is visible');
                    visibleTeams.push({ ...team, visible: true });
                } else {
                    console.log('team', team.id, 'is not visible');
                    visibleTeams.push({ ...team, visible: false });
                }
            });
        } else {
            teams.forEach((team) => {
                visibleTeams.push({ ...team, visible: true });
            });
        }

        setTeams(visibleTeams);
    }


    const handleCallbackOrder = (state: string): void => {
        var newTeams: Team[] = [];

        if (state == "asc") {
            newTeams = [...teams].sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt)
            })

        } else {
            newTeams = [...teams].sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
        }

        console.log('set team order', state)
        console.log(newTeams);
        setTeams(newTeams);

    }

    return (
        <Container maxWidth='xl' sx={{ width: '100%' }}>
            <div className="tools">
                <FilterPokemon data={teams} callBack={handleCallbackFilter} />
                <ToggleTeamsOrder callBack={handleCallbackOrder} />
            </div>
            <Stack spacing={2} className="teams-stack">
                {teams.map((team) => (
                    <Link key={team.id} href={`/team/${team.id}`} style={{ 'display': team.visible ? `block` : 'none' }}>
                        <Item className="team-container">
                            <Typography
                                variant="h6"
                                noWrap
                                component="p"
                                sx={{
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    margin: '8px 0 0 0',
                                    borderTopLeftRadius: '8px',
                                    borderTopRightRadius: '8px',
                                    background: '#1976d2',
                                    color: 'white'
                                }}
                            >{team.name}</Typography>
                            <Divider />
                            {team.pokemons.length ?
                                (<Box className="team-body" sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
                                    <PokemonList teamId={team.id} pokemons={team.pokemons} canDelete={false}/>

                                    <Box className="info" sx={{ flexDirection: { xs: 'row', lg: 'column' }, alignItems: { xs: 'flex-start', lg: 'center' } }}>
                                        <div className="base-exp">
                                            <h4>Experience</h4>
                                            <span>
                                                {
                                                    team.pokemons.reduce((s, a) => s + a.baseExp, 0)
                                                }
                                            </span>
                                        </div>
                                        <div className="base-exp">
                                            <h4>Types</h4>
                                            <ul style={{ overflow: 'scroll', height: '100%' }}>
                                                {
                                                    team.pokemonTypes?.map((val) => {
                                                        return (
                                                            <li key={val}> &#9679; {val}</li >
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </Box>
                                </Box>) : (<h2>No pokemons</h2>)
                            }
                        </Item></Link>
                ))}
            </Stack>
        </Container>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '16px 0',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/team`);
    const data = (await res.json()) as Team[];
    return { props: { data } }
}