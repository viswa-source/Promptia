import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

interface UserPostsParams {
  params: { id: string };
}
export const GET = async (req: Request, { params }: UserPostsParams) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
