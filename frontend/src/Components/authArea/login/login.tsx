import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import "./login.css";
import toastContext from '../../../Context/ToastContext/ToastContext';
import axios, { AxiosError } from 'axios';
import { IUser } from '../../../Models/Models';
import { appConfig } from '../../../config/appConfig';
import { authContext } from '../../../Context/authContext/authContext';

export function Login(): JSX.Element {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toast = useContext(toastContext);

    const userContext = useContext(authContext);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Please enter both username and password.' })
            return;
        }

        try {

            const response = await axios.post(appConfig.login, { username: username, password: password });
            const user: { user: IUser, token?: string } = response.data;
            userContext?.setUser({ ...user.user, token: user.token });
            user.token && toast?.current?.show({ severity: 'success', summary: 'Success', detail: `Login attempt with: ${username}` })
            navigate("/GamesApp");
        } catch (error: AxiosError | any) {
            console.log(error)
            error.response.data && toast?.current?.show({ severity: 'error', summary: 'Error', detail: `${error.response.data}` })
        }
    };


    return (
        <div className="full d-flex justify-content-center">
            <Card title="Login" className="shadow login-card mt-3">
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <FloatLabel>
                            <label htmlFor="username" className="form-label">Username</label>
                            <InputText
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=" p-inputtext-lg w-100"
                            />
                        </FloatLabel>
                    </div>
                    <div className="mb-6">
                        <FloatLabel>
                            <label htmlFor="password" className="form-label">Password</label>
                            <InputText
                                id="password"
                                value={password}
                                minLength={6}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className=" p-inputtext-lg w-100"
                            />
                        </FloatLabel>
                    </div>
                    <Button type="submit" label="Login" className="bt w-100" />
                </form>
                <div className="mt-6 text-center">
                    <p>Don't have an account? <Link to="/auth/register">Register here</Link></p>
                </div>
            </Card>
        </div>

    );
}

