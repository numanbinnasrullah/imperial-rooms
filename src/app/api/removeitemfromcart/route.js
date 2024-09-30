
import removeItemFromCartQuery from "@/graphql/removeItemFromCart/removeItemFromCart";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    // console.log("Remove Item cart data", body)
    const {cartId, itemid} = body
    const cleanedCartId = cartId.replace(/"/g, '');
    // const variantId = await request.json();
        // return NextResponse.json({msg:"Remove Item Successfuly"}, {status: 200})
    try {
        const res = await removeItemFromCartQuery(cleanedCartId, itemid)
        // console.log("Item removed response", res)
        return NextResponse.json({ error: "Item removed response", res }, { status: 200 });
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
