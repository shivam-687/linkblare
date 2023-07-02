import { atom } from "jotai";
import { CollectionOutput } from "~/schema/Collection.schema";

export const CollectionAtom = atom<CollectionOutput[]>([]);
