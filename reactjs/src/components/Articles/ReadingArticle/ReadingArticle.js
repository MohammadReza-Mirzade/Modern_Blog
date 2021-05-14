import style from './ReadingArticle.module.css';
import React from 'react';
import {CloseOutlined} from '@ant-design/icons';
// import FroalaEditor from 'react-froala-wysiwyg';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import Axios from 'axios';




const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);



class ReadingArticle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        }
    }

    close = () => {
        this.props.close();
    }


    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        const comment = {

        }

        Axios.post("", comment).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });;
    };


    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;
        return(
            <div>
                <img className={style.Avatar} src={"/article/" + this.props.article.id + "/" + this.props.article.avatar}/>
                <div className={style.Exit} onClick={this.close}><CloseOutlined style={{padding: 13}} /></div>
                <h1  className={style.Title}>{this.props.article.title}</h1>
                <hr/>
                <img className={style.AvatarWriter} src={"/images/avatars/" + this.props.article.bloggerAvatar}/>
                <div className={style.Writer}>Writer: {this.props.article.owner}</div>
                <div className={style.CreatedAt}>Created At: {new Date(this.props.article.createdAt).toLocaleString()}</div>
                <hr style={{marginTop: 80+"px"}}/>
                <div className={style.Article} dangerouslySetInnerHTML={{__html: this.props.article.model}}></div>
                {/*<FroalaEditor*/}
                {/*    className={style.Article}*/}
                {/*    model={this.props.article.model}*/}
                {/*    config={{*/}
                {/*        events: {*/}
                {/*            'froalaEditor.initialized': function(e, editor) {*/}
                {/*                editor._editor.edit.off();*/}
                {/*            }*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                <Comment
                    avatar={
                        <Avatar
                            src={"/article/" + this.props.article.id + "/" + this.props.article.avatar}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
        );
    }
}

export default ReadingArticle;
