import BlogsSection from "../BlogsSection";

const BlogsContainer = ({ initialBlogs = [] }) => {
  return (
    // Removed h-screen to allow natural document flow
    <div className="max-w-full container mx-auto">
      <BlogsSection initialBlogs={initialBlogs} />
    </div>
  );
};

export default BlogsContainer;
