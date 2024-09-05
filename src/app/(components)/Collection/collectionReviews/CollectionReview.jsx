
import { BsArrowUpRight } from "react-icons/bs";
const CollectionReview = ({rowreverse}) => {
  return (
    <div className={`my-7 md:my-11 flex-col md:flex justify-between ${rowreverse ? 'md:flex-row-reverse' : 'md:flex-row'} `}>
    <div className="w-[100%] md:w-[30%] lg:mt-6 xl:mt-16 mb-6">
        <h2 className="text-center md:text-left text-2xl md:text-[21px]  lg:text-3xl xl:text-4xl mb-3  md:mb-2 lg:mb-3 xl:mb-5 md:leading-7 lg:leading-9">New Banner Version For The Website Collection Page</h2>
        <p className="leading-5 xl:leading-6 md:mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur deleniti eaque amet ipsam quis beatae natus quod delectus rerum facere?</p>
        <div className="text-right">
            <button className="px-4 ">
                <span className="text-lg mr-1 "> Browse </span>
                <BsArrowUpRight className="inline-block text-lg " />
            </button>
        </div>
    </div>
   
    <div className="w-full sm:w-[100%] md:w-[60%] mb-7 flex flex-col font-bold text-4xl text-center">
      <img
         src={"/collectio-review.jpg"}
        alt="custom div"
        className="object-cover"
      />
    </div>
 
</div>
  )
}

export default CollectionReview