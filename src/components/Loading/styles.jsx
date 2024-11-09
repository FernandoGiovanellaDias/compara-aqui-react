
import { Box } from "@mui/material";
import styled from "styled-components";

export const BoxLoading = styled(Box)({
    zIndex: 999,
    height: "100%",
    width: "100%",
    position: "absolute",
    background: "#31438c4a",
    left: 0,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});