import React from 'react';
import style from './Dashboard.module.css';
import MenuDashboard from './MenuDashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import UserArticlePage from "./UserArticlePage";
import UserUpdatePasswordPage from "./UserUpdatePasswordPage";
import UserUpdateInfoPage from "./UserUpdateInfoPage";
import {sessionChecker} from "../../tools/session";


class Dashboard extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
    }


    whichPage = (page) => {
        this.setState({page: page});
    }


    render() {
        sessionChecker();
        return(
            <div className={style.dashboard}>
                <Router>
                    <div className={'menu'}>
                        <MenuDashboard page={this.state.page} />
                    </div>
                    <div className={style.view}>
                        <Route exact path="/dashboard">
                            <Home page={this.whichPage} />
                        </Route>
                        <Route path="/dashboard/article">
                            <UserArticlePage page={this.whichPage} />
                        </Route>
                        <Route path="/dashboard/userUpdatePassword">
                            <UserUpdatePasswordPage page={this.whichPage} />
                        </Route>
                        <Route path="/dashboard/userUpdateInfo">
                            <UserUpdateInfoPage page={this.whichPage} />
                        </Route>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Dashboard;
