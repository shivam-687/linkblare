import { Button, Dropdown, type MenuProps } from 'antd';
import Link from 'next/link';
import React, { type PropsWithChildren } from 'react'

const DropdownMenu = ({ children, items }: PropsWithChildren<{items: MenuProps['items']}>) => {
    return (
        <Dropdown menu={{ items }} trigger={['click']} placement="topRight" >
            {children}
        </Dropdown>
    )
}

const CollectionTableSortAction = () => {
    const items: MenuProps['items'] = [
        {
            label: <Link href={{query: {sortBy: 'createdAt', sortOrder: 'desc'}}}>Recent First</Link>,
            key: 'rf',
        },
        {
            label: <Link href={{query: {sortBy: 'createdAt', sortOrder: 'asc'}}}>Old First</Link>,
            key: 'of',
        },
        // {
        //     label: <Link href={{query: {sortBy: 'saves', sortOrder: 'desc'}}}>Most Saved</Link>,
        //     key: 'ms',
        // },
        // {
        //     label: <Link href={{query: {sortBy: 'links', sortOrder: 'desc'}}}>By Links</Link>,
        //     key: 'bl',
        // },
    ];
    return <DropdownMenu items={items}>
        <Button>Sort By</Button>
    </DropdownMenu>
}

const CollectionTableAtion = () => {
  return (
    <div className='flex gap-2'>
        <CollectionTableSortAction/>
    </div>
  )
}

export default CollectionTableAtion