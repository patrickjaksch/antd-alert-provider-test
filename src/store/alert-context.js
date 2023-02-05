import React from "react";

const AlertContext = React.createContext({
    alerts: [],
    addAlert: (item) => {},
    removeAlert: (id) => {},
});

export default AlertContext;
