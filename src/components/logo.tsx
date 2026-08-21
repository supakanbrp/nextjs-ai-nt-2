import Image from "next/image";

export const Logo = () => (
  <Image 
    src="/next.svg"
    alt="Next.js Logo"
    width={0}
    height={0}
    style={{
      width: 124,
      height: 32
    }}
    loading="eager"
  />
);
