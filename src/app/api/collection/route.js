

import collectionPageQuery from "@/graphql/collection/collection";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const {slug, paginate} = body
    console.log("Get Collection Backend Request Slug***", slug)
    // return NextResponse.json("Yes Get")
        var res ;
    try {
            res = await collectionPageQuery(slug, "")
            if(paginate){
                res = await collectionPageQuery(slug, paginate)
            }
            // console.log("Collection Fetch Successfully =====>>>>", res)
            return NextResponse.json({msg:"Collection fetched Successfully", res}, {status: 200})
       
        // return NextResponse.json({ error: "Please Login First" }, { status: 200 }, {"data": data});
    } catch (error) {
        return NextResponse.json("Server Internal Error", {status: 500})
    }
}
