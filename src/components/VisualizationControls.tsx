
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useContext } from 'react';
import VisualizationContext, { ACTIONS, Context } from '../context/VisualizationContext';


function VisualizationControls() {
  const { state, dispatch } = useContext(VisualizationContext) as Context;
  const { autoadjustY, range, zoom } = state;

  const handleRangeChange = (event: Event, value: number | number[]): void => {
    if (Array.isArray(value) && value.length > 0) {
      dispatch({type: ACTIONS.UPDATE_RANGE, payload: value});
      dispatch({type: ACTIONS.UPDATE_ZOOM, payload: value[1] - value[0]});
    }
  };

  const handleAutoadjustY = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: ACTIONS.UPDATE_AUTOADJUST_Y, payload: event.target.checked});
  };

  const handleNext = () => {
    const newValue = [range[0] + zoom, range[1] + zoom];
    dispatch({type: ACTIONS.UPDATE_RANGE, payload: newValue});
  }

  const handlePrevious = () => {
    const newValue = [range[0] - zoom, range[1] - zoom];
    dispatch({type: ACTIONS.UPDATE_RANGE, payload: newValue});
  }

  return (
    <>
      <Slider
        value={range}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={180000}
        disableSwap
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={range[0] === 0}
        >
          {`< Previous ${zoom} milliseconds`}
        </Button>

        <FormControlLabel control={
          <Checkbox
            checked={autoadjustY}
            onChange={handleAutoadjustY}
          />
        } label="Adjust Y axis values to selection" />

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={range[1] >= 180000}
        >
          {`> Next ${zoom} milliseconds`}
        </Button>
      </Box>
    </>
  );
}

export default VisualizationControls;