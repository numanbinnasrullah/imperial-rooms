import Image from "next/image"
import Link from "next/link"
import Head from "next/head";

const HeroBanner = () => {
    return (
        <>
        <Head>
        <link rel="preload" href="/Desktop.png" as="image" />
      </Head>
            <div className="relative w-full h-[70vh] md:h-[90vh]">
                <Link href={"/about"}>
                <div className="relative hidden sm:block w-full h-full">
                    <Image
                        src="/Desktop.png" // Replace with your image path
                        alt="Homepage Banner"
                        objectFit="contain"
                        className=" hidden sm:block "
                       
                        layout="intrinsic"
                        priority
                        quality={85}
                    />
                    </div>
                </Link>
                <Link href={"/about"}>
                    <Image
                        src="/mobile.png" // Replace with your image path
                        alt="Homepage Banner"
                        objectFit="cover"
                        objectPosition="center"
                        className=" block sm:hidden"
                        layout="intrinsic"
                        width={1000}
                        height={100}
                        loading="lazy"
                    />
                </Link>
                {/* <div className="absolute bottom-0 md:left-[47%] lg:left-[48%]">Arrrow</div> */}
            </div>
        </>
    )
}

export default HeroBanner