import './App.css';
import style from './App.module.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import Axios from "axios";
import {Route, useHistory} from 'react-router-dom';
import {Spin} from "antd";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function App() {
    const history = useHistory();
    const [value, setValue] = React.useState(history.location.pathname);
    const [dashboard, setDashboard] = React.useState(false);
    const [network, setNetwork] = React.useState(true);


    (async function () {
        if (value !== history.location.pathname) setValue(history.location.pathname);
        try{
            const data = await Axios.get(/*'https://api.mocki.io/v1/6910a074*/'/session');
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
        }catch (e) {
            //Error: Request failed with status code 404
            if (e.toString().trim() === "Error: Network Error")
                if (network) return setNetwork(false);
                else return null;
        }
    })()


    React.useEffect( () => {
        const interval = setInterval(async () => {
            if (value !== history.location.pathname) setValue(history.location.pathname);
            try{
                const data = await Axios.get(/*'https://api.mocki.io/v1/6910a074*/'/session');
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
            }catch (e) {
                //Error: Request failed with status code 404
                if (e.toString().trim() === "Error: Network Error")
                    if (network) return setNetwork(false);
                    else return null;
                else return console.log(e);
            }
        }, 60000);
        return () => clearInterval(interval);
    });

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
