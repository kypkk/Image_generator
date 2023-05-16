import React from "react";
import { useRef, useState, createRef } from "react";

export default function Home() {
  const [imageURL, setImageURL] = useState<string>("");

  let inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  async function onsubmit(e: any) {
    e.preventDefault();
    const prompt = inputRef.current.value;
    inputRef.current.value = "";
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        throw (
          data.error || new Error(`Request failed with status ${res.status}`)
        );
      }
      setImageURL(data.result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full h-screen justify-center items-center bg-black">
      <h1 className=" text-2xl text-white flex justify-center pt-10">
        Image Generator using OpenAI Dall-e Model
      </h1>
      <form
        onSubmit={onsubmit}
        className=" h-4/5 w-screen flex items-center justify-center flex-col "
      >
        <input type="text" ref={inputRef} className=" rounded-2xl w-48 px-2" />
        <button
          type="submit"
          className=" text-white hover:bg-slate-300 hover:text-slate-950 my-4 rounded-xl px-4 text-xl"
        >
          generate
        </button>
        {imageURL && (
          <img
            src={imageURL}
            alt=""
            width={1024}
            height={1024}
            className=" h-96 w-96"
          />
        )}
      </form>
    </main>
  );
}
