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
                        
                        loading="lazy"
                        width={2000}
                        height={800}
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
                        width={2000}
                        height={800}
                    />
                </Link>
                
            </div>
        </>
    )
}

export default HeroBanner