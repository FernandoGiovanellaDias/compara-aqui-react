import { Typography } from "@mui/material";
import PropTypes from 'prop-types';


export const MsgError = ({ error }) => {
    if (!error || error.length === 0) {
        return <></>;
    }

    return (
        <Typography marginTop={2} fontFamily={"Poppins"} fontWeight={500} fontSize="12px" color="#b32222">
            {error}
        </Typography>
    );
};

MsgError.propTypes = {
    error: PropTypes.string.isRequired,
};

MsgError.defaultProps = {
    error: "",
};
