import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  metadataBase: new URL('https://wamplify.me'),
  title: 'Wamplify - A Unimelb WAM Calculator',
  description: 'Predict the future. Predict a H1. Wamplify is a subject and WAM score calculator for the University of Melbourne by Risa & Ben. It works on all standard Unimelb subjects.',
  applicationName: 'Wamplify',
  authors: [{ name: 'Risa' }, { name: 'Ben' }],
  openGraph: {
    title: 'Wamplify - A Unimelb WAM Calculator',
    description: 'Predict the future. Predict a H1. Wamplify is a subject and WAM score calculator for the University of Melbourne by Risa & Ben. It works on all standard Unimelb subjects.',
    url: 'https://wamplify.me',
    siteName: 'Wamplify',
    locale: 'en_AU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wamplify - A Unimelb WAM Calculator',
    description: 'Predict the future. Predict a H1. Wamplify is a subject and WAM score calculator for the University of Melbourne by Risa & Ben. It works on all standard Unimelb subjects.'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // interactiveWidget: 'resizes-content'
  },
  verification: {
    google: "-Hh6YCn_Izp83pPyU625BWYl3po7DyvxsC9VLAr6jLA"
  }
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
