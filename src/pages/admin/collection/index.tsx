import React from 'react'
import CollectionTable from '~/components/admin/collection/CollectionTable'
import CollectionTableAtion from '~/components/admin/collection/CollectionTableAtion'
import MutateCollectionModal from '~/components/admin/collection/MutateCollectionModal'
import { useCollectionData } from '~/lib/hooks/useCollectionData'

const CollectionPage = () => {
  const { data, isLoading, refetch } = useCollectionData()
  return (
    <>
      <div className="my-5 flex justify-between gap-2">
        <div>
          <h3 className='text-lg'>Collections</h3>
        </div>
        <div className='space-x-2 flex items-center'>
        <CollectionTableAtion />
        <MutateCollectionModal onMutate={() => void refetch()} />
        </div>
      </div>
      <CollectionTable collectionData={data} onUpdate={() => void refetch()} />
    </>
  )
}

export default CollectionPage