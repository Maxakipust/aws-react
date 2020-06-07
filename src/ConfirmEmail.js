import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
    CognitoUserPool,
    CognitoUser
} from 'amazon-cognito-identity-js';
import config from "./config";
import Grid from "@material-ui/core/Grid";

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

export default function ConfirmEmail(props) {
    const classes = useStyles();

    let [verificationCode, setVerificationCode] = React.useState('');

    let submit = (e)=>{
        e.preventDefault();
        let userPool = new CognitoUserPool(config);
        let userData = {
            Username: props.email,
            Pool: userPool,
        };
        let cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(verificationCode, true, (err, result)=>{
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
            props.setPage('login');
        })
    };

    let resendVerificationCode=(e)=>{
        e.preventDefault();
        let userPool = new CognitoUserPool(config);
        let userData = {
            Username: props.email,
            Pool: userPool,
        };
        let cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode((err, result)=>{
            if(err){
                alert(err.message || JSON.stringify(err));
                return;
            }else{
                alert("Resent Confirmation to "+props.email);
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter Verification Code
                </Typography>
                <Typography component="h2" variant="h6">
                    We sent an email with a verification code to {props.email}
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e)=>submit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="verificationCode"
                        label="Verification Code"
                        name="verificationCode"
                        value={verificationCode}
                        onChange={(e)=>setVerificationCode(e.target.value)}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault();
                                    resendVerificationCode();
                                }}
                                variant="body2"
                                className={classes.button}
                            >
                                Resend Email
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