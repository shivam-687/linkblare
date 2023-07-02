
import { Button, Result } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import React, { useContext, useEffect } from 'react'
import CollectionGrid from '~/components/collection/CollectionGrid'
import { useSavedCollections } from '~/lib/hooks/useSavedCollections'
import { type CollectionOutput } from '~/schema/Collection.schema'
import { api } from '~/utils/api'



const SavedCollectionsPage = () => {
  const {collectionData, refetch} = useSavedCollections({})
  const {data: Session} = useSession()

  if(!Session?.user){
    return (
      <Result title="You Need to login" extra={ <Button type='primary' onClick={() => void signIn()}>Login</Button>}/>
    )
  }

  return (
    <div>
        <CollectionGrid onAnyCardUpdate={() => void refetch()} collections={collectionData.map(cs => cs.collection as CollectionOutput)}></CollectionGrid>
    </div>
  )
}

export default SavedCollectionsPage