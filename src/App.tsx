import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Visualization from './components/Visualization';
import InputFile from './components/InputFile';
import VisualizationContext, { Context } from './context/VisualizationContext';
import { useContext} from "react";

function App() {
  const { state } = useContext(VisualizationContext) as Context;
  const { originalData } = state;

  return (
    <>
      <Box
        component="header"
        sx={{
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'grey',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img alt="Idoven logo" src="idoven_logo.jpeg" />
        <Typography variant="h2" variantMapping={{ h2: 'h1' }}>
          Idoven.ai Coding Challenge
        </Typography>
      </Box>
      <Box
        component="main"
      >
        {originalData.length === 0 ? (
          <InputFile />
        ) : (
          <Visualization />
        )}
      </Box>
    </>
  );
}

export default App;
