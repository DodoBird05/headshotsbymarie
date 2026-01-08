import Image from 'next/image'
import Link from 'next/link'

interface FeaturedPost {
  category: string
  title: string
  image: string
  imageAlt: string
  link: string
}

interface FeaturedPostsGridProps {
  posts: FeaturedPost[]
}

export default function FeaturedPostsGrid({ posts }: FeaturedPostsGridProps) {
  return (
    <>
      <style>{`
        /* Desktop: 3 columns x 2 rows */
        .featured-posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .featured-post-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .featured-post-title {
          font-size: 20px;
          font-weight: bold;
          line-height: 1.2;
        }

        /* Mobile: 2 columns x 3 rows */
        @media (max-width: 768px) {
          .featured-posts-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .featured-post-title {
            font-size: 14px !important;
          }

          .featured-post-label {
            font-size: 10px !important;
          }
        }
      `}</style>

      <div className="featured-posts-grid" style={{
        marginLeft: '2%',
        marginRight: '2%',
        minWidth: 0
      }}>
        {posts.map((post, index) => (
          <Link
            key={index}
            href={post.link}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                pointerEvents: 'none'
              }} />
              {/* Text Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                right: '15px',
                color: 'white',
                pointerEvents: 'none'
              }}>
                <div className="featured-post-label" style={{
                  opacity: 0.9
                }}>
                  {post.category}
                </div>
                <div className="featured-post-title">
                  {post.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
