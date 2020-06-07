import React from 'react'
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    accessToken:{
        maxWidth:'70%',
        wordWrap:'break-word',
    }
}));

export default function LoggedIn(props) {
    const classes = useStyles();
    console.log(props);
    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1">
                    Success
                </Typography>
                <Typography component="h2" className={classes.accessToken}>
                    Access token: {props.accessToken}
                </Typography>
            </div>
        </Container>
    )
}