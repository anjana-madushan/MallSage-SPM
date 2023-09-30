import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Copyright from '../../components/copyright';
// import Swal from 'sweetalert2';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { autheticationActions } from '../../components/store';
import { loginAction } from '../../Redux/auth/authAction';


<Copyright />

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedrole = useSelector((state) => state.auth.User.role);
  // console.log("isLoggedrole",isLoggedrole);


  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))
  }

  // const sendData = async () => {

  //   try {
  //     const res = await axios.post("http://localhost:5000/User/login", {
  //       email: inputs.email,
  //       password: inputs.password
  //     })

  //     const data = await res.data;
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: `${JSON.stringify(data.message)}`,
  //     })
  //     console.log(data)
  //     return data;
  //   } catch (err) {
  //     console.log(err)
  //     if (err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);

  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: `${JSON.stringify(err.response.data.message)}`,
  //       });
  //     } else if (err.request) {
  //       console.log(err.request);
  //     } else {
  //       console.log(err.message);
  //     }
  //   }

  // }

    //UseEffect for checking logged role
  useEffect( 
    () => {
      if (isLoggedrole) {
        console.log("isLoggedrole",isLoggedrole);
        //        history.push("/dashboard");
        if (isLoggedrole === "admin") {
          navigate("/adminhome", { replace: true });
        } else if( isLoggedrole === "customer") {
          navigate("/", { replace: true });
          //          window.location.reload();
        } else if( isLoggedrole === "shop") {
          navigate("/shopHome", { replace: true });
          //          window.location.reload();
        }else if( isLoggedrole === "baggageemployee") {
          navigate("/baggageHome", { replace: true });
          //          window.location.reload();
        }else{
          navigate("/", { replace: true });
        }
      }
    },
  )

  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("logging-In");

    try {
     dispatch(loginAction(inputs?.email, inputs?.password));
      // const data = await sendData();
      if (isLoggedrole?.role=== "admin") {
        console.log("isLoggedrole",isLoggedrole);
        navigate('/adminhome')
      } else if( isLoggedrole === "shop") {
        navigate("/shopHome", { replace: true });
        //          window.location.reload();
      }else if (isLoggedrole?.role === "customer") {
        console.log("isLoggedrole",isLoggedrole);
        navigate('/')
      }
      // dispatch(autheticationActions.login());
    } catch (err) {
      console.log("isLoggedrole",isLoggedrole);
      console.error(err)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink href="#" variant="body2">
                    Forgot password?
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}