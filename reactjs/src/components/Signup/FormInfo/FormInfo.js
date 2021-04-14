import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import style from './FormInfo.module.css';
import { Radio } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
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


export default function FormInfo(props) {
    const classes = useStyles();
    const [field, setField] = useState({firstName: store.getState().field.firstName, lastName: store.getState().field.lastName, mobileNumber: store.getState().field.mobileNumber, gender: store.getState().field.gender});

    function getFirstName(event){
        setField(prevField => ({...prevField, firstName: event.target.value}));
    };

    function getLastName(event){
        setField(prevField => ({...prevField, lastName: event.target.value}));
    };

    function getMobileNumber(phone) {
        setField(prevField => ({...prevField, mobileNumber: phone}));
    };

    function getGender(event) {
        setField(prevField => ({...prevField, gender: event.target.value}));
    };


    return (
        <div className={style.w100}>
            <div className={classes.root} style={{width: 100+"%"}}>
                <CardContent className={classes.cardContent} >
                    <TextField defaultValue={field.firstName} onChange={getFirstName} className={classes.input} id="first-name" label="First Name" variant="outlined" />
                    <TextField defaultValue={field.lastName} onChange={getLastName} className={classes.input} id="last-name" label="Last Name" variant="outlined" />
                    <div className={style.PhoneInput}>
                    <PhoneInput
                        value={field.mobileNumber}
                        onChange={getMobileNumber}
                        country={'ir'}
                    />
                    </div>
                    <Radio.Group onChange={getGender} defaultValue={field.gender} buttonStyle="solid" style={{display: "flex"}} className={classes.input}>
                        <Radio.Button value="man">man</Radio.Button>
                        <Radio.Button value="woman">woman</Radio.Button>
                        <Radio.Button value="other">other</Radio.Button>
                    </Radio.Group>
                </CardContent>
                <CardActions style={{width: 100+"%", display: "flex", justifyContent: "end"}}>
                    <Button className={classes.btn} onClick={() => {props.clickHandler(field);}} variant="contained" color="primary">
                        NEXT
                    </Button>
                </CardActions>
            </div>
        </div>
    );
}/*)*/
