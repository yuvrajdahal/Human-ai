import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(req) {
  const { prompt, height, width, negprompt } = await req.json();
  const output = await replicate.run(
    "speshiou/majicmix-realistic-sd-webui:5e8812f2c00c03bc2adfb4915cb98951be3e2acb9e071c210c8c9feda2f17ecf",
    {
      input: {
        seed: -1,
        width: parseInt(width),
        height: parseInt(height),
        prompt: prompt,
        hr_scale: 2,
        hr_steps: 20,
        enable_hr: false,
        scheduler: "DPM++ SDE Karras",
        hr_upscaler: "Latent (nearest-exact)",
        num_outputs: 1,
        guidance_scale: 7.5,
        negative_prompt: negprompt,
        enable_adetailer: true,
        denoising_strength: 0.5,
        num_inference_steps: 20,
      },
    }
  );
  return NextResponse.json({ output: output });
}
