import React from 'react';
import './UserArticlePage.css';
import {sessionChecker} from "../../../tools/session";
// import Axios from 'axios';

class UserArticlePage extends React.Component{

    // constructor(props) {
    //     super(props);
    // }


    // componentDidMount(){
    //     Axios.get("", {}).then(function (data) {
    //         this.setState({username: data.data.username});
    //     });
    // }



    render() {
        sessionChecker();
        return(
            <div>User Article Page</div>
        );
    }
}

export default UserArticlePage;
