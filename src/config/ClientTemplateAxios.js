import axios from 'axios'

const ClientTemplateAxios = axios.create({
baseURL :`${import.meta.env.VITE_HOST_API}`
})

export default ClientTemplateAxios;