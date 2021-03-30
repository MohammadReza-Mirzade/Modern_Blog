import React from 'react';
import style from './Signup.module.css';
import './Signup.css';
import Axios from "axios";
import ParticlesBg from "particles-bg";
import Card from "@material-ui/core/Card";
import StepsComponent from "./StepsComponet";
import {Alert, AlertTitle} from "@material-ui/lab";
import FormInfo from "./FormInfo";
import FormUsername from "./FormUsername/FormUsername";
import FormPassword from "./FormPassword";
import FormAvatar from "./FormAvatar";
import FormCompleted from "./FormCompleted";
import validator from 'validator';
import store from '../../Store/index';
import {changeInfo, changeUser, changePassword, changeAvatar} from "../../Actions";



class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            step: 0,
            field: {
                firstName: "",
                lastName: "",
                gender: "",
                mobileNumber: "",

                username: "",

                password: "",

                avatar: ""
            }
        };
        this.validateInfo = this.validateInfo.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateAvatar = this.validateAvatar.bind(this);
        this.goBackStep = this.goBackStep.bind(this);
    }

    sendData(username, password) {
        Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/auth/signup', {username: username, password: password}
        ).then(res => {
            if (res.data.msg.trim() === 'success') {
                this.setState({error: ""});
                this.setState({step: 4});
            } else {
                this.setState({error: res.data.msg});
            }
        });
    }

    checkUsername(username){
        Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/auth/checkUsername', {username: username}
        ).then(res => {
            if (res.data.msg.trim() === 'ok') {
                this.setState({error: ""});
            } else {
                this.setState({error: res.data.msg});
            }
        });
    }


    validateInfo(field){
        if (!field.firstName.trim()) return this.setState({error: 'FirstName field is empty.'});
        if (!field.lastName.trim()) return this.setState({error: 'LastName field is empty.'});
        if (!field.mobileNumber.trim()) return this.setState({error: 'MobileNumber field is empty.'});
        if (!validator.isMobilePhone(field.mobileNumber, 'fa-IR')) return this.setState({error: "MobileNumber value isn't valid."});
        if (!(field.gender.trim()==="man" || field.gender.trim()==="woman" || field.gender.trim()==="other")) return this.setState({error: "Gender value is empty."});
        // this.setState({firstName: field.firstName, lastName: field.lastName, mobileNumber: field.mobileNumber});
        store.dispatch(changeInfo({firstName: field.firstName, lastName: field.lastName, mobileNumber: field.mobileNumber, gender: field.gender}));
        this.setState({step: 1, error: ""});
    }

    validateUsername(field) {
        if (!field.username.trim()) return this.setState({error: "The UserName field is empty."});
        if (!validator.isLength(field.username.trim(), {
            min: 1,
            max: 30,
        }) || !(validator.isAlphanumeric(field.username.trim(), 'fa-IR') ^ validator.isAlphanumeric(field.username.trim(), 'en-AU'))) return this.setState({error: "Username must consist english letters only or persian letters only and its length must be less than 30 characters."});
        // if (!this.checkUsername(field.username)) return null;
        store.dispatch(changeUser({username: field.username}));
        this.setState({step: 2, error: ""});
    }

    validatePassword(field){
        if (!field.password.trim()) return this.setState({error:"The Password field is empty."});
        if (!validator.isLength(field.password, {min: 8, max: 30}) || !validator.isStrongPassword(field.password.trim(), {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) return this.setState({error: "Password length must be between 30 characters and 8 characters."});
        if (!field.repeatPassword.trim()) return this.setState({error:"The Password Repetition field is empty."});
        if (field.password !== field.repeatPassword) return this.setState({error:"The Password and Password Repetition field are not equal."});
        store.dispatch(changePassword({password: field.password}));
        this.setState({step: 3, error: ""});
    }

    validateAvatar(field){
        store.dispatch(changeAvatar({avatar: field.avatar}));
        this.sendData(field.username, field.password);
    }

    goBackStep(){
        this.setState({step: this.state.step-1, error: ""});
    }


    switchRender(){
        switch (this.state.step) {
            case 0: return <FormInfo clickHandler={this.validateInfo} error={this.state.error} />
            case 1: return <FormUsername clickBackHandler={this.goBackStep} clickHandler={this.validateUsername} error={this.state.error} />
            case 2: return <FormPassword clickBackHandler={this.goBackStep} clickHandler={this.validatePassword} error={this.state.error} />
            case 3: return <FormAvatar clickBackHandler={this.goBackStep} clickHandler={this.validateAvatar} error={this.state.error} />
            case 4: return <FormCompleted success={() => {this.props.success()}} />
        }
    }


    render() {
        return(
            <div className='Signup'>
                {(this.state.error)?[<Alert severity="error" className={style.alert}>
                    <AlertTitle style={{width: 'max-content'}}>Error</AlertTitle>
                    <strong>{this.state.error}</strong>
                </Alert>]:<div className={style.alert} style={{height: 63.6167+"px"}}></div>}
                <ParticlesBg type="color" bg={{position: "fixed", zIndex: -1, top:0}} className={style.ParticlesBg}/>
                <Card className={style.Card}>
                    <StepsComponent step={this.state.step} className={style.step} />
                    {this.switchRender()}
                </Card>
            </div>
        );
    }
}


export default Signup;
