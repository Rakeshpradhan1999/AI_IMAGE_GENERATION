import React, { useState } from "react";
import { preview } from "../assets";
import { Loader, TextField } from "../components";
import Button from "../components/Button";
import { getRandomPrompt } from "../utils";
import toast from "react-hot-toast";
const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    image: "",
  });

  const [generatingImage, setGeneratingImage] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [sharing, setSharing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePrompt = (e) => {
    const randomPrompt = getRandomPrompt();
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (!form.prompt) {
      return toast.error("Prompt is required");
    }
    setForm({ ...form, image: `` });
    setGeneratingImage(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}/dalle/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        }
      );
      const data = await response.json();
      setForm({ ...form, image: `data:image/jpeg;base64,${data.data.image}` });
      setCanShare(true);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setGeneratingImage(false);
    }
  };

  const shareHandler = async () => {
    if (!form.name) return toast.error("Name is required");
    if (!form.image) return toast.error("Image is required");
    if (!form.prompt) return toast.error("prompt is required");
    setCanShare(false);
    setSharing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASEURL}/post/uploadPost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      // const data = await response.json();
      toast.success("Shared successfully");
    } catch (error) {
      setCanShare(true);
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setSharing(false);
    }
  };
  return (
    <div>
      <h1 className=" text-2xl font-semibold text-gray-600">Create Images</h1>
      <p className="mt-2 text-sm text-gray-400 mb-6">
        Create Images through DALLE AI
      </p>
      <TextField
        label={"Your Name"}
        placeholder="Jhon Doe"
        name={"name"}
        onChange={handleChange}
        value={form.name}
      />
      <br />
      <TextField
        label={"Prompt"}
        onChange={handleChange}
        value={form.prompt}
        surpriseMeBtn
        surpriseMeHandle={handlePrompt}
        name={"prompt"}
        placeholder="an oil painting by Matisse of a humanoid robot playing chess"
      />
      <br />
      <div className="w-60 h-60 rounded-md relative bg-gray-100 shadow overflow-hidden">
        {!form.image ? (
          <>
            <img
              src={preview}
              alt={"preview"}
              className="w-full h-full  object-contain "
            />
            {generatingImage && (
              <div className="absolute h-full w-full bg-black top-0 right-0 bg-opacity-50 grid place-content-center rounded-md ">
                <Loader />
              </div>
            )}
          </>
        ) : (
          <img
            src={form.image}
            alt={form.name}
            className="w-full h-full  object-contain "
          />
        )}
      </div>
      <br />
      <Button fullwidth onClick={generateImage} disable={generatingImage}>
        {generatingImage ? "Generating" : " Generate"}
      </Button>

      <p className="mt-4 text-sm mb-2">
        Once you generate a image, if you want you can share with the community
        just clicking the share button
      </p>

      <Button fullwidth disable={!canShare} onClick={shareHandler}>
        {sharing ? "Sharing..." : "Share"}
      </Button>
    </div>
  );
};

export default CreatePost;
