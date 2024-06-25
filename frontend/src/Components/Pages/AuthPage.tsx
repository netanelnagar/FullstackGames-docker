import { Route, Routes } from "react-router-dom";
import { Login } from "../authArea/login/login";
import { Register } from "../authArea/register/register";

export default function AuthPage() {
    return (
        <div className="full auth-page">
            {/* <h5 className="center">Login</h5>
            <hr /> */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}
