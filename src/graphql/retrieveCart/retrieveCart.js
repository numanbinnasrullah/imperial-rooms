import { graphql } from '../graphql'; // This is your GraphQL client setup file

const retrievecartQuery = async (input) => {
  console.log("retrieve Cart Input:", input);
  const query = `
  query RetrieveCart($id: ID!) {
    cart(
      id: $id
    ) {
      id
      createdAt
      updatedAt
      lines(first: ${process.env.Collection_Products_Limit}) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  id
                  url
                }
                price {
                    amount
                    currencyCode
                  }
                product {
                  title
                  id
                  images(first: 1) {
                    edges {
                      node {
                        id
                        url
                        altText
  
                      }
                    }
              }
                }
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }

    }
  }
  
  
  
  `;

  // "id": "gid://shopify/ProductVariant/42795461083321"
  const variables = {
    "id": input
  };
  const Query = { query, variables }
  const res = await graphql(Query);
  return res
};

export default retrievecartQuery;