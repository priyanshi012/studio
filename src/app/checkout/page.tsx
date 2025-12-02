import CheckoutForm from '@/components/checkout/checkout-form';

export const metadata = {
  title: 'Checkout | ShopWave',
};

export default function CheckoutPage() {

  return (
    <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline">Checkout</h1>
                <p className="text-muted-foreground mt-2">Complete your purchase by providing your details below.</p>
            </div>
            
            <CheckoutForm />
        </div>
    </div>
  );
}
