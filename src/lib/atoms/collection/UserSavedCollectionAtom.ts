import { atom } from "jotai";
import { CollectionOutput, SavedCollectionOutput } from "~/schema/Collection.schema";

export const UserSavedCollectionAtom = atom<SavedCollectionOutput[]>([]);