import { MegaMenu } from "primereact/megamenu";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";

export function Header(): JSX.Element {
    const navigate = useNavigate();
    const header1 = (
        <div className="full d-flex align-items-center bg-primary-subtle ps-5">
            <NavLink
                to="/gamesApp"
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
                className={"ms-5"}
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
    const items = [
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            command: () => {
                navigate('/about');
            }
        }
    ]
    const navForMenu = (
        <NavLink
                to="/gamesApp"
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                        viewTransitionName: isTransitioning ? "slide" : "",
                    };
                }}
            ><i className="pi pi-home"></i>Home</NavLink>
    )
    const header2 = (<>
        <MegaMenu model={items} end={navForMenu} breakpoint="960px" />
    </>)


    return (
        <div className="Header full">
            {
                window.innerWidth >= 960 ? header1 : header2
            }
        </div>
    );
}
