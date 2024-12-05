import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
      <div className="h-screen bg-[#F0F2F5]">
            <Outlet/>
      </div>
    )
  }