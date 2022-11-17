import { useState } from 'react'
import { Pokemon, TeamParameters } from '../../types';
import CatchPokemon from '../../components/CatchPokemon'
import PokemonList from '../../components/PokemonList'
import { Button, TextField, Container, Typography } from '@mui/material';


export default function Create() {

  const [name, setName] = useState('');
  const [data, setData] = useState<TeamParameters>()
  const [pokemons, setPokemons] = useState<Pokemon[]>([])



  const handleClick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name })
      });

      const result = (await res.json()) as TeamParameters;
      setData(result);
    } catch (err) {
      console.log(err);
      alert('Error creating team, show more in console');
    }
  };

  const handleNameChange = (event: { target: { value: string } }) => {
    setName(event.target.value);
  }

  const handleCatchCallback = (pokemon: Pokemon): Pokemon => {
    setPokemons([{ ...pokemon }, ...pokemons]);
    return pokemon;
  }

  return (
    <Container fixed sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px', maxWidth: '360px' }}>
      <TextField
        id="team-name"
        label="Team name"
        variant="outlined"
        size="small"
        onChange={(e) => handleNameChange(e)}
        sx={{ width: '100%', maxWidth: '300px', marginTop: '32px' }}
      />
      <Button className="create-team-button" variant="contained" onClick={handleClick} sx={{ width: '100%', maxWidth: '300px', marginTop: '16px' }}>Create Team</Button>

      {data &&

        <>
          <CatchPokemon teamId={data.id} callBack={handleCatchCallback} />
          {!pokemons.length &&
            <Typography
              variant="h5"
              noWrap
              component="p"
              sx={{
                fontWeight: 400,
                textAlign: 'center',
                color: 'black',
                marginTop: '64px'
              }}
            ><b>{data.name}</b> <br />successfully created</Typography>
          }
          <div style={{ marginBottom: '32px', width: '100%', minHeight: '200px' }}>
            <PokemonList pokemons={pokemons} title="Pokemon List" />
          </div>
        </>
      }
    </Container>
  )
}