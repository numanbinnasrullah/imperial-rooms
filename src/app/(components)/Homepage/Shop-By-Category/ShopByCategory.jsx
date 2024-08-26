import Grid from "./grid/Grid"
import Grid1 from "./grid/Grid1"


const ShopByCategory = ({collections}) => {
  // console.log("ssss",collections)
  return (
    <>
        <Grid collections={collections} />
        {/* <Grid1 collections={collections} /> */}
    </>
  )
}

export default ShopByCategory