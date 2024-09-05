import { graphql } from "../graphql";

const collectionPageQuery = async(collectionSlug, paginate) => {
  // filtersOpt?.map((filter)=> {
  //   console.log("Filter BBBBB", filter)
  // })

  // console.log("Collection paginate", paginate)
  
      if(paginate && paginate.includes('nextPage')){
        const query = `
    query collectionPageQuery($slug:String!, $nextPage: String) {
      
        collection(handle: $slug) {
            title
            description
            handle
            image {
              id
              url
            }
            seo {
              description
              title
            }
            products(first: ${process.env.Collection_Products_Limit},  after:$nextPage) {
              filters {
                id
                label
                type
                values {
                  id
                  label
                  count
                  input
                }
              }
              edges {
                node {
                  id
                  title
                  description
                  handle
                  images(first:${process.env.Collection_Media_Limit}) {
                    edges {
                      node {
                        id
                        originalSrc
                      }
                    }
                  }
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
                        id
                        title
                        quantityAvailable
                        image {
                          id
                          url
                        }
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                        price {
                          amount
                          currencyCode
                        }
                        sku
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
            }

          }
          


      

      }



      
      
    `
    const variables = {
      "slug": collectionSlug
    };
    if (paginate.includes('nextPage')) {
      variables["nextPage"] = paginate.split('+')[1].trim();
    }  else if(paginate.includes('previousPage')){
      variables["previousPage"] = paginate.split('+')[1].trim();
    }

    const Query = { query, variables }
    const res = await graphql(Query);
    return res
      } else if(paginate && paginate.includes('previousPage')) {
        const query = `
    query collectionPageQuery($slug:String!,  $previousPage: String) {
      
        collection(handle: $slug) {
            title
            description
            handle
            image {
              id
              url
            }
            products(last: ${process.env.Collection_Products_Limit},  before: $previousPage) {
              filters {
                id
                label
                type
                values {
                  id
                  label
                  count
                  input
                }
              }
              edges {
                node {
                  id
                  title
                  description
                  handle
                  images(first:${process.env.Collection_Media_Limit}) {
                    edges {
                      node {
                        id
                        originalSrc
                      }
                    }
                  }
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
                        id
                        title
                        quantityAvailable
                        image {
                          id
                          url
                        }
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                        price {
                          amount
                          currencyCode
                        }
                        sku
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
            }

          }
          





      }



      
    `

    const variables = {
      "slug": collectionSlug
    };
    if (paginate.includes('nextPage')) {
      variables["nextPage"] = paginate.split('+')[1].trim();
    }  else if(paginate.includes('previousPage')){
      variables["previousPage"] = paginate.split('+')[1].trim();
    }
    
    const Query = { query, variables }
    const res = await graphql(Query);
    return res
      } else {

        const query = `
        query collectionPageQuery($slug:String!) {
          
            collection(handle: $slug) {
                title
                description
                handle
                image {
                  id
                  url
                }
                products(first: ${process.env.Collection_Products_Limit}) {
                  filters {
                    id
                    label
                    type
                    values {
                      id
                      label
                      count
                      input
                    }
                  }
                  edges {
                    node {
                      id
                      title
                      description
                      handle
                      images(first:${process.env.Collection_Media_Limit}) {
                        edges {
                          node {
                            id
                            originalSrc
                          }
                        }
                      }
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
                            id
                            title
                            quantityAvailable
                            image {
                              id
                              url
                            }
                            compareAtPrice {
                              amount
                              currencyCode
                            }
                            price {
                              amount
                              currencyCode
                            }
                            sku
                          }
                        }
                      }
                    }
                  }
                  pageInfo {
                    hasPreviousPage
                    hasNextPage
                    startCursor
                    endCursor
                  }
                }
    
              }
              
    
    
         
    
          }
    
    
    
    
          
        `
    
        const variables = {
          "slug": collectionSlug
        };
        // if (paginate.includes('nextPage')) {
        //   variables["nextPage"] = paginate.split('+')[1].trim();
        // }  else if(paginate.includes('previousPage')){
        //   variables["previousPage"] = paginate.split('+')[1].trim();
        // }
        
        const Query = { query, variables }
        const res = await graphql(Query);
        return res


      }

      
}

export default collectionPageQuery;
