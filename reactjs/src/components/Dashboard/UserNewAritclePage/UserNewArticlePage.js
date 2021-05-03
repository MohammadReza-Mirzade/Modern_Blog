import React from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';
// import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import {Card} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Result} from "antd";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle} from "@material-ui/lab";
import style from "./UserNewArticlePage.module.css";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import Slide from "@material-ui/core/Slide";
import {sessionChecker} from "../../../tools/session";
import Axios from 'axios';
import {imgSrcToBlob} from "blob-util";



class UserNewArticlePage extends React.Component{

    constructor(props) {
        super(props);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.editor1 = null;
        this.state = {
            image: "",
            error: "",
            open1: false,
            open2: false,
            field: {
                title: "",
                model: "",
                avatar: null,
            },
        }
    }



    async sendData(formData) {
        Axios.post(/*'https://api.mocki.io/v1/6910a074*/'/blogger/article', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.msg.trim() === 'success') {
                this.setState({error: ""});
                this.setState({step: 4});
            } else if (res.data.msg.trim() === "session") {
                sessionChecker();
            } else {
                this.setState({error: res.data.msg});
            }
        });


    }


    handleModelChange = function(model) {
        this.setState({
            field:{
                ...this.state.field,
                model: model,
            }
        });
    }

    setEditorRef = (editor) => (this.editor1 = editor);


    onClickSave = async () => {

        if (this.editor1) {
            const canvas = this.editor1.getImage().toDataURL();
            // const canvasScaled = editor1.getImageScaledToCanvas();
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => {
                    // const blob = await fetch(url).then(r => r.blob());
                    this.setState({image: window.URL.createObjectURL(blob)});
                    const extension = blob.type.split('/')[1];
                    const imageFile = new File([blob], `${Date.now()}.${extension}`, {
                        type: blob.type,
                    });
                    this.setState({field: {...this.state.field, avatar: imageFile}});
                });
            this.setState({open1: false});
        }
    }


    handleClose1 = () => {
        this.setState({open1: false});
    }

    handleClose2 = () => {
        this.setState({open2: false});
    }

    handleDrop = (dropped) => {
        this.setState({field: {...this.state.field, avatar: dropped[0]}});
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    getTitle = (event) => {
        this.setState({field: {...this.state.field, title: event.target.value}});
    }

    async validate(field){
        const formData = new FormData();
        formData.append("title", field.title);
        formData.append("model", field.model);
        formData.append("avatar", field.avatar);
        const images = document.getElementsByClassName("fr-fic");
        for (let i = 0; i < images.length; i++){
            let imgCanvas = document.createElement("canvas");
            let imgContext = imgCanvas.getContext("2d");
            imgCanvas.width = images[i].width;
            imgCanvas.height = images[i].height;
            imgContext.drawImage(images[i], 0, 0, images[i].width, images[i].height);
            let canvas = imgCanvas.toDataURL("");
            let blob = await fetch(canvas);
            let extension = blob.type.split('/')[1];
            let imageFile = new File([blob], `${Date.now()}.${extension}`, {
                type: blob.type,
            });
            console.log(imageFile);
            formData.append(i.toString() , imageFile);
        }
        console.log(formData);
        this.setState({open2: true});
        this.sendData(formData);
    }


    render() {
        const { classes } = this.props;
        return(
            <div className={style.signup}>

                <Dialog
                    open={this.state.open1}
                    keepMounted
                    onClose={this.handleClose1}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Choose Your Avatar.</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Dropzone
                                onDrop={this.handleDrop}
                                noClick
                                noKeyboard
                                style={{ width: '250px', height: '250px' }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <AvatarEditor
                                            ref={this.setEditorRef}
                                            image={this.state.field.avatar}
                                            width={250}
                                            height={250}
                                            border={50}
                                            color={[255, 255, 255, 0.6]} // RGBA
                                            scale={1}
                                            rotate={0}
                                            borderRadius={200}
                                        />
                                        <input {...getInputProps()} />
                                    </div>
                                )}
                            </Dropzone>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className={style.button} onClick={this.handleClose1} color="primary">
                            Cancel
                        </Button>
                        <Button className={style.button} onClick={this.onClickSave} color="primary">
                            Set Avatar
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={this.state.open2}
                    TransitionComponent={this.Transition}
                    keepMounted
                    onClose={this.handleClose2}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <Result
                            status="success"
                            title="New article created."
                        />
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose2} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>


                {(this.state.error)?[<Alert severity="error" className={style.alert}>
                    <AlertTitle style={{width: 'max-content'}}>Error</AlertTitle>
                    <strong>{this.state.error}</strong>
                </Alert>]:<div className={style.alert} style={{height: 63.6167+"px"}}></div>}


                <Card className={style.root}>
                    <CardContent className={style.cardContent} >
                        <TextField style={{margin: 20+"px", marginBottom: 50+"px"}} defaultValue={this.state.field.title} onChange={this.getTitle} className={style.input} id="title" label="Title" variant="outlined" />

                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <img src={this.state.image} className={style.avatar} alt=""/>
                            <div style={{alignSelf: "center"}}>
                                <Button style={{margin: 10+"px"}} className={style.button} onClick={() => {this.setState({open1: true});}} variant="contained" color="primary">
                                    Choose Avatar
                                </Button>
                            </div>
                        </div>

                        <hr className={style.line} />

                        <FroalaEditorComponent
                            tag='textarea'
                            config={{
                                imageUpload: true,
                                placeholderText: 'Edit Your Content Here!',
                                // imageUploadURL: '/upload_image',
                                // imageUploadMethod: 'POST',
                                imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                                events: {
                                    'image.inserted': ($img, response) => {this.saveImages($img)},
                                },
                            }}
                            model={this.state.field.model}
                            onModelChange={this.handleModelChange}
                        />

                    </CardContent>

                    <hr className={style.line} style={{marginBottom: 0}} />

                    <CardActions>
                        <Button className={style.btn} onClick={() => {this.validate(this.state.field)}} variant="contained" color="primary">
                            Create
                        </Button>
                    </CardActions>


                </Card>
            </div>

        );
    }
}

export default UserNewArticlePage;
