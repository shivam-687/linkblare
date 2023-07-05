import React from 'react'
import { type CollectionOutput } from '~/schema/Collection.schema'
import CollectionCardSkeleton from './CollectionCardSkeleton'
import { nanoid } from 'nanoid'
import CollectionCard from './CollectionCard'
import { SpringGrid, CSSGrid } from 'react-stonecutter';

export type CollectionGridProps = {
    loading?: boolean,
    collections: CollectionOutput[],
    onAnyCardUpdate?: () => void
}

const CollectionGrid = ({
    loading,
    collections = [],
    onAnyCardUpdate
}: CollectionGridProps) => {

    if (loading) {
        return <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {
                Array(5).fill(null).map(() => {
                    return <CollectionCardSkeleton key={nanoid()} />
                })
            }
        </div>
    }

    if (!loading && collections.length <= 0) {
        return <div><h1>No Collection Found</h1></div>
    }
    return (
        <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3'>
            {
                collections.map(coll => {
                    return <CollectionCard key={nanoid()} collection={coll} onUpdate={onAnyCardUpdate}/>
                })
            }
        </div>

       
    )
}

export default CollectionGrid