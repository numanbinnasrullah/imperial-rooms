

import filtersQuery from "@/graphql/filters/filters";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    // console.log("filter body",body);
    const {slug, item} = body
    // const wrappedItem = [{ variantOption: item.variantOption }];
    // console.log("POST Filters Backend Request", slug)
    // return NextResponse.json({res:"Yes Res"})
    try {
        const res = await filtersQuery(slug, "")
        // console.log("Filters Tolkit response", res)
        return NextResponse.json({res})
        // return NextResponse.json({ error: "Please Login First" }, { status: 200 }, {"data": data});
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
