import HeroAuthButton from "./HeroAuthButton";

export default function HeroSection() {
  return (
    <>
      <div className="flex flex-col w-[70%] items-center justify-center mx-auto my-25">
        <h1 className="text-[4vw] mx-auto text-center text-white font-space-grotesk">
          Access and Manage your sales in Natural Language with RetailX AI
        </h1>
        <HeroAuthButton/>
      </div>
    </>
  );
}
