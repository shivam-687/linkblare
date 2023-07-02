import { Link } from '@prisma/client'
import React, { useRef } from 'react'
import LinkCard from './LinkCard';
import { nanoid } from 'nanoid';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export type LinkSliderProps = {
    links: Link[],
}

const LinkSlider = ({
    links = []
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
                links.map(link => {
                    return <SwiperSlide key={nanoid()} className='max-w-xs'>
                        <LinkCard link={link} />
                    </SwiperSlide>
                })
            }
            
        </Swiper>
    )
}

export default LinkSlider