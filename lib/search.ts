import Fuse, { IFuseOptions } from "fuse.js";
import { questItems, QuestItem } from "@/data/quest-items";
import allItems from "@/data/all-items.json";

// Fuse instance for autocomplete suggestions (all 16k+ items)
const autocompleteOptions: IFuseOptions<string> = {
  threshold: 0.4,
  minMatchCharLength: 2,
  includeScore: true,
};

const autocompleteFuse = new Fuse(allItems, autocompleteOptions);

// Fuse instance for quest item lookup
const questItemOptions: IFuseOptions<QuestItem> = {
  keys: ["name"],
  threshold: 0.3,
  includeScore: true,
};

const questItemFuse = new Fuse(questItems, questItemOptions);

export interface SearchResult {
  item: QuestItem | null;
  isQuestItem: boolean;
  exactMatch: boolean;
}

/**
 * Get autocomplete suggestions for item names
 */
export function getAutocompleteSuggestions(query: string, limit = 8): string[] {
  if (!query || query.length < 2) return [];

  const results = autocompleteFuse.search(query, { limit });
  return results.map((r) => r.item);
}

/**
 * Search for a quest item by name
 */
export function searchQuestItem(itemName: string): SearchResult {
  if (!itemName) {
    return { item: null, isQuestItem: false, exactMatch: false };
  }

  // First try exact match (case-insensitive)
  const exactMatch = questItems.find(
    (item) => item.name.toLowerCase() === itemName.toLowerCase()
  );

  if (exactMatch) {
    return { item: exactMatch, isQuestItem: true, exactMatch: true };
  }

  // Try fuzzy search
  const results = questItemFuse.search(itemName, { limit: 1 });

  if (results.length > 0 && results[0].score !== undefined && results[0].score < 0.3) {
    return { item: results[0].item, isQuestItem: true, exactMatch: false };
  }

  // Not a quest item
  return { item: null, isQuestItem: false, exactMatch: false };
}

/**
 * Check if an item exists in the game
 */
export function itemExistsInGame(itemName: string): boolean {
  if (!itemName) return false;

  const lowerName = itemName.toLowerCase();
  return allItems.some((item) => item.toLowerCase() === lowerName);
}
