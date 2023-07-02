import React from 'react'
import { useCollectionData } from '~/lib/hooks/useCollectionData'

const AdminPage = () => {
  const {data, isLoading, refetch} = useCollectionData()
  return (
    <>
    <h1>Admin Page</h1>
    </>
  )
}

export default AdminPage