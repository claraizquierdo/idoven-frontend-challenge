import './App.css';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Visualization from './components/Visualization';
import { VisualizationProvider } from './context/VisualizationContext';

function App() {
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
        <VisualizationProvider>
          <Visualization />
        </VisualizationProvider>
      </Box>
    </>
  );
}

export default App;
