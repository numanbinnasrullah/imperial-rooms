
// import homePageQuery from "@/graphql/homePage/homepage";
// import Blogs from "./(components)/Homepage/blogs/Blogs";
// import GridSlider from "./(components)/Homepage/grid-slider/GridSlider";
import Hero from "./(components)/Homepage/hero-banner/Hero";
// import HeroBanner from "./(components)/Homepage/hero-banner/HeroBanner";
import HeroVideo from "./(components)/Homepage/hero-video/HeroVideo";
// import NewArrival from "./(components)/Homepage/new-arrival/NewArrival";
// import Reviews from "./(components)/Homepage/reviews/Reviews";
// import ShopByCategory from "./(components)/Homepage/Shop-By-Category/ShopByCategory";
// import Testimonial from "./(components)/Homepage/testimonial/Testimonial";
// import { TopSellingProducts } from "./(components)/Homepage/top-selling-products/TopSellingProducts";
// import UserSignup from "./(components)/Homepage/user-signup/UserSignup";
// import NewArrival1 from "./(components)/Homepage/new-arrival/NewArrival copy";
// import { TopSellingProducts1 } from "./(components)/Homepage/top-selling-products/TopSellingProducts copy";


export default async function Home() {
  const isVideoShow = false;
  return (
    
    <>
      <h1>yes</h1>
      {isVideoShow ? <HeroVideo /> : <Hero />}
      {/* <ShopByCategory collections={[collection1, collection2, collection3, collection4]} />
      <NewArrival newArrival_1 = {Home_Collection_New_Arrivals_1} newArrival_2 = {Home_Collection_New_Arrivals_2} newArrival_3 =  {Home_Collection_New_Arrivals_3} /> */}
      {/* <NewArrival1 newArrival_1 = {Home_Collection_New_Arrivals_1} newArrival_2 = {Home_Collection_New_Arrivals_2} newArrival_3 =  {Home_Collection_New_Arrivals_3} /> */}
      {/* <Reviews />
      <Testimonial /> */}
      {/* <TopSellingProducts collection={top_selling_products}/> */}
      {/* <TopSellingProducts1 collection={top_selling_products}/>
      <UserSignup />
      <Blogs articles={articles} />
       */}
    </>

  );
}



