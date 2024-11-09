/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Usuario from "../../models/Usuario";
import Authentication from "../../models/Authentication";
import { criarSecao } from "../../Util/loginUtils";
import { TipoRetorno } from "../../Util/ReduceUtils";
import Loading from "../../components/Loading";


export const NavegacaoContext = createContext();

export default function NavegacaoContextProvider({ children }) {


    const recuperarUsuario = () => {
        let usuario = localStorage.getItem("usuario");
        if (usuario === undefined || usuario === null || usuario === "[object Object]") {
            return new Usuario();
        }
        return new Usuario(JSON.parse(usuario));
    };

    const recuperarAuthentificacao = () => {
        let auth = localStorage.getItem("authentication");
        if (auth === undefined || auth === null || auth === "[object Object]") {
            return new Authentication();
        }
        auth = new Authentication(JSON.parse(auth));
        auth.tokenAcess = "";
        return auth;
    };


    const [ativa, setAtiva] = useState(false);// referente a bara lateral

    const [authentication, setAuthentication] = useState(recuperarAuthentificacao());
    const [usuario, setUsuario] = useState(recuperarUsuario());
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        localStorage.setItem("authentication", JSON.stringify(authentication));
        if (usuario !== undefined && usuario !== null
            && usuario.id !== null && usuario.id > 0) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
        } else {
            localStorage.removeItem("usuario");
        }
    }, [authentication, usuario]);


    const isAuthenticated = () => {
        let isTokenAcess = (authentication.tokenAcess !== undefined && authentication.tokenAcess !== null && authentication.tokenAcess !== "");
        let isTokenAccount = (authentication.tokenAccount !== undefined && authentication.tokenAccount !== null && authentication.tokenAccount !== "");
        return isTokenAcess && isTokenAccount;
    }

    const isGenerateToken = () => {
        let isTokenAcess = (authentication.tokenAcess !== undefined && authentication.tokenAcess !== null && authentication.tokenAcess !== "");
        return isTokenAcess;
    }

    const callbackSecao = ({ type, error, data }) => {
        if (type == TipoRetorno.FAIL
            || (error != undefined && error != null && Object.keys(error).length > 0)) {
            console.error(error);
            setTimeout(() => {
                setLoading(true);
                criarSecao(callbackSecao);
            }, 10);
        } else {
            setLoading(false);
            localStorage.setItem("jwt", data.token);
            setAuthentication(prevAuth => ({
                ...prevAuth,
                tokenAcess: data.token
            }));
            setTimeout(() => {
                setLoading(true);
                criarSecao(callbackSecao);
            }, data.timeAcess - 30000);
        }
    };


    if (!isGenerateToken() && !loading) {
        setLoading(true);
        criarSecao(callbackSecao);
    }

    const removerAcesso = () => {
        setLoading(true);
        localStorage.setItem("jwt", "");
        setAuthentication(new Authentication());
        setUsuario(new Usuario());
        criarSecao(callbackSecao);
    };


    return (
        <NavegacaoContext.Provider value={{ ativa, setAtiva, authentication, removerAcesso, setAuthentication, isGenerateToken, isAuthenticated, usuario, setUsuario }}>
            <Loading data={{ loading }} />
            {children}
        </NavegacaoContext.Provider>
    );
}

export const useNavegacao = () => {
    return useContext(NavegacaoContext);
}

NavegacaoContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}