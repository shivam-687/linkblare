/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EditOutlined, FileImageOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Link as SiteLink } from '@prisma/client'
import { Avatar, Button, theme } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { ExternalLink, Youtube } from 'react-feather'
import YouTube from 'react-youtube';
import { checkVideoUrl, extractYouTubeVideoId, numFormat } from '~/utils/helpers'
import MutateLinkModal from './MutateLinkModal'

export type LinkCardProps = {
  link?: SiteLink,
  loading?: boolean
}

const LinkCardImage = (props: { image?: string }) => {

  if (!props.image) {
    return (
      <div className='w-full h-full bg-zinc-900 flex items-center justify-center'>
        <FileImageOutlined className='text-4xl' />
      </div>
    )
  }

  return (
    <div className='w-full h-full bg-zinc-900 bg-center bg-cover ' style={{ backgroundImage: `url(${props.image})` }}>

    </div>
  )

}

const Favicon = (props: { favicon?: string }) => {

  return (
    <Avatar size={'small'} src={props.favicon} icon={<FileImageOutlined />}></Avatar>
  )
}

const Video = (props: { url: string }) => {
  const videoType = checkVideoUrl(props.url);

  if (videoType && videoType.type === 'youtube') {
    const id = extractYouTubeVideoId(props.url)
    const u = new URL(`https://www.youtube.com/embed/${id || ''}`);
    u.searchParams.set('mute', '1')
    u.searchParams.set('autoplay', '1')
    return (
      <iframe src={u.toString()}
        className='border-0 w-full'
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    )
  }
  return (
    <>
      <LinkCardImage />
    </>
  )
}

const LinkCard = ({
  link,
  loading
}: LinkCardProps) => {
  const { token } = theme.useToken();
  const {data: Session} = useSession()
  return (
    <div className='max-w-xs w-full rounded-md overflow-hidden grid group grid-rows-2 aspect-square relative' style={{ backgroundColor: token.colorBgContainer }}>
      <div className='aspect-video overflow-hidden relative'>
        {
          (link?.type === 'PAGE'||link?.type === 'ARTICLE') && <LinkCardImage image={(link?.image && link?.image !== null) ? link?.image : undefined} />
        }

        {
          link?.type === 'VIDEO' && <Video url={link.url} />
        }
        
      </div>
      <div className='p-3 pb-8 relative'>
        <div className="flex flex-col gap-1">
          <div className="flex-grow-0"><Favicon favicon={link?.favicon || undefined} /></div>
          <div className="flex-grow">
            <Link href={`/link/${link?.id || '#'}`} title={link?.title} className='text-lg capitalize line-clamp-3 leading-tight' style={{ color: token.colorText }}>{link?.title}</Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-2 flex gap-2 justify-between">

          {
            link && <Link href={`/go/${link.id}`} target='_blank'>
              <Button type="ghost" icon={<span className='anticon '><ExternalLink className='w-4 h-4' /></span>}>{numFormat(link?.visits || 0)}</Button>
            </Link>
          }
          <Button type="ghost" icon={<ShareAltOutlined />}></Button>

        </div>
      </div>


      {/* OPTION PAN */}
      {
        (Session?.user?.role === 'ADMIN' ) 
        && 
        <div className='absolute top-2 right-2 flex flex-col gap-1 translate-x-28 group-hover:translate-x-0 transition-all duration-300'>
          <MutateLinkModal data={link}><Button icon={<EditOutlined/>} /></MutateLinkModal>
        </div>
      }

    </div>
  )
}

export default LinkCard