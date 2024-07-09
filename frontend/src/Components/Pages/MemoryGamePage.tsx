import { Route, Routes } from "react-router-dom";
import { AboutMemoryGame } from "../MemoryGameArea/aboutMemoryGame/AboutMemoryGame";
import { MemoryGame } from "../MemoryGameArea/MemoryGame/MemoryGame";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";

export interface HeaderOption {
    name: string;
    code: string;
}

export default function MemoryGamePage() {
    const [subject, setSubject] = useState({ name: 'fruits', code: 'OPT1' });

    const onOptionChange = (e: DropdownChangeEvent) => {
        setSubject(e.value);
    };

    const options: HeaderOption[] = [
        { name: 'fruits', code: 'OPT1' },
        { name: 'animals', code: 'OPT2' },
        { name: 'persons', code: 'OPT3' },
        { name: 'vehicle', code: 'OPT3' },
    ];
    return (
        <div className="w-100 pt-3">
            <div className="flex justify-content-between px-1">
                <h5 className="center">memoryGame</h5>
                <div className="flex justify-content-end">
                    {/* <h2 className="p-m-0">My Application Header</h2> */}
                    <Dropdown
                        value={subject}
                        options={options}
                        onChange={onOptionChange}
                        optionLabel="name"
                        placeholder="Select an Option"
                        // className="p-ml-2"
                    />
                </div>
            </div>
            <hr />
            <Routes>
                <Route path="/" element={<MemoryGame subject={subject} setSubject={setSubject}/>} />
                {/* <Route path="/Game" element={<MemoryGame subject={subject} setSubject={setSubject}/>} /> */}
            </Routes>
        </div>
    )
}
