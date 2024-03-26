import { BoxUser, ContainerHeader, DataUser, ImageUser, NameUser, TextDefault } from "./Style"
import { MaterialIcons } from "@expo/vector-icons"
import { userDecodeToken } from '../../Utils/Auth'
import { useEffect, useState } from "react"

import api from "../../service/Service"

export const Header = ({ ProfileImage, onPress }) => {

  const [name, setName] = useState(api.name)

  async function Login() {

    // Chamar a api de 3
    const response = await api.get('/Login', {
      name: name
    })
  }

  async function profileLoad() {
    const token = await userDecodeToken()

    console.log(token)
  }

  useEffect(() => {
    profileLoad()
  }, [])

  return (
    <ContainerHeader>
      <BoxUser onPress={onPress}>
        <ImageUser source={ProfileImage} />
        <DataUser>
          <TextDefault>Bem vindo !</TextDefault>
          <NameUser>{name}</NameUser>
        </DataUser>
      </BoxUser>

      {/* material icons */}
      <MaterialIcons name="notifications" size={25} color="#fbfbfb" />

    </ContainerHeader>
  )
}