import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUser
} from 'amazon-cognito-identity-js';
import config from "./config";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        background: 'none',
        border: 'none',
        padding: '0',
        color: '#069',
        textDecoration: 'underline',
        cursor: 'pointer',
    }
}));

export default function SignIn(props) {
    const classes = useStyles();

    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');

    let submit = (e)=>{
        e.preventDefault();
        let authenticationData = {
            Username:username,
            Password:password
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);
        let userPool = new CognitoUserPool(config);
        let userData = {
            Username: username,
            Pool: userPool
        };
        let cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess:(result)=>{
                let accessToken = result.getAccessToken().getJwtToken();
                console.log(accessToken, cognitoUser);
                props.setPage('success', {accessToken, cognitoUser});
            },
            onFailure:(err)=>{
                alert(err.message||JSON.stringify(err));

            }
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e)=>submit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault();
                                    props.setPage("resetPassword");
                                }}
                                variant="body2"
                                className={classes.button}
                            >
                                Forgot password?
                            </button>
                        </Grid>
                        <Grid item>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault();
                                    props.setPage("signUp");
                                }}
                                variant="body2"
                                className={classes.button}
                            >
                                Don't have an account? Sign Up
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}