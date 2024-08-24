import { useNavigate } from "react-router"
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="flex font-Poppins md:flex-col justify-center items-center shadow-lg rounded-2xl bg-white m-2 cursor-pointer transition-all duration-300 hover:scale-105"
    >
      <div>
        <img src={product.imageUrl} alt="" className="w-full p-2 md:h-72" />
      </div>
      <div className="flex flex-col text-[12px] md:text-lg font-semibold w-full p-3">
        <p className="uppercase text-color font-semibold py-2">{product.brand}</p>
        <p className=" break-words sm:w-[215px] text-gray">
          {product.description}
        </p>
        <div className="flex justify-between pt-4">
          <p className="text-black text-sm">&#8377;{product.price}</p>
          <p className="text-sm line-through text-lightgray">
            &#8377;{product.discountedPrice}
          </p>
          <p className="text-sm text-green">
            &#8377;{product.discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
  }).isRequired,
};