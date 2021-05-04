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
                style={{ width: 200 }}
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
                            src={this.props.articleAvatar}
                        />
                        <Avatar
                            style={{
                                alignSelf: "flex-end",
                                position: 'absolute',
                                left: "100"+'px',
                            }}
                            src={this.props.bloggerAvatar}
                        />
                    </Avatar.Group>
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                ]}
            >
                <Meta
                    title="Card title"
                    description="This is the description and its very long (not very long but it must be at last twenti word its nice it isn't?)."
                />
            </Card>
        );
    }
}

export default Article;
