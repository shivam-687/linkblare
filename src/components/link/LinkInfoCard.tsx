import { Link as LinkData } from '@prisma/client'
import { Button, theme } from 'antd'
import Link from 'next/link'
import React from 'react'
import { ExternalLink } from 'react-feather'
import { numFormat } from '~/utils/helpers'

export type LinkInfoCardProps = {
    link: LinkData
}

const LinkInfoCard = ({
    link
}: LinkInfoCardProps) => {
    const { token } = theme.useToken()
    return (
        <div className='max-w-3xl aspect-auto md:aspect-video w-full rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-lg shadow-black/30' style={{ backgroundColor: token.colorBgContainer }}>
            <div className='aspect-video md:aspect-auto bg-center bg-cover' style={{ backgroundImage: `url(${link.image || ''})` }}></div>
            <div className='p-2 md:p-4 aspect-video md:aspect-auto'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <Link className='space-x-1' href={`/go/${link.id}`}>
                            <Button icon={<ExternalLink className='anticon w-4 h-4' />} >{numFormat(link.visits)}</Button>
                        </Link>
                    </div>
                </div>

                <div className='space-y-2'>
                    <p className='text-lg md:text-xl font-bold line-clamp-3'>{link.title}</p>
                    <p>{link.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default LinkInfoCard