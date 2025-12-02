'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { getProductById } from '@/lib/data';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { placeOrder } from '@/actions/order';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  zip: z.string().min(4, "ZIP code is invalid"),
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cardCvc: z.string().length(3, "CVC must be 3 digits"),
});

type CartItemWithProduct = { product: Product; quantity: number };

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [cartDetails, setCartDetails] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      address: user?.address || "",
      city: user?.city || "",
      zip: user?.zip || "",
      cardName: user?.name || "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, router]);
  
  useEffect(() => {
    const fetchCartDetails = async () => {
      setIsLoading(true);
      const detailedItems: CartItemWithProduct[] = [];
      for (const item of items) {
        const product = await getProductById(item.productId);
        if (product) {
          detailedItems.push({ product, quantity: item.quantity });
        }
      }
      setCartDetails(detailedItems);
      setIsLoading(false);
    };
    if (items.length > 0) {
      fetchCartDetails();
    } else if (!form.formState.isSubmitting) {
        setIsLoading(false);
        // If cart becomes empty and we're not in the middle of submission, redirect
        router.push('/cart');
    }
  }, [items, router, form.formState.isSubmitting]);

  const subtotal = cartDetails.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'You must be logged in to place an order.' });
      return;
    }

    const orderPayload = {
      userId: user.id,
      items: cartDetails.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress: {
        name: values.name,
        address: values.address,
        city: values.city,
        zip: values.zip,
      },
    };

    try {
      await placeOrder(orderPayload);
      toast({ title: 'Order Placed!', description: 'Thank you for your purchase.' });
      clearCart();
      router.push('/orders');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to place order', description: 'Please try again.' });
    }
  };

  if (isLoading) {
    return <div className='text-center'><Loader2 className='animate-spin mx-auto' /></div>;
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader><CardTitle className="font-headline">Shipping Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="address" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField name="city" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="zip" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-headline">Payment Details (Mock)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField name="cardName" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="cardNumber" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="XXXX XXXX XXXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField name="cardExpiry" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="cardCvc" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="XXX" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Place Order
            </Button>
          </form>
        </Form>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
            <CardHeader><CardTitle className="font-headline">Your Order</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {cartDetails.map(item => (
                        <div key={item.product.id} className="flex justify-between items-start text-sm">
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                    ))}
                </div>
                <hr className="my-4"/>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm"><p>Subtotal</p><p>{formatPrice(subtotal)}</p></div>
                    <div className="flex justify-between text-sm"><p>Shipping</p><p>Free</p></div>
                    <div className="flex justify-between font-bold text-lg"><p>Total</p><p>{formatPrice(subtotal)}</p></div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
