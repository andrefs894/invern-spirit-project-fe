import { IProductDetails } from "@/types/store/product";

export const productDetailsToProduct = (productDetails: IProductDetails) => {
    return {
        ...productDetails,
        productImages:undefined,
        productImage:productDetails.images[0],
        description:undefined,
        collectionName:undefined
    }

}