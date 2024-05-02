import { getCurrentUser } from "@/actions/getCurrentUser";
import CartClient from "./CartClient";

const Cart = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <div>
        <CartClient currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Cart;
