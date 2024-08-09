export default function InfiniteCarousel() {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] my-8 bg-smoke">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <img src="./samsung.png" alt="Samsung" width={100} />
        </li>
        <li>
          <img src="./intel.png" alt="Intel" width={100} />
        </li>
        <li>
          <img src="./apple.png " alt="Apple" width={100} />
        </li>
        <li>
          <img src="./sony.png" alt="Sony" width={100} />
        </li>
        <li>
          <img src="./asus.png" alt="Asus" width={100} />
        </li>
        <li>
          <img src="./redmi.png" alt="Redmi" width={100} />
        </li>
        <li>
          <img src="./bose.png" alt="Bose" width={100} />
        </li>
        <li>
          <img src="./hp.png" alt="Hp" width={100} />
        </li>
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        <li>
          <img src="./samsung.png" alt="Samsung" width={100} />
        </li>
        <li>
          <img src="./intel.png" alt="Intel" width={100} />
        </li>
        <li>
          <img src="./apple.png " alt="Apple" width={100} />
        </li>
        <li>
          <img src="./sony.png" alt="Sony" width={100} />
        </li>
        <li>
          <img src="./asus.png" alt="Asus" width={100} />
        </li>
        <li>
          <img src="./redmi.png" alt="Redmi" width={100} />
        </li>
        <li>
          <img src="./bose.png" alt="Bose" width={100} />
        </li>
        <li>
          <img src="./hp.png" alt="Hp" width={100} />
        </li>
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <img src="./samsung.png" alt="Samsung" width={100} />
        </li>
        <li>
          <img src="./intel.png" alt="Intel" width={100} />
        </li>
        <li>
          <img src="./apple.png " alt="Apple" width={100} />
        </li>
        <li>
          <img src="./sony.png" alt="Sony" width={100} />
        </li>
        <li>
          <img src="./asus.png" alt="Asus" width={100} />
        </li>
        <li>
          <img src="./redmi.png" alt="Redmi" width={100} />
        </li>
        <li>
          <img src="./bose.png" alt="Bose" width={100} />
        </li>
        <li>
          <img src="./hp.png" alt="Hp" width={100} />
        </li>
      </ul>
    </div>
  );
}
