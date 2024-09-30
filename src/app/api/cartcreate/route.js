
import cartCreateQuery from "@/graphql/createCart/createCart";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    // console.log("create Cart Receive data", body)
    const {variantID, quantity} = body
    // const variantId = await request.json();
    // console.log("Create Cart Receive Variant Id", variantID)
    try {
        const res = await cartCreateQuery(variantID, quantity)
        // console.log("Cart Return response", res)
        return NextResponse.json({msg:"Cart Created Successfuly", res}, {status: 201})
        // return NextResponse.json({ error: "Please Login Frst" }, { status: 200 }, {"data": data});
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
