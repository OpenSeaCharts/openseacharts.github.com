import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./pages/home/Home.tsx";
import {HeaderMenu} from "./components/HeaderMenu.tsx";
import {createTheme, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';

const theme = createTheme({
  /** mantine theme overrides */
});

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <header>
            <HeaderMenu/>
          </header>
          <Routes>
            <Route path="/" element={<Home/>}>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
