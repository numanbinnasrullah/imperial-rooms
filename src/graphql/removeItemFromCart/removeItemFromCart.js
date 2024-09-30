import { graphql } from '../graphql'; // This is your GraphQL client setup file

const removeItemFromCartQuery = async (cartID, itemId) => {
  console.log("Remove Item from cart Query:", cartID, itemId);
  const query = `
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart{
          id
          lines(first: ${process.env.Cart_Lines}) {
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
                    
                  }
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
      }
      userErrors {
        field
        message
      }
    }
}
    `;
    const variables = {
        "cartId": cartID,
        "lineIds": [itemId]
      };
      const Query = { query, variables }
      const res = await graphql(Query);
      return res
  }


export default removeItemFromCartQuery;