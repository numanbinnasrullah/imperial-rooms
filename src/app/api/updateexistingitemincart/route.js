// import cartCreateQuery from "@/graphql/cartcreate

import updateExistingCartItemQuery from "@/graphql/updateExistingCartItem/updateExistingCartItem";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    // console.log("Update Existing Item in cart", body)
    const {variantID, cartId,  quantity} = body
    // return NextResponse.json({msg:"Cart Updated Successfuly"}, {status: 201})
    try {
        const res = await updateExistingCartItemQuery(cartId, variantID, quantity )
        // console.log("Update Item cart Return response", res)
        return NextResponse.json({msg:"Cart Item  Updated Successfuly", res}, {status: 201})
        // return NextResponse.json({ error: "Please Login Frst" }, { status: 200 }, {"data": data});
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
