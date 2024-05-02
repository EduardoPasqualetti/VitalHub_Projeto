import { BoxUser, ContainerHeader, DataUser, ImageUser, NameUser, TextDefault } from "./Style"
import {MaterialIcons} from "@expo/vector-icons"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import { useEffect, useState } from "react";
import api from "../../service/Service";

export const Header = ({onPress}) => {
  const [name, setName] = useState()
  const [photo, setPhoto] = useState()


  async function profileLoad() {
    const token = await UserDecodeToken();
    setName(token.name)

    if (photo == null) {
      await GetUser(token.jti)
    }
    
  }

  useEffect(() => {
    profileLoad()
  },[])

  async function GetUser(id){
    try {
      const response =  await api.get(`/Usuario/BuscarPorId?id=${id}`)
      setPhoto(response.data.foto)
    } catch (error) {
      console.log(error + 'erro buscar usuario');
    }
  }
  
    return (
        <ContainerHeader>
        <BoxUser onPress={onPress}>
          <ImageUser source={{uri: photo}} />
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