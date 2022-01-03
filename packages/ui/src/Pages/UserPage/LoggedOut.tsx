import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GoogleIcon from '../../components/GoogleIcon';

type Props = {
  signIn: () => void;
};

export default function LoggedOut({ signIn }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={signIn}>
        <ListItemIcon>
          <GoogleIcon />
        </ListItemIcon>
        <ListItemText>Sign in with Google</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
