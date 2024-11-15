import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '40px',
    backgroundColor: '#F0F0F0',
    minHeight: '100vh',
    width: '100%',
    paddingLeft: '80px',  // Alinhado à esquerda
});

export const FormBox = styled(Box)({
    margin: '20px 0',
    padding: '10px',
    flex: 1,
});

export const ButtonContainer = styled(Box)({
    display: 'inline-flex',
    gap: 20,
    margin: '20px 0',
    
});

export const StyledTypography = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'left',
});
