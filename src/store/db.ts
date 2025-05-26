import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, TablesSchema } from "tinybase";
import { createCustomPersister } from "tinybase/persisters";

import { schema } from "./schema";

import { histories } from "@/mocks/histories";
import { loans } from "@/mocks/loans";
import { users } from "@/mocks/users";

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

  db.setTable("users", users);

  db.setTable("loans", loans);

  db.setTable("history", histories);
};
