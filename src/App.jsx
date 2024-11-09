import './fonts/index';
import NavegacaoContextProvider from "./context/NavegacaoContextProvider";
import Routes from './Routes';

function App() {
  return (
    <NavegacaoContextProvider>
      <Routes />
    </NavegacaoContextProvider>
  );
}

export default App;
