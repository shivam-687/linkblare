import React from 'react'
import AppSkeleton from '../ui/AppSkeleton'

const CollectionCardSkeleton = () => {
    return (
        <div className='rounded-xl border border-base-content/30 p-3 overflow-hidden'>
            
            <AppSkeleton className='aspect-video w-full rounded-xl block' count={1} />

            <div className="content py-3">
                <AppSkeleton count={1.5} />
            </div>

            {/* <div className="aspect-video bg-slate-700 rounded-md"></div>
            <div className="content py-3">
                <div className="bg-slate-700 h-8 rounded-md"></div>
            </div> */}

        </div>
    )
}

export default CollectionCardSkeleton