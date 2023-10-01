import React, { useState } from "react";
import { Prompt } from "./Feed";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface PromptOptions {
  post: Prompt;
  handleTagClick?: (tag: string) => void;
  handleEditClick?: (el: string) => void;
  handleDeleteClick?: (el: string) => void;
}
const PromptCard = ({
  post,
  handleTagClick,
  handleEditClick,
  handleDeleteClick,
}: PromptOptions) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  function handleCopy() {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex-col flex">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt={"copy"}
            src={
              copied === post.prompt
                ? "./assets/icons/tick.svg"
                : "./assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.includes("#") ? post.tag : `#${post.tag}`}
      </p>
     {/* @ts-ignore */}
      {session?.user?.id === post.creator._id && pathName === "/profile" && (
        <>
          <div className="mt-5 flex-center gap-4 border-t border-x-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => handleEditClick && handleEditClick(post?._id)}
            >
              Edit
            </p>{" "}
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => handleDeleteClick&&handleDeleteClick(post?._id)}
            >
              Delete
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PromptCard;
