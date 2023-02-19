
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
    closeIcon: null,
    description: null,
    icon: null,
    message: null,
    showIcon: false, // will default to true in banner mode
    type: 'info', // will default to warning in banner mode
    onClose: null,
    // custom attributes below
    alertActionCallback: null
}


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
            return state;
    }
}

export default alertReducer;
