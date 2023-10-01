"use client";

import { Prompt } from "@components/Feed";
import UserProfile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Prompt[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      //@ts-ignore
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    //@ts-ignore
    if (session?.user?.id) {
      fetchPosts();
    }
  }, []);
  function handleEdit(postId: string) {
    router.push(`/update-prompt?id=${postId}`);
  }
  async function handleDelete(postId: string) {
    const hasConfirmation = confirm(`Are you sure you want to delete?`);
    if (hasConfirmation) {
      try {
        const response = await fetch(`/api/prompt/${postId}`, {
          method: "DELETE",
        });
        const filteredData = posts.filter((el) => el._id !== postId);
        setPosts(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <UserProfile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
