import Layout from '@/components/Layout'
import Cards from '@/components/Cards'

export default function CardsPage() {
  return (
    <Layout title="Cards" description="Cards component page">
      <div className="min-h-screen bg-white">
        <Cards />
      </div>
    </Layout>
  )
}
