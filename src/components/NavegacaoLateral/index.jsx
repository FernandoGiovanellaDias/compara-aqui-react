import { ContainerNavegacaoLateral } from "./styles";
import ReorderIcon from '@mui/icons-material/Reorder';
import { Container } from '@mui/material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AppsIcon from '@mui/icons-material/Apps';
import NavegacaoItem from '../NavegacaoItem';
import { useNavegacao } from '../../context/NavegacaoContextProvider';

export default function NavegacaoLateral() {
    const {ativa, setAtiva} = useNavegacao();

    return (
        <ContainerNavegacaoLateral style={{ width: 'auto', gap: 20 }} >
            <Container
                sx={{ marginTop: '20px', marginBottom: '20px' }}
                onClick={() => setAtiva(!ativa)}
            >
                <ReorderIcon sx={{ height: 20 }} />
            </Container>
            <NavegacaoItem icon={MapsHomeWorkIcon} label='Estabelecimentos' ativa={ativa} />
            <NavegacaoItem icon={BookmarksIcon} label='Categorias' ativa={ativa} />
            <NavegacaoItem icon={AppsIcon} label='Produtos' ativa={ativa} />
        </ContainerNavegacaoLateral>
    );
}
