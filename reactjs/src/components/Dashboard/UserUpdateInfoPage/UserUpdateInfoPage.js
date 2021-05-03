import React from 'react';
import style from './UserUpdateInfoPage.module.css';
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
import {Radio, Result} from "antd";
import {sessionChecker} from "../../../tools/session";
import PhoneInput from "react-phone-input-2";
import validator from "validator";



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
                firstName: "",
                lastName: "",
                gender: "",
                mobileNumber: "",
            }
        }
    }

    getFirstName = (event) => {
        this.setState({field: {...this.state.field, firstName: event.target.value}});
    };

    getLastName = (event) => {
        this.setState({field: {...this.state.field, lastName: event.target.value}});
    };

    getGender = (event) => {
        this.setState({field: {...this.state.field, gender: event.target.value}});
    };

    getMobileNumber = (phone) => {
        this.setState({field: {...this.state.field, mobileNumber: phone}});
    };

     sendData = async (firstName, lastName, gender, mobileNumber) => {
         console.log(firstName);
        let res = await Axios.put(/*'https://api.mocki.io/v1/6910a074*/'/blogger', {firstName: firstName, lastName: lastName, gender: gender, mobileNumber: mobileNumber});
        if (res.data.msg === 'success') {
            this.setState({open: true});
        } else if (res.data.msg === "session") {
            this.props.history.push("/login");
        } else {
            this.setState({error: res.data.msg});
        }
    }

    validate(field){
         if (!field.firstName) return this.setState({error: 'FirstName field is empty.'});
         if (!field.firstName.trim()) return this.setState({error: 'FirstName field is empty.'});
         if (!field.lastName) return this.setState({error: 'FirstName field is empty.'});
         if (!field.lastName.trim()) return this.setState({error: 'LastName field is empty.'});
         if (!field.mobileNumber) return this.setState({error: 'FirstName field is empty.'});
         if (!field.mobileNumber.trim()) return this.setState({error: 'MobileNumber field is empty.'});
         if (!validator.isMobilePhone(field.mobileNumber, 'fa-IR')) return this.setState({error: "MobileNumber value isn't valid."});
         if (!(field.gender.trim()==="man" || field.gender.trim()==="woman" || field.gender.trim()==="other")) return this.setState({error: "Gender value is empty."});
         return this.sendData(field.firstName, field.lastName, field.gender, field.mobileNumber);
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
                            title="Your info has been updated."
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
                    <CardContent className={classes.cardContent} >
                        <TextField defaultValue={this.state.field.firstName} onChange={this.getFirstName} className={classes.input} id="first-name" label="First Name" variant="outlined" />
                        <TextField defaultValue={this.state.field.lastName} onChange={this.getLastName} className={classes.input} id="last-name" label="Last Name" variant="outlined" />
                        <div className={style.PhoneInput}>
                            <PhoneInput
                                value={this.state.field.mobileNumber}
                                onChange={this.getMobileNumber}
                                country={'ir'}
                            />
                        </div>
                        <Radio.Group onChange={this.getGender} defaultValue={this.state.field.gender} buttonStyle="solid" style={{display: "flex"}} className={classes.input}>
                            <Radio.Button value="man">man</Radio.Button>
                            <Radio.Button value="woman">woman</Radio.Button>
                            <Radio.Button value="other">other</Radio.Button>
                        </Radio.Group>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.btn} onClick={() => {this.validate(this.state.field)}} variant="contained" color="primary">
                            CHANGE
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(UserUpdatePasswordPage);
