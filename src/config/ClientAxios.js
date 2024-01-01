import axios from 'axios'

const ClientAxios = axios.create({
    baseURL :`${import.meta.env.VITE_HOST_API}/api`
})


export default ClientAxios;