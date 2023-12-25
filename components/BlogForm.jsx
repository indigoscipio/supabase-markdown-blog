"use client";
import React, { useState } from "react";
import Markdown from "react-markdown";

const BlogForm = ({ handleCreate, supabaseBlogData, handleUpdate }) => {
  const [blogData, setBlogData] = useState(
    {
      ...supabaseBlogData,
      content: supabaseBlogData?.blog_content?.content || "",
    } || {
      title: "",
      image_url: "",
      content: "",
      is_published: false,
      is_premium: false,
    }
  );
  const [isEditing, setIsEditing] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBlogData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (supabaseBlogData) {
      // console.log(blogData);
      const response = await handleUpdate(blogData);
      // console.log(response);
    } else {
      const response = await handleCreate(blogData);
      // console.log(response);
    }
  };

  const isFormValid = blogData.title && blogData.image_url && blogData.content;

  return (
    <div className="p-8">
      <form onSubmit={handleFormSubmit} className="flex items-start gap-2">
        <div className="flex items-center">
          <input
            id="isEditing"
            name="isEditing"
            type="checkbox"
            checked={isEditing}
            onChange={() => setIsEditing(!isEditing)}
            className="mr-2"
          />
          <label htmlFor="isEditing">Is Editing</label>
        </div>
        <div className="flex items-center">
          <input
            id="is_published"
            name="is_published"
            type="checkbox"
            checked={blogData.is_published}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="is_published">Published</label>
        </div>
        <div className="flex items-center">
          <input
            id="is_premium"
            name="is_premium"
            type="checkbox"
            checked={blogData.is_premium}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="is_premium">Premium</label>
        </div>
        <button
          className={`rounded-full p-2 border border-black ${
            isFormValid ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
          disabled={!isFormValid}
          type="submit"
        >
          Save {isFormValid ? "✅" : "❌"}
        </button>
      </form>

      {errorMsg && <p className="font-bold text-red-500">ERROR: {errorMsg}</p>}
      {successMsg && (
        <p className="font-bold text-green-500">Success: {successMsg}</p>
      )}

      {isEditing ? (
        <div className="mt-4">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col py-2">
              <label htmlFor="title">Blog Title</label>
              <input
                className="border border-black p-2"
                name="title"
                type="text"
                value={blogData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="image_url">Image URL</label>
              <input
                className="border border-black p-2"
                name="image_url"
                type="text"
                value={blogData.image_url}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="content">Blog Content</label>
              <textarea
                className="border border-black p-2"
                name="content"
                id="content"
                cols="30"
                rows="10"
                value={blogData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1>{blogData.title}</h1>
          <img src={blogData.image_url} alt="" />
          <Markdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-3xl font-bold" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-2xl font-bold" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-xl font-bold" />
              ),
            }}
          >
            {blogData.content}
          </Markdown>
        </div>
      )}
    </div>
  );
};

export default BlogForm;
