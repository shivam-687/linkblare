import { api } from "~/utils/api"

export type UseSavedCollectionsOptions = {
    take?: number
}

export const useSavedCollections = ({
    take=50
}: UseSavedCollectionsOptions) => {

    const res = api.save.infinitSavedCollection.useInfiniteQuery({ take }, {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
    });

    return {
        collectionData:  res.data?.pages.map(d => d!.items).flat() || [],
        ...res
    }

}