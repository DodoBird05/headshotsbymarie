import BlogPostPage from '@/components/BlogPostPage'
import { getBlogPostPaths, getBlogPostProps } from '@/lib/blogPostData'

// Template and data are shared with the other blog section: see BlogPostPage.
export default BlogPostPage

export async function getStaticPaths() {
  return getBlogPostPaths('news')
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return getBlogPostProps('news', params.slug)
}
