/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';


export const NavegacaoContext = createContext();

export default function NavegacaoContextProvider({ children }) {

    const [ativa, setAtiva] = useState(false);
    const [fezLogin, setFezLogin] = useState(false);


    return (
        <NavegacaoContext.Provider value={{ ativa, setAtiva, fezLogin, setFezLogin}}>
            {children}
        </NavegacaoContext.Provider>
    );
}

export const useNavegacao = ()=>{
    return useContext(NavegacaoContext);
}

NavegacaoContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}