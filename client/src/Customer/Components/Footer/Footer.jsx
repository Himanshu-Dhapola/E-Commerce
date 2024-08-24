export default function Footer() {
  return (
    <div className="flex flex-col bg-color items-center font-Poppins">
      <footer className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 bg-color py-10 space-y-8 text-white w-full">
        <div className="flex flex-col justify-center mt-8 items-center">
          <h3 className="font-semibold text-md md:text-lg">Company</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button>About</button>
            <button>Blog</button>
            <button>Jobs</button>
            <button>Press</button>
            <button>Partners</button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-semibold text-md md:text-lg">Solutions</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button>Marketing</button>
            <button>Analytics</button>
            <button>Commerce</button>
            <button>Insights</button>
            <button>Support</button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-md md:text-lg">Documentation</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button>Guides</button>
            <button>API Status</button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-md md:text-lg">Legal</h3>
          <div className="flex flex-col text-sm md:text-base space-y-1">
            <button>Claim</button>
            <button>Privacy</button>
            <button>Terms</button>
          </div>
        </div>
      </footer>
      <div className="flex flex-col items-center text-white pb-6">
        <p>&copy; 2024 My Company. All rights reserved</p>
        <p>Made by Himanshu Dhapola</p>
      </div>
    </div>
  );
}
