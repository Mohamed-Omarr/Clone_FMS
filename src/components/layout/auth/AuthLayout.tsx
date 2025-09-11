"use client";
import { Outlet } from "react-router-dom";

/*
  display the content of the project and as layout of it 
*/

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
