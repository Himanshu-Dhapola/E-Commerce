import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <div className="flex gap-4 font-Poppins">
        <img
          src="https://i.pinimg.com/474x/fc/8c/c8/fc8cc8d1cfe286d6cca209658c57cf60.jpg"
          alt="logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="font-bold text-3xl self-center text-white">E-Cart</h1>
      </div>
    </Link>
  );
}
