"use client";

import Link from 'next/link';
import { ShoppingBag, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import Logo from '@/components/logo';
import UserNav from './user-nav';

const Header = () => {
  const { items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-card border-b border-border/40 sticky top-0 z-40 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xl font-headline text-primary">ShopWave</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/products" className="text-foreground/80 hover:text-foreground transition-colors">
              All Products
            </Link>
            <Link href="/products?category=electronics" className="text-foreground/80 hover:text-foreground transition-colors">
              Electronics
            </Link>
            <Link href="/products?category=fashion" className="text-foreground/80 hover:text-foreground transition-colors">
              Fashion
            </Link>
            <Link href="/products?category=home-goods" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10 w-48 lg:w-64" />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
