import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.75:5000/api/reservas/v3/",
    headers:{
        'accept':'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

const sheets = {
    getSalas:()=> api.get("classroom"),
    postLogin:(user) => api.post("user/login", user),
    postCadastro:(user) => api.post("user",user),
    deleteUser: (userID) => api.delete(`user/${userID}`),
    getUserById: (userID) => api.get(`/user/${userID}`),
    updateUser: (perfilUser, cpf ) => api.put(`user/${cpf}`, perfilUser),
    postReserva:(sala) => api.post("schedule",sala),
    getScheduleByWeek:(week) => api.post("schedule/available/",week),
    getUserSchedules: (userID) => api.get(`schedule/user/${userID}`),
    deleteSchedule: (idSchedule) => api.delete(`schedule/${idSchedule}`),
    postDaysWeekSchedule: (daysDate) => api.post(`schedule/days`, daysDate)
    
}

export default sheets;