import { Stack, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import useGoogleSignIn from './hooks/useGoogleSignIn';

type Props = {
  clientId: string;
  children: React.ReactNode;
};

export default function AuthenticationProvider({ clientId, children }: Props) {
  const [credentials, setCredentials] = useState<string | undefined>(undefined);
  const { loaded, prompt, LoginButton } = useGoogleSignIn(
    clientId,
    (response) => setCredentials(response.credential)
  );

  useEffect(() => {
    if (loaded && !credentials) {
      prompt();
    }
  }, [loaded, credentials]);

  if (!loaded) {
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

  if (!credentials) {
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
            <LoginButton width={300} />
          </Stack>
        </Paper>
      </Stack>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
