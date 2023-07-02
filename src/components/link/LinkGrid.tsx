import { Link } from '@prisma/client'
import React from 'react'
import LinkCard from './LinkCard'
import { nanoid } from 'nanoid'
import AppSkeleton from '../ui/AppSkeleton'
import { Button, Skeleton, theme } from 'antd'

export type LinkGridProps = {
    links?: Link[],
    loading?: boolean,
    hasMore?: boolean,
    fetchNextPage?: () => void
}

const LinkCardSkeleton = () => {
    const { token } = theme.useToken()
    return (
        <div className='aspect-square rounded-lg grid grid-rows-2 w-full'>
            <div className='flex items-center justify-center' style={{ backgroundColor: token.colorBgContainer }}>
                <Skeleton.Image active />
            </div>
            <div className='p-2 spacy-2'>
                <Skeleton.Avatar size={'small'} />
                <Skeleton paragraph={{ rows: 1 }} active />
            </div>
        </div>
    )
}

const LinkGrid = ({
    links = [],
    loading = false,
    hasMore,
    fetchNextPage
}: LinkGridProps) => {
    if (loading) {
        return <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-3'>
            {
                Array(5).fill(null).map(a => {
                    return <LinkCardSkeleton key={nanoid()} />
                })
            }
        </div>
    }
    return (
        <div >
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-3">
                {
                    links?.map(link => {
                        return <LinkCard key={nanoid()} link={link} />
                    })
                }
            </div>
            {
                hasMore 
                && 
                <div className="flex items-center justify-center my-4" >
                    <Button loading={loading} disabled={hasMore} onClick={() => void fetchNextPage?.()}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default LinkGrid