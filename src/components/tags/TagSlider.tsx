
import { type Tag } from '@prisma/client';
import { Spin, Tag as TagComp } from 'antd';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import { type UserTagData } from '~/schema/Tag.schema';
import { api } from '~/utils/api'

export type TagSliderProps = {
    onSelect?: (tagIds: number[]) => void
}

const TagSlider = ({
    onSelect
}: TagSliderProps) => {
    const { data, status } = api.tag.interested.useQuery({});
    const [selectedTags, setSelectedTags] = useState<number[]>([])



    const toggleSelect = (tag: UserTagData) => {

        
        if (selectedTags.length <= 0) {
            setSelectedTags([tag.id]);
            onSelect?.([tag.id])
            return;
        }

        if (selectedTags.find(t => t === tag.id)) {
            const filterdTags = selectedTags.filter(t => t !== tag.id);
            setSelectedTags(filterdTags)
            onSelect?.(filterdTags);
            return
        }

        const newTags = [...selectedTags, tag.id]
        setSelectedTags(newTags)
        onSelect?.(newTags);

    }

    const selected = (id: number) => {
        return selectedTags.find(t => t === id)
    }

    if (status === 'loading') {
        return <div className='w-full p-2'>
            <Spin />
        </div>
    }
    

    return (
        <div className='w-full overflow-x-auto p-2 flex items-center gap-2'>
            {
                data?.items.map(d => {
                    return <span className='cursor-pointer' key={nanoid()} onClick={() => toggleSelect(d)}>
                        <TagComp color={selected(d.id) ? 'processing' : 'default'}  key={nanoid()} >{d.name}</TagComp>
                    </span>
                })
            }
        </div>
    )
}

export default TagSlider