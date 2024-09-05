
import CollectionReview from "./CollectionReview";

const CollectionReviews = () => {
  return (
    <div className="w-[90%] md:w-[90%] lg:w-[85%] xl:w-[77%] mx-auto my-8">
        <div className="bg-[#F2F2F2] h-32 md:h-48 flex justify-center items-center md:mb-16 ">
            <h1 className="text-2xl md:text-3xl">REVIEWS</h1>
        </div>

       <CollectionReview />
       <CollectionReview rowreverse={true}/>
       <CollectionReview />
    </div>
  )
}

export default CollectionReviews