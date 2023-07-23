import { InfoCircleOutlined, LinkOutlined, SaveOutlined, SaveTwoTone, ShareAltOutlined } from '@ant-design/icons'
import { Button, Modal, Tag, message, theme } from 'antd'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Box } from 'react-feather'
import { type CollectionOutput } from '~/schema/Collection.schema'
import dynamic from 'next/dynamic';
import { signIn, useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { isNewCollection, isUpdatedCollection, numFormat } from '~/utils/helpers'
import { HandleCollectionInfoModal } from './CollectionInfoModel'
import CollectionInfoModal from './CollectionInfoModel';

export type CollectionCardProps = {
  collection: CollectionOutput,
  link?: string,
  onUpdate?: () => void
}

const CollectionCard = ({
  collection,
  link,
  onUpdate
}: CollectionCardProps) => {
  const { token } = theme.useToken()
  const { data: Session } = useSession();
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const { data: collectionData, isLoading: isSaving, mutateAsync: save } = api.collection.save.useMutation();
  const collectionItemsCtx = api.useContext().collection.infinitSavedCollection;
  const savedCollectionContext = api.useContext().save.infinitSavedCollection;
  const modalRef = useRef<HandleCollectionInfoModal>(null)


  const showLoginInfoModal = () => {
    Modal.info({
      title: 'You need to login first',
      okText: 'Login',
      onOk: () => void signIn(),
      closable: true
    })
  }


  const toggleSave = async () => {
    if(!Session?.user){
      return showLoginInfoModal()
    }
    try {
      const res = await save({ collectionId: collection.id });
      if (res) {
        const s = Boolean(res.saves?.find(v => v.userId === Session?.user.id));
        setIsSaved(s);
        onUpdate?.();
        void message.info((s ? 'Saved' : 'Unsaved'))
      }
      void savedCollectionContext.invalidate();
    } catch (error) {

    }
  }



  useEffect(() => {
    setIsSaved(Boolean((Session?.user && collection.saves?.find(d => d.userId === Session.user?.id))));
  }, [])

  return (
    <div className='w-full group rounded-xl group  transition-all duration-300 hover:shadow-lg relative hover:shadow-black/40 overflow-hidden' style={{ borderColor: token.colorBorder, backgroundColor: token.colorBgContainer }}>
      <div className='aspect-video rounded-xl bg-cover bg-no-repeat relative -translate-y-1 group-hover:translate-y-0 bg-center overflow-hidden cursor-pointer shadow-md shadow-black/30 group-hover:shadow-none transition-all duration-300 ' style={{ backgroundImage: `url(${collection.image || ''})`, backgroundColor: token.colorBgContainer }} onClick={() => void modalRef.current?.show()}>
        <div className='w-full h-full grid place-content-center ' style={{}}><Box className='' /></div>
      </div>

      <div className="content px-3 py-4 relative pb-10">
        <div className=''>
          <Link href={`/collections/${collection.id}`} className='text-lg text-gray-300 line-clamp-2 leading-tight hover:text-gray-400 transition-all duration-300'>{collection.title}</Link>
        </div>

        <div className="absolute bottom-0 left-0 py-2 px-4 flex gap-4">
          <span className='inline-flex gap-1 items-center'>
            <LinkOutlined/>
            {numFormat(collection._count.links)}
          </span>

          <span className='inline-flex gap-1 items-center'>
            <SaveOutlined className='' style={{color: isSaved ? token.colorPrimary : undefined}}/>
            {numFormat(collection._count.saves)}
          </span>
        </div>
      </div>

      <div className="inline-flex gap-1 h-min flex-col items-center bg-neutral p-1 absolute top-0 right-0 rounded-xl translate-x-full group-hover:translate-x-0 transition-all duration-300" >
        <Button onClick={() => void toggleSave()} loading={isSaving} disabled={isSaving} type={isSaved ? 'primary' : 'default'} title='View the links in a modal' className="" icon={<SaveOutlined />}></Button>
        <Button title='View the links in a modal' className="" icon={<ShareAltOutlined />}></Button>
        <CollectionInfoModal ref={modalRef} collection={collection}><Button title='View the links in a modal' className="" icon={<InfoCircleOutlined />}></Button></CollectionInfoModal>
      </div>

      <div className="flex gap-2 absolute top-0 left-0 p-1">
        {
          isNewCollection(collection.createdAt) && <Tag color='yellow'>New</Tag>
        }
        {
          !isNewCollection(collection.createdAt) && isUpdatedCollection(collection.updatedAt) && <Tag color='yellow'>Updated</Tag>
        }
      </div>
      {/* </div> */}
    </div>
  )
}

export default CollectionCard