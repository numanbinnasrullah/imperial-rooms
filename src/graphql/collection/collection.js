import { graphql } from "../graphql";

const collectionPageQuery = async(collectionSlug, paginate, sortValue) => {
  // filtersOpt?.map((filter)=> {
  //   console.log("Filter BBBBB", filter)
  // })

  console.log("Collection Sort", sortValue)
  
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
      } else if(sortValue){

        const query = `
        query collectionPageQuery($slug:String!, $SortKey:ProductCollectionSortKeys,  $reverse: Boolean) {
          
            collection(handle: $slug) {
                title
                description
                handle
                image {
                  id
                  url
                }
                products(first: ${process.env.Collection_Products_Limit}, sortKey:$SortKey, reverse: $reverse) {
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
          "slug": collectionSlug,
          //  "SortKey": "PRICE",
        };
        if(sortValue === 'alphabetically-A-Z'){
          variables["SortKey"] = "TITLE"
        }else if (sortValue === 'alphabetically-Z-A') {
          variables["SortKey"] = "TITLE"
          variables["reverse"] = true
        }else if(sortValue === 'best-selling'){
          variables["SortKey"] = "BEST_SELLING"
        }else if(sortValue === 'price-heigh-low'){
          variables["SortKey"] = "PRICE"
          variables["reverse"] = true
        }else if(sortValue === 'price-low-heigh'){
          variables["SortKey"] = "PRICE"
          variables["reverse"] = false
        }else if(sortValue === 'created-assending'){
          variables["SortKey"] = "CREATED"
          variables["reverse"] = false
        }else if(sortValue === 'created-descending'){
          variables["SortKey"] = "CREATED"
          variables["reverse"] = true
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
