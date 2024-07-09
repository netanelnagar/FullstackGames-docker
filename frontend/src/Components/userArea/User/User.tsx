import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "./User.css";
import { authContext } from '../../../Context/authContext/authContext';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import axios from 'axios';
import toastContext from '../../../Context/ToastContext/ToastContext';
import { appConfig } from '../../../config/appConfig';
import { IUser } from '../../../Models/Models';

interface UserInfo {
    username: string | undefined;
    email: string | undefined;
}

export function User(): JSX.Element {

    const userContext = useContext(authContext);
    const toast = useContext(toastContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: userContext?.user?.username,
        email: userContext?.user?.email
    });
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [visible, setVisible] = useState(false);

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => { setImage(null); setVisible(false) }} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {

        setIsEditing(false);
        console.log(userInfo.username != userContext?.user?.username, userInfo.email != userContext?.user?.email)
        if (userInfo.username === userContext?.user?.username
            && userInfo.email === userContext?.user?.email && !image) {
            return;
        }
        const formData = new FormData();
        image && formData.append("image", image as File);
        formData.append("_id", userContext?.user?._id as string);
        if (userInfo.username !== userContext?.user?.username) {
            formData.append("username", userInfo.username as string);
        }
        if (userInfo.email !== userContext?.user?.email) {
            formData.append("email", userInfo.email as string);
        }
        try {

            const response = await axios.patch(appConfig.updateProfile, formData, {
                headers: {
                    "Authorization": "Bearer " + userContext?.user?.token,
                    "Content-Type": "multipart/form-data",
                    "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                    "x-rapidapi-key": "your-rapidapi-key-here",
                },
            });
            const obj = response.data as { username?: string, email?: string, imageName?: string, _id: string };
            console.log(obj, { ...userContext?.user, ...obj })
            userContext?.setUser(prev => ({ ...prev as IUser, ...obj }));
            // response.status === 201 && toast?.current?.success(`updated successful`);
            response.status === 201 && toast?.current?.show({ severity: "success", summary: 'Success', detail: `updated successful` });
        } catch (error) {
            console.log(error);
        }

    };

    const handleEditImage = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        if (!isEditing) return;
        setVisible(true);

    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserInfo(prev => ({ ...prev, [name]: value }))
    };

    const onImageUpload = (event: FileUploadSelectEvent) => {
        // event.preventDefault();
        if (event.files && event.files[0]) {
            setImage(event.files[0]);
        }
    };

    useEffect(() => {
        // if (!userContext?.user) {
        //     navigate('/auth');
        // }else if(userContext?.user.role === 'admin') {
        //     navigate('/admin');
        // }
    }, [userContext?.user]);

    // console.log(image);
    return (
        <div className="personal-area-container w-100 pt-3 md:p-5">
            <Dialog header="Upload Image" visible={visible} position={"top"} style={{ width: '450px' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
                <div className='center'>
                    <FileUpload
                        mode="basic"
                        name="image"
                        accept="image/*"
                        maxFileSize={10000000}
                        onSelect={onImageUpload}
                    />
                </div>
            </Dialog>
            <Card title="My Account" className="personal-area-card w-11 md:w-30rem  p-2">
                <div className="p-fluid">
                    <div className="p-field center">
                        <Avatar
                            className='avatar'
                            onClick={handleEditImage}
                            icon={userContext?.user?.imageName ? undefined : "pi pi-user"}
                            image={userContext?.user?.imageName ? `${appConfig.baseUrl}/images/${userContext.user.imageName}` : undefined}
                            shape="circle" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="username">Name</label>
                        <InputText
                            id="username"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="p-field">
                        {!isEditing ? (
                            <Button label="Edit" icon="pi pi-pencil" onClick={handleEdit} />
                        ) : (
                            <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                        )}
                    </div>
                    {isEditing && <Message severity="info" text="To edit image click on image" />}
                </div>
            </Card>
        </div>
    );
}
