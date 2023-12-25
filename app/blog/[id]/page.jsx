import BlogContent from "@/components/BlogContent";
import React from "react";

const BlogDetailsPage = async ({ params }) => {
  const { data: blogData, error: blogDataError } = await fetch(
    process.env.SITE_URL + `/api/blog?id=${params.id}`
  ).then((res) => res.json());

  if (!blogData?.id) {
    return <p>Not Found!</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-bold text-4xl">{blogData.title}</h1>
      <p className="text-xl">
        {new Date(blogData.created_at).toLocaleString()}
      </p>

      <img
        className="rounded-md object-cover h-64 w-full mb-4"
        src={blogData.image_url}
      />
      <BlogContent blogId={params.id} />
    </div>
  );
};

export default BlogDetailsPage;
