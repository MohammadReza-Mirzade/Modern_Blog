import {AVATAR, INFO, PASSWORD, SESSION, USER} from "../../Constants/action-types";

const initialState = {
    session: false,
    field: {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        gender: "",
        username: "",
        password: "",
        avatar: "",
    },
}

const index = (state = initialState, action) => {
    switch (action.type){
        case INFO: return {
            ...state,
            field: {
                ...state.field,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                mobileNumber: action.payload.mobileNumber,
                gender: action.payload.gender,
            }
        };
        case USER: return {
            ...state,
            field: {
                ...state.field,
                username: action.payload.username,
            }
        };
        case PASSWORD: return {
            ...state,
            field: {
                ...state.field,
                password: action.payload.password,
            }
        };
        case AVATAR: return {
            ...state,
            field: {
                ...state.field,
                avatar: action.payload.avatar,
            }
        };
        case SESSION: return {
            ...state,
            session: !state.session,
        }
        default: return state;
    }
}

export default index;
