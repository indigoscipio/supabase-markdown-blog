"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseCreateServerClient } from "./supabaseCreateServerClient";

const dashboardPath = "/dashboard";

export const createBlog = async (blog) => {
  const { content: blogDataContent, ...blogDataWithoutContent } = blog;
  const supabase = supabaseCreateServerClient();

  const { data: createdBlog, error: createdBlogError } = await supabase
    .from("blog")
    .insert(blogDataWithoutContent)
    .select("*")
    .single();

  if (createdBlogError) {
    console.error(createdBlogError);
    throw createdBlogError;
  }

  if (createdBlog) {
    const { data: blogContentData, error: blogContentDataError } =
      await supabase
        .from("blog_content")
        .insert({ id: createdBlog.id, content: blogDataContent });

    if (blogContentDataError) {
      console.error(blogContentDataError);
      throw blogContentDataError;
    }
  }

  revalidatePath(dashboardPath);
  redirect(dashboardPath);
};

export const readBlog = async () => {
  const supabase = supabaseCreateServerClient();

  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return error;
  }

  return data;
};

export const deleteBlogById = async (blogId) => {
  const supabase = supabaseCreateServerClient();
  try {
    const { error } = await supabase.from("blog").delete().eq("id", blogId);

    if (error) {
      console.error(error);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  revalidatePath(dashboardPath);
  revalidatePath(`/blog/${blogId}`);

  return { message: "Blog deleted successfully" };
};

export const updateBlogById = async (blog) => {
  const supabase = supabaseCreateServerClient();
  // console.log(blog);

  const { data, error } = await supabase
    .from("blog")
    .update(blog)
    .eq("id", blog.id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  if (data) {
    // console.log(data);
    revalidatePath(`/blog/${data.id}`);
    revalidatePath(dashboardPath);
    return data;
  }
};

export const readBlogContentById = async (blogId) => {
  const supabase = supabaseCreateServerClient();

  const { data, error } = await supabase
    .from("blog")
    .select("*, blog_content(*)")
    .eq("id", blogId)
    .single();

  if (error) {
    // console.log(error);
    return error;
  }

  if (data) {
    // console.log(data);
    return data;
  }
};

export const updateBlogDetail = async (blog) => {
  const supabase = supabaseCreateServerClient();
  const { blog_content, content: newContent, ...blogData } = blog;

  const { data, error } = await supabase
    .from("blog")
    .update(blogData)
    .eq("id", blog.id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  if (blogData) {
    const { data: blogContentData, error: blogContentError } = await supabase
      .from("blog_content")
      .update({ ...blog_content, content: newContent })
      .eq("id", blog_content.id)
      .select()
      .single();

    if (blogContentError) {
      console.log(blogContentError);
      throw blogContentError;
    }

    // console.log(blogContentData);
    revalidatePath(dashboardPath);
    revalidatePath(`/blog/${blog.id}`);
    redirect(dashboardPath);
  }

  return data;
};
