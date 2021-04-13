import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import style from './FormCompleted.module.css';
import {Result} from "antd";

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

    useEffect(() => {
        setTimeout(function(){
            props.success();
        }, 5000);
    });

    return (
        <div className={style.w100}>
            <div className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <Result
                        status="success"
                        title="Your account has been created."
                    />
                </CardContent>
            </div>
        </div>
    );
}
