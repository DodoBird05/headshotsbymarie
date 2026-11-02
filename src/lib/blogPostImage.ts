// Every blog post needs a featured image: it is the card on the listing pages,
// the header of the post and the link-preview image. A missing one used to fall
// back to /images/blog-placeholder-1.jpg, which does not exist, so the build
// failed later with a confusing "missing image" error. Fail here instead, with
// the post's file name.
export function blogPostImage(data: { image?: unknown }, filename: string): string {
  if (typeof data.image !== 'string' || data.image.trim() === '') {
    throw new Error(
      `content/blog/${filename}: frontmatter "image" is missing. Every post needs a featured image (card, post header, link preview).`
    )
  }
  return data.image
}
