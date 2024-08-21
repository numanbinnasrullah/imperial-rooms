
import Blogs from "./(components)/Homepage/blogs/Blogs";
import GridSlider from "./(components)/Homepage/grid-slider/GridSlider";
import Hero from "./(components)/Homepage/hero-banner/Hero";
import HeroBanner from "./(components)/Homepage/hero-banner/HeroBanner";
import HeroVideo from "./(components)/Homepage/hero-video/HeroVideo";
import NewArrival from "./(components)/Homepage/new-arrival/NewArrival";
import Reviews from "./(components)/Homepage/reviews/Reviews";
import ShopByCategory from "./(components)/Homepage/Shop-By-Category/ShopByCategory";
import Testimonial from "./(components)/Homepage/testimonial/Testimonial";
import { TopSellingProducts } from "./(components)/Homepage/top-selling-products/TopSellingProducts";
import UserSignup from "./(components)/Homepage/user-signup/UserSignup";


export default function Home() {
  const isVideoShow = false;
  return (
    <>
      
      {isVideoShow ? <HeroVideo /> : <Hero />}
      <ShopByCategory />
      <NewArrival />
      <Reviews />
      <Testimonial />
      <TopSellingProducts />
      <UserSignup />
      <Blogs />
    </>

  );
}
