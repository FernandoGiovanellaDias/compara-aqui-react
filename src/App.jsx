import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import './fonts/index';
import NavegacaoContextProvider from "./context/NavegacaoContextProvider";
import Layout from "./screens/Layout";
import ListaEstabelecimentos from "./screens/ListaEstabelecimentos";

function App() {
  return (
    <NavegacaoContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/Estabelecimentos" element={<ListaEstabelecimentos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NavegacaoContextProvider>
  );
}

export default App;
