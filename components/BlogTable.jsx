"use client";

import Link from "next/link";

const BlogTable = ({ result, handleDelete, handleUpdate }) => {
  const handleDeleteBlog = async (blogId) => {
    const response = await handleDelete(blogId);
    // console.log(response);
  };

  const handleUpdateBlog = async (blog) => {
    const response = await handleUpdate(blog);
    // console.log(response);
  };

  return (
    <div className="my-8 bg-gray-100">
      <div className="grid grid-cols-4">
        <h1>Title</h1>
        <h1>Premium</h1>
        <h1>Publish</h1>
      </div>
      {result?.map((blog) => {
        return (
          <div key={blog.id} className="grid grid-cols-4">
            <h1>{blog.title}</h1>
            <div>
              <input
                onChange={() =>
                  handleUpdateBlog({
                    ...blog,
                    is_premium: !blog.is_premium,
                  })
                }
                className="w-8 h-8"
                checked={blog.is_premium}
                name="is_premium"
                type="checkbox"
              />
            </div>
            <div>
              <input
                className="w-8 h-8"
                onChange={() =>
                  handleUpdateBlog({
                    ...blog,
                    is_published: !blog.is_published,
                  })
                }
                checked={blog.is_published}
                name="is_published"
                type="checkbox"
              />
            </div>
            <div>
              <Link href={`/blog/${blog.id}`}>
                <button className="p-1 border border-black rounded-full">
                  👁 View
                </button>
              </Link>
              <button
                onClick={() => handleDeleteBlog(blog.id)}
                className="p-1 border border-black rounded-full"
              >
                ❌ Delete
              </button>
              <Link href={`/dashboard/blog/edit/${blog.id}`}>
                <button className="p-1 border border-black rounded-full">
                  ✏ Edit
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogTable;
