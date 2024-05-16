import React from 'react'
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { ICollection } from '@/types/store/collection';
import axios from 'axios';

const Collections = async () => {
  const collections = await getCollections()

    return (
      <Layout>
        <section className='h-full w-full flex flex-col lg:flex-row items-center lg:justify-center gap-2 lg:relative'>
          <div className='lg:absolute lg:top-0 h-12 lg:h-36 w-full mt-12 mb-12 lg:mt-0 lg:mb-6 flex flex-col items-center justify-center'>
              <div className='lg:z-20'>
                <h2>Collections</h2>
              </div>
          </div>
          {
            collections.map((item, index) => (
              <div key={index} className='bg-[#201F1D] h-24 lg:h-full w-full lg:w-48 image-scale shadow-lg drop-shadow-lg shadow-[#201F1D] mt-2'>
                <Link href={`/shop/collections/${item.collectionId}`} className='h-full w-full relative flex items-center justify-center'>
                    <Image
                      src={item.collectionImage.imageUrl}
                      height={100}
                      width={100}
                      alt={item.collectionImage.imageAlt}
                      className='h-full w-full object-cover mix-blend-overlay grayscale opacity-75 brightness-100 hover:mix-blend-exclusion hover:opacity-50 hover:brightness-150' />
                    <div className='absolute'>
                      <h3>{item.collectionName}</h3>
                    </div>
                </Link>
              </div>
            ))
          }
        </section>
      </Layout>
      );
}

const getCollections = async ():Promise<ICollection[]> => {
  return (await axios.get('https://api-local.invernspirit.com/collections')).data.data
}

export default Collections