import React from 'react';
import './Login.css';
import Axios from 'axios';
import Form from "./Form";
import ParticlesBg from "particles-bg";


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }


    sendData = (username, password) => {
        Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/auth/login', {username: username, password: password}
        ).then(res => {
            if (res.data.msg.trim() === 'success') {
                this.props.success();
                this.setState({error: res.data.msg});
            } else {
                this.setState({error: res.data.msg});
            }
        });
    }


    render() {
        return(
            <div className='Login'>
                <ParticlesBg type="square" bg={true}/>
                <Form clickHandler={this.sendData} error={this.state.error} />
            </div>
        );
    }
}

export default Login;
