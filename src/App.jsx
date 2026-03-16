// import Dashboard from "./pages/Dashboard";

// function App() {
//   return <Dashboard />;
// }

// export default App;



import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminEditor from "./pages/AdminEditor";
import Tabs from "./pages/Tabs";

function App() {
  return (
    <Routes>
      <Route path="/tabs" element={<Tabs/>} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<AdminEditor />} />
    </Routes>
  );
}

export default App;