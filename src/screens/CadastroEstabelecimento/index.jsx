import { Box, Typography } from "@mui/material";
import { SearchTextField } from "../LoginScreen/styles";
import SearchIcon from '@mui/icons-material/Search';

export default function ListaEstabelecimentos() {

    let lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    return (
        <>
            <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'24px'} >
                Estabelecimentos
            </Typography>
            <Box paddingTop={2} paddingBottom={2} >
                <SearchTextField
                    placeholder="Buscar Estabelecimento"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }
                    }}
                />
            </Box>

            <Box sx={{ gap: '10px', display: 'inline-flex', flexDirection: 'column', overflow: 'auto' }} >
                {
                    lista.map(i => (
                        <>
                            <Box key={i} sx={{background: "#BDC0DD", paddingX: 2, paddingY: 2}}>
                                <Typography fontFamily={"Poppins"} fontWeight={300} variant="p" fontSize={'18px'} >
                                    {i} Estabelecimentos
                                </Typography>
                            </Box>
                        </>
                    ))
                }
            </Box>


        </>
    );
}
