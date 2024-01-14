import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import Papa from 'papaparse';
import { useContext, useEffect, useMemo } from "react";

import Loading from './Loading';
import VisualizationContext, { ACTIONS, Row, Context } from '../context/VisualizationContext';
import VisualizationControls from './VisualizationControls';


function Visualization() {
  const { state, dispatch } = useContext(VisualizationContext) as Context;
  const { autoadjustY, data, isLoading, range } = state;

  const filteredData = useMemo(() => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].time > range[1]) {
        break;
      }

      if (data[i].time > range[0]) {
        result.push(data[i]);
      }
    }

    return result;
  }, [data, range])

  // useEffect(() => {
  //   if (data.length === 0) {
  //     dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: true });
  //     let myTemporalData: Row[] = [];

  //     Papa.parse("small.csv", {
  //       download: true,
  //       dynamicTyping: true,
  //       fastMode: true,
  //       header: true,
  //       chunk: function (results) {
  //         if (results.data && results.data.length) {
  //           let indexes: number[] = [];

  //           for (let i = 0; i < 100; i++) {
  //             indexes.push(Math.floor(i * results.data.length / 100))
  //           }

  //           for (let i = 0; i < indexes.length; i++) {

  //             myTemporalData.push(
  //               {
  //                 // @ts-ignore
  //                 time: results.data[indexes[i]]["Time"],
  //                 // @ts-ignore
  //                 signal: results.data[indexes[i]]["1"]
  //               })
  //           }
  //         }

  //       },
  //       complete: function () {
  //         dispatch({ type: ACTIONS.UPDATE_DATA, payload: myTemporalData });
  //         dispatch({ type: ACTIONS.UPDATE_IS_LOADING, payload: false });
  //       }
  //     });
  //   }
  // }, []);

  return (
    <Container sx={{ mt: 5 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ mb: 5 }}>
            <LineChart
              // @ts-ignore
              dataset={filteredData}
              xAxis={[{ dataKey: 'time' }]}
              yAxis={autoadjustY ? [{ dataKey: 'signal' }] : [
                {
                  dataKey: 'signal',
                  min: -35000,
                  max: 35000,
                },
              ]}
              series={[{ dataKey: 'signal', showMark: false, }]}
              height={600}
              width={1200}
            />
            <VisualizationControls />
          </Box>
        </>
      )}
    </Container>
  );
}

export default Visualization;