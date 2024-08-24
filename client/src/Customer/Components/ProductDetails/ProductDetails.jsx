import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import ProductReviewCard from "./ProductReviewCard";
import { men } from "../../../Data/Men";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
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
        toast.error("Select a size");
      }
    }
  };
  useEffect(() => {
    dispatch(findProductById(id));
  }, []);

  return (
    <div className="bg-smoke font-Poppins">
      <PageNav />
      <div className="pt-6 flex flex-col md:flex-row justify-center items-center">
        <div className="ml-10 mt-6 sm:px-6 w-1/3 rounded-lg lg:block">
          <img
            alt={product?.imageUrl}
            src={product?.imageUrl}
            className="w-full object-contain h-full object-cente"
          />
        </div>

        <div className="ml-7 max-w-2xl px-4 pb-1 pt-10 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-color sm:text-3xl">
              {product?.title}
            </h1>
          </div>

          <div className=" py-5 lg:col-span-2 lg:col-start-1">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray font-semibold w-[500px]">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <div className="text-2xl tracking-tight flex justify-around">
              <p className="text-black">{product?.price}</p>
              <p className="text-gray line-through">
                &#8377;{product?.discountedPrice}
              </p>
              <p className="text-green">
                &#8377;{product?.discountPercentage}% off
              </p>
            </div>

            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-black"
                          : "text-lightgray",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <p className="text-blue self-center">{product.numRatings} reviews</p>
              </div>
            </div> */}

            <form className="mt-3">
              {/* Colors */}
              <div className="flex">
                <h3 className="text-lg font-medium text-gray">
                  Color:{" "}
                  <span className=" uppercase font-semibold text-black">
                    {product?.color}
                  </span>
                </h3>

                {/* <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    {p.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={classNames(
                          color.selectedClass,
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset> */}
              </div>

              {/* Sizes */}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray">Size</h3>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product?.size.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        className={classNames(
                          "cursor-pointer font-bold bg-white text-black shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-lg uppercase hover:bg-lightgray focus:outline-none data-[focus]:ring-2 data-[focus]:ring-blue sm:flex-1 sm:py-6"
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
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-color px-8 py-3 text-base font-medium text-white hover:bg-color focus:outline-none focus:ring-2 focus:ring-color focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* rating and reviews */}
      <div className="mx-auto max-w-full px-4">
        <h1 className="text-2xl font-bold my-6 tracking-tight text-color sm:text-3xl">
          Rating and Reviews
        </h1>
        <div className="lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:gap-y-4 lg:pb-8 lg:pt-5 border border-y-1 border-x-0 border-gray">
          {Array(5)
            .fill()
            .map((_, ind) => (
              <ProductReviewCard key={ind} />
            ))}
        </div>
      </div>

      {/* similar products */}
      <div className="mx-auto max-w-full px-4">
        <h1 className="text-2xl font-bold my-6 tracking-tight text-color sm:text-3xl">
          Similar Products
        </h1>
        <div className="flex flex-wrap space-y-6">
          {men.map((item, ind) => (
            <HomeSectionCard product={item} key={ind} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
