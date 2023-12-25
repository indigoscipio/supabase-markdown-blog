"use client";
import { supabaseCreateBrowserClient } from "@/lib/supabaseCreateBrowserClient";
import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import Checkout from "./Checkout";

const BlogContent = ({ blogId }) => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const readBlogContent = async () => {
    const supabase = supabaseCreateBrowserClient();
    const { data: blogData, error: blogDataError } = await supabase
      .from("blog_content")
      .select("*")
      .eq("id", blogId)
      .single();

    if (!blogDataError) {
      console.log(blogDataError);
    }
    if (blogData) {
      console.log(blogData);
      setBlog(blogData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    readBlogContent();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!blog?.content) {
    console.log(blog);
    return <Checkout />;
  }

  return (
    <>
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
        {blog.content || ""}
      </Markdown>
    </>
  );
};

export default BlogContent;
