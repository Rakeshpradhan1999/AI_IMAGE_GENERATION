import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { CreatePost, Home } from "./pages";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" containerClassName="text-sm" />
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/create_post" element={<CreatePost />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
