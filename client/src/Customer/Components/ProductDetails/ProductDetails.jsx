import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router";
import { findProductById } from "../../../services/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../services/cartApi";
import toast from "react-hot-toast";
import PageNav from "../Navigation/PageNav";
import Footer from "../Footer/Footer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const id = useParams();
  const [selectedSize, setSelectedSize] = useState(product?.size[0].name);

  const handleAddToCart = () => {
    if (!localStorage.getItem("accessToken")) {
      toast("Login to add item to cart", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login");
    } else {
      const data = {
        productId: id.productId,
        size: selectedSize.name,  
      };
      if (data.size) {
        dispatch(addItemToCart(data));
        navigate("/cart");
      } else {
       toast("Select a Size", {
         style: {
           borderRadius: "10px",
           background: "#333",
           color: "#fff",
         },
         duration: 5000,
       });
      }
    }
  };
  useEffect(() => {
    dispatch(findProductById(id));
  }, []);

  return (
    <div className="bg-smoke font-Poppins">
      <PageNav />
      <div className="pt-6 pb-10 flex flex-col md:flex-row justify-center items-center">
        <div className="ml-10 mt-6 sm:px-6 w-1/3 rounded-lg lg:block">
          <img
            alt={product?.imageUrl}
            src={product?.imageUrl}
            className="w-full object-contain h-full object-center"
          />
        </div>

        <div className="ml-7 max-w-2xl px-4 pb-1 flex-col flex justify-center items-center pt-10 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-color md:text-3xl">
              {product?.title}
            </h1>
          </div>

          <div className=" py-5 lg:col-span-2 lg:col-start-1">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray font-semibold w-[310px] md:w-[500px]">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <div className="text-2xl tracking-tight flex justify-around">
              <p className="text-black">{product?.discountedPrice}</p>
              <p className="text-gray line-through">
                &#8377;{product?.price}
              </p>
              <p className="text-green">
                {product?.discountPercentage}% off
              </p>
            </div>

            <form className="mt-3">
              <div className="flex">
                <h3 className="text-lg font-medium text-gray">
                  Color:{" "}
                  <span className=" uppercase font-semibold text-black">
                    {product?.color}
                  </span>
                </h3>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray">Size</h3>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid gap-4 grid-cols-4"
                  >
                    {product?.size.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        className={classNames(
                          "cursor-pointer font-bold bg-white text-blue shadow-sm group relative flex items-center justify-center rounded-md border p-3 md:px-4 md:py-3 text-xs md:text-base uppercase hover:bg-lightgray focus:outline-none data-[focus]:ring-2 data-[focus]:ring-blue sm:flex-1"
                        )}
                      >
                        <span className="z-10">{size.name}</span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-blue group-data-[checked]:bg-lightgray"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                onClick={handleAddToCart}
                type="submit"
                className="mt-10 uppercase font-semibold flex w-[300px] md:w-full items-center justify-center rounded-md border border-transparent bg-color px-8 py-3 text-base text-white hover:bg-color hover:scale-110 transition-all ease-in duration-200"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* similar products */}
      {/* <div className="mx-auto max-w-full px-4">
        <h1 className="text-2xl font-bold my-6 tracking-tight text-color sm:text-3xl">
          Similar Products
        </h1>
        <div className="flex flex-wrap space-y-6">
          {men.map((item, ind) => (
            <ProductCard product={item} key={ind} />
          ))}
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
