import { Link } from '@prisma/client'
import React, { useRef } from 'react'
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { CollectionOutput } from '~/schema/Collection.schema';
import CollectionCard from './CollectionCard';

export type LinkSliderProps = {
    collections: CollectionOutput[],
}

const CollectionSlider = ({
    collections = []
}: LinkSliderProps) => {
   
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={20}
            slidesPerView='auto'
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {
                collections.map(collection => {
                    return <SwiperSlide key={nanoid()} className='max-w-xs'>
                        <CollectionCard collection={collection} />
                    </SwiperSlide>
                })
            }
            
        </Swiper>
    
    )
}

export default CollectionSlider