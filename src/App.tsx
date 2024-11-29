import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./home/Home.tsx";

function App() {
  return (
    <>
      <header>
        <nav>
          <div>
            <div>OpenSeaCharts</div>
          </div>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
