import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Learning from "./pages/Learning.tsx";

import './App.css'

function App() {
    return (
        <div className={"font-family-nunito"}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/learning" element={<Learning/>}/>
            </Routes>
        </div>
    )
}

export default App
