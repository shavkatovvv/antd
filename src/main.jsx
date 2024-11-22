import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./client/client.js";

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <ConfigProvider>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </QueryClientProvider>
);
