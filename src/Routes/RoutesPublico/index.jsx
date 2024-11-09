import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginScreen from "../../screens/LoginScreen"

function RoutesPublico() {

    return (
        <>
            <BrowserRouter>
                <Routes >
                    <Route path="*" element={<LoginScreen />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RoutesPublico