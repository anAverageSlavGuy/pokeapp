import { useState } from 'react'
import { Pokemon, Team, TeamParameters } from '../../types';
import CatchPokemon from '../../components/CatchPokemon';
import PokemonList from '../../components/PokemonList';
import Router from 'next/router';
import { Button, Typography, Modal, TextField, Box } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function TeamDetails({ id, name, pokemons }: Team) {

    const [pokemonList, setPokemonList] = useState<Pokemon[]>(pokemons)
    const [openEdit, setOpenEdit] = useState(false)
    const [newName, setNewName] = useState(name)


    const handleClick = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/team/${id}`, {
                method: 'DELETE'
            });

            (await res.json()) as TeamParameters;
            Router.push('/team/list')
        } catch (err) {
            console.log(err);
        }
    };

    const handleCatchCallback = (pokemon: Pokemon): Pokemon => {
        setPokemonList([...pokemons, pokemon]);
        return pokemon;
    }

    const handleTeamEdit = () => {
        setOpenEdit(true);
    };

    const handlePokemonDelete = (pokemons: Pokemon[]) => {
        setPokemonList(pokemons);
    };


    const handleTeamEditClickAway = async () => {
        if (openEdit && newName != '' && newName != name) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/team/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "name": newName })
                });

                (await res.json()) as TeamParameters;
            } catch (err) {
                console.log(err);
                alert('Error creating team, show more in console');
            }
        }
        setOpenEdit(false);
    };

    const handleNameChange = (event: { target: { value: string } }) => {
        setNewName(event.target.value);
    }


    return (
        <>
            {id &&
                <div className="team-details">
                    <Typography
                        variant="h5"
                        noWrap
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textAlign: 'center',
                            color: 'black',
                            marginTop: '32px'
                        }}
                    >{newName}

                        <ModeEditIcon className="edit-team-name-button" sx={{ marginLeft: '16px', marginBottom: '-4px', cursor: 'pointer' }} onClick={handleTeamEdit} />
                    </Typography>

                    <CatchPokemon teamId={id} callBack={handleCatchCallback} />
                    <div style={{ marginBottom: '32px', width: '100%', minHeight: '200px' }}>
                        <PokemonList teamId={id} pokemons={pokemonList} title="Pokemon List" handleDelete={handlePokemonDelete} />
                    </div>
                    <Button className="delete-team-button" variant="contained" onClick={handleClick}>Delete Team</Button>

                    <Modal
                        open={openEdit}
                        onClose={handleTeamEditClickAway}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <TextField
                                id="team-name"
                                label="Team name"
                                variant="outlined"
                                size="small"
                                sx={{ width: '100%' }}
                                onChange={(e) => handleNameChange(e)}
                            />
                        </Box>
                    </Modal>
                </div>

            }
        </>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 4,
    p: 4,
};


export async function getServerSideProps(context: { params: { id: string } }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/team/${context.params.id}`)
    const data = (await res.json()) as Team;
    return { props: data }
}