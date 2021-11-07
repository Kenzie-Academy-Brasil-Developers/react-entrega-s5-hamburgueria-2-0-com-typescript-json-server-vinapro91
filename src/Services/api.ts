import axios from "axios";

export const api = axios.create({
  baseURL: "https://hamburgueria-atividade-5a12.herokuapp.com",
  responseType: "json",
});

// const getHeaders = () => {
//   const token = localStorage.getItem("@hamburger:token") || "";
//   const stringToken = JSON.parse(token);
//   const headers = !!stringToken
//     ? headers: {
//           Authorization: `Bearer ${stringToken}`,
//         }

//   return headers;
// };
