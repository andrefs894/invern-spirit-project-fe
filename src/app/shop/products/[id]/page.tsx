import React from "react";
import Layout from "@/components/global/Layout";
import ProductDetails from "@/components/product/ProductDetails";
import { getProductById, getProducts } from "@/utils/getFromDb";
import dynamic from "next/dynamic";

const ProductCarousel2 = dynamic(
  () => import("@/components/carousel/ProductCarousel2"),
  { ssr: false },
);

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  return (
    <Layout>
      <section className="h-full w-full flex flex-col lg:flex-row items-center">
        {product === undefined ? (
          <p>{`This product is not available at the moment.`}</p>
        ) : (
          <>
            <div className="h-full w-full lg:w-[50%] px-12 py-2 lg:overflow-hidden">
              <ProductCarousel2 product={product} />
            </div>
            <div className="h-full w-full lg:w-[50%] px-12 py-2">
              <ProductDetails product={product} />
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = await getProducts();

  return posts.map((post: any) => ({
    id: post.id,
  }));
}
