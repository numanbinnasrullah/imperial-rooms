import Image from "next/image"
import Link from "next/link"


const HeroBanner = () => {
    return (
        <>
            <div className="relative w-full ">
                <Link href={"/about"}>
                    <Image
                        src="/Desktop.png" // Replace with your image path
                        alt="Homepage Banner"
                        objectFit="contain"
                        className=" hidden sm:block "
                        quality={85}
                        layout="intrinsic"
                        priority
                        loading="lazy"
                    />
                </Link>
                <Link href={"/about"}>
                    <Image
                        src="/mobile.png" // Replace with your image path
                        alt="Homepage Banner"
                        objectFit="cover"
                        objectPosition="center"
                        className=" block sm:hidden"
                        layout="intrinsic"
                        quality={85}
                        loading="lazy"
                    />
                </Link>
                {/* <div className="absolute bottom-0 md:left-[47%] lg:left-[48%]">Arrrow</div> */}
            </div>
        </>
    )
}

export default HeroBanner