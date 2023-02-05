import {useReducer} from "react";
import AlertContext from "./alert-context";
import {CloseOutlined} from "@ant-design/icons";

const alertActionCallback = (alert) => {
    console.log('This is where we write the ID of the alert to the localstorage to prevent it from loading the next time.', alert);
}

// defining some sane defaults for the alert
const defaultAlert = {
    id: null,
    // action: null, // action cannot be overridden since we use a custom logic to remove the banner from the display
    afterClose: () => {
    },
    banner: true, // this differs from the default Alert's configuration, set to false if necessary
    // closable and all related properties are not the Alert's native properties since we use a custom close handler
    closable: true,
    closeText: null,
    closeIcon: <CloseOutlined style={{fontSize: '.75rem'}}/>,
    description: null,
    icon: null,
    message: null,
    showIcon: false, // will default to true in banner mode
    type: 'info', // will default to warning in banner mode
    onClose: null,
    // custom attributes below
    alertActionCallback: null
}

const defaultAlertState = {
    alerts: [
        {
            ...defaultAlert,
            type: 'error',
            message: 'Default Critical Priority Message',
            description: 'This is a default message.',
            id: 'a1',
            banner: true,
            alertActionCallback
        },
        {
            ...defaultAlert,
            type: 'warning',
            message: 'Default High Priority Message',
            description: 'This is a default message.',
            id: 'a2',
            banner: true,
            alertActionCallback
        },
        {
            ...defaultAlert,
            type: 'info',
            message: 'Default Medium Priority Message',
            description: 'This is a default message.',
            id: 'a3',
            banner: true,
            alertActionCallback
        },
        {
            ...defaultAlert,
            type: 'success',
            message: 'Default Low Priority Message',
            description: 'This is a default message.',
            id: 'a4',
            banner: true,
            alertActionCallback
        },
    ]
};


const alertReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            // we're defining some sane defaults here and override them with the actual configuration
            const newAlert = {...defaultAlert, ...action.alert};

            // adjusting some defaults
            if (newAlert.banner) {
                // set showIcon for banners to true unless explicitly specified by action.alert
                newAlert.showIcon = (null == action.alert.showIcon) ? true : action.alert.showIcon;

                // set default type to warning unless explicitly specified by action.alert
                newAlert.type = (null == action.alert.type) ? 'warning' : action.alert.type;
            }
            if (!newAlert.id) {
                newAlert.id = crypto.randomUUID();
            }
            return {
                alerts: [...state.alerts, newAlert],
            }
        case 'REMOVE':
            return {
                alerts: state.alerts.filter(alert => alert.id !== action.id),
            }
        default:
            return defaultAlertState;
    }
}

const AlertProvider = (props) => {
    const [alertState, alertDispatcher] = useReducer(alertReducer, defaultAlertState);

    const addAlertHandler = (alert) => {
        alertDispatcher({type: 'ADD', alert});
    }

    const removeAlertHandler = (id) => {
        alertDispatcher({type: 'REMOVE', id});
    }

    const alertContext = {
        alerts: alertState.alerts,
        addAlert: addAlertHandler,
        removeAlert: removeAlertHandler
    }

    return (
        <AlertContext.Provider value={alertContext}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;
