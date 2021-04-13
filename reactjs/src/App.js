import './App.css';
import style from './App.module.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import React from 'react';
import TabContext from '@material-ui/lab/TabContext';
import {Route, useHistory} from 'react-router-dom';
import {Spin} from "antd";
import {sessionChecker} from "./tools/session";
import Axios from "axios";


function App() {
    const history = useHistory();
    const [value, setValue] = React.useState(history.location.pathname);
    const [dashboard, setDashboard] = React.useState(false);
    const [network, setNetwork] = React.useState(true);

    sessionChecker();

    (function () {
        Axios.get(/*'https://api.mocki.io/v1/6910a074*/'/session').then(data => {
            if (!network) setNetwork(true);
            if (value === '/dashboard' && data.data.msg !== "ok") {
                history.push('/login');
                setValue('/login');
            };
            if ((value === '/login' || value === '/signup') && data.data.msg === "ok") {
                history.push('/dashboard');
                setValue('/dashboard');
            };
            if (dashboard !== (data.data.msg === 'ok')) setDashboard((data.data.msg === 'ok'));
        }).catch(e => {

        });
    })();


    const handleChange = (event, newValue) => {
        history.push(newValue);
        setValue(newValue);
    };

    const login = () => {
        history.push('/dashboard');
        setValue('/dashboard');
        setDashboard(true);
    }

    const signup = () => {
        history.push('/login');
        setValue('/login');
    }

    return (
        <div className="App">
            <TabContext value={value}>
                {!network?<div className={style.w100}><div className={style.spinner}>
                    <Spin size="large" /><br />
                    Waiting for connection ...
                </div></div>:<></>}
                <Navbar dashboard={dashboard} handleChange={handleChange} />
                <Route exact path="/"><Home /></Route>
                <Route path="/login"><Login success={login} /></Route>
                <Route path="/signup"><Signup success={signup} /></Route>
                <Route path="/dashboard" style={{padding: 0, margin: 0}} value="/dashboard"><Dashboard /></Route>
            </TabContext>
        </div>
  );
}

export default App;
