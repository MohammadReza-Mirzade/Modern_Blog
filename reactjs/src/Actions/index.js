import { INFO, USER, PASSWORD, AVATAR } from "../Constants/action-types";

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

export {changeInfo, changeUser, changePassword, changeAvatar};


