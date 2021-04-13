import React from 'react';
import './Home.css';
import {sessionChecker} from "../../../tools/session";

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        sessionChecker();
        return(
            <div>Dashboard</div>
        );
    }
}

export default Home;
