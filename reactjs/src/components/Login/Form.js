import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from "./Form.module.css";
import {Alert, AlertTitle} from "@material-ui/lab";

const useStyles = makeStyles({
    root: {
        width: 50+'%',
        opacity: 80+'%',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    input: {
        width: 100+'%',
        margin: 20+'px'
    },
    btn: {
        margin: 35+'px',
        marginTop: 0
    }
});

export default function Form(props) {
    const classes = useStyles();
    const [field, setField] = useState({userName: "", password: ""});
    const [error, setError] = useState("");

    function getUserName(event){
        setField(prevField => ({...prevField, userName: event.target.value}));
    };

    function getPassword(event){
        setField(prevField => ({...prevField, password: event.target.value}));
    };

    function validate() {
        if (!field.userName.trim()) return setError("The UserName field is empty.");
        if (!field.password.trim()) return setError("The Password field is empty.");
        return props.clickHandler(field.userName, field.password);
    }

    React.useEffect(() => {
        if((props.error) && (props.error !== 'success')) setError(props.error);
    });

    return (
        <div className={style.w100}>
            {(error)?[<Alert severity="error" className={style.alert}>
                <AlertTitle style={{width: 'max-content'}}>Error</AlertTitle>
                <strong>{error}</strong>
            </Alert>]:<div className={style.alert} style={{height: 63.6167+"px"}}></div>}
            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <TextField className={classes.input} onChange={getUserName} id="user-name" label="User Name" variant="outlined" />
                    <TextField className={classes.input} type="password" onChange={getPassword} id="password" label="Password" variant="outlined" />
                </CardContent>
                <CardActions>
                    <Button className={classes.btn} variant="contained" onClick={validate} color="primary">
                        Login
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
