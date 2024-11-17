import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../../screens/Layout"
import ListaEstabelecimentos from "../../screens/ListaEstabelecimentos"
import CadastroEstabelecimento from "../../screens/CadastroEstabelecimento"
import ListaCategorias from "../../screens/ListaCategorias"
import CadastroCategoria from "../../screens/CadastroCategoria"

function RoutesClientes() {

    return (
        <>
            <BrowserRouter>
                <Routes >
                    <Route element={<Layout />}>
                        <Route path="/*" element={<></>} />
                        <Route path="/Estabelecimentos" element={<ListaEstabelecimentos />} />
                        <Route path="/CadastroEstabelecimento" element={<CadastroEstabelecimento />} >
                            <Route path=":id"/>
                        </Route>
                        <Route path="/Categorias" element={<ListaCategorias />} />
                        <Route path="/CadastroCategoria" element={<CadastroCategoria />} >
                            <Route path=":id"/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutesClientes