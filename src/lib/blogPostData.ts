// Build-time data for blog post pages (reads content/blog with fs). Imported
// only from the route files' getStaticPaths/getStaticProps, which Next strips
// from the browser bundle.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { blogPostImage } from '@/lib/blogPostImage'
import { lastCommitDate } from '../../scripts/lib/last-commit-date'
import { BLOG_SECTIONS, type BlogPostProps, type BlogSectionKey, type RelatedPost } from '@/components/BlogPostPage'

export function getBlogPostPaths(section: BlogSectionKey) {
  const blogDirectory = path.join(process.cwd(), 'content/blog')

  if (!fs.existsSync(blogDirectory)) {
    return {
      paths: [],
      fallback: false
    }
  }

  const filenames = fs.readdirSync(blogDirectory)

  // Tips & Guides posts live under /tips-guides/, every other category under /news/.
  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .filter((filename) => {
      const filePath = path.join(blogDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      const isTips = data.category === 'Tips & Guides'
      return section === 'tips-guides' ? isTips : !isTips
    })
    .map((filename) => ({
      params: {
        slug: filename.replace('.md', '')
      }
    }))

  return {
    paths,
    fallback: false
  }
}

export function getBlogPostProps(section: BlogSectionKey, slug: string): { props: BlogPostProps } {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  const filePath = path.join(blogDirectory, `${slug}.md`)

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Find related posts by shared tags
  const currentTags: string[] = data.tags || []
  const allFiles = fs.readdirSync(blogDirectory).filter(f => f.endsWith('.md'))

  const scored = allFiles
    .filter(f => f !== `${slug}.md`)
    .map(f => {
      const raw = fs.readFileSync(path.join(blogDirectory, f), 'utf8')
      const { data: d } = matter(raw)
      const postTags: string[] = d.tags || []
      const shared = currentTags.filter(t => postTags.includes(t)).length
      return {
        slug: f.replace('.md', ''),
        title: d.title || 'Untitled',
        excerpt: d.excerpt || '',
        image: blogPostImage(d, f),
        imageAlt: d.imageAlt || d.title || 'Blog post image',
        category: d.category || 'News',
        date: d.date || '',
        score: shared
      }
    })
    .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const relatedPosts: RelatedPost[] = scored.map(({ score, ...post }) => post)

  return {
    props: {
      title: data.title || 'Untitled',
      date: data.date || 'No date',
      excerpt: data.excerpt || '',
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      image: blogPostImage(data, `${slug}.md`),
      imageAlt: data.imageAlt || data.title || 'Blog post image',
      imageCredit: data.imageCredit || null,
      category: data.category || BLOG_SECTIONS[section].label,
      slug,
      // Same source as the sitemap's <lastmod>: the last commit that touched
      // the post's markdown. null until the post is first committed.
      lastModified: lastCommitDate(`content/blog/${slug}.md`, process.cwd()),
      content,
      relatedPosts,
      section
    }
  }
}
