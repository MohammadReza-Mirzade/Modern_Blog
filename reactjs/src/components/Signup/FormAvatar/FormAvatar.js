import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import style from './FormAvatar.module.css';
import AvatarEditor from "react-avatar-editor";
import store from "../../../Store";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Dropzone from 'react-dropzone'
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";


const useStyles = makeStyles({
    root: {
        width: 100+'%',
        opacity: 90+'%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    cardContent: {
        width: 80+"%"
    },
    input: {
        width: 100+'%',
        margin: 20+'px'
    },
    btn: {
        margin: 35+'px',
        marginTop: 0
    }
});

export default function FormAvatar(props) {
    const classes = useStyles();
    const [field, setField] = useState({userName: store.getState().field.username});
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    let editor1 = null;

    const setEditorRef = (editor) => (editor1 = editor);

    const onClickSave = async () => {

        if (editor1) {
            const canvas = editor1.getImage().toDataURL();
            // const canvasScaled = editor1.getImageScaledToCanvas();
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => {
                    // const blob = await fetch(url).then(r => r.blob());
                    setImage(window.URL.createObjectURL(blob));
                    const extension = blob.type.split('/')[1];
                    const imageFile = new File([blob], `${Date.now()}.${extension}`, {
                        type: blob.type,
                    });
                    setField(prevField => ({...prevField, avatar: imageFile}))
                });
            setOpen(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDrop = (dropped) => {
        setField(prevField => ({...prevField, avatar: dropped[0]}));
    }


        return (
        <div className={style.w100}>


            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Choose Your Avatar.</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Dropzone
                            onDrop={handleDrop}
                            noClick
                            noKeyboard
                            style={{ width: '250px', height: '250px' }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                        <AvatarEditor
                            ref={setEditorRef}
                            image={field.avatar}
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
                    <Button className={style.button} onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button className={style.button} onClick={onClickSave} color="primary">
                        Set Avatar
                    </Button>
                </DialogActions>
            </Dialog>


            <div className={classes.root}>
                <CardContent className={classes.cardContent}>

                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <img src={image} className={style.avatar} alt=""/>
                        <div style={{alignSelf: "center"}}>
                            <Button style={{margin: 10+"px"}} className={style.button} onClick={() => {}} variant="contained" color="primary">
                                Default Avatar
                            </Button>
                            <Button style={{margin: 10+"px"}} className={style.button} onClick={() => {setOpen(true);}} variant="contained" color="primary">
                                Choose Avatar
                            </Button>
                        </div>
                    </div>

                </CardContent>
                <CardActions style={{width: 100+"%", display: "flex", justifyContent: "end"}}>
                    <Button className={classes.btn} onClick={() => {props.clickBackHandler()}} variant="contained" color="primary">
                        PREVIOUS
                    </Button>
                    <Button className={classes.btn} onClick={() => {props.clickHandler(field)}} variant="contained" color="primary">
                        NEXT
                    </Button>
                </CardActions>
            </div>
        </div>
    );
}
