import { graphql } from "../graphql";

const productPageQuery = async (productSlug) => {
    const query = `
    query productPageQuery($slug: String!, $youmayalsolike:String,) {

        product(handle: $slug) {
            seo {
              description
              title
            }
            featuredImage {
              id
              url
            }
            id
          title
          description
          handle
          images(first: ${process.env.Collection_Media_Limit}) {
            edges {
              node {
                id
                originalSrc
              }
            }
          }
          variants(first: ${process.env.Collection_Variants_Limit}) {
            edges {
              node {
                id
                title
                quantityAvailable
                image {
                  id
                  url
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                    amount
                  currencyCode
                }
                sku
              }
            }
          }
        }


        collection(handle: $youmayalsolike) {
          title
          
          products(first: 5) {
            edges {
              node {
                id
                title
                description
                handle
                featuredImage {
                  id
                  url
                }
                media(first: ${process.env.Collection_Media_Limit}) {
                  edges {
                    node {
                      previewImage {
                        id
                        url
                      }
                    }
                  }
                }
                variants(first: ${process.env.Collection_Variants_Limit}) {
                  edges {
                    node {
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }


      }
    `;

    const variables = {
        slug: productSlug,
        "youmayalsolike": process.env.youmayalsolike,
    };

    try {
        const Query = { query, variables }
        const res = await graphql(Query);
        return res
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default productPageQuery;
