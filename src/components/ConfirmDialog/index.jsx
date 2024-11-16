import PropTypes from 'prop-types';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
import { ConfirmButton, ToDanyButton } from '../../assets/MeusComponentes';

export default function ConfirmDialog({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">
                <Typography fontFamily={"Poppins"} fontWeight={500} variant="p" fontSize={'14px'} >
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    <Typography fontFamily={"Poppins"} fontWeight={300} variant="p" fontSize={'14px'} >
                        {message}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            {(onCancel || onConfirm) &&
                <DialogActions>
                    {onConfirm &&
                        <ConfirmButton sx={{ minWidth: "90px !important" }} onClick={onConfirm} color="primary" autoFocus>
                            {confirmText}
                        </ConfirmButton>
                    }
                    {onCancel &&
                        <ToDanyButton sx={{ minWidth: "90px !important" }} onClick={onCancel} color="secondary">
                            {cancelText}
                        </ToDanyButton>
                    }
                </DialogActions>
            }
        </Dialog>
    );
};


ConfirmDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
};

ConfirmDialog.defaultProps = {
    open: false,
    confirmText: "Sim",
    cancelText: "Não"
};
