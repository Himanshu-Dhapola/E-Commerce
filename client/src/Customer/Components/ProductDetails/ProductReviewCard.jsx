export default function ProductReviewCard() {
  return (
    <div className="flex flex-row items-start justify-between font-Poppins w-full px-2">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <img
            src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
            alt=""
            width={50}
          />
          <div>
            <p className="text-black font-semibold text-xl">Himanshu</p>
            <p className="text-gray">May 13, 2004</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray break-words max-w-96">
          i love this frame. it is stable and strong
        </p>
      </div>
    </div>
  );
}
