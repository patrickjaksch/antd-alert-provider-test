import React from 'react';
import {useAlert} from './AlertProvider';
import {Alert as IntegrateAlert} from './AlertReducer';

import {CloseOutlined} from '@ant-design/icons';
import {Alert, Button, Space} from 'antd';

const AlertView = () => {
    const {alerts, removeAlert} = useAlert();
    const alertAction = (alert: IntegrateAlert) => {
        const onClickHandler = () => {
            if (alert.alertActionCallback) {
                alert.alertActionCallback(alert);
            }
            removeAlert(alert.id);
        };
        let closeIcon = <CloseOutlined style={{fontSize: '.75rem'}}/>;
        if (alert.closeIcon) closeIcon = alert.closeIcon;
        if (!alert.closable) closeIcon = null;
        return (
            <Button type="text" size="small" icon={closeIcon} onClick={onClickHandler}>
                {alert.closeText}
            </Button>
        );
    };

    const buildAlertElement = (alert: IntegrateAlert) => {
        const manuallyAssignedAttributes = [
            'id',
            'key',
            'closable',
            'closeIcon',
            'closeText',
            'action',
            'alertActionCallback',
        ];

        // filtering null value attributes since they should not override their default settings
        const nonNullAttributes = Object.keys(alert)
            .filter((key) => !manuallyAssignedAttributes.includes(key) && null != alert[key])
            .reduce((attributes: {[key: string]: any}, key) => {
                attributes[key] = alert[key];
                return attributes;
            }, {});

        return (
            <Alert
                key={alert.id}
                closable={false} // always false because we handle closing the alert with a custom function
                action={alertAction(alert)}
                {...nonNullAttributes}
            />
        );
    };

    return (
        <>
            {alerts && (
                <Space size="small" direction="vertical" style={{width: '100%'}}>
                    {alerts.map((alert) => buildAlertElement(alert))}
                </Space>
            )}
        </>
    );
};

export default AlertView;
