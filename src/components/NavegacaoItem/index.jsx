import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';

export default function NavegacaoItem({ icon: Icon, label, ativa = false, action }) {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
    onClick={() => {action()}}>
      <Icon sx={{ height: 20 }} />
      {ativa && (
        <Typography fontFamily="Poppins" fontWeight={500} variant="p" fontSize="12px">
          {label}
        </Typography>
      )}
    </Container>
  );
}

NavegacaoItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  ativa: PropTypes.bool,
  action: PropTypes.func
};

NavegacaoItem.defaultProps = {
  ativa: false,
  action: ()=>{}
};
