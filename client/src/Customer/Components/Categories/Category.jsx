import CategoryItem from "./CategoryItem";
import { categoryData } from "./CategoryData";

export default function Category() {
  return (
    <div className="flex flex-col gap-4 pb-10 font-Poppins">
      <div className="flex justify-between">
        <h2 className="px-12 mt-8 font-semibold text-2xl text-color">
          Categories
        </h2>
        <div></div>
      </div>
      <div className="grid grid-cols-5 gap-x-4 gap-y-4 w-full px-10">
        {categoryData.map((item, index) => (
          <CategoryItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
