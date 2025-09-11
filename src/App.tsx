import { Outlet } from "react-router-dom";
import Header from "./components/layout/app/Header";
import Sidebar from "./components/layout/app/Sidebar";
import data from "@/local-data/user.json";



/*
  display the content of the project and as layout of it 
*/

function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header prop={data} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
