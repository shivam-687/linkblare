/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';
import CollectionInfo from './CollectionInfo';
import { type CollectionOutput } from '~/schema/Collection.schema';

export type CollectionInfoProps = {
  children?: any,
  collection: CollectionOutput,
  loading?: boolean
}

export type HandleCollectionInfoModal = {
  show: () => void,
  ok: () => void,
  cancle: () => void,
  toggle: () => void
}

const CollectionInfoModal = forwardRef<HandleCollectionInfoModal, CollectionInfoProps>(({
  children,
  collection,
  loading
}, ref) => {

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

  useImperativeHandle(ref,
    () => ({
      show,
      ok: handleOk,
      cancle: handleCancel,
      toggle
    }),
    [],
  )
  return (
    <>
      {
        children ?
          React.cloneElement(children, {
            onClick: () => show()
          })
          : <Button type="primary" onClick={show} icon={<InfoCircleOutlined />} />

      }
      <Modal title={collection?.title} open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <CollectionInfo collection={collection === null ? undefined : collection} loading={loading} />
      </Modal>
    </>
  )
})

CollectionInfoModal.displayName = 'CollectionInfoModal';

export default CollectionInfoModal