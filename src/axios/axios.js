import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.77:5000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    getSalas:()=>api.get("classroom"),
    postLogin:(user) => api.post("user/login", user),
    postCadastro:(user) => api.post("user",user),
    postReserva:(sala) => api.post("schedule",sala),
}

export default sheets;