import { api } from "~/utils/api"
import { usePagination } from "./usePagination"
import useSort from "./useSort";
import { useAtom } from "jotai";
import { CollectionAtom } from "../atoms/collection/CollectionAtom";

export const useCollectionData = () => {
    const {pagination} = usePagination();
    const {sort} = useSort();
    const [collectionDataAtom, setCollectionData] = useAtom(CollectionAtom);
    const res = api.collection.list.useQuery({pagination, sort}, {onSettled(data, error) {
        if(data) setCollectionData(data.data);
    },})

    return {
        ...res
    }
}