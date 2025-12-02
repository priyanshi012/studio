'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getOrdersByUserId } from '@/lib/data';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/orders');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getOrdersByUserId(user.id)
        .then(setOrders)
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  if (authLoading || isLoading) {
    return <OrdersSkeleton />;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">My Orders</h1>
        <p className="text-muted-foreground mt-2">View your past orders and their status.</p>
      </div>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-lg">Order #{order.id.slice(-6)}</CardTitle>
                  <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                     className={order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}>
                    {order.status}
                  </Badge>
                  <p className="font-bold text-lg mt-1">{formatPrice(order.total)}</p>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-6 space-y-4">
                {order.items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg flex flex-col items-center">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold font-headline">No Orders Yet</h2>
            <p className="text-muted-foreground mt-2">You haven't placed any orders with us.</p>
            <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      )}
    </div>
  );
}

function OrdersSkeleton() {
    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-80 mt-4" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    )
}
