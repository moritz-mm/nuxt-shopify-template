import type {
    CollectionResponse,
    CollectionsResponse,
    ProductResponse,
    ProductsResponse,
} from "~/types/shopify";

export function useCollections() {
    const query = gql`
        {
            collections(first: 100, sortKey: TITLE) {
                edges {
                    node {
                        id
                        handle
                        title
                        description
                        image {
                            id
                            url
                        }
                    }
                }
            }
        }
    `;

    return useAsyncQuery<CollectionsResponse>(query);
}

export function useCollection(slug: string) {
    const query = gql`
        query getCollection($slug: String!) {
            collection(handle: $slug) {
                id
                handle
                title
                description
                image {
                    id
                    url
                }
                products(first: 100) {
                    edges {
                        node {
                            id
                            title
                            handle
                            description
                            featuredImage {
                                id
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

    return useAsyncQuery<CollectionResponse>(query, {
        slug,
    });
}

export function useProduct(slug: string) {
    const query = gql`
        query getProduct($slug: String!) {
            product(handle: $slug) {
                id
                title
                handle
                description
                featuredImage {
                    id
                    url
                }
            }
        }
    `;

    return useAsyncQuery<ProductResponse>(query, {
        slug,
    });
}

export function useProducts(collection: string, first?: number) {
    const query = gql`
        query getProducts($collection: String!, $first: Int!) {
            collection(handle: $collection) {
                products(first: $first) {
                    edges {
                        node {
                            id
                            title
                            handle
                            description
                            featuredImage {
                                id
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

    return useAsyncQuery<ProductsResponse>(query, {
        collection,
        first: first ?? 1000,
    });
}
