import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { useContext, useMemo } from "react";

import Loading from './Loading';
import VisualizationContext, { Context } from '../context/VisualizationContext';
import VisualizationControls from './VisualizationControls';
import { downsample } from '../utils/utils'

const GRAPH_WIDTH = 1200;
// In the original data, the samples are taken every 0.04 millisecons
const MILLISECONDS_BETWEEN_ORIGINAL_SAMPLES = 0.004;

function transformMilisecondsToDataIndex(milliseconds: number) {
  return Math.floor(milliseconds / MILLISECONDS_BETWEEN_ORIGINAL_SAMPLES);
}

function pairSamplesWithTime(samples: Int16Array, timeBetweenSamples: number, offsetTime: number = 0) {
  return Array.from(samples).map((v, i) => ({ time: offsetTime + (i * timeBetweenSamples), signal: v }));
}


function Visualization() {
  const { state } = useContext(VisualizationContext) as Context;
  const { autoadjustY, originalData, isLoading, range } = state;

  const filteredData = useMemo(() => {
    const numberOfSamples = GRAPH_WIDTH;
    const rangeFirstIndex: number = transformMilisecondsToDataIndex(range[0]);
    const rangeLasterIndex: number = transformMilisecondsToDataIndex(range[1]);
    const zoomedSamples = originalData.subarray(rangeFirstIndex, rangeLasterIndex);
    const downsampledValues = downsample(zoomedSamples, numberOfSamples);
    const reductionRate = Math.floor(zoomedSamples.length / numberOfSamples);
    const millisecondsBetweenSamples = MILLISECONDS_BETWEEN_ORIGINAL_SAMPLES * reductionRate;

    const result = pairSamplesWithTime(downsampledValues, millisecondsBetweenSamples, rangeFirstIndex * MILLISECONDS_BETWEEN_ORIGINAL_SAMPLES);

    return result;
  }, [originalData, range])

  return (
    <Container sx={{ mt: 5 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ mb: 5 }} data-testid="graph">
          <LineChart
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
            width={GRAPH_WIDTH}
          />
          <VisualizationControls />
        </Box>
      )}
    </Container>
  );
}

export default Visualization;