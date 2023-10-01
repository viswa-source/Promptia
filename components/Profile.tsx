import React from "react";
import PromptCard from "./PromptCard";
import { Prompt } from "./Feed";
interface ProfileProps {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit: (el: string) => void;
  handleDelete: (el: string) => void;
}
const UserProfile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEditClick={(id) => handleEdit && handleEdit(id)}
              handleDeleteClick={(id) => handleDelete && handleDelete(id)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default UserProfile;
