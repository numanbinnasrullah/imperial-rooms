import { graphql } from './graphql'; // This is your GraphQL client setup file

const cartCreateQuery = async (variantID, quantity) => {
  // console.log("CartCreate Input:", variantID, quantity);
  const query = `
  mutation AddToCart($variantID: ID!, $proquantity:Int) {
    cartCreate(
      input: {
        lines: [
          {
            quantity: $proquantity
            merchandiseId: $variantID
          }
        ],
        buyerIdentity: {
          email: "example@example.com",
          countryCode: CA,
          deliveryAddressPreferences: {
            deliveryAddress: {
              address1: "150 Elgin Street",
              address2: "8th Floor",
              city: "Ottawa",
              province: "Ontario",
              country: "CA",
              zip: "K2P 1L4"
            },
          }
        }
        attributes: {
          key: "cart_attribute",
          value: "This is a cart attribute"
        }
      }
    ) {
      cart {
        id
        createdAt
        updatedAt
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
  }
  
  `;

  // "id": "gid://shopify/ProductVariant/42795461083321"
  const variables = {
    "variantID": variantID,
    "proquantity": quantity
  };
  const Query = { query, variables }
  const res = await graphql(Query);
  return res
};

export default cartCreateQuery;