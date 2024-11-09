// src/components/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavegacaoLateral from "../../components/NavegacaoLateral";
import { useNavegacao } from "../../context/NavegacaoContextProvider";

export default function Layout() {

    const { ativa } = useNavegacao();

    return (
        <Box display="flex" maxHeight="100vh">
            <NavegacaoLateral />
            <Box sx={{
                overflow: 'hidden',
                display: 'inline-flex',
                flexDirection: 'column',
                flexGrow: 1,
                paddingTop: "20px",
                paddingBottom: "40px",
                paddingRight: "20px",
                paddingLeft: ativa ? "10px" : "40px",
            }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
