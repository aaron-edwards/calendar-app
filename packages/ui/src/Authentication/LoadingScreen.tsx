import { CircularProgress, Stack } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={150} />
    </Stack>
  );
}
