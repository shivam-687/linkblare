import { DeleteOutlined } from '@ant-design/icons'
import { Link } from '@prisma/client'
import { Button, Modal, message } from 'antd'
import React from 'react'
import { api } from '~/utils/api'

export type DeleteLinkButtonProps = {
    linkId: number,
    onDelete?: (collection: Link) => void,
    children?: React.DetailedReactHTMLElement<any, HTMLElement> | ((props: {
        loading: boolean,
        deleteLink: () => void
    }) => React.ReactNode)
}

const DeleteCollectioButton = ({
    linkId,
    children,
    onDelete
}: DeleteLinkButtonProps) => {

    const deleteMutation = api.link.delete.useMutation();

    const deleteLink = async () => {
        try {
            const res = await deleteMutation.mutateAsync({ id: linkId });
            if (res) onDelete?.(res);
            void message.success("Link deleted successfully!")
        } catch (error) {
            void message.error("Link delete unsuccessfull!");
            console.log(error);
        }
    }

    const confirmDeletion = () => {
        if (deleteMutation.isLoading) return;
        Modal.confirm({
            content: <div>Are you want to delete this <span>Collection</span>.</div>,
            onOk: deleteLink
        })
    }

    if (children && typeof children === 'function') {
        return <>
            {
                children({
                    loading: deleteMutation.isLoading,
                    deleteLink: confirmDeletion
                })
            }
        </>;
    }

    if (children && typeof children !== 'function') {
        return <>{
            React.cloneElement(children, {
                onClick: () => void confirmDeletion()
            })
        }</>
    }

    return (
        <Button danger icon={<DeleteOutlined />} loading={deleteMutation.isLoading} disabled={deleteMutation.isLoading}></Button>
    )
}

export default DeleteCollectioButton