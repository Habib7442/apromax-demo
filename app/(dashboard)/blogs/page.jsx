import BlogsContainer from '@/components/containers/blogs-container'
import { supabase } from '@/lib/supabase'

export const metadata = {
  title: 'Blogs | AproMax Engineering',
  description: 'Get the latest blogs from AproMax Engineering',
  revalidate: 60 // Revalidate every 60 seconds
}

const BlogsPage = async () => {
  let blogs = []
  
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching blogs:', error)
    } else {
      blogs = data || []
    }
  } catch (error) {
    console.error('Unexpected error fetching blogs:', error)
  }

  return (
    <BlogsContainer initialBlogs={blogs} />
  )
}

export default BlogsPage