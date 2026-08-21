"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return <div className="text-center mt-20">Your cart is empty...</div>
  }

  return (
    <div className="mx-auto max-w-4xl mt-20">
      <h1 className="text-xl mb-4">Shopping Cart</h1>
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                items.map((i) => (
                    <TableRow key={i.productId}>
                        <TableCell>{i.productId}</TableCell>
                        <TableCell>{i.name}</TableCell>
                        <TableCell>{i.price}</TableCell>
                        <TableCell>{i.qty}</TableCell>
                        <TableCell>{(i.price * i.qty).toFixed(2)}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={() => { removeItem(i.productId); } } >
                                <Trash />
                            </Button>    
                        </TableCell>  
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>

      <div className="text-right mt-5">
          <div className="font-bold text-2xl">
               Total: {totalPrice.toFixed(2)}   
          </div>  
          <div className="m-4">
            <Button className="mr-4" variant="outline" onClick={() => { clearCart(); } }>Clear Cart</Button> 
            <Button onClick={() => { 
                clearCart();
                router.replace('/product');
             } }>Place Order</Button>
          </div>
      </div>      

    </div>
  );
}