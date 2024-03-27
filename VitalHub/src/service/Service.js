import axios from "axios"

// Declarar a porta da API
const portaApi = '4466'

// Declarar o Ip da Máquina
const ip = '172.16.39.106'

// Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

// Agora vamos configurar o axios
const api = axios.create({
    baseURL : apiUrlLocal
})

export default api