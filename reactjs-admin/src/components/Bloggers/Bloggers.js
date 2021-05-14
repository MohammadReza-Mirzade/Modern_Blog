import style from './Bloggers.module.css';
import React from "react";
import { Table } from "antd";
import Axios from "axios";

class Bloggers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bloggers: [],
        };
    }



    componentDidMount(){
        Axios.get("/admin/blogger").then((data) => {
                    // key: blogger.id,
                    // username: blogger.username,
                    // firstName: blogger.firstName,
                    // lastName: blogger.lastName,
                    // gender: blogger.gender,
                    // mobileNumber: blogger.mobileNumber
            this.setState({articles: data.data.bloggers});
        });
    }



    deleteArticle = (id) => {
        Axios.delete("/blogger/blogger", {data: {id: id}}).then(res => {
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
            title: "Username",
            key: "username",
            dataIndex: "username",
        },
        {
            title: "FirstName",
            key: "firstName",
            dataIndex: "firstName",
        },
        {
            title: "LastName",
            key: "lastName",
            dataIndex: "lastName",
        },
        {
            title: "Gender",
            key: "gender",
            dataIndex: "gender",
        },
        {
            title: "MobileNumber",
            key: "mobileNumber",
            dataIndex: "mobileNumber",
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
        }
    ];



    render() {
        return(<div>
            <Table columns={this.columns} dataSource={this.state.bloggers}/>
        </div>);
    }
}

export default Bloggers;
