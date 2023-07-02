import React from 'react'
import Sidebar from '../ui/Sidebar'
import { Folder } from 'react-feather'
import { nanoid } from 'nanoid'
import Link from 'next/link'

const adminMenu = [
    {
        lable: 'Collection',
        href: '#',
        icon: <Folder/>
    }
]


const AdminSidebar = () => {
  return (
    <Sidebar>
        {
            adminMenu.map(item => {
                return <Link href={item.href} key={nanoid()}><Sidebar.Item icon={item.icon} >{item.lable}</Sidebar.Item></Link>
            })
        }
    </Sidebar>
  )
}

export default AdminSidebar