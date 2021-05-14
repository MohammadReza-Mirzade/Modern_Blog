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


    deleteComment = (id) => {
        Axios.delete("/admin/comment", {data: {id: id}}).then(res => {
            if (res.data.msg === "success"){
                Axios.get("/admin/comment").then((data) => {
                    this.setState({comments: data.data.comments});
                });
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
            this.setState({comments: data.data.comments});
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
            render: (text, record) => <button onClick={() => this.deleteComment(record.key)} className={style.button}>Delete Article</button>,
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
