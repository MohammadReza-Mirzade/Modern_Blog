import React from 'react';
import style from './UserUpdatePasswordPage.module.css';
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";
import Axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import {Result} from "antd";
import {sessionChecker} from "../../../tools/session";


const styles  = (them) => ({
    root: {
        width: 50+'%',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    input: {
        width: 100+'%',
        margin: 20+'px'
    },
    btn: {
        margin: 35+'px',
        marginTop: 0
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: 10+"px"
    }
});


class UserUpdatePasswordPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: '',
            field: {
                oldPassword: '',
                password: '',
                repeatPassword: ''
            }
        }
    }

    getOldPassword = (event) => {
        this.setState({field: {...this.state.field, oldPassword: event.target.value}});
    };

    getPassword = (event) => {
        this.setState({field: {...this.state.field, password: event.target.value}});
    };

    getRepeatPassword = (event) => {
        this.setState({field: {...this.state.field, repeatPassword: event.target.value}});
    }

     sendData = async (password, oldPassword) => {
        let res = await Axios.put(/*'https://api.mocki.io/v1/6910a074*/'/blogger', {password: oldPassword, newPassword: password});
        if (res.data.msg === 'success') {
            this.setState({open: true});
        } else if (res.data.msg === "session") {
            this.props.history.push("/login");
        } else {
            this.setState({error: res.data.msg});
        }
    }

    validate = () => {
        if (!this.state.field.oldPassword.trim()) return this.setState({error: "The Password field is empty."});
        if (!this.state.field.password.trim()) return this.setState({error: "The New Password field is empty."});
        if (!this.state.field.repeatPassword.trim()) return this.setState({error: "The New Password Repetition field is empty."});
        if (this.state.field.password !== this.state.field.repeatPassword) return this.setState({error: "The New Password and New Password Repetition field are not equal."});
        return this.sendData(this.state.field.password, this.state.field.oldPassword);
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        sessionChecker();
        const { classes } = this.props;
        return(
            <div className={classes.container}>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={this.Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <Result
                            status="success"
                            title="Your password has been updated."
                        />
                        </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                {(this.state.error)?[<Alert severity="error" className={style.alert}>
                    <AlertTitle style={{width: 'max-content'}}>Error</AlertTitle>
                    <strong>{this.state.error}</strong>
                </Alert>]:<div className={style.alert} style={{height: 63.6167+"px"}}></div>}
                <Card className={classes.root}>
                    <CardContent className={classes.cardContent}>
                        <TextField onChange={this.getOldPassword} type="password" className={classes.input} id="old-password" label="Password" variant="outlined" />
                        <TextField onChange={this.getPassword} type="password" className={classes.input} id="password" label="New Password" variant="outlined" />
                        <TextField onChange={this.getRepeatPassword} type="password" className={classes.input} id="repeat-password" label="Repeat New Password" variant="outlined" />
                    </CardContent>
                    <CardActions>
                        <Button className={classes.btn} onClick={this.validate} variant="contained" color="primary">
                            CHANGE
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(UserUpdatePasswordPage);
