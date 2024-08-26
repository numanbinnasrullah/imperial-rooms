import Link from "next/link"
import '../hero-banner/HeroBanner.css'

const HeroVideo = () => {
    return (
        <>
            <div className="desc_video ">
                <Link href={"/about"}>
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover hidden sm:block"
                    >
                        <source src="/desktop-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Link>
                </div>
                <div className="mobile_video">
                <Link href={"/about"}>
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover  block sm:hidden"
                    >
                        <source src="/mobile-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Link>
                {/* <div className="absolute bottom-0 md:left-[47%] lg:left-[48%]">Arrrow</div> */}
            </div>
        </>
    )
}

export default HeroVideo