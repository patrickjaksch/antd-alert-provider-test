import {Alert, Button, Space} from "antd";
import {AlertContext} from './AlertProvider';
import {CloseOutlined} from "@ant-design/icons";
import {useContext} from 'react';

const AlertView = () => {
    const {alerts, removeAlert} = useContext(AlertContext);
    const alertAction = (alert) => {

        const onClickHandler = () => {
            if (alert.alertActionCallback) {
                alert.alertActionCallback(alert);
            }
            removeAlert(alert.id);
        }
        let closeIcon = <CloseOutlined style={{fontSize: '.75rem'}}/>;
        if (alert.closeIcon) closeIcon = alert.closeIcon;
        if (!alert.closable) closeIcon = null;
        return <Button type="text" size="small" icon={closeIcon} onClick={onClickHandler}>{alert.closeText}</Button>
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

export default AlertView;
