import {INFO, USER, PASSWORD, AVATAR, SESSION} from "../Constants/action-types";
import Axios from "axios";

function changeInfo(payload) {
    return { type: INFO, payload }
};

function changeUser(payload) {
    return {type: USER, payload}
}

function changePassword(payload) {
    return {type: PASSWORD, payload}
}

function changeAvatar(payload) {
    return {type: AVATAR, payload}
}

async function changeSession() {
    return {type: SESSION}
}

export {changeInfo, changeUser, changePassword, changeAvatar, changeSession};


