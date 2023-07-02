/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, List, Tooltip } from 'antd'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { type SavedCollectionOutput } from '~/schema/Collection.schema'
import { api } from '~/utils/api'
import Link from 'next/link'
import { useSavedCollections } from '~/lib/hooks/useSavedCollections'

const SavedCollectionListItem = ({ savedCollection }: { savedCollection: SavedCollectionOutput }) => {

    return <div className='rounded-md bg-gray-800 px-2 py-2'>
        <Tooltip title={savedCollection.collection.title}>
            <span className='capitalize line-clamp-1'>{savedCollection.collection.title}</span>
        </Tooltip>
    </div>
}

const SidebarSavedCollectionList = () => {

    const router = useRouter();
    const { collectionData, fetchNextPage, hasNextPage, isLoading } = useSavedCollections({})


    const load = () => {
        void fetchNextPage();
    }

    useEffect(() => {
        // console.log({router}, router.query.id && Number(router.query.id) === .id );
        
    }, [router])

    if (!collectionData || collectionData.length <= 0) {
        return <div className='flex items-center justify-center p-2'>No Saved Collections</div>
    }

    return (
        <div id='scrollableDiv' className='h-80'>
            <List
                bordered={false}
                size='small'
                dataSource={collectionData}
                // header={<span className='line-clamp-1 font-semibold'>Saved Collection</span>}
                footer={hasNextPage && <><div className="flex justify-center"><Button disabled={!hasNextPage || isLoading} loading={isLoading} onClick={load}>Load More</Button></div></>}
                renderItem={(item) => (

                    <Link href={`/collections/${item.collection.id}`} key={nanoid()}>
                        <List.Item  className={`cursor-pointer p-0 hover:bg-gray-950 transition-all ${(router.query.id && Number(router.query.id) === item.collection.id ) ? 'bg-gray-950 ' : ''}`} >
                            <span className='line-clamp-1'>{item.collection.title}</span>
                        </List.Item>
                    </Link>


                )}
            />
        </div>
    )
}

export default SidebarSavedCollectionList