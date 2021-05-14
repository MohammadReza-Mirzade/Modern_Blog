import React from 'react';
import Axios from 'axios';
import { Table } from "antd";
import style from "./UserArticlePage.module.css";
import UpdateArticlePage from "./UpdateArticlePage";




class UserArticlePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            error: "",
            article: null,
            updateMod: false,
        };
    }

    close = () => {
        this.setState({updateMod: false});
    }

    componentDidMount(){
        Axios.get("/blogger/article").then((data) => {
            console.log(data.data.articles);
            const articles = [];
            data.data.articles.forEach(article => {
                articles.push({
                    key: article.id,
                    title: article.title,
                    avatar: article.avatar,
                    createdAt: article.createdAt,
                });
            });
            this.setState({articles: articles});
        });
    }



    deleteArticle = (id) => {
        Axios.delete("/blogger/article", {data: {id: id}}).then(res => {
            if (res.data.msg === "success"){
                Axios.get("/blogger/article").then((data) => {
                    console.log(data.data.articles);
                    const articles = [];
                    data.data.articles.forEach(article => {
                        articles.push({
                            key: article.id,
                            title: article.title,
                            avatar: article.avatar,
                            createdAt: article.createdAt,
                        });
                    });
                    this.setState({articles: articles});
                });
            } else {
                this.setState({error: res.data.msg});
                alert(res.data.msg);
            }
        });
    }



    updateArticle = (id) => {
        console.log(id);
        Axios.get("/article", {
            params: {
                id: id,
            }
        }).then(res => {
            if (res.data.msg === "success") {
                this.setState({article: res.data.article});
                this.setState({updateMod: true});
            }
            else {
                this.setState({error: res.data.msg});
                alert(res.data.msg);
            }
        });
    }



    columns = [
        {
            title: "Avatar",
            key: "avatar",
            dataIndex: "avatar",
            render: text => <img height={50+'px'} src={text}/>
        },
        {
            title: "Title",
            key: "title",
            dataIndex: "title",
        },
        {
            title: "CreatedAt",
            key: "createdAt",
            dataIndex: "createdAt",
            render: text => new Date(text).toLocaleString()
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (text, record) => <><button onClick={() => {this.updateArticle(record.key)}} className={style.button}>Update Article</button><button onClick={() => this.deleteArticle(record.key)} className={style.button}>Delete Article</button></>,
        }
    ];



    render() {
        return(
            <div>
                {this.state.updateMod ? <UpdateArticlePage close={this.close} avatar={"/article/" + this.state.article.id + "/" + this.state.article.avatar} title={this.state.article.title} model={this.state.article.model} id={this.state.article.id}/> :
                    <Table columns={this.columns} dataSource={this.state.articles}/>
                }
            </div>
        );
    }
}

export default UserArticlePage;
