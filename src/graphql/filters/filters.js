import { graphql } from "../graphql";

const filtersQuery = async(collectionSlug, filter, paginate ) => {
    // console.log("Filter query console", paginate)
    // console.log("Filter query console below",collectionSlug, filter)
    if(paginate && paginate.includes('nextPage')){
      const query = `
      query collectionPageQuery($slug:String!, $filter: [ProductFilter!], $nextPage: String,) {
  
  
  
        collection(handle: $slug) {
            title
            description
            products(first: 2, filters: $filter, after:$nextPage,) {
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
                  images(first:100) {
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
                  media(first: 100) {
                    edges {
                      node {
                        previewImage {
                          id
                          url
                        }
                      }
                    }
                  }
                  variants(first: 100) {
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
  // console.log("btgbvtgb",filter ) 
      const variables = {
        "slug": collectionSlug,
        "filter": JSON.parse(filter)
        };
        if (paginate.includes('nextPage')) {
          variables["nextPage"] = paginate.split('+')[1].trim();
        }  else if(paginate.includes('previousPage')){
          variables["previousPage"] = paginate.split('+')[1].trim();
        }
    
      const Query = { query, variables }
      const res = await graphql(Query);
      return res
    } else if (paginate && paginate.includes('previousPage')) {
      const query = `
      query collectionPageQuery($slug:String!, $filter: [ProductFilter!], $previousPage: String) {
  
  
  
        collection(handle: $slug) {
            title
            description
            products(last: 2,filters: $filter, before: $previousPage) {
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
                  images(first:100) {
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
                  media(first: 100) {
                    edges {
                      node {
                        previewImage {
                          id
                          url
                        }
                      }
                    }
                  }
                  variants(first: 100) {
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
  // console.log("btgbvtgb",filter ) 
      const variables = {
        "slug": collectionSlug,
        "filter": JSON.parse(filter)
        };
        if (paginate.includes('nextPage')) {
          variables["nextPage"] = paginate.split('+')[1].trim();
        }  else if(paginate.includes('previousPage')){
          variables["previousPage"] = paginate.split('+')[1].trim();
        }
    
      const Query = { query, variables }
      const res = await graphql(Query);
      return res
    } else if(collectionSlug && filter){
      console.log("collectionSlug && Filter wali if run")
      const query = `
      query collectionPageQuery($slug:String!, $filter: [ProductFilter!]) {
  
  
  
        collection(handle: $slug) {
            title
            description
            products(first: 2, filters: $filter) {
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
                  images(first:100) {
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
                  media(first: 100) {
                    edges {
                      node {
                        previewImage {
                          id
                          url
                        }
                      }
                    }
                  }
                  variants(first: 100) {
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
  // console.log("btgbvtgb",filter ) 
      const variables = {
        "slug": collectionSlug,
        "filter": JSON.parse(filter)
        };
        // if (paginate.includes('nextPage')) {
        //   variables["nextPage"] = paginate.split('+')[1].trim();
        // }  else if(paginate.includes('previousPage')){
        //   variables["previousPage"] = paginate.split('+')[1].trim();
        // }
    
      const Query = { query, variables }
      const res = await graphql(Query);
      return res

    } else {
      
      const query = `
      query collectionPageQuery($slug:String!) {
  
  
  
        collection(handle: $slug) {
            title
            description
            products(first: 2) {
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
                  images(first:100) {
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
                  media(first: 100) {
                    edges {
                      node {
                        previewImage {
                          id
                          url
                        }
                      }
                    }
                  }
                  variants(first: 100) {
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
  // console.log("btgbvtgb",filter ) 
      const variables = {
        "slug": collectionSlug,
        
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

export default filtersQuery;
