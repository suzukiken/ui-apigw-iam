import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Button, Typography, Stack } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Login() {

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'signIn') {
        getUser().then(userData => setUser(userData));
      } else if (event === 'signOut') {
        setUser(null);
      }
    })
    getUser().then(userData => setUser(userData));
  }, [])
  
  useEffect(() => {
    if (user) {
      Auth.currentUserInfo().then((userInfoData) => {
        setUserInfo(userInfoData)
      })
    }
  }, [user])
  
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => {
        return userData
      })
      .catch(() => console.log('Not signed in'));
  }
  
  if (user) {
    if (userInfo && userInfo.attributes) {
      return (
        <Stack direction="row">
          <Typography variant="caption" gutterBottom mt={1.2}>
            {userInfo.attributes.email}
          </Typography>
          <Button 
            variant="text"
            onClick={() => Auth.signOut()}>
            <AccountCircleIcon />
          </Button>
        </Stack>
      )
    } else {
      return (
        <Stack spacing={2} direction="row">
          <Button 
            variant="text"
            onClick={() => Auth.signOut()}>
            <AccountCircleIcon />
          </Button>
        </Stack>
      )
    }
  } else {
    return (
      <Stack spacing={2} direction="row">
        <Button 
          variant="text"
          onClick={() => Auth.federatedSignIn()}>
          <PersonOutlineIcon />
        </Button>
      </Stack>
    )
  }
}

export default Login