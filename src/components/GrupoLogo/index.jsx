import { Typography } from "@mui/material";
import { Logo } from "../../assets/images/Logo";
import { ContainerLogo } from "./styles";


export default function GrupoLogo() {
  return (
    <>
      <ContainerLogo>
        <Logo style={{ height: 30 }}   />
        <Typography sx={{marginBottom: '-8px'}} fontFamily={"Poppins"} fontWeight={300} variant="h5" >
          Compara Aqui
        </Typography>
      </ContainerLogo>
    </>
  );
}