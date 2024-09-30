// import cartCreateQuery from "@/graphql/cartcreate";

import updateExistingCartQuery from "@/graphql/updateExistingCart/updateExistingCart";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    // console.log("Update Cart Receive Variant Id", body)
    const {variantID, cartId,  quantity} = body
    // return NextResponse.json({msg:"Cart Updated Successfuly"}, {status: 201})
    try {
        const res = await updateExistingCartQuery(cartId, variantID, quantity )
        // console.log("Update cart Return response", res)
        return NextResponse.json({msg:"Cart Updated Successfuly", res}, {status: 201})
        // return NextResponse.json({ error: "Please Login Frst" }, { status: 200 }, {"data": data});
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
