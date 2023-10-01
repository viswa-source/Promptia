"use client";
import { useState, useEffect, ChangeEvent } from "react";

import PromptCard from "./PromptCard";

export interface Prompt {
  _id: string;
  creator: Creator;
  prompt: string;
  tag: string;
  __v: number;
}
export interface Creator {
  _id: string;
  email: string;
  username: string;
  image: string;
  __v: number;
}

interface PromptCardListProps {
  data: Prompt[];
  handleTagClick: () => void;
}
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const handSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handSearchChange}
          required
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
