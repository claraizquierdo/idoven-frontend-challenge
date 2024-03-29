import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Papa from 'papaparse';
import { useState, useContext, ChangeEventHandler } from "react";
import VisualizationContext, { ACTIONS } from '../context/VisualizationContext';
import { concatData } from "../utils/utils"

function parseChunk(chunk: string[]): Int16Array {
  const result = new Int16Array(chunk.length);
  chunk.forEach((line, i) => {
    result[i] = parseInt(line[1]);
  });
  return result;
}

const InputFile = () => {
  const [readLines, setReadLines] = useState(0);

  const { dispatch } = useContext(VisualizationContext)!;

  const handleFileChange: ChangeEventHandler<| HTMLInputElement> = (event) => {
    const file = event?.target?.files![0];

    dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: true });
    let firstLineremoved = false;
    const setOfArrays: Array<Int16Array> = [];

    Papa.parse(file, {
      fastMode: true,
      chunk: function (results) {
        if (results.data && results.data.length) {

          if (!firstLineremoved) {
            results.data.shift();
            firstLineremoved = true;
          }
          setReadLines(v => v + results.data.length);

          const parsedArray = parseChunk(results.data as string[]);
          setOfArrays.push(parsedArray);
        }

      },
      complete: function () {
        const totalData = concatData(setOfArrays);
        dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: false });
        dispatch({ type: ACTIONS.UPDATE_ORIGINAL_DATA, payload: totalData })
      }
    });
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 8
    }}>
      <Typography variant="h6">Please, upload the CSV file you want to visualize:</Typography>
      <Input
        sx={{ pt: 2 }}
        type="file"
        onChange={handleFileChange}
        placeholder="Select your file"
        inputProps={{accept: '.csv'}}
      ></Input>
      <Box sx={{ pt: 2 }}>
        <span>Processed lines: {readLines}</span>
      </Box>
    </Box>
  );
}

export default InputFile;