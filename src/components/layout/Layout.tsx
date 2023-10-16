import React from "react";
import NavBar from "./NavBar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="py-4">{children}</main>
    </>
  );
}

export default Layout;
