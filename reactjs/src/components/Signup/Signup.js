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
import Store from '../../Store/index';
import {changeInfo, changeUser, changePassword, changeAvatar} from "../../Actions";
import {sessionChecker} from "../../tools/session";




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


    componentDidMount() {
        Axios.get("/session").then(res => {
            if (res.data.msg === "session") window.location.href = "/dashboard";
        });
    }


    sendData() {
        const formData = new FormData();
        Object.entries(Store.getState().field).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.msg.trim() === 'success') {
                this.setState({error: ""});
                this.setState({step: 4});
            } else if (res.data.msg.trim() === "session") {
                sessionChecker();
            } else {
                this.setState({error: res.data.msg});
            }
        });
    }

    checkUsername(username){

    }


    validateInfo(field){
        if (!field.firstName.trim()) return this.setState({error: 'FirstName field is empty.'});
        if (!field.lastName.trim()) return this.setState({error: 'LastName field is empty.'});
        if (!field.mobileNumber.trim()) return this.setState({error: 'MobileNumber field is empty.'});
        if (!validator.isMobilePhone(field.mobileNumber, 'fa-IR')) return this.setState({error: "MobileNumber value isn't valid."});
        if (!(field.gender.trim()==="man" || field.gender.trim()==="woman" || field.gender.trim()==="other")) return this.setState({error: "Gender value is empty."});
        Store.dispatch(changeInfo({firstName: field.firstName, lastName: field.lastName, mobileNumber: field.mobileNumber, gender: field.gender}));
        this.setState({step: 1, error: ""});
    }

    validateUsername(field) {
        Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/auth/checkUsername', {username: field.username}
        ).then(res => {
            if (res.data.msg.trim() === 'ok') {
                this.setState({error: ""});
                if (!field.username.trim()) return this.setState({error: "The UserName field is empty."});
                if (!validator.isLength(field.username.trim(), {
                    min: 1,
                    max: 30,
                }) || !(validator.isAlphanumeric(field.username.trim(), 'fa-IR') ^ validator.isAlphanumeric(field.username.trim(), 'en-AU'))) return this.setState({error: "Username must consist english letters only or persian letters only and its length must be less than 30 characters."});
                Store.dispatch(changeUser({username: field.username}));
                this.setState({step: 2, error: ""});
            } else if (res.data.msg === "session") {
                this.props.history.push("/dashboard");
            } else {
                this.setState({error: res.data.msg});
            }
        });
    }

    validatePassword(field){
        if (!field.password.trim()) return this.setState({error:"The Password field is empty."});
        if (!validator.isLength(field.password, {min: 8, max: 30})) return this.setState({error: "Password length must be between 30 characters and 8 characters."});
        if (!field.repeatPassword.trim()) return this.setState({error:"The Password Repetition field is empty."});
        if (field.password !== field.repeatPassword) return this.setState({error:"The Password and Password Repetition field are not equal."});
        Store.dispatch(changePassword({password: field.password}));
        this.setState({step: 3, error: ""});
    }

    async validateAvatar(field){
        await Store.dispatch(changeAvatar({avatar: field.avatar}));
        this.sendData();
    }

    goBackStep(){
        if (this.state.step > 0) {
            this.setState({step: this.state.step - 1, error: ""});
        }
    }


    switchRender(){
        switch (this.state.step) {
            case 0: return <FormInfo clickHandler={this.validateInfo} error={this.state.error} />
            case 1: return <FormUsername clickBackHandler={this.goBackStep} clickHandler={this.validateUsername} error={this.state.error} />
            case 2: return <FormPassword clickBackHandler={this.goBackStep} clickHandler={this.validatePassword} error={this.state.error} />
            case 3: return <FormAvatar clickBackHandler={this.goBackStep} clickHandler={this.validateAvatar} error={this.state.error} />
            case 4: return <FormCompleted success={() => {this.props.success()}} />
            default: return <></>
        }
    }


    render() {
        // sessionChecker();
        return(
            <div className='Signup'>
                {(this.state.error)?[<Alert severity="error" className={style.alert}>
                    <AlertTitle style={{width: 'max-content'}}>Error</AlertTitle>
                    <strong>{this.state.error}</strong>
                </Alert>]:<div className={style.alert} style={{height: 63.6167+"px"}}></div>}
                <ParticlesBg type="color" bg={{position: "fixed", zIndex: -1, top:0}}/>
                <Card className={style.Card}>
                    <StepsComponent step={this.state.step} className={style.step} />
                    {this.switchRender()}
                </Card>
                <footer style={{width: 100+"%", height: 50+"px", display: "block"}}></footer>
            </div>
        );
    }

}


export default Signup;
