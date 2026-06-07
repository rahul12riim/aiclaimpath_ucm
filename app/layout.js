export const metadata = {
  title: 'AIClaimPath — Free AI Unemployment Toolkit | All 50 States',
  description: 'Free AI-powered toolkit: file unemployment claims, find jobs, reskill. 9 tools. All 50 states. No sign-up.',
  metadataBase: new URL('https://aiclaimpath.com'),
  openGraph: {
    title: 'AIClaimPath — Free AI Unemployment Toolkit',
    description: 'File claims, find jobs, reskill free. 9 AI-powered tools. All 50 states.',
    url: 'https://aiclaimpath.com',
    siteName: 'AIClaimPath',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'AIClaimPath', description: 'Free AI unemployment toolkit. All 50 states.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#F7F6F3' }}>
        {children}
      </body>
    </html>
  );
}
