import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import './fonts/index';

function App() {

  // const loading = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
