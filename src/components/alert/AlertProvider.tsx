import React, {useContext, useReducer} from 'react';
import alertReducer, {Alert, AlertActions} from './AlertReducer';

export interface AlertContextArgs {
    alerts: Array<Alert>;
    addAlert: (item: Partial<Alert>) => void;
    removeAlert: (id: string | number) => void;
}

const AlertContext = React.createContext<AlertContextArgs | null>(null);

interface IProps {
    children: JSX.Element
}

const AlertProvider = (props: IProps) => {
    const [alertState, alertDispatcher] = useReducer(alertReducer, {alerts: []});

    const addAlertHandler = (alert: Partial<Alert>) => {
        alertDispatcher({type: AlertActions.ADD_ALERT, payload: alert});
    };

    const removeAlertHandler = (id: string | number) => {
        alertDispatcher({type: AlertActions.REMOVE_ALERT, payload: {id}});
    };

    const alertContext: AlertContextArgs = {
        alerts: alertState.alerts,
        addAlert: addAlertHandler,
        removeAlert: removeAlertHandler,
    };

    return <AlertContext.Provider value={alertContext}>{props.children}</AlertContext.Provider>;
};

export const useAlert = () => useContext(AlertContext);
export default AlertProvider;
