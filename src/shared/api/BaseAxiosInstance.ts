import axios from "axios";

const client = axios.create({
    baseURL: "https://localhost:7060/api",
});

export default client;