import { Box, Typography } from "@mui/material";
import GrupoLogo from "../../components/GrupoLogo";
import { StyledTextField, LoginButton, ContainerLogin } from "./styles";
import { useNavegacao } from "../../context/NavegacaoContextProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setFezLogin } = useNavegacao();
  
  const navigate = useNavigate();

  return (
    <ContainerLogin>
      <GrupoLogo />
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <StyledTextField
          label="E-mail"
          placeholder="Digite seu e-mail"
          helperText="Insira seu e-mail"
          sty
          variant="filled"
        />
        <StyledTextField
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          helperText="Insira sua senha"
          variant="filled"
        />
      </Box>
      <LoginButton  variant="contained" onClick={()=>{setFezLogin(true), navigate("/Estabelecimentos")}}>
        <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'10px'} color="#1400ba" >
          Login
        </Typography>
      </LoginButton>
    </ContainerLogin>
  );
}
