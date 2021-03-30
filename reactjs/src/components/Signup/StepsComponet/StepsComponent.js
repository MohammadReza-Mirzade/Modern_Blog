import React from 'react';
import style from './StepsComponent.module.css';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import { Steps } from 'antd';
const { Step } = Steps;

function StepsComponent(props) {
    const [step, setStep] = React.useState(0);
    if (props.step !== step) setStep(props.step);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (props.step !== step) setStep(props.step);
        }, 2000);
        return () => clearInterval(interval);
    });


    return (
        <div className={style.margin}>
            <Steps>
                <Step status={step<0?"wait":(step===0?"process":"finish")} title="Info" icon={<InfoIcon />} />
                <Step status={step<1?"wait":(step===1?"process":"finish")} title="Username" icon={<PermIdentityTwoToneIcon />} />
                <Step status={step<2?"wait":(step===2?"process":"finish")} title="Password" icon={<VpnKeyIcon />} />
                <Step status={step<3?"wait":(step===3?"process":"finish")} title="Avatar" icon={<FaceTwoToneIcon />} />
                <Step status={step<4?"wait":(step===4?"process":"finish")} title="Completed" icon={<CheckCircleTwoToneIcon />} />
            </Steps>
        </div>
    );
}

export default StepsComponent;
