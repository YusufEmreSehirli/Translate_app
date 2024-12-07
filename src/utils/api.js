import axios from "axios";

export const api = axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "7850a63ee2msh4136630c0142776p17e1d0jsnaaf447471962",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
