import { ContainerNavegacaoLateral } from "./styles";
import ReorderIcon from '@mui/icons-material/Reorder';
import { Container } from '@mui/material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AppsIcon from '@mui/icons-material/Apps';
import NavegacaoItem from '../NavegacaoItem';
import { useNavegacao } from '../../context/NavegacaoContextProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

export default function NavegacaoLateral() {
    const { ativa, setAtiva, removerAcesso } = useNavegacao();

    const navigate = useNavigate();


    return (
        <ContainerNavegacaoLateral style={{ width: 'auto', gap: 20 }} >
            <Container
                sx={{ marginTop: '20px', marginBottom: '20px' }}
                onClick={() => setAtiva(!ativa)}
            >
                <ReorderIcon sx={{ height: 20 }} />
            </Container>

            <NavegacaoItem icon={MapsHomeWorkIcon}
                label='Estabelecimentos' ativa={ativa}
                action={()=>{navigate("/Estabelecimentos")}}
            />
            <NavegacaoItem icon={BookmarksIcon}
                label='Categorias'
                ativa={ativa}
                action={()=>{navigate("/Categorias")}}
            />
            <NavegacaoItem icon={AppsIcon}
                label='Produtos'
                ativa={ativa}
                action={()=>{navigate("/Produtos")}}
            />

            <Container
                sx={{ marginTop: 'auto', marginBottom: '20px' }}
                onClick={() => removerAcesso()}
            >
                <LogoutIcon sx={{ height: 20 }} />
            </Container>
        </ContainerNavegacaoLateral>
    );
}
