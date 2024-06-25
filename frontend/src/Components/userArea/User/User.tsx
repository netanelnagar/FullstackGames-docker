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

interface UserInfo {
    username: string;
    email: string;
    bio: string;
    needToUpdate: string[];
}

export function User(): JSX.Element {

    const userContext = useContext(authContext);
    const toast = useContext(toastContext);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Software Developer',
        needToUpdate: []
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
        const formData = new FormData();
        image && formData.append("image", image as File);
        formData.append("_id", userContext?.user?._id as string);
        if (userInfo.username !== userContext?.user?.username) {
            formData.append("username", userInfo.username);
        }
        const response = await axios.patch(appConfig.updateProfile, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                "x-rapidapi-key": "your-rapidapi-key-here",
            },
        });

        response.data === "success" && toast?.current?.show({ severity: "success", summary: 'Success', detail: `updated successful` });

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
        if (!userContext?.user) {
            navigate('/auth');
        }
    }, [userContext?.user]);

    console.log(image);
    return (
        <div className="personal-area-container full pt-3">
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
            <Card title="My Account" className="personal-area-card">
                <div className="p-fluid">
                    <div className="p-field center">
                        <Avatar className='avatar' onClick={handleEditImage} image={'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} shape="circle" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText
                            id="name"
                            name="name"
                            value={userInfo.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    {/* <div className="p-field">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div> */}
                    {/* <div className="p-field">
                <label htmlFor="bio">Bio</label>
                <InputText
                  id="bio"
                  name="bio"
                  value={userInfo.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div> */}
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
