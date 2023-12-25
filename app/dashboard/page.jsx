import React from "react";
import Link from "next/link";
import BlogTable from "@/components/BlogTable";
import { deleteBlogById, updateBlogById, readBlog } from "@/lib/blogActions";

const DashboardPage = async () => {
  const result = await readBlog();

  if (!result) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (blogId) => {
    "use server";
    return await deleteBlogById(blogId);
  };

  const handleUpdate = async (blog) => {
    "use server";
    return await updateBlogById(blog);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link className="hover:underline" href="/dashboard/blog/create">
          <button className="p-2 font-bold bg-blue-500 text-white rounded-full">
            ➕ Create Blog
          </button>
        </Link>
      </div>
      <BlogTable
        result={result}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default DashboardPage;
