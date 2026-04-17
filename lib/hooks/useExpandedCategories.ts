"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { Category } from "@/lib/types";

type ExpandAction =
  | { type: "toggle"; id: string }
  | { type: "sync"; auto: Set<string> };

interface ExpandState {
  auto: Set<string>;
  userToggled: Set<string>;
}

function expandReducer(state: ExpandState, action: ExpandAction): ExpandState {
  if (action.type === "toggle") {
    const next = new Set(state.userToggled);
    if (next.has(action.id)) next.delete(action.id);
    else next.add(action.id);
    return { ...state, userToggled: next };
  }
  return { auto: action.auto, userToggled: new Set<string>() };
}

export function useExpandedCategories(
  filteredCategories: Category[],
  isFiltered: boolean,
  activeCategoryId: string | undefined
) {
  const autoExpandedIds = useMemo(() => {
    if (isFiltered) return new Set(filteredCategories.map((c) => c.id));
    if (activeCategoryId) return new Set([activeCategoryId]);
    return new Set<string>();
  }, [isFiltered, filteredCategories, activeCategoryId]);

  const [expandState, dispatch] = useReducer(expandReducer, {
    auto: autoExpandedIds,
    userToggled: new Set<string>(),
  });

  useEffect(() => {
    dispatch({ type: "sync", auto: autoExpandedIds });
  }, [autoExpandedIds]);

  const expandedIds = useMemo(() => {
    const merged = new Set(expandState.auto);
    expandState.userToggled.forEach((id) => {
      if (merged.has(id)) merged.delete(id);
      else merged.add(id);
    });
    return merged;
  }, [expandState]);

  const toggleCategory = useCallback(
    (id: string) => dispatch({ type: "toggle", id }),
    []
  );

  return { expandedIds, toggleCategory };
}
