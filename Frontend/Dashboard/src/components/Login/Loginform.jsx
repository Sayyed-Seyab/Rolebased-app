import { Box, Chip, CircularProgress, Container, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../Context/Storecontext';


export default function Loginform() {
  const {
    Login,
    logindata,
    setlogindata,
    error,
    setError,
    loginloader,
  } = useContext(StoreContext);
  const handlerChange = (e) => {
    const { name, value } = e.target
    setlogindata((prevdata) => ({
      ...prevdata,
      [name]: value
    }))
  }
  useEffect(() => {
console.log(logindata)
  }, [logindata])


  
  // if (loginloader) {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh', // Full viewport height to center the loader
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" Validate sx={{ mt: 1 }}>
            <TextField
              sx={{
                '& label': {
                  color: 'gray', // Default label color
                },
                '& label.Mui-focused': {
                  color: 'blue', // Label color when focused
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'blue', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'green', // Border color when hovered
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue', // Border color when focused
                  },
                },
              }}
              size='small'
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={logindata.email}
              onChange={handlerChange}
            />
            <TextField
              sx={{
                '& label': {
                  color: 'gray', // Default label color
                },
                '& label.Mui-focused': {
                  color: 'blue', // Label color when focused
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'blue', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'green', // Border color when hovered
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue', // Border color when focused
                  },
                },
              }}
              className='input'
              size='small'
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={logindata.password}
              onChange={handlerChange}
            />
            <Box sx={{ textAlign: 'center' }}>
              <Chip
                className='signup'
                type="submit"
                label={loginloader ? 'Logging in...' : 'Login'}
                variant="outline"
                clickable
                onClick={Login}
                disabled={loginloader} // Disable chip while loading
                sx={{ mt: 3, mb: 2,}}
              />
             
              <Typography color={'red'}>{error}</Typography>

            </Box>
            <Box sx={{ display: 'flex' }}>

            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
