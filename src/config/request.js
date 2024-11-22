import axios from "axios";

const userData = localStorage.getItem("userData");
let accessToken;

if (userData) {
    const parsedUserData = JSON.parse(userData);
    accessToken = parsedUserData.accessToken;
}

export const request = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
});
