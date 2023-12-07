import { Card, CheckBox, List, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { ITodoItem } from "../types/interface";

interface ITodoCard extends ITodoItem {
  triggerRender: () => void;
}

export const TodoCard = ({ todo, is_completed, id, user_id, created_at, triggerRender }: ITodoCard) => {
  const { session } = useAuth();

  async function updateData(isChecked: boolean) {
    try {
      // eslint-disable-next-line object-shorthand
      const { data, error } = await supabase
        .from("Todo")
        .update({ is_completed: isChecked })
        .eq("id", id)
        .eq("user_id", session?.user.id)
        .single();
      console.log("🚀 ~ file: TodoCard.tsx:20 ~ updateData ~ error:", error);
      console.log("🚀 ~ file: TodoCard.tsx:20 ~ updateData ~ data:", data);
      triggerRender();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={!is_completed ? styles.text : styles.textCompleted}>{todo}</Text>
        <CheckBox checked={is_completed} onChange={(nextChecked) => updateData(nextChecked)} />
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.title}>{new Date(created_at).toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 2,
    marginTop: 15,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    overflow: "hidden",
    marginBottom: 10
  },
  cardFooter: {
    padding: 5,
    paddingLeft: 16,
    paddingBottom: 5
  },
  text: {
    maxWidth: 300
  },
  textCompleted: {
    maxWidth: 300,
    textDecorationLine: "line-through"
  },
  title: {
    fontSize: 12,
    borderTopColor: "#e3e3e3",
    borderTopWidth: 0.5,
    paddingTop: 10
  },
  cardContent: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5
  }
});
