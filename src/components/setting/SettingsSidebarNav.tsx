import { nanoid } from 'nanoid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { cn } from '~/utils'

const SettingsSidebarNav = ({
    items= []
}: {
    items: {
        href: string,
        lable: string
    }[]
}) => {
    const router = useRouter();

    const checkIfActive = (link: string) => {
        return router.asPath === link
    }
  return (
    <nav>
        {
            items.map(itm => {
                return <Link 
                key={nanoid()} 
                href={itm.href} 
                className={cn([
                    'rounded hover:bg-gray-900 font-medium text-base transition-all capitalize hover:text-white p-3 w-full flex items-center justify-center text-center',
                    {'bg-gray-900 text-white': checkIfActive(itm.href)}
                ])}>
                    {itm.lable}
                </Link>
            })
        }
    </nav>
  )
}

export default SettingsSidebarNav