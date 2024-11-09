import RoutesPublico from "./RoutesPublico";
import RoutesClientes from "./RoutesClientes";
import { useNavegacao } from "../context/NavegacaoContextProvider";

function Routes() {

    const { isAuthenticated } = useNavegacao();

    const isLogged = isAuthenticated();

    return (
        <>
            {
                isLogged ? <RoutesClientes /> : <RoutesPublico />
            }
        </>
    )
}

export default Routes