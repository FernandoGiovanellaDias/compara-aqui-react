import { Box, Typography } from "@mui/material";
import GrupoLogo from "../../components/GrupoLogo";
import { LoginButton, ContainerLogin } from "./styles";
import { useNavegacao } from "../../context/NavegacaoContextProvider";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { TipoRetorno } from "../../Util/ReduceUtils";
import { useReducer, useState } from "react";
import { realizarLogin } from "../../Util/loginUtils";
import reducer from "../../Util";
import Login from "../../models/Login";
import CInput from "../../components/CInput";
import PropTypes from 'prop-types';

const MsgError = ({ error }) => {
  if (!error || error.length === 0) {
    return <></>;
  }

  return (
    <Typography marginTop={2} fontFamily={"Poppins"} fontWeight={500} fontSize="12px" color="#b32222">
      {error}
    </Typography>
  );
};

export default function LoginScreen() {

  const navigate = useNavigate();

  const { setAuthentication, setUsuario } = useNavegacao();

  const [erros, setErros] = useState({});
  const [error, setError] = useState("");
  const [login, dispatch] = useReducer(reducer, new Login());
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    let callback = ({ type, error, data }) => {
      if (type == TipoRetorno.FAIL) {
        setLoading(false);
        if (data != undefined && data != null) {
          if (data.error) {
            setError(data.message);
          }
        } else if (error != undefined && error != null && Object.keys(error).length > 0) {
          setErros(error);
          setError(null);
        }
      } else {
        setError(null);
        setAuthentication(data.authentication);
        setUsuario(data.usuario);
        setLoading(false);
        navigate(-1);
        navigate("/Estabelecimentos")
      }
    };
    setError(null);
    setLoading(true);
    realizarLogin(login, callback);
  }

  return (
    <>
      <Loading data={{ loading: loading }} />
      <ContainerLogin>
        <GrupoLogo />
        <Box display={'flex'} flexDirection={'column'} gap={2}>


          <CInput
            id="email"
            label="E-mail"
            value={login.email}
            dispatch={dispatch}
            error={erros}
            placeholder="Digite seu e-mail"
            helperText="Insira seu e-mail"
          />

          <CInput
            id="senha"
            label="Senha"
            type="password"
            value={login.senha}
            dispatch={dispatch}
            error={erros}
            placeholder="Digite sua senha"
            helperText="Insira sua senha"
          />
        </Box>
        <Box textAlign="center">
          <LoginButton variant="contained" onClick={submitHandler}>
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'10px'} color="#1400ba" >
              Login
            </Typography>
          </LoginButton>

          <MsgError error={error} />
        </Box>

      </ContainerLogin>
    </>
  );
}



MsgError.propTypes = {
  error: PropTypes.string,
};
