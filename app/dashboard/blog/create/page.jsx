import BlogForm from "@/components/BlogForm";
import { createBlog } from "@/lib/blogActions";

const CreateBlogPage = () => {
  const handleCreate = async (blogData) => {
    "use server";

    return await createBlog(blogData);
  };

  return <BlogForm handleCreate={handleCreate} />;
};

export default CreateBlogPage;
