import React from 'react'
import ImageUploadButton from '~/components/ImageUploadButton'
import { useCollectionData } from '~/lib/hooks/useCollectionData'

const AdminPage = () => {
  const {data, isLoading, refetch} = useCollectionData()
  return (
    <>
    <h1>Admin Page</h1>
    <ImageUploadButton/>
    </>
  )
}

export default AdminPage