import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { LuMinusCircle } from "react-icons/lu";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../services/cartApi";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const handleCartItemQuantity = (num) => {
    const data = {
      quantity: item.quantity + num,
      cartItemId: item._id,
    };
    if (data.quantity > 0) {
      dispatch(updateCartItem(data));
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  return (
    <div className="p-5 shadow-lg border rounded-lg m-5 bg-white font-Poppins">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            src={item.product?.imageUrl}
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product?.title}</p>
          <p className="font-semibold">{item.product?.description}</p>
          <p>
            Size: <span>{item.size}</span>,{" "}
            <span className="uppercase">{item.product?.color}</span>
          </p>
          <p>
            Brand: <span className="uppercase">{item.product?.brand}</span>
          </p>
          <div className="text-lg tracking-tight flex justify-between space-x-8">
            <p className="text-black">&#8377;{item.price}</p>
            <p className="text-gray line-through">
              &#8377;{item.discountedPrice}
            </p>
            <p className="text-green">
              &#8377;{item.product?.discountPercentage} off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className=" flex items-center space-x-3 text-xl">
          <LuMinusCircle
            className=" text-blue cursor-pointer"
            onClick={() => handleCartItemQuantity(-1)}
            disabled={item.quantity <= 1}
          />
          <span className="border px-4 rounded-md">{item.quantity}</span>
          <LuPlusCircle
            className="text-blue cursor-pointer"
            onClick={() => handleCartItemQuantity(1)}
            disabled={item.quantity <= 1}
          />
          <RiDeleteBin6Line
            className="text-color cursor-pointer"
            onClick={handleRemoveCartItem}
          />
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      discountPercentage: PropTypes.number.isRequired,
    }).isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
  }).isRequired,
};
