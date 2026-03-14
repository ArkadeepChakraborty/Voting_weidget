// import Dashboard from "./pages/Dashboard";

// function App() {
//   return <Dashboard />;
// }

// export default App;



import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminEditor from "./pages/AdminEditor";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/dboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminEditor />} />
      <Route path="/" element={<HomePage/>} />
    </Routes>
  );
}

export default App;