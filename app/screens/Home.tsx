import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { TodoCard } from "../components/TodoCard";
import { TodoInput } from "../components/TodoInput";
import { useAuth } from "../context/AuthContext";
import BaseLayout from "../layouts/BaseLayout";
import { supabase } from "../lib/supabase";
import { ITodoItem } from "../types/interface";

type RootStackParamList = {
  Home: undefined;
  Place: { placeId: number };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [todo, setTodo] = useState("");
  const [render, setRender] = useState(false);
  const [items, setItems] = useState<ITodoItem[] | []>([]);
  const { session } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, [render]);

  async function fetchTodos() {
    try {
      if (session && session.user) {
        const { data, error } = await supabase
          .from("Todo")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        setItems(data as ITodoItem[] | []);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function insertData() {
    try {
      if (todo.length > 0) {
        // eslint-disable-next-line object-shorthand
        const { data, error } = await supabase.from("Todo").insert({ user_id: session?.user.id, todo: todo });
      }
      setTodo("");
      setRender(!render);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ScrollView>
      <BaseLayout>
        <TodoInput getPress={insertData} getValue={(e) => setTodo(e)} placeholder="add todo" value={todo} />
        <View style={styles.container} />
        {items?.map((el) => <TodoCard triggerRender={() => setRender(!render)} key={el.id} {...el} />)}
      </BaseLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  }
});
