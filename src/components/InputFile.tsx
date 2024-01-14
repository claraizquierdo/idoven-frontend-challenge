import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Papa from 'papaparse';
import { useState, useContext, ChangeEventHandler } from "react";
import VisualizationContext, { ACTIONS, Context } from '../context/VisualizationContext';

function parseChunk(chunk: string[]): Int16Array {
  const result = new Int16Array(chunk.length);
  chunk.forEach((line, i) => {
    result[i] = parseInt(line[1]);
  });
  return result;
}

function concatData(setOfArrays: Array<Int16Array>): Int16Array {
  const len = setOfArrays.reduce((acc, v) => acc + v.length, 0);
  const data = new Int16Array(len);

  let i = 0;
  setOfArrays.forEach(v => {
    data.set(v, i);
    i += v.length;
  });
  return data;
}


const InputFile = () => {
  const [readLines, setReadLines] = useState(0);

  const { dispatch } = useContext(VisualizationContext) as Context;

  const handleFileChange: ChangeEventHandler<| HTMLInputElement> = (event) => {
    //@ts-ignore
    const file = event?.target?.files[0];

    dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: true });
    let firstLineremoved = false;
    const setOfArrays: Array<Int16Array> = [];

    Papa.parse(file, {
      dynamicTyping: true,
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
      ></Input>
      <Box sx={{ pt: 2 }}>
        <span>Processed lines: {readLines}</span>
      </Box>
    </Box>
  );
}

export default InputFile;