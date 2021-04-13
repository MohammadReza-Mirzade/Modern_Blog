import React from "react";
import Axios from "axios";
import store from "../Store";
import {changeSession} from "../Actions";


const sessionChecker = function () {
    // Axios.get('/session').then(data => {
    //     // console.log(data);
    //     if (store.getState().session === (data.data.msg === "ok")) return null;
    //     else store.dispatch(changeSession());
    // }).catch(e => {
    //     console.log(e);
    // });
};


export {sessionChecker};
