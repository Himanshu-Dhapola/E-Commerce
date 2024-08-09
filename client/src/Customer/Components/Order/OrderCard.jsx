import { GrValidate } from "react-icons/gr";

export default function OrderCard() {
  return (
    <div className="shadow-md bg-white grid grid-cols-3 font-Poppins rounded-md">
      <div className="flex p-3 space-x-3 text-gray">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDYDtZkbXhSbcvpjTBpD4bCUC7cbqq9ueBQ&s"
          alt=""
          className="w-20 h-20 object-cover object-top"
        />
        <div>
          <p>Men Slim Shirt blue color</p>
          <p className="text-lightgray">Size: M</p>
        </div>
      </div>
      <p className=" px-28 py-4 font-semibold">$1499</p>
      <div className="p-4 space-y-2">
        <div className="flex space-x-2 items-center">
          <GrValidate className="text-green"/>
          <p className="font-semibold">Delivered on Mar 08</p>
        </div>
        <p className="text-gray">Your item has been delivered</p>
      </div>
    </div>
  );
}
