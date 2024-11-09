import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../../screens/Layout"
import ListaEstabelecimentos from "../../screens/ListaEstabelecimentos"

function RoutesClientes() {

    return (
        <>
            <BrowserRouter>
                <Routes >
                    <Route element={<Layout />}>
                    <Route path="/*" element={<></>} />
                    <Route path="/Estabelecimentos" element={<ListaEstabelecimentos />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutesClientes