import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from '@/components/Menu';    
import { NextAuthProvider } from './providers/NextAuthProvider';

export const metadata = {
  title: "Federaçoes",
  description: "APP com server actions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Menu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}