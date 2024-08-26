export const graphql = async(query) => {
    // console.log("query", JSON.stringify(query));
    try {
        // console.log('Query:', query);
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_ACCESS_TOKEN,
        };
        
        const response = await fetch(process.env.SHOPIFY_GRAPHQL_ENDPOINT, {
            cache: 'no-store',
            // next: { revalidate: 15 },
            headers,
            method: "POST",
            body: JSON.stringify(query)
        });

        const contentType = response.headers.get("Content-Type");
        
        let res;
        if (contentType && contentType.includes("application/json")) {
            res = await response.json();
        } else {
            res = await response.text();
        }

        console.log(res);
        return res;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}
