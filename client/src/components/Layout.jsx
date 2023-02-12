import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto w-full mt-4 px-4 md:px-6 min-h-[100vh-70px] mb-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
