import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
        {/* <Sidebar/> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
