import BlogPostPage from '@/components/BlogPostPage'
import { getBlogPostPaths, getBlogPostProps } from '@/lib/blogPostData'

// Template and data are shared with the other blog section: see BlogPostPage.
export default BlogPostPage

export async function getStaticPaths() {
  return getBlogPostPaths('tips-guides')
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return getBlogPostProps('tips-guides', params.slug)
}
