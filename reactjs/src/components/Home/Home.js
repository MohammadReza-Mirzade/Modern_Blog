import style from './Home.module.css';
import React from 'react';
import ParticlesBg from "particles-bg";
import {sessionChecker} from "../../tools/session";


class Home extends React.Component{


    render() {
        sessionChecker();
        return(
            <div className={style.Home}>
                <ParticlesBg type="cobweb" bg={true}/>
                <div className={style.title}><h1>Modern Blog</h1></div>
            </div>
        );
    }
}

export default Home;
