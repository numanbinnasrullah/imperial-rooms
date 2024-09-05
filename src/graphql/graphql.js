export const graphql = async (query) => {
    try {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_ACCESS_TOKEN,
        };

        const response = await fetch(process.env.SHOPIFY_GRAPHQL_ENDPOINT, {
            cache: 'no-store',
            headers,
            method: "POST",
            body: JSON.stringify(query),
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

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
        console.error('Fetch error:', error.message);
        throw error;
    }
};
