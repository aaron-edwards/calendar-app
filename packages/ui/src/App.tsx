import { Typography } from '@mui/material';

const App = ({ name = 'World' }: { name?: string }) => <Typography variant="h1">Hello {name}</Typography>;

export default App;
