import { graphql } from '../graphql'; // This is your GraphQL client setup file

const updateExistingCartQuery = async (cartID, variantId,  quantity) => {
  console.log("Update Cart Input:", cartID, variantId);
  const query = `
  mutation AddNewItemToExistingCart($cartID: ID!, $variantId: ID!, $proquantity: Int)  {
    cartLinesAdd(
      cartId: $cartID
      lines: {
        merchandiseId: $variantId
        quantity: $proquantity
      }
    ) {
      cart {
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
                }
              }
            }
          }
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
  }
  
  
  `;

  // "id": "gid://shopify/ProductVariant/42795461083321"
  const variables = {
    "cartID": cartID,
    "variantId": variantId,
    "proquantity": quantity
  };
  const Query = { query, variables }
  const res = await graphql(Query);
  return res
};

export default updateExistingCartQuery;