import React, { useEffect, useState } from 'react';
import { Dropdown, Input, MenuProps, Tag } from 'antd';
import { api } from '~/utils/api';
import Link from 'next/link';
import { nanoid } from 'nanoid';

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;



const SearchInput: React.FC<{ placeholder?: string; style?: React.CSSProperties }> = (props) => {

    const [data, setData] = useState<MenuProps['items']>([]);
    const [value, setValue] = useState<string>('');
    const ctx = api.useContext()

    const handleSearch = async (newValue: string) => {
        const data = await ctx.search.search.fetch({ search: newValue });
        setData([
            {
                key: 'search_collections',
                label: 'Collections',
                type: 'group',
                children: data?.collections.map(d => ({ key: d.id, label: <Link href={`/collections/${d.id}`}>{d.title}</Link>, }))
            },
            {
                key: 'search_links',
                label: 'Links',
                type: 'group',
                children: data?.links.map(d => ({ key: d.id, label: <Link href={`/link/${d.id}`}>{d.title}</Link>, }))
            },
            {
                key: 'search_tags',
                label: 'Tags',
                type: 'group',
                children: [
                    {
                        key: 'tags_list',
                        label: <div className='flex'>
                            {
                                data?.tags.map(d => {
                                    return <Link  key={nanoid()} href={`/explore?tag=${d.id}`}><Tag className={`hover:ring-1`}>{d.name}</Tag></Link>
                                })
                            }
                        </div>
                    }
                ]
            },

        ])
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        void handleSearch(value)
    }, [value])


    return (
        <div className='max-w-md mx-auto'>
            <Dropdown
                trigger={['click']}
                menu={{
                    items: data
                }}
                className='max-h-96 overflow-auto'
            //  getPopupContainer={(ele) => {
            //     ele.style.maxHeight = '350px';
            //     ele.style.overflow = 'auto auto'
            //     return ele;
            //  }}
            >
                <Input
                    value={value}
                    onChange={(e) => handleChange(e.currentTarget.value)}
                    className='w-full'
                    placeholder='Search'

                />
            </Dropdown>
        </div>
    );
};


export default SearchInput;