import { useContext } from "react";
import { Routing } from "../Routing/Routing";
import "./Main.css";
import { authContext } from "../../Context/authContext/authContext";

export function Main(): JSX.Element {
    // const classIfWidthMoreThan960 = window.innerWidth > 960 ? "pt-3" : "pt-3";
    const userContext = useContext(authContext);

    console.log(userContext)
    return (
        <div className={"full" }>
            <Routing />
        </div>
    );
}
