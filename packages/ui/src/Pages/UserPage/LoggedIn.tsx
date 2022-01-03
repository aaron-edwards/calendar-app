import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import GoogleIcon from '../../components/GoogleIcon';
import { User } from '../../hooks/useGoogleAuth';

type Props = {
  user: User;
  signOut: () => void;
};
export default function LoggedIn({ user, signOut }: Props) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.profile.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={user.profile.email}
          secondary={user.profile.name}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={signOut}>
          <ListItemIcon>
            <GoogleIcon />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
}
