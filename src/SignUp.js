import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
    CognitoUserPool,
    CognitoUserAttribute,
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

export default function SignUp(props) {
    const classes = useStyles();

    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [name, setName] = React.useState('');
    let [passwordError, setPasswordError] = React.useState(false);

    let checkPassword = ()=>{
        setPasswordError(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/));
    };

    let onSubmit = (e)=>{
        e.preventDefault();

        if(passwordError){
            return;
        }

        let userPool = new CognitoUserPool(config);

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: email,
        };

        let dataName = {
            Name: 'name',
            Value: name,
        };
        let attributeEmail = new CognitoUserAttribute(dataEmail);
        let attributeName = new CognitoUserAttribute(dataName);

        attributeList.push(attributeEmail);
        attributeList.push(attributeName);
        console.log('signing up with: ', email, password, attributeList);
        userPool.signUp(email,password, attributeList,null, (err,result)=>{
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            let cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            props.setPage('verifyEmail', {email: cognitoUser.getUsername()});
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
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e)=>onSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
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
                        onChange={(e)=>{
                            setPassword(e.target.value);
                            checkPassword();
                        }}
                        error={passwordError}
                        helperText={passwordError?'Password must contain a number, an uppercase letter, a lowercase letter, and be longer than 6 characters':null}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
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
                                    props.setPage("login");
                                }}
                                variant="body2"
                                className={classes.button}
                            >
                                Have an account? Sign In
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}