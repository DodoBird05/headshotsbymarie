interface FabulousTextProps {
  title: string
  text: string
}

export default function FabulousText({ title, text }: FabulousTextProps) {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: '#f8f8f8',
          borderRadius: '16px',
          padding: '60px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: '48px',
              color: '#1C1C1C',
              fontWeight: 300,
              marginBottom: '24px',
              textAlign: 'center'
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '20px',
              color: '#4A4A4A',
              lineHeight: '1.8',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
