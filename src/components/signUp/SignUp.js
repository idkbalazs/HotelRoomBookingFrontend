import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import signUpStyles from "./SignUpStyles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Parser from 'html-react-parser';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUp() {

    const [isRegistered, setRegistered] = useState(false);
    const [isError, setIsError] = useState(false);
    const classes = signUpStyles();
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function postSignUp() {
        if(password !== passwordAgain){
            setErrorMessage("Passwords don't match!");
            setIsError(true);
            return;
        }
        axios.post("http://localhost:8080/users/register", {
            name,
            username,
            password

        }).then(result => {
            if (result.status === 200) {
                setRegistered(true);
            }
            else {
                setIsError(true);
            }

        }).catch(e => {
            if(e.response.status === 400 && e.response.data.message.includes("Validation")) {
                let a = "Username is already used!";
                if(e.response.data.errors.length!==1){
                    e.response.data.errors.map(element => a+=element.defaultMessage + "<br>")
                } else {
                    e.response.data.errors.map(element => a+=element.defaultMessage)
                }
                setErrorMessage(a);
                setIsError(true);
            } else if(e.response.status === 409){
                setErrorMessage("Username is already used!");
                setIsError(true);
            } else {
                setErrorMessage("Unexpected error!");
                setIsError(true);
            }
        });
    }

    if (isRegistered) {
        return <Redirect to="/sign-in" />
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsError(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6" >
                    Sign up as customer
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                color="primary"
                                variant="outlined"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="username"
                                id="username"
                                value={username}
                                onChange={e => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                color="primary"
                                variant="outlined"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="name"
                                id="name"
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                color="primary"
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                color="primary"
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordAgain"
                                label="Password again"
                                type="password"
                                id="passwordAgain"
                                autoComplete="current-password-again"
                                value={passwordAgain}
                                onChange={e => {
                                    setPasswordAgain(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box className={classes.box} textAlign='center'>
                        <Button
                            onClick={(e) => {postSignUp(e)}}
                            variant="contained" color="primary">Sign Up</Button>
                    </Box>
                    <Grid>
                    </Grid>
                    { isError &&
                    <Snackbar
                        open={isError}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={3000}
                        onClose={handleClose}>
                        <Alert severity="error">{Parser(errorMessage)}</Alert>
                    </Snackbar>
                    }
                </form>
            </div>

        </Container>
    );
}


export default SignUp;
