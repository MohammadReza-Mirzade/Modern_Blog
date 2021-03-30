import style from './Home.module.css';
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import ParticlesBg from "particles-bg";


class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={style.Home}>
                <ParticlesBg type="cobweb" bg={true}/>
                <div className={style.title}><h1>Modern Blog</h1></div>
            </div>
        );
    }
}

export default Home;
