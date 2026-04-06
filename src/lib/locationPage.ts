import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export function getLocationStaticProps(filename: string) {
  return async () => {
    const filePath = path.join(process.cwd(), 'content', filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return { props: { frontmatter: data, content } }
  }
}
