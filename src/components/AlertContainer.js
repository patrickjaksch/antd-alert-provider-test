import {Alert, Button, Space} from "antd";
import useAlert from "../hooks/useAlert";

const AlertContainer = () => {
    const {alerts, removeAlert} = useAlert();
    const alertAction = (alert) => {

        const onClickHandler = () => {
            if (alert.alertActionCallback) {
                alert.alertActionCallback(alert);
            }
            removeAlert(alert.id);
        }
        return <Button type="text" size="small" icon={(alert.closeIcon && alert.closable) ? alert.closeIcon : null}
                       onClick={onClickHandler}>{alert.closeText}</Button>
    }

    const buildAlertElement = (alert) => {
        const manuallyAssignedAttributes = ['id', 'key', 'closable', 'closeIcon', 'closeText', 'action', 'alertActionCallback'];

        // filtering null value attributes since they should not override their default settings
        const nonNullAttributes = Object.keys(alert)
            .filter(key => !manuallyAssignedAttributes.includes(key) && null != alert[key])
            .reduce((attributes, key) => {attributes[key] = alert[key]; return attributes; }, {});

        return <Alert
            key={alert.id}
            closable={false} // always false because we handle closing the alert with a custom function
            action={alertAction(alert)}
            {...nonNullAttributes}
        />;
    }

    return (
        <>
            {alerts &&
                <Space size="small" direction="vertical" style={{width: '100%'}}>
                    {alerts.map(alert => buildAlertElement(alert))}
                </Space>}
        </>
    );
};

export default AlertContainer;
