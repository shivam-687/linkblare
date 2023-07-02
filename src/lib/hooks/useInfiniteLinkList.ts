import { api } from "~/utils/api"

export type UseInfiniteLinkListOptions = {
    collectionId: number,
    take?: number
}

export const useInfiniteLinkList = ({
    take = 50,
    collectionId,
}: UseInfiniteLinkListOptions) => {

    const res = api.link.infinitList.useInfiniteQuery({ take, collectionId }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    return {
        linkData: res.data?.pages.map(d => d.items).flat() || [],
        ...res
    }

}