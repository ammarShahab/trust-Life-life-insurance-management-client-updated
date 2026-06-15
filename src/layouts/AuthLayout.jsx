import React from "react";
import NavBar from "../shared/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <>
      <header>
        <nav>
          <NavBar></NavBar>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default AuthLayout;
