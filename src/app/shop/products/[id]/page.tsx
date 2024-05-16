import React from 'react'
import Layout from '@/components/Layout';
import ProductCarousel from '@/components/ProductCarousel';
import ProductsDetails from '@/components/ProductsDetails';
import axios from 'axios';
import { IProduct, IProductDetails } from '@/types/store/product';

export default async function Product({params}: {params:{id:string}}) {

  const product = await getProductById(params.id)

  return (
    <Layout>
      <div className='flex flex-grow h-[80%] w-full mt-6'>
          {
            product !== undefined && (
              <>
                <div className='h-full w-[50%] pl-12'>
                  <ProductCarousel product={product} />
                </div>
                <div className='h-full w-[50%] pr-12'>
                  <ProductsDetails product={product} />
                </div>
              </>
            )
          }
      </div>
    </Layout>
  )
}

export async function generateStaticParams() {
    const posts = await axios.get('https://api-local.invernspirit.com/products')

    return posts.data.data.map((post: any) => ({
      id: post.productId,
    }))
}

export const getProductById = async (id:string):Promise<IProductDetails> => {
  return (await axios.get(`https://api-local.invernspirit.com/products/${id}`)).data.data
}