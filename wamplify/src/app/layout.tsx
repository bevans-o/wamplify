import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  metadataBase: new URL('https://wamplify.me'),
  title: 'Wamplify',
  description: 'A subject score calculator for the University of Melbourne. Predict the future. Predict a H1.',
  applicationName: 'Wamplify',
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
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // interactiveWidget: 'resizes-content'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      

      <body>
        {children}
        <Analytics/>
      </body>
    </html>
  )
}
