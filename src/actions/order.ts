'use server';

import { Order, OrderItem } from "@/lib/types";

// This is a mock server action for placing an order.
// In a real application, this would securely process payments
// and create an order record in your database (e.g., Firestore).

type PlaceOrderPayload = {
  userId: string;
  items: Omit<OrderItem, 'productId'> & { productId: string };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
};

export async function placeOrder(payload: PlaceOrderPayload) {
  console.log("Placing order for user:", payload.userId);

  // This is a server-side mock. You can't access localStorage here.
  // To make this work for the demo, we'll have to rely on the client
  // to store the order after a successful mock submission.
  // A real implementation would look like this:
  /*
  const orderTotal = payload.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const newOrder: Omit<Order, 'id'> = {
    userId: payload.userId,
    items: payload.items,
    total: orderTotal,
    status: 'Pending',
    shippingAddress: payload.shippingAddress,
    createdAt: Date.now(),
  };

  // 1. Process payment with Stripe/etc.
  // 2. If payment is successful, save the order to Firestore.
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "orders"), newOrder);
  
  // 3. Clear the user's cart in Firestore.
  await deleteDoc(doc(db, "carts", payload.userId));

  return { success: true, orderId: docRef.id };
  */

  // Simulating network delay and success response
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // The client will handle adding this to localStorage for the demo.
  // We return the constructed order so the client can store it.
   const orderTotal = payload.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
   const mockOrderId = Math.random().toString(36).substring(2, 8);

   const createdOrder = {
    id: mockOrderId,
    ...payload,
    total: orderTotal,
    status: 'Pending' as const,
    createdAt: Date.now(),
  };

  // We can't access localStorage on the server, so we'll just log
  // and the client-side `checkout-form` will handle saving the mock order.
  console.log('Mock order created:', createdOrder);

  // This server action confirms the "backend" part is done.
  // The client receives this confirmation and finishes the flow.
  return { success: true, order: createdOrder };
}
