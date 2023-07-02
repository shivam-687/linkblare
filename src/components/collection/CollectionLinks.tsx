import React from 'react'
import LinkTable from '../link/LinkTable'
import { api } from '~/utils/api'

export type CollectionLinksProps = {
    collectionId: number
}

const CollectionLinks = ({
    collectionId
}: CollectionLinksProps) => {
    const {data: LinkData, isLoading, refetch} = api.link.list.useQuery({collectionId});

  return (
    <div>
        <LinkTable data={LinkData?.data || []} loading={isLoading}/>
    </div>
  )
}

export default CollectionLinks