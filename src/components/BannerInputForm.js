import {Button, Form, Input, Radio, Space} from "antd";
import useAlert from "../hooks/useAlert";

const transformSeverityToAlertType = (type) => {
    switch (type) {
        case 'critical':
            return 'error';
        case 'high':
            return 'warning';
        case 'medium':
            return 'info';
        default:
            return 'success';
    }
};
const alertActionCallback = (alert) => {
    console.log('This is where we write the ID of the alert to the localstorage to prevent it from loading the next time.');
    const ignoredAlertsFromStorage = sessionStorage.getItem('ignored-alerts');
    const ignoredAlerts = (null == ignoredAlertsFromStorage) ? [] : JSON.parse(ignoredAlertsFromStorage);
    sessionStorage.setItem('ignored-alerts', JSON.stringify([...ignoredAlerts, alert.id]));


}
const defaultAlerts = [
    {
        type: 'error',
        message: 'Default Critical Priority Message',
        description: 'This is a default message.',
        id: 'a1',
        alertActionCallback
    },
    {
        type: 'warning',
        message: 'Default High Priority Message',
        description: 'This is a default message.',
        id: 'a2',
        alertActionCallback
    },
    {
        type: 'info',
        message: 'Default Medium Priority Message',
        description: 'This is a default message.',
        id: 'a3',
        alertActionCallback
    },
    {
        type: 'success',
        message: 'Default Low Priority Message',
        description: 'This is a default message.',
        id: 'a4',
        alertActionCallback
    }];


const BannerInputForm = () => {
    const {addAlert} = useAlert();

    const addAlertHandler = (values) => {
        const message = values.message;
        const description = values.description;
        const type = transformSeverityToAlertType(values.type);
        addAlert({message, description, type, alertActionCallback, id: crypto.randomUUID()});
    }

    const addAll = () => {
        console.log('addAll');
        defaultAlerts.forEach(alert => {
            addAlert(alert)
        });
    }
    const addAllFiltered = () => {
        console.log('addAllFiltered');
        const ignoredAlertsFromStorage = sessionStorage.getItem('ignored-alerts');
        const ignoredAlerts = (null == ignoredAlertsFromStorage) ? [] : JSON.parse(ignoredAlertsFromStorage);
        defaultAlerts.filter(alert => !ignoredAlerts.includes(alert.id)).forEach(alert => {
            addAlert(alert)
        });
    }

    return (
        <Space wrap>
            <Form onFinish={addAlertHandler}>
                <Form.Item label="Alert Type" name="type">
                    <Radio.Group>
                        <Radio.Button value="critical">Critical</Radio.Button>
                        <Radio.Button value="high">High</Radio.Button>
                        <Radio.Button value="medium">Medium</Radio.Button>
                        <Radio.Button value="low">Low</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Message" name="message">
                    <Input placeholder="This is the headline of the alert."/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input placeholder="This is the body content of the alert."/>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button onClick={addAll}>Add All</Button>
                        <Button onClick={addAllFiltered}>Add All Filtered</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Space>
    );
};

export default BannerInputForm;
