import OrderCard from "./OrderCard";

export default function Order() {

    const orderStatus = [
      { label: "On the Way", value: "on_the_way" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Returned", value: "returned" },
    ];

  return (
    <div className="w-full bg-smoke p-8 flex font-Poppins">
      <div className=" shadow-xl w-1/6 p-4 rounded-md bg-white h-40">
        <h1 className="font-semibold">Order Status</h1>
        <div className="p-2">
          {orderStatus.map((option) => (
            <div className="space-x-4">
              <input type="checkbox" defaultValue={option.value} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-10 space-y-4">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
}
