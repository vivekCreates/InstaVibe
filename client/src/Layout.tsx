import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./store";
import AuthService from "./services/auth/AuthService";
import { logIn } from "./store/AuthSlice";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout() {


  return (
    <div className="w-screen h-screen flex">
        <Sidebar/>
        <main className="ml-[15%] w-[85%]">
            <Outlet/>
        </main>
    </div>
  );
}
export default Layout;
