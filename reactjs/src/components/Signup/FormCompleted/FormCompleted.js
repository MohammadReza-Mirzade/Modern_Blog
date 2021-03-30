import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from './FormCompleted.module.css';

const useStyles = makeStyles({
    root: {
        width: 100+'%',
        opacity: 90+'%',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
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

export default function FormCompleted(props) {
    const classes = useStyles();
    const [field, setField] = useState({userName: "", password: "", repeatPassword: ""});

    function getUserName(event){
        setField(prevField => ({...prevField, userName: event.target.value}));
    };

    function getPassword(event){
        setField(prevField => ({...prevField, password: event.target.value}));
    };

    function getRepeatPassword(event) {
        setField(prevField => ({...prevField, repeatPassword: event.target.value}));
    }


    return (
        <div className={style.w100}>
            <div className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <TextField onChange={getUserName} className={classes.input} id="user-name" label="User Name" variant="outlined" />
                    <TextField onChange={getPassword} type="password" className={classes.input} id="password" label="Password" variant="outlined" />
                    <TextField onChange={getRepeatPassword} type="password" className={classes.input} id="repeat-password" label="Password Repetition" variant="outlined" />
                </CardContent>
                <CardActions>
                    <Button className={classes.btn} onClick={() => {props.clickHandler(field)}} variant="contained" color="primary">
                        SIGNUP
                    </Button>
                </CardActions>
            </div>
        </div>
    );
}
