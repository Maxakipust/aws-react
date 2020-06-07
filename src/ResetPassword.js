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

export default function ResetPassword(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault();
                                    props.setPage("login");
                                }}
                                variant="body2"
                                className={classes.button}
                            >
                                Sign In
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