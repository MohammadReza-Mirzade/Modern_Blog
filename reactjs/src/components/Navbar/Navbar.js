import React from 'react';
import './Navbar.module.css';
import './Navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useHistory} from "react-router-dom";


export default function Navbar(props){
    const history = useHistory();
    const handleChange = (event, value) => {
        history.push(value);
        props.handleChange(event, value);
    };


    return (
        <AppBar position="static" >
            <TabList onChange={handleChange} aria-label="simple tabs example">
                <Tab style={{float: 'left'}} label="Home" value="/"/>
                <Tab style={{float: 'left'}} label="Article" value="/article"/>
                {!props.dashboard
                    ?[<Tab style={{float: 'right'}} label="Loge In" value="/login"/>,
                     <Tab style={{float: 'right'}} label="sign Up" value="/signup"/>]
                    :<Tab style={{float: 'right'}} label={<AccountCircle/>} value="/dashboard"/>
                }
            </TabList>
        </AppBar>
    );

}
