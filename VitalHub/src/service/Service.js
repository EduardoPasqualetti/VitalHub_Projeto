import axios from "axios";

// Declarar a porta q vai rodar a api
const PortaApi = '4466'

// Declarar o ip da maquina
const ip = '172.16.39.106'

// Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${PortaApi}/api`

// Configurar o axios
const api = axios.create({
    baseURL: apiUrlLocal
})

export default api