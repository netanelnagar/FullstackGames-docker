import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
import { useContext, useState } from 'react';
import toastContext from '../../../Context/ToastContext/ToastContext';
import axios, { AxiosError } from 'axios';
import { appConfig } from '../../../config/appConfig';
import { IUser } from '../../../Models/Models';
import { authContext } from '../../../Context/authContext/authContext';

export function Register(): JSX.Element {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const userContext = useContext(authContext);

    const toast = useContext(toastContext);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image as File);
        formData.append("username", username);
        formData.append("password", password);
        try {
            
            const response = await axios.post(appConfig.register, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                    "x-rapidapi-key": "your-rapidapi-key-here",
                },
            });
            const user: { user: IUser, token?: string } = response.data;
            toast?.current?.show({ severity: "success", summary: 'Success', detail: `successful register ${user.user.username}` });
            userContext?.setUser({ ...user.user, token: user.token });
            navigate('/gamesApp')

        } catch (error: AxiosError | any) {
            console.log(error)
            error.response.data && toast?.current?.show({ severity: 'error', summary: 'Error', detail: `${error.response.data}` })
        }
    };

    const onImageUpload = (event: FileUploadSelectEvent) => {
        if (event.files && event.files[0]) {
            setImage(event.files[0]);
            toast?.current?.show({ severity: "success", summary: 'Success', detail: `Uploaded image ${event.files[0].name}` })
        }
    };

    return (
        <div className="full d-flex justify-content-center overflow-y-scroll">
            <Card title="Register" className="shadow register-card mt-3">
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-100"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <Password
                            id="password"
                            value={password}
                            minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Profile Image</label>
                        <FileUpload
                            mode="basic"
                            name="image"
                            accept="image/*"
                            maxFileSize={10000000}
                            onSelect={onImageUpload}
                            className="form-control"
                        />
                    </div>
                    <Button type="submit" label="Register" className="bt w-100" />
                </form>
                <div className="mt-3 text-center">
                    <p>Already have an account? <Link to="/auth">Login here</Link></p>
                </div>
            </Card>
        </div>
    );
}
