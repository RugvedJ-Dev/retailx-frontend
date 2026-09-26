import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image
        src="/hero.jpg"
        style={{ objectFit: "cover", zIndex: -1 }}
        fill
        alt="hero"
      />
    </>
  );
}
