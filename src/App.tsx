import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navigation/navbar";
import { Footer } from "./components/navigation/footer";
import Home from "./pages/home";
import Prompt from "./pages/prompt";
import Help from "./pages/help";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
