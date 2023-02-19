import React, {useReducer} from "react";
import alertReducer from './AlertReducer';

export const AlertContext = React.createContext(null);

const AlertProvider = (props) => {
    const [alertState, alertDispatcher] = useReducer(alertReducer, {alerts: []});

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