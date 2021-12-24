import { Container, 
  Button, 
  Box, 
  Stack,
  Divider } from '@mui/material'
import Login from './Login'
import { Auth, API } from "aws-amplify";

function App() {
  
  async function callApi() {
    console.log('callApi')
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    const init = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
        //Authorization: token,
      },
    }
    const res = await API.get('theapi', '/items', init)
    console.log(res)
  }
  
  return (
    <Container>
      <Box 
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          height: '100vh'
        }}>
        <Stack 
          spacing={6} 
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          >
          <Login />
          <Button
            onClick={callApi}
            variant="text">
            call api
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default App;
