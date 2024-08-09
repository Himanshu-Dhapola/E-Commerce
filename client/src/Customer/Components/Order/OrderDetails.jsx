import AddressCard from "../AddressDetails/AddressCard";
import OrderTracker from "./OrderTracker";
import { FaRegStar } from "react-icons/fa";

export default function OrderDetails() {
  return (
    <div className="px-10 py-8 font-Poppins space-y-6 bg-smoke">
      <div>
        <h1 className="font-semibold text-xl">Delivery Address</h1>
        <AddressCard />
      </div>
      <div>
        <OrderTracker />
      </div>
      <div className="bg-white rounded-md p-4 font-Poppins">
        <div className="flex justify-between items-center px-6">
          <div className="flex space-x-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDYDtZkbXhSbcvpjTBpD4bCUC7cbqq9ueBQ&s"
              alt=""
              className="w-24 h-24 object-cover object-top"
            />
            <div>
              <p className=" font-semibold">Men Slim Shirt blue color</p>
              <div className="text-gray flex space-x-4">
                <p>Color: Blue</p>
                <p>Size: M</p>
              </div>
              <div>Seller: liberia</div>
              <p>$1300</p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FaRegStar className="text-blue"/>
            <p className="text-color cursor-pointer">Rate & Review Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}
