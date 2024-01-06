"use client";
import { hitPrompt } from "@/actions/prompt-actions/prompt-actions";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Prompt() {
  const [prompt, setPrompt] = useState({
    prompt: "1girl, sweater, full body",
    negprompt:
      "(worst quality:2),(low quality:2),(normal quality:2),lowres,watermark,",
    height: 500,
    width: 500,
  });
  const [output, setOutput] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function submitHandler() {
    try {
      setLoading(true);
      const body = {
        prompt: prompt.prompt,
        negprompt: prompt.negprompt,
        height: prompt.height,
        width: prompt.width,
      };
      const output = await axios.post("/api/gen", body);
      setLoading(false);
      setOutput(output.data.output[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col-reverse  lg:flex-row">
      <div className="w-full border border-white/10 lg:w-[400px] py-3 px-2">
        <h1 className="text-xl text-white font-semibold">
          Start your generation
        </h1>
        <p className="text-white mt-1 text-slate-300">Enter a prompt</p>
        <textarea
          placeholder="Enter a prompt"
          className="resize-none bg-white/5 w-full rounded-md border border-white/10 mt-2 h-36 outline-none text-white/60 py-2 px-2"
          value={prompt.prompt}
          onChange={(e) =>
            setPrompt((prev) => ({
              ...prev,
              prompt: e.target.value,
            }))
          }
        />
        <p className="text-white mt-1 text-slate-300 ">Negative Prompt</p>
        <input
          value={prompt.negprompt}
          className="bg-white/5 w-full rounded-md border border-white/10 mt-2 py-2 px-2 outline-none text-white/60"
          placeholder="Enter a negative prompt"
          onChange={(e) =>
            setPrompt((prev) => ({
              ...prev,
              negprompt: e.target.value,
            }))
          }
        />
        <div className="flex mt-1 items-center gap-2">
          <div className="flex flex-col">
            <p className="text-white mt-1 text-slate-300">Height</p>
            <input
              value={prompt.height}
              onChange={(e) =>
                setPrompt((prev) => ({
                  ...prev,
                  height: e.target.value,
                }))
              }
              type="number"
              min={256}
              max={1024}
              className="bg-white/5 w-12 flex px-2 rounded-sm border border-white/10 mt-2 py-1 w-10 outline-none text-white/60"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-white mt-1 text-slate-300">Width</p>
            <input
              type="number"
              min={256}
              value={prompt.width}
              max={1024}
              onChange={(e) =>
                setPrompt((prev) => ({
                  ...prev,
                  width: e.target.value,
                }))
              }
              className="bg-white/5 w-12 flex px-2 rounded-sm border border-white/10 mt-2 py-1 w-10 outline-none text-white/60"
            />
          </div>
        </div>
        <button
          className="text-white bg-white/5 hover:bg-white/10 px-4 py-2 mt-4 rounded-md border border-white/10"
          onClick={submitHandler}
        >
          {isLoading ? "Loading" : "Generate"}
        </button>
      </div>
      <div className="h-[500px] w-full md:h-[500px] bg-white/5 lg:w-[500px] border border-white/10 flex flex-col justify-center items-center text-white overflow-hidden">
        {output ? (
          <Image
            height={prompt.height}
            width={prompt.width}
            src={output}
            className="h-full w-full object-contain"
          />
        ) : prompt.length > 0 ? (
          ""
        ) : (
          "No image here "
        )}
      </div>
    </div>
  );
}
