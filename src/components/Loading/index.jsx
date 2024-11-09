/* eslint-disable react/prop-types */

import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import RefreshPage from "../../models/RefreshPage";
import { BoxLoading } from "./styles";

function Loading(props) {

    const { loading, error, msg, reload } = props.data;

    function gerarAlerta() {
        if (loading) {
            return (
                <BoxLoading>
                    <CircularProgress />
                    <Typography variant="p" component="div" fontWeight="500" minWidth={80}
                        textAlign="center" color="white"  >
                        Aguade...
                    </Typography>
                </BoxLoading>);
        }
        if (error || (msg != null)) {
            setTimeout(() => { reload(new RefreshPage()) }, 3000);
            return (
                <Box top="30px" left="auto" right="30px" position="absolute" marginBottom={4} zIndex={999}>
                    <Alert severity={error ? "error" : "success"}>
                        {msg ?? "Houve uma falha"}
                    </Alert>
                </Box>);
        }
        return <></>;
    }


    return (
        <>
            {gerarAlerta()}
        </>
    )
}

export default Loading
