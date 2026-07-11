import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Test</div>} />
        <Route path="/analytics" element={<div>Test</div>} />
        <Route path="/add" element={<div>Test</div>} />
        <Route path="/categories" element={<div>Test</div>} />
        <Route path="/profile" element={<div>Test</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
