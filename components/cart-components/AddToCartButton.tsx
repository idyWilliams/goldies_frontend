import { ICart } from "@/interfaces/cart.interface";
import useCart from "@/services/hooks/cart/useCart";

const AddToCartButton = ({
  product,
  quantity,
  size,
  toppings,
  flavour,
  dateNeeded,
  details,
}: ICart) => {
  const { handleAddToCart } = useCart();

  const item: ICart = {
    product,
    quantity,
    size,
    toppings,
    flavour,
    dateNeeded,
    details,
  };

  return <button onClick={() => handleAddToCart(item)}>Add to Cart</button>;
};

export default AddToCartButton;
