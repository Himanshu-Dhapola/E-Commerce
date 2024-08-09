import PropTypes from "prop-types";
export default function HomeSectionCard({ product }) {
  return (
    <div className="flex flex-col justify-center items-center rounded-lg font-Poppins h-[350px] bg-white cursor-pointer transition-all duration-300 hover:scale-105 mx-4">
      <img src={product.image} alt="" className=" w-[180px] object-cover object-left-top" />
      <div className="flex flex-col ml-5 font-semibold">
        <p className="text-color font-semibold py-2">Samsung</p>
        <p className="max-w-[250px] break-words">
          samsung smart watch with OLED screen and 800 nits peak brihhg ggjhghhhghtness
        </p>
        <p className="text-color py-2">$29.49</p>
      </div>
    </div>
  );
}

HomeSectionCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
  }),
};
