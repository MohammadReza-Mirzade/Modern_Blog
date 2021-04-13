import React from 'react';
import './Login.css';
import Axios from 'axios';
import Form from "./Form";
import ParticlesBg from "particles-bg";
import {sessionChecker} from "../../tools/session";



class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }


    sendData = async (username, password) => {
        try {
            const res = await Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/auth/login', {
                username: username,
                password: password
            });
            console.log(res.data);
            if (res.data.msg.trim() === 'success') {
                this.props.success();
                this.setState({error: ""});
            } else if (res.data.msg === "session") {
                this.props.history.push("/dashboard");
            } else {
                this.setState({error: res.data.msg});
            }
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        // sessionChecker();
        return(
            <div className='Login'>
                <ParticlesBg type="square" bg={{position: "fixed", zIndex: -1, top:0}}/>
                <Form clickHandler={this.sendData} error={this.state.error} />
            </div>
        );
    }
}

export default Login;
