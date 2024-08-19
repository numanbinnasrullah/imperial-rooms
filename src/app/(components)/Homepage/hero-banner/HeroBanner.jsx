import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const HeroBanner = () => {
  return (
    <>
      {/* Preload the critical image */}
      <Head>
        <link rel="preload" href="/Desktop.png" as="image" />
      </Head>

      <div className="relative w-full h-[70vh] md:h-[90vh]">
        {/* Desktop Image */}
        <Link href="/about">
          <div className="relative hidden sm:block w-full h-full">
            <Image
              src="/Desktop.png"
              alt="Homepage Banner"
              layout="fill" // Take up the entire space without CLS
              objectFit="cover" // Ensures the image fits within the container
              priority={true} // Preload for improved LCP
              quality={85} // Compress the image slightly to reduce load time
            />
          </div>
        </Link>

        {/* Mobile Image */}
        <Link href="/about">
          <div className="relative block sm:hidden w-full h-full">
            <Image
              src="/mobile.png"
              alt="Homepage Banner"
              layout="fill"
              objectFit="cover"
              loading="lazy" // Lazy-load for non-critical images
              quality={85}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default HeroBanner;
