import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
//GET to read

interface PromptParams {
  params: { id: string };
}

export const GET = async (req: Request, { params }: PromptParams) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

//PATCH to update
export const PATCH = async (req: Request, { params }: PromptParams) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt Not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update", { status: 500 });
  }
};
//DELETE to delete

export const DELETE = async (req: Request, { params }: PromptParams) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response(JSON.stringify("Prompt deleted"), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete", { status: 500 });
  }
};
