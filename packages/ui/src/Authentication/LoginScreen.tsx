import { Paper, Stack, Typography } from '@mui/material';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import { ReactNode } from 'react';

type Props = {
  loginButton: ReactNode;
};
export default function LoginScreen({ loginButton }: Props) {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={12} sx={{ width: '400px' }}>
        <Stack
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
            gap: 2,
          }}
        >
          <TodayTwoToneIcon sx={{ fontSize: 250 }} />
          <Typography variant="h3">Calendar App</Typography>
          {loginButton}
        </Stack>
      </Paper>
    </Stack>
  );
}
