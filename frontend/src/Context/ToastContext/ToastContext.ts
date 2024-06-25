import { createContext } from "react";
import {Toast} from "primereact/toast"

const toastContext = createContext<React.MutableRefObject<Toast | null> | null>(null);

export default toastContext;