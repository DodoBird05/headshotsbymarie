import LocationPageTemplate, { LocationFrontmatter } from '@/components/LocationPageTemplate'
import { getLocationStaticProps } from '@/lib/locationPage'

interface PageProps {
  frontmatter: LocationFrontmatter
  content: string
}

export default function PersonalBrandingPage({ frontmatter }: PageProps) {
  return <LocationPageTemplate slug="personal-branding" frontmatter={frontmatter} />
}

export const getStaticProps = getLocationStaticProps('personal-branding.md')
