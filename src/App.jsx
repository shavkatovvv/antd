import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./log/login";
import { Register } from "./log/register";
import { MainLayout } from "./layout/main-layout";
import { UserCreate } from "./user-create";
import { Tabll } from "./tabll";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<MainLayout />}>
                    <Route path="tabll" element={<Tabll />} />
                    <Route path="user-create" element={<UserCreate />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
