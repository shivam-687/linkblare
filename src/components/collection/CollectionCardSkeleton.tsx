import React from 'react'
import AppSkeleton from '../ui/AppSkeleton'

const CollectionCardSkeleton = () => {
    return (
        <div className='rounded-xl border border-base-content/30 p-3 overflow-hidden'>
            <AppSkeleton className='aspect-video rounded-xl' count={1} />

            <div className="content py-3">
                <AppSkeleton count={1.5} />
            </div>

        </div>
    )
}

export default CollectionCardSkeleton