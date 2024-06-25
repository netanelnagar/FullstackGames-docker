import { Route, Routes } from "react-router-dom";
import { AboutMemoryGame } from "../MemoryGameArea/aboutMemoryGame/AboutMemoryGame";
import { MemoryGame } from "../MemoryGameArea/MemoryGame/MemoryGame";



export default function MemoryGamePage() {
    return (
        <div>
            <h5 className="center">memoryGame</h5>
            <hr />
            <Routes>
                <Route path="/" element={<AboutMemoryGame/>}/>
                <Route path="/Game" element={<MemoryGame/>}/>
            </Routes>
        </div>
    )
}
