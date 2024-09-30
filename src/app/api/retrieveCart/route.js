
import retrievecartQuery from "@/graphql/retrieveCart/retrieveCart";
import { NextResponse } from "next/server";

export async function POST(request) {
    const cartId = await request.json();
    // console.log("Retrieve Cart Variant Id", cartId)
    // return NextResponse.json({msg:"Cart Created Successfuly"}, {status: 201})
    try {
        const res = await retrievecartQuery(cartId)
        // console.log("Cart Return response", res)
        return NextResponse.json({msg:"Cart Retrieved Successfuly", res}, {status: 201})
        // return NextResponse.json({ error: "Please Login Frst" }, { status: 200 }, {"data": data});
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
