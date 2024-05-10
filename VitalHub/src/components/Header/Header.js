import { BoxUser, ContainerHeader, DataUser, ImageUser, NameUser, TextDefault } from "./Style"
import {MaterialIcons} from "@expo/vector-icons"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import { useEffect, useState } from "react";
import api from "../../service/Service";

export const Header = ({onPress}) => {
  const [name, setName] = useState()
  const [photo, setPhoto] = useState()


  async function GetUser() {
    const token = await UserDecodeToken();
    setName(token.name)

    try {
      const response =  await api.get(`/Usuario/BuscarPorId?id=${token.jti}`)
      setPhoto(response.data.foto)
    } catch (error) {
      console.log(error + 'erro buscar usuario');
    }
    
  }

  useEffect(() => {
    GetUser()
  },[])

    return (
        <ContainerHeader>
        <BoxUser onPress={onPress}>
          <ImageUser source={{uri: photo}} />
          <DataUser>
            <TextDefault>Bem vindo !</TextDefault>
            <NameUser>{name}</NameUser>
          </DataUser>
        </BoxUser>

        <MaterialIcons name="notifications" size={25} color="#fbfbfb" />
    
    </ContainerHeader>
    )
}