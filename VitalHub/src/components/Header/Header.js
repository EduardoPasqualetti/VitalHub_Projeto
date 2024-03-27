import { BoxUser, ContainerHeader, DataUser, ImageUser, NameUser, TextDefault } from "./Style"
import {MaterialIcons} from "@expo/vector-icons"
import { UserDecodeToken } from "../../Utils/Auth/auth"
import { useEffect, useState } from "react";

export const Header = ({ ProfileImage, onPress}) => {
  const[name,setName] = useState("")

  async function profileLoad() {
    const token = await UserDecodeToken();
    setName(token.name)
  }

  useEffect(() => {
    profileLoad()
  },[])
  
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