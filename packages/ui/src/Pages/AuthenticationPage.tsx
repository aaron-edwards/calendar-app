import { List } from '@mui/material';
import { useCallback, useContext } from 'react';
import { AuthenticationContext } from '../Authentication/AuthenticationContext';
import CalendarList from './UserPage/CalendarList';
import LoggedIn from './UserPage/LoggedIn';
import LoggedOut from './UserPage/LoggedOut';

export default function AuthenticationPage() {
  const { user, signIn, signOut } = useContext(AuthenticationContext);
  const handleSignIn = useCallback(
    () => signIn({ prompt: 'select_account' }),
    []
  );

  return (
    <List subheader="User">
      {user ? (
        <LoggedIn user={user} signOut={signOut} />
      ) : (
        <LoggedOut signIn={handleSignIn} />
      )}
      {user && <CalendarList user={user} />}
    </List>
  );

  // if (!user) {
  //   return (
  //     <List>
  //       <ListSubheader>User</ListSubheader>
  //       <ListItem disablePadding>
  //         <ListItemButton onClick={handleSignIn}>
  //           <ListItemIcon>
  //             <GoogleIcon />
  //           </ListItemIcon>
  //           <ListItemText>Sign in with Google</ListItemText>
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //   );
  // }

  // return (
  //   <List>
  //     <ListSubheader>User</ListSubheader>
  //     <ListItem>
  //       <ListItemAvatar>
  //         <Avatar src={user.profile.imageUrl} />
  //       </ListItemAvatar>
  //       <ListItemText
  //         primary={user.profile.email}
  //         secondary={user.profile.name}
  //       />
  //     </ListItem>
  //     <ListItem disablePadding>
  //       <ListItemButton onClick={signOut}>
  //         <ListItemIcon>
  //           <GoogleIcon />
  //         </ListItemIcon>
  //         <ListItemText>Sign Out</ListItemText>
  //       </ListItemButton>
  //     </ListItem>
  //     <ListSubheader>Calendars</ListSubheader>
  //   </List>
  // );
}
