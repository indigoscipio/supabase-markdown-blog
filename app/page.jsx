import { readBlog } from "@/lib/blogActions";
import Link from "next/link";

export default async function Homepage() {
  const blogs = await readBlog();

  if (!blogs) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 gap-4">
          {blogs?.map((blog) => {
            return (
              <Link href={`/blog/${blog.id}`}>
                <div key={blog.id} className="bg-gray-100 rounded-xl p-4">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="rounded-md object-cover h-40 w-full mb-4"
                  />
                  <h2 className="font-bold font-2xl">{blog.title}</h2>
                  <h1>{new Date(blog.created_at).toLocaleString()}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
