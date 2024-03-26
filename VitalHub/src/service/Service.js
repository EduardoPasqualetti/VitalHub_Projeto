import axios from "axios"

// Declarar a porta da API
const portaApi = '4466'

// Declarar o Ip da Máquina
const ip = '192.168.19.115'

// Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

// Agora vamos configurar o axios
const api = axios.create({
    baseURL : apiUrlLocal
})

export default api