import { Product } from ".prisma/client";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { trpc } from "../utils/trpc";
type CartItem = {
  id: string;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItem) => {
  const { data: products } = trpc.product.getAll.useQuery();
  const { removeFromCart } = useShoppingCart();
  const product = products?.find((i: Product) => i.id === id.split("___")[0]);

  if (product === null) return null;

  const removeItem = () => removeFromCart(id);
  return (
    <li key={id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product?.images[0]?.src ?? ""}
          alt={product?.images[0]?.alt ?? ""}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <p>{product?.name}</p>
            </h3>
            <p className="ml-4">
              ${((product?.price || 0) * quantity).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{id.split("___")[1]}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              type="button"
              onClick={removeItem}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
