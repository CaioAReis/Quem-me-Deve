import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, TablesSchema } from "tinybase";
import { createCustomPersister } from "tinybase/persisters";

import { schema } from "./schema";

import {
  history1,
  history10,
  history11,
  history12,
  history13,
  history2,
  history3,
  history4,
  history5,
  history6,
  history7,
  history8,
  history9,
} from "@/mocks/hitory";
import { loan1, loan2, loan3, loan4, loan5 } from "@/mocks/loans";
import { user1, user2, user3, user4, user5 } from "@/mocks/users";

export const db = createStore().setTablesSchema(schema as TablesSchema);

const STORAGE_KEY = "tinybase_db";

const get = async () => {
  const value = await AsyncStorage.getItem(STORAGE_KEY);
  return value ? JSON.parse(value) : undefined;
};

const set = async (content: any) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};

export const persister = createCustomPersister(
  db,
  get,
  set,
  () => {},
  () => {}
);

export const loadStore = async () => {
  await persister.load();
  persister.startAutoSave();

  //  TODO: Set the data mock here
  db.setTable("users", {
    user1,
    user2,
    user3,
    user4,
    user5,
  });

  db.setTable("loans", {
    loan1,
    loan2,
    loan3,
    loan4,
    loan5,
  });

  db.setTable("history", {
    history1,
    history2,
    history3,
    history4,
    history5,
    history6,
    history7,
    history8,
    history9,
    history10,
    history11,
    history12,
    history13,
  });

  console.error(db.getTables());
};
