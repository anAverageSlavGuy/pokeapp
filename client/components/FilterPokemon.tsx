import * as React from 'react';
import { Team } from '../types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type TypesList = {
  data: Team[],
  callBack: (list: string[]) => void;
}

export default function FilterPokemon({ data, callBack }: TypesList) {

  const [pokemonTypeList, setPokemonTypeList] = React.useState<string[]>([]);
  const [allTypes, setAllTypes] = React.useState<string[]>([]);

  React.useEffect(() => {

    const initializeList = () => {

      var pokemonTypes: string[] = [];

      data.forEach((team) => {
        var arr: string[] = [];
        for (let i = 0; i < team.pokemons.length; i++) {
          let types = team.pokemons[i].types.split(/[\s,]+/);
          arr = [...new Set([...arr, ...types])];
        }

        pokemonTypes = [...new Set([...pokemonTypes, ...arr])];

      });

      console.log("types", pokemonTypes);
      setAllTypes(pokemonTypes);
    }

    initializeList()
  }, [])



  React.useEffect(() => {
    callBack(pokemonTypeList);
  }, [pokemonTypeList])



  const handleChange = (event: SelectChangeEvent<typeof pokemonTypeList>) => {
    const {
      target: { value },
    } = event;
    setPokemonTypeList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Pokemon Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={pokemonTypeList}
          onChange={handleChange}
          input={<OutlinedInput label="Pokemon Type" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {allTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={pokemonTypeList.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}