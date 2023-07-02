import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { theme } from 'antd';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { useState } from 'react'
import SuperJSON from 'superjson';
import LinkInfoCard from '~/components/link/LinkInfoCard';
import RelatedLinkSlider from '~/components/link/RelatedLinkSlider';
import { CollectionSortType } from '~/schema/Collection.schema';
import { appRouter } from '~/server/api/root';
import { createInnerTRPCContext } from '~/server/api/trpc';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/utils/api';


export async function getServerSideProps(
    context: GetServerSidePropsContext<{id: string}>
  ){
    const helpers = createProxySSGHelpers({
      ctx: createInnerTRPCContext({session: await getServerAuthSession({...context})}),
      router: appRouter,
      transformer: SuperJSON,
    });
  
    const id = context.params?.id;
    if(!id || Number.isNaN(parseInt(id))) return {
      notFound: true
    };
    const res = await helpers.link.get.fetch({id: Number(id)});
    if(!res){
      return {
        notFound: true
      };
    }

    return {
      props: {
        trpcState: helpers.dehydrate(),
        id,
      }
    }
  }

const LinkInfoPage = ( props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  const {data, isLoading} = api.link.get.useQuery({id: Number(props.id)})
  const {token} = theme.useToken()

  return (
    <div className='py-10'>
      <div className="flex justify-center">
        {
          data && <LinkInfoCard link={{...data}}/>
        }
      </div>

      <div className=''>
        <div className=''>
          <h2>Related Links</h2>
        </div>
        <RelatedLinkSlider id={Number(props.id)} />
      </div>
    </div>
  )
}

export default LinkInfoPage