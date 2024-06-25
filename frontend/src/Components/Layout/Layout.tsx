import { useContext, useState } from "react";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import "./Layout.css";
import { Toast } from 'primereact/toast';
import welcomeImg from "../../images/welcome.gif"
import toastContext from "../../Context/ToastContext/ToastContext";


export function Layout(): JSX.Element {
    const toast = useContext(toastContext)
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 2000);
    return (
        <div className='full center'>
            <Toast className="classToast" ref={toast} />
            {loading ? <img src={welcomeImg} alt="" height={"400px"} width={"400px"} /> :
                <>
                    <header><Header /></header>
                    <main><Main /></main>
                </>
            }
        </div>
    );
}
