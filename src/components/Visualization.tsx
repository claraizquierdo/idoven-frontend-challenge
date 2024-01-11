import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import Papa from 'papaparse';
import { useContext, useEffect } from "react";

import Loading from './Loading';
import VisualizationContext, { ACTIONS, Row, Context } from '../context/VisualizationContext';


function Visualization() {
  const { state, dispatch } = useContext(VisualizationContext) as Context;
  const { data, isLoading } = state;

  useEffect(() => {
    if (data.length === 0) {
      dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: true });
      let myTemporalData: Row[] = [];

      Papa.parse("14-29-05_data_data.csv", {
        download: true,
        dynamicTyping: true,
        fastMode: true,
        header: true,
        chunk: function (results) {
          if (results.data && results.data.length) {
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
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ mb: 5 }}>
            <LineChart
              // @ts-ignore
              dataset={data}
              xAxis={[{ dataKey: 'time' }]}
              yAxis={[{ dataKey: 'signal' }]}
              series={[{ dataKey: 'signal', showMark: false, }]}
              height={600}
              width={1200}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default Visualization;