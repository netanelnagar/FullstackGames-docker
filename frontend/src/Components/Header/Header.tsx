import "./Header.css";
import { NavLink} from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { useContext, useState } from "react";
import { authContext } from "../../Context/authContext/authContext";
import { appConfig } from "../../config/appConfig";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

export function Header(): JSX.Element {

    const [visibleLeft, setVisibleLeft] = useState(false);

   

    const userContext = useContext(authContext);

    const header1 = (
        <div className="Header-1  flex align-items-center  ps-5">
            <NavLink
                to="/gamesApp"
                className={"text-lg"}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            >Home</NavLink>
            <NavLink
                to="/about"
                className={"ms-5 text-lg"}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            >About</NavLink>
        </div >
    )

    const header2 = (<div className="center Header-2">
        <Button icon="pi pi-bars" className="bg-primary ms-3" onClick={() => setVisibleLeft(true)} />
        <Sidebar header={<h2 className="font-bold">Menu</h2>}closeIcon="pi pi-times" maskClassName="sidebar-header" visible={visibleLeft} onHide={() => setVisibleLeft(false)}>   
            <NavLink
                to="/gamesApp"
                className={"block text-lg"}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            >Home</NavLink>
            <NavLink
                to="/about"
                className={"block mt-3 text-lg"}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            >About</NavLink>
        </Sidebar>
    </div>)


    return (
        <div className="Header full flex bg-primary-subtle justify-content-between">
            {
                window.innerWidth > 650 ? header1 : header2
            }
            <NavLink
                to={userContext?.user ? "/user" : "/auth"}
                className={"center me-2"}
            ><Avatar
                    icon={userContext?.user?.imageName ? undefined : "pi pi-user"}
                    image={userContext?.user?.imageName ? `${appConfig.baseUrl}/images/${userContext.user.imageName}` : undefined}
                    size="large"
                    shape="circle" />
            </NavLink>
        </div>
    );
}
