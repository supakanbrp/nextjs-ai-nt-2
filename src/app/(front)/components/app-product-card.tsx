'use client'

type Props = {
  name: string;
  price: number;
  stock?: number;
  onAddToCart: (name: string) => void;
}

export default function AppProductCard({ name, price, stock = 0, onAddToCart }: Props) {
  return (
    <div className="w-60 border border-green-500 rounded-lg p-6 m-6 bg-amber-100">
      <h2>{name}</h2>
      <p>Price: {price} THB</p>
      {
        stock > 0 && (
          <div>
            <p>In stock: {stock}</p>
            <button onClick={ () => onAddToCart(name) }>Add to Cart</button>
          </div>
        )
      }
      
    </div>
  );
}