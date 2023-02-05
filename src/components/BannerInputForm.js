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
const BannerInputForm = () => {
    const {addAlert} = useAlert();

    const rememberIgnoreFunction = (alert) => {
        console.log('This is where we write the ID of the alert to the localstorage to prevent it from loading the next time.', alert);
    }

    const addAlertHandler = (values) => {
        const message = values.message;
        const description = values.description;
        const type = transformSeverityToAlertType(values.type);
        addAlert({message, description, type, alertActionCallback: rememberIgnoreFunction, id: crypto.randomUUID()});
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
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Space>
    );
};

export default BannerInputForm;
