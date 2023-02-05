import {useContext} from "react";
import AlertContext from "../store/alert-context";

const useAlert = () => useContext(AlertContext);

export default useAlert;
