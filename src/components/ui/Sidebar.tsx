import React, { type ReactNode } from 'react'
import Logo from '../Logo'
import SidebarAuthMenu from './SidebarAuthMenu'

export type SidebarItemProps = {
    icon?: ReactNode,
    children?: any,
}

export type SidebarProps = {
    children?: any,
    footer?: ReactNode
}



const Sidebar = ({ children, footer }: SidebarProps) => {
    return (
        <div className='bg-base-300 w-60 h-full flex-col relative pb-20'>
            <div className='py-4 flex items-center justify-center flex-grow-0'>
                <Logo />
            </div>
            <div className='p-2 flex-grow'>
                {children}
            </div>

            <div className="absolute left-0 bottom-0 w-full ">
                {
                    footer ? footer : <SidebarAuthMenu />
                }
            </div>
        </div>
    )
}



export default Sidebar


const Item = ({
    children,
    icon
}: SidebarItemProps) => {
    return (
        <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-base-100 text-white"
        >
            {icon && <span className='text-base-content'>{icon}</span>}
            <span className="text-[15px] ml-4 text-gray-200 ">{children}</span>
        </div>
    )
}

Sidebar.Item = Item;