import Image from "next/image";
import Prompt from "./components/Prompt";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black flex flex-col lg:justify-center items-center px-2 py-2 overflow-y-scroll lg:overflow-hidden">
      <Prompt />
    </main>
  );
}
