import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../../screens/Layout"
import ListaEstabelecimentos from "../../screens/ListaEstabelecimentos"
import CadastroEstabelecimento from "../../screens/CadastroEstabelecimento"

function RoutesClientes() {

    return (
        <>
            <BrowserRouter>
                <Routes >
                    <Route element={<Layout />}>
                    <Route path="/*" element={<></>} />
                    <Route path="/Estabelecimentos" element={<ListaEstabelecimentos />} />
                    <Route path="/CadastroEstabelecimento" element={<CadastroEstabelecimento />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutesClientes