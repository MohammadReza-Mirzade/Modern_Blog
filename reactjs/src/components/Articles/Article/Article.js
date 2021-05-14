import style from './Article.module.css';
import React from 'react';
import { Card, Avatar, Divider, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined, AntDesignOutlined  } from '@ant-design/icons';

const { Meta } = Card;



class Article extends React.Component{
    constructor(props) {
        super(props);
    }

    /*
        props.id
        props.title
        props.articleAvatar
        props.description
        props.bloggerAvatar
        props.owner
    */


    render() {
        return(
            <Card
                style={{
                    width: 300,
                    height: 350,
                    padding: 5,
                }}
                cover={
                    <Avatar.Group
                        maxCount={2}
                        maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            display: "flex"
                        }}
                    >
                        <Avatar
                            size={{
                                xs: 100,
                                sm: 100,
                                md: 100,
                                lg: 100,
                                xl: 100,
                                xxl: 100,
                            }}
                            src={"/article/" + this.props.id + "/" + this.props.avatar}
                            className={style.Avatar}
                        />
                        <Avatar
                            style={{
                                alignSelf: "flex-end",
                                position: 'absolute',
                                top: 70,
                                left: 180,
                            }}
                            className={style.Avatar}
                            src={"/images/avatars/" + this.props.bloggerAvatar}
                        />
                    </Avatar.Group>
                }
                /*actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                ]}*/
            >
                <Meta
                    title={this.props.title}
                    description={this.props.description}
                />
                <hr/>
                 writer: {this.props.owner}<br/>
                 article created at:
                 <p style={{color: '#01024d'}}>{this.props.createdAt}</p>
            </Card>
        );
    }
}

export default Article;
