import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

export default function HomeSectionCarousel({ data, sectionName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const handleNext = () => {
    setActiveIndex((prevCount) => prevCount + 1);
  };

  const handlePrev = () => {
    setActiveIndex((prevCount) => prevCount - 1);
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.map((item, index) => (
    <HomeSectionCard product={item} key={index} />
  ));

  return (
    <div className="px-5 font-Poppins">
      <div className="relative py-6 space-y-3">
        <h3 className="px-4 text-color font-semibold text-2xl">
          {sectionName}
        </h3>
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex !== 0 && (
          <button
            className=" cursor-pointer z-50 absolute top-32 left-0 border w-6 h-16 rounded-md shadow-md ml-2 bg-smoke flex items-center justify-center"
            onClick={handlePrev}
          >
            <MdKeyboardArrowLeft />
          </button>
        )}
        {activeIndex !== items.length - 5 && (
          <button
            className=" cursor-pointer z-50 absolute top-32 right-0 border w-6 h-16 rounded-md mr-4 shadow-md bg-smoke  flex items-center justify-center"
            onClick={handleNext}
          >
            <MdKeyboardArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
