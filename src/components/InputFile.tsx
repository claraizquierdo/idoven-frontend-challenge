import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Papa from 'papaparse';
import { useState, useContext, ChangeEventHandler } from "react";
import VisualizationContext, { ACTIONS, Row, Context } from '../context/VisualizationContext';


const InputFile = () => {
  const [readLines, setReadLines] = useState(0);

  const { dispatch } = useContext(VisualizationContext) as Context;

  const handleFileChange: ChangeEventHandler<| HTMLInputElement> = (event) => {
    //@ts-ignore
    const file = event?.target?.files[0];

    dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: true });
    let myTemporalData: Row[] = [];

    Papa.parse(file, {
      dynamicTyping: true,
      fastMode: true,
      header: true,
      chunk: function (results) {
        if (results.data && results.data.length) {
          setReadLines(v => v + results.data.length);
          let indexes: number[] = [];

          for (let i = 0; i < 100; i++) {
            indexes.push(Math.floor(i * results.data.length / 100))
          }

          for (let i = 0; i < indexes.length; i++) {

            myTemporalData.push(
              {
                // @ts-ignore
                time: results.data[indexes[i]]["Time"],
                // @ts-ignore
                signal: results.data[indexes[i]]["1"]
              })
          }
        }

      },
      complete: function () {
        dispatch({ type: ACTIONS.UPDATE_DATA, payload: myTemporalData });
        dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: false });
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