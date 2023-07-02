import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import AdminLayout from './AdminLayout';
import AppLayout from './AppLayout';

const LayoutSwitcher = ({children}: PropsWithChildren) => {
  const router = useRouter();


  if(router.asPath.startsWith('/admin')){
    return <AdminLayout>{children}</AdminLayout>
  }
  
  return (
    <AppLayout>{children}</AppLayout>
  )
}

export default LayoutSwitcher