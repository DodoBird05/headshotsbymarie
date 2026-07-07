import LocationPageTemplate, { LocationFrontmatter } from '@/components/LocationPageTemplate'
import { getLocationStaticProps } from '@/lib/locationPage'

interface PageProps {
  frontmatter: LocationFrontmatter
  content: string
}

export default function ScottsdaleHeadshotsPage({ frontmatter }: PageProps) {
  return <LocationPageTemplate slug="scottsdale-headshots" frontmatter={frontmatter} />
}

export const getStaticProps = getLocationStaticProps('scottsdale-headshots.md')
