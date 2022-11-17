import React from 'react'
import { Team } from '../../types';
import PokemonList from '../../components/PokemonList'
import { Container, Stack, Link, Paper, Divider, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
    data: Team[]
};

export default function List({ data }: Props) {


    const typesList = (id: number) => {

        let team = data.find(team => team.id === id);
        if (team) {
            var arr: string[] = [];
            for (let i = 0; i < team.pokemons.length; i++) {
                let types = team.pokemons[i].types.split(/[\s,]+/);
                arr = [...new Set([...arr, ...types])];
                
            }
                return arr;
        }
    }

    return (
        <Container maxWidth='xl' sx={{ width: '100%'}}>
            <Stack spacing={2} className="teams-stack">
                {data.map((team) => (
                    <Link key={team.id} href={`/team/${team.id}`}>
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
                                <PokemonList pokemons={team.pokemons} />

                                <Box className="info" sx={{ flexDirection: { xs: 'row', lg: 'column' }, alignItems: { xs: 'flex-start', lg: 'center' }   }}>
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
                                        <ul style={{overflow: 'scroll', height: '100%'}}>
                                            {
                                                typesList(team.id)?.map((val) => {
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