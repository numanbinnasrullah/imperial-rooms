import { BsArrowUpRight } from "react-icons/bs";

const CollectionHeader = ({collection}) => {
  const truncateDescription = (text, wordLimit) => {
    const wordsArray = text.split(' ');
    if (wordsArray.length <= wordLimit) {
      return text;
    }
    return wordsArray.slice(0, wordLimit).join(' ') + '...';
  };
  const truncatedDescription = truncateDescription(collection?.description, 30);
  return (
    <>
    <div className="w-[90%] sm:w-[93%] md:w-[90%] lg:w-[85%] xl:w-[72%]  flex justify-between flex-col md:flex-row mx-auto my-6 lg:mt-11 lg:mb-7">
        <div className="md:w-[45%] lg:w-[50%] xl:w-[35%] text-center md:text-left lg:text-center  mb-3 md:mb-0">
            <h2 className="text-[7vw] sm:text-[35px] md:text-[32px] lg:text-[33px] xl:text-[33px] px-2 md:px-0">{collection?.title}</h2>
        </div>
        <div className="md:w-[50%] lg:w-[57%] xl:w-[60%] lg:px-8">
            <p className="text-justify sm:text-wrap"> {truncatedDescription} </p>
            <div className="text-right">
            <button className="px-4 ">
                <span className="text-lg mr-1 text-gray-400"> Browse </span>
                <BsArrowUpRight className="inline-block text-lg text-gray-400" />
            </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default CollectionHeader