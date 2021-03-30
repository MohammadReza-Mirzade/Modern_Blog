import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from './Form.module.css';
import store from "../../../Store";

const useStyles = makeStyles({
    root: {
        width: 100+'%',
        opacity: 90+'%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    cardContent: {
        width: 80+"%"
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

export default function FormPassword(props) {
    const classes = useStyles();
    const [field, setField] = useState({password: store.getState().field.password, repeatPassword: store.getState().field.password});


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
                    <TextField onChange={getPassword} defaultValue={field.password} type="password" className={classes.input} id="password" label="Password" variant="outlined" />
                    <TextField onChange={getRepeatPassword} defaultValue={field.repeatPassword} type="password" className={classes.input} id="repeat-password" label="Password Repetition" variant="outlined" />
                </CardContent>
                <CardActions style={{width: 100+"%", display: "flex", justifyContent: "end"}}>
                    <Button className={classes.btn} onClick={() => {props.clickBackHandler(field)}} variant="contained" color="primary">
                        PREVIOUS
                    </Button>
                    <Button className={classes.btn} onClick={() => {props.clickHandler(field)}} variant="contained" color="primary">
                        NEXT
                    </Button>
                </CardActions>
            </div>
        </div>
    );
}
