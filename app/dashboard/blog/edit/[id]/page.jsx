import BlogForm from "@/components/BlogForm";
import { readBlogContentById, updateBlogDetail } from "@/lib/blogActions";
import React from "react";

const BlogEditPage = async ({ params }) => {
  const supabaseBlogData = await readBlogContentById(params.id);

  const handleUpdate = async (blog) => {
    "use server";
    return await updateBlogDetail(blog);
  };

  return (
    <BlogForm supabaseBlogData={supabaseBlogData} handleUpdate={handleUpdate} />
  );
};

export default BlogEditPage;
