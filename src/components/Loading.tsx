import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Loading() {
    return (
        <Box sx={{ width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Loading ECG data...
            </Typography>
            <Typography sx={{ mb: 3 }}>
                Please wait. It can take some time.
            </Typography>
            <CircularProgress />
        </Box>
    );
}

export default Loading;