import style from './Comments.module.css';
import React from "react";
import { Table } from "antd";
import Axios from "axios";

class Comments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }


    deleteArticle = (id) => {
        Axios.delete("/blogger/comment", {data: {id: id}}).then(res => {
            if (res.data.msg === "success"){
                this.setState({articles: this.setState.articles.filter((value) => {
                        return value.key != id;
                    })});
            } else {
                alert(res.data.msg);
            }
        });
    }


    componentDidMount(){
        Axios.get("/admin/comment").then((data) => {
            // key: Comment.id,
            // owner: blogger.username,
            // article: blogger.id,
            // text: blogger.text,
            this.setState({articles: data.data.comments});
        });
    }




    columns = [
        {
            title: "Owner",
            key: "owner",
            dataIndex: "owner",
        },
        {
            title: "Article",
            key: "article",
            dataIndex: "article",
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
            render: (text, record) => <button onClick={() => this.deleteArticle(record.key)} className={style.button}>Delete Article</button>,
        },
        {
            title: "Text",
            key: "text",
            dataIndex: "text",
        },
    ];




    render() {
        return(<div>
            <Table columns={this.columns} dataSource={this.state.comments}/>
        </div>);
    }
}

export default Comments;
