import { MouseEvent, useEffect, useRef, useState } from "react";
import "./aboutMemoryGame.css";
import { Link } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";


export function AboutMemoryGame(): JSX.Element {

    const [username, setUsername] = useState<string>("");
    const [subject, setSubject] = useState<string>("fruits");
    const [disable, setDisable] = useState<boolean>(true);
    const op = useRef<OverlayPanel | null>(null);

    useEffect(() => {
        if (username === "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [username]);

    return (
        <div className="full center mb-5">
            <div className="aboutMemoryGame row border rounded">
                <div className="bg-secondary-subtle col-12 pt-2">
                    <h6>Memory Game</h6>
                    <p>click on cards to flip them and find the matching pairs with as little as possible</p>
                </div>
                <div className="py-3">
                    <label className="text-start py-1">Your name:</label>
                    <input className="form-control py-1" type="text" name="username" placeholder="your name including letters and digit only" maxLength={12} onChange={(e) => {
                        setUsername(e.target.value.trim().toLowerCase());
                    }} />
                    <div className="mt-2 py-1">
                        <button className="btn border" disabled={disable} onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            localStorage.setItem('subject', subject)
                        }}><Link to={'/memoryGame/Game'} className="full">Play</Link></button>
                        <button className="btn bg-secondary-subtle ms-1" onClick={e => { op.current?.toggle(e) }}>Setting</button>
                        <OverlayPanel ref={op}>
                            <div className={" mt-1"}>
                                <label className="text-start fw-bold">Subject of cards:</label>
                                <select className="form-select" defaultValue={subject} onChange={(e) => {
                                        setSubject(e.target.value)                                   
                                }}>
                                    <option value={"fruits"}>Fruits</option>
                                    <option value={"animals"}>Animals</option>
                                    <option value={"persons"}>Persons</option>
                                    <option value={"vehicle"}>Vehicle</option>
                                </select>
                            </div>
                            <br />
                            <div className="center">
                                <Button label="Ok" icon="pi pi-check" onClick={e => op.current?.toggle(e)} autoFocus />
                            </div>
                        </OverlayPanel>
                        <button className="btn bg-secondary-subtle ms-1">High Scores</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
