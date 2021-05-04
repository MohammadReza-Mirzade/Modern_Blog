import style from './Articles.module.css';
import React from 'react';
import Axios from 'axios';
import { Empty } from 'antd';
import Article from 'Article';



class Articles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isInit: false,
            articles: [],
            perPage: 10,
            total: 0,
            error: "",
        }
    }

    init = () => {
        Axios.get("/articles", {
            params: {
                perPage: this.state.perPage
            }
        }).then(res => {
            if (res.data.msg === "success") {
                this.setState({articles: res.data.articles});
                this.setState({total: res.data.total});
                this.setState({isInit: true});
            } else {
                this.setState({error: res.data.msg});
            }
        });
    }

    render() {
        if(!this.state.isInit) this.init();
        return(
            <div className={style.Page}>
                {!this.state.total?
                    (<Empty />):
                    (<>
                        {this.state.articles.map(article => (
                            <Article id={article.id} title={article.title} articleAvatar={article.articleAvatar} description={article.description} bloggerAvatar={article.bloggerAvatar} owner={article.owner}/>
                        ))}
                    </>)
                }
            </div>
        );
    }
}

export default Articles;
