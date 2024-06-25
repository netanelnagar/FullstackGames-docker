import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import toastContext from './ToastContext';

interface IProps {
    children: React.JSX.Element;
}

export default function ToastComponent(props: IProps) {
    const toast = useRef<Toast | null>(null);
    return (
        <toastContext.Provider value={toast}>
            {props.children}
        </toastContext.Provider>
    )
}
