import { LiaShippingFastSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";

export default function Tags() {
  return (
    <div className="flex justify-evenly pt-10 font-Poppins">
      <div className="flex gap-2">
        <LiaShippingFastSolid className="w-6 h-6 self-center" />
        <p>Free Shipping</p>
      </div>
      <div className="flex gap-2">
        <BiSupport className="w-6 h-6 self-center" />
        <p>24/7 Support</p>
      </div>
      <div className="flex gap-2">
        <IoPricetagOutline className="w-6 h-6 self-center" />
        <p>Affordable Price</p>
      </div>
      <div className="flex gap-2">
        <MdOutlinePayment className="w-6 h-6 self-center" />
        <p>Secure Payments</p>
      </div>
    </div>
  );
}
