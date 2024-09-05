import CollectionWraper from "@/app/(components)/Collection/Collection"


const Collection = ({params}) => {
  const slug = params?.slug
  console.log("slug", slug)
  return (
    <>
      <CollectionWraper slug={slug} />
    </>
  )
}

export default Collection