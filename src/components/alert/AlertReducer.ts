export enum AlertActions {
    ADD_ALERT = 'ADD_ALERT',
    REMOVE_ALERT = 'REMOVE_ALERT',
}

export interface Alert {
    [key: string]: any,
    afterClose: () => void;
    banner: boolean;
    closable: boolean;
    closeText: string;
    closeIcon: JSX.Element;
    description: string;
    icon: JSX.Element;
    message: string;
    showIcon: boolean;
    type: string;
    onClose: () => null;
    id: string | number;
    alertActionCallback: (alert: Alert) => void;
}

// defining some sane defaults for the alert
const defaultAlert: Alert = {
    // action: null, // action cannot be overridden since we use a custom logic to remove the banner from the display
    afterClose: () => {
    },
    banner: true, // this differs from the default Alert's configuration, set to false if necessary
    // closable and all related properties are not the Alert's native properties since we use a custom close handler
    closable: true,
    closeText: null,
    closeIcon: null,
    description: null,
    icon: null,
    message: null,
    showIcon: false, // will default to true in banner mode
    type: 'info', // will default to warning in banner mode
    onClose: null,
    // custom attributes below
    id: null,
    alertActionCallback: null,
};

export interface AlertState {
    alerts: Array<Alert>;
}

export interface AlertAction {
    type: AlertActions;
    payload: Partial<Alert>;
}

const alertReducer = (state: AlertState, action: AlertAction) => {
    switch (action.type) {
        case AlertActions.ADD_ALERT:
            // we're defining some sane defaults here and override them with the actual configuration
            const newAlert = {...defaultAlert, ...action.payload};

            // adjusting some defaults according to antd defaults
            if (newAlert.banner) {
                // set showIcon for banners to true unless explicitly specified by action.alert
                newAlert.showIcon = null == action.payload.showIcon ? true : action.payload.showIcon;

                // set default type to warning unless explicitly specified by action.alert
                newAlert.type = null == action.payload.type ? 'warning' : action.payload.type;
            }
            // IDs are required for deleting the correct alert and as a key property in lists
            if (!newAlert.id) {
                newAlert.id = crypto.randomUUID();
            }
            return {
                alerts: [...state.alerts, newAlert],
            };
        case AlertActions.REMOVE_ALERT:
            return {
                alerts: state.alerts.filter((alert) => alert.id !== action.payload.id),
            };
        default:
            return state;
    }
};

export default alertReducer;
