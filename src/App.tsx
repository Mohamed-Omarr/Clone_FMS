import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import data from "@/local-data/user.json";

function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header prop={data} />
        <Outlet context={data} />
      </div>
    </div>
  );
}

export default App;
