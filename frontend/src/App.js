import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

function App() {
  return (
    <div className="App">
       <Router>
         <Routes>
            <Route path="/" element={<Page1/>}/>
            <Route path="/page2" element={<Page2/>}/>
            <Route path="/page3" element={<Page3/>}/>
         </Routes>
       </Router>
    </div>
  );
}

export default App;
