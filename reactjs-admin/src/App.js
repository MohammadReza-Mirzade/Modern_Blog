import React from 'react';
import style from './App.module.css';
import MenuDashboard from './components/MenuDashboard';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Bloggers from "./components/Bloggers";
import Articles from "./components/Articles";
import Comments from "./components/Comments";



class App extends React.Component{


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
    return(
        <div className={style.dashboard}>
          <Router>
            <div className={'menu'}>
              <MenuDashboard page={this.state.page} />
            </div>
            <div className={style.view}>
              <Route exact path="/admin">
                <Dashboard />
              </Route>
              <Route exact path="/admin/bloggers">
                <Bloggers />
              </Route>
              <Route exact path="/admin/articles">
                <Articles />
              </Route>
              <Route exact path="/admin/comments">
                <Comments />
              </Route>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
