import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";

interface Post {
  prompt: string;
  tag: string;
}
interface Form {
  type: string;
  post: Post;
  setPost: (el: Post) => void;
  submitting: boolean;
  handleSubmit: (el: FormEvent<HTMLFormElement>) => void;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: Form) => {
  function handleTextAreaChange(el: ChangeEvent<HTMLTextAreaElement>) {
    setPost({ ...post, prompt: el.target.value });
  }
  function handleTagInputChange(el: ChangeEvent<HTMLInputElement>) {
    setPost({ ...post, tag: el.target.value });
  }
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        {type} <span className="blue_gradient">Post</span>
      </h1>
      <p className="text-left desc max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex  flex-col mt-10 gap-7 glassmorphism"
      >
        <label className="text-left">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={handleTextAreaChange}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label className="text-left">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product,#webDevelopment,#mobileDevelopment)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={handleTagInputChange}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-full"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
