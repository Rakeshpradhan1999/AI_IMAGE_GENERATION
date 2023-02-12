import React, { useState } from "react";
import { Loader, RenderCards, TextField } from "../components";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchReasult, setSearchResult] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useState(() => {
    const getAllPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASEURL}/post/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        setData(data.data.allPost);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllPosts();
  }, []);

  const changeHandler = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeOut);

    setSearchTimeOut(
      setTimeout(() => {
        const searchReasult = data.filter(
          (val) =>
            val.name.toLowerCase().includes(searchText.toLowerCase()) ||
            val.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResult(searchReasult);
      }, 500)
    );
  };

  return (
    <div>
      <h1 className=" text-2xl font-semibold text-gray-600">
        The Community Showcase
      </h1>
      <p className="mt-2 text-sm text-gray-400">
        The Community Image Showcase is a platform for individuals and
        organizations to showcase their photographs created through OpenAI
      </p>

      <form action="" onSubmit={submitHandler}>
        <TextField
          placeholder={"Search here..."}
          value={searchText}
          onChange={changeHandler}
        />
      </form>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center ">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="mb-5">Search Reasult for {searchText}</h2>
            )}

            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {searchText ? (
                <RenderCards data={searchReasult} title="No Reasult Found" />
              ) : (
                <RenderCards data={data} title="No Posts Found" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
