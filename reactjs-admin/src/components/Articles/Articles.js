import style from './Articles.module.css';
import React from "react";
import { Table } from "antd";
import Axios from 'axios';

class Articles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }




    componentDidMount(){
        Axios.get("/admin/article").then((data) => {
                    // key: article.id,
                    // title: article.title,
                    // avatar: article.avatar,
                    // createdAt: article.createdAt,
                    // owner: article.owner,
            this.setState({articles: data.data.articles});
        });
    }



    deleteArticle = (id) => {
        Axios.delete("/admin/article", {data: {id: id}}).then(res => {
            if (res.data.msg === "success"){
                this.setState({articles: this.setState.articles.filter((value) => {
                    return value.key != id;
                })});
            } else {
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
            title: "Owner",
            key: "owner",
            dataIndex: "owner",
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (text, record) => <button onClick={() => this.deleteArticle(record.key)} className={style.button}>Delete Article</button>,
        }
    ];


    render() {
        return(<div>
            <Table columns={this.columns} dataSource={this.state.articles}/>
        </div>);
    }
}

export default Articles;
