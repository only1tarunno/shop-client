import { useNavigate } from "react-router-dom";
import useCart from "../../../../hooks/useCart";
import CartTableRow from "./CartTableRow";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart] = useCart();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handlePay = async () => {
    const res = await axiosSecure.get(`/cart/pay/quantitycheck`);
    console.log(res.data);
    if (res.data.sucess) {
      navigate("/dashboard/payment");
    } else {
      Swal.fire({
        icon: "error",
        title: res.data.message,
        text: `Sorry, the available stock for this product is limited to ${res.data.quantitymessage} units.`,
      });
    }
  };

  return (
    <div className="pt-10">
      <div className="flex justify-between pb-8">
        <h2 className="text-4xl">Total Items: {cart.totalQuantity}</h2>
        <h2 className="text-4xl">
          Total Price: $
          {cart?.cartProducts
            ?.reduce((sum, item) => sum + item.totalPrice, 0)
            .toFixed(2)}
        </h2>
        <div>
          {cart?.cartProducts?.length ? (
            <button onClick={handlePay} className="btn btn-primary">
              Pay
            </button>
          ) : (
            <button disabled className="btn btn-primary">
              Pay
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Product Image</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.cartProducts?.length > 0 ? (
                cart?.cartProducts?.map((product, index) => (
                  <CartTableRow
                    key={product._id}
                    productData={product}
                    serial={index}
                  ></CartTableRow>
                ))
              ) : (
                <tr className="text-center border-none">
                  <td colSpan={6}>
                    <h2 className="text-3xl text-[#f76b6a] font-bold pt-10 pb-2">
                      Your Cart is Empty
                    </h2>
                    <p className="text-lg">
                      Browse our latest collections and find what you need.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;