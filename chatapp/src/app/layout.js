import './globals.css'

import Nav from './components/navbar.component';

export const metadata = {
  title:'ChatApp',
  description: 'Chat with your friends',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Nav />
        {children}
        </body>
    </html>
  )
}
