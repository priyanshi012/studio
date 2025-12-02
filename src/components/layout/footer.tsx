import Link from 'next/link';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import Logo from '@/components/logo';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
             <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-xl font-headline text-primary">ShopWave</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your one-stop shop for everything you need. Find your wave of style.</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=electronics" className="text-sm text-muted-foreground hover:text-foreground">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="text-sm text-muted-foreground hover:text-foreground">Fashion</Link></li>
              <li><Link href="/products?category=home-goods" className="text-sm text-muted-foreground hover:text-foreground">Home Goods</Link></li>
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Our Story</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">My Account</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved. A B.Tech Final Year Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
