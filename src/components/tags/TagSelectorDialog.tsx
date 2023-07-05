import { SettingOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { PropsWithChildren, ReactElement, useState } from 'react'
import TagSelector from './TagSelector'

const TagSelectorDialog = ({
    children
}: {
    children?: ReactElement
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const show = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const toggle = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <div>
            {
                children ?
                    React.cloneElement(children, {
                        onClick: () => show()
                    })
                    : <Button type="primary" onClick={show} icon={<SettingOutlined />} />

            }
            <Modal title={'Edit Preferences'} open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
               <TagSelector/>
            </Modal>
        </div>
    )
}

export default TagSelectorDialog