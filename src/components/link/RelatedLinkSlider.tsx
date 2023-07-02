import React from 'react'
import { api } from '~/utils/api'
import LinkSlider from './LinkSlider'

export type RelatedLinkSliderProps = {
    id: number
}

const RelatedLinkSlider = ({
    id
}: RelatedLinkSliderProps) => {
    const {data} = api.link.relatedLinks.useQuery({targetLinkId: id})
  return (
    <LinkSlider links={data||[]} />
  )
}

export default RelatedLinkSlider