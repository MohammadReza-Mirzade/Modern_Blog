import style from './Articles.module.css';
import React from 'react';
import Axios from 'axios';
import { Empty } from 'antd';
import Article from './Article';
import ReadingArticle from './ReadingArticle';



class Articles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isInit: false,
            articles: [],
            perPage: 10,
            page: 1,
            total: 0,
            error: "",
            isReadingMod: false,
            article: null,
        }
    }


    init = () => {
        Axios.get("/article/all", {
            params: {
                perPage: this.state.perPage,
                page: this.state.page,
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


    showArticle = (id) => {
        Axios.get("/article", {
            params: {
                id: id,
            }
        }).then(res => {
            if (res.data.msg === "success") {
                this.setState({article: res.data.article});
                this.setState({isReadingMod: true});
            }
            else this.setState({error: res.data.msg});
        });
    }


    close = () => {
        this.setState({isReadingMod: false});
    }


    render() {
        if(!this.state.isInit) this.init();
        return(
            <div className={style.Page}>
                {(this.state.isReadingMod && this.state.article)?
                    (<div className={style.ReadingArticle}><ReadingArticle close={this.close} article = {this.state.article} /></div>):
                    (!this.state.total?
                        (<Empty />):
                        (<>
                        {this.state.articles.map(article => (
                            <div onClick={() => {this.showArticle(article.id)}} className={style.Article}>
                            <Article
                                id={article.id}
                                title={article.title}
                                avatar={article.avatar}
                                description={article.description}
                                bloggerAvatar={article.bloggerAvatar}
                                owner={article.owner}
                                createdAt={new Date(article.createdAt).toLocaleString()}
                            />
                            </div>
                        ))}
                        </>)
                    )
                }
            </div>
        );
    }
}

export default Articles;
