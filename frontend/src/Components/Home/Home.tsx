import "./Home.css";
import { Button } from "primereact/button";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/authContext/authContext";

export function Home(): JSX.Element {
    const userContext = useContext(authContext);
    return (
        <div className="Home full center">
            <div className="border rounded notice center align-content-around boxShadow">
                <div>
                    <h6>im very happy to see you</h6>
                </div>
                <div className="d-flex justify-content-between">
                    {!userContext?.user && <Link to={"/auth"} className="m-1"><Button label="login"></Button></Link>}
                    <Link to={"/memoryGame"} className="m-1"><Button label="play without login"></Button></Link>
                </div>
            </div>
        </div>
    );
}
