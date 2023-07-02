/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Card, Input, Tag, notification } from 'antd'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { UserTagData } from '~/schema/Tag.schema'
import { cn } from '~/utils'
import { api } from '~/utils/api'

export const UserTag = ({
    tag,
    actionable = false,
    onAction
}: {
    tag: UserTagData,
    actionable?: boolean,
    onAction?: (tag: UserTagData) => void
}) => {
    const tagAction = api.tag.action.useMutation();
    const [notify] = notification.useNotification();
    const { data: Session } = useSession();
    const tagCtx = api.useContext().tag;

    const toggle = async () => {
        try {
            const toggleAction = await tagAction.mutateAsync({ tagId: tag.id, action: 'TOGGLE' });
            toggleAction && onAction?.(toggleAction);
            void tagCtx.listAll.invalidate()
        } catch (error: any) {
            notify.error({ message: error.message })
        }
    }

    const handleClick = () => {
        if (!actionable) return;
        void toggle();
    }

    const isSelected = () => {
        return Session && tag.users.length > 0 ? Boolean(tag.users.find(us => us.id === Session.user.id)) : false
    }

    return (
        <Tag
            className={cn([
                { 'cursor-pointer': actionable }
            ])}
            color={isSelected() ? 'processing' : 'default'}
            onClick={handleClick}
        >
            {tag.name}
        </Tag>
    )
}

const TagSelector = () => {
    const [search, setSearch] = useState('')
    const { data, isLoading } = api.tag.listAll.useInfiniteQuery({ take: 50, search }, {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
    })

    const handleChange = (value: string) =>{
        setSearch(value);
    }

    return (
        <Card
            title='Select Tags'
        >
            <div>
                <Input
                    value={search}
                    onChange={(e) => handleChange(e.currentTarget.value)}
                    className='w-full'
                    placeholder='Search'
                />
            </div>

            <div className='overflow-y-auto overflow-x-hidden max-h-[500px] py-5'>
                <div className="flex gap-1 items-center flex-wrap ">
                    {
                        data?.pages.map(it => it?.items).flat().map(value => {
                            return <UserTag key={nanoid()} tag={value!} actionable />
                        })
                    }
                </div>
            </div>

        </Card>
    )
}

export default TagSelector