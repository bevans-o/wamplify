import './globals.css'

export const metadata = {
  title: 'Wamplify',
  description: 'A subject score calculator for the University of Melbourne. Predict the future. Predict a H1.',
  applicationName: 'Wamplify',
  keywords: ['unimelb', 'WAM', 'calculator', 'The University of Melbourne'],
  authors: [{ name: 'Risa' }, { name: 'Ben' }],
  openGraph: {
    title: 'Wamplify',
    description: 'A subject score calculator for the University of Melbourne. Predict the future. Predict a H1.',
    url: 'https://wamplify.me',
    siteName: 'Wamplify',
    locale: 'en_AU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wamplify',
    description: 'A subject score calculator for the University of Melbourne. Predict the future. Predict a H1.'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
