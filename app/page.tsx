"use client";

import { useState, useCallback } from "react";
import { SearchBox } from "@/components/SearchBox";
import { ResultCard } from "@/components/ResultCard";
import { searchQuestItem, itemExistsInGame } from "@/lib/search";
import { QuestItem } from "@/data/quest-items";

export default function Home() {
  const [searchedName, setSearchedName] = useState("");
  const [result, setResult] = useState<{
    item: QuestItem | null;
    isQuestItem: boolean;
    exactMatch: boolean;
  } | null>(null);
  const [existsInGame, setExistsInGame] = useState(false);

  const handleSearch = useCallback((query: string) => {
    const trimmedQuery = query.trim();
    setSearchedName(trimmedQuery);

    if (!trimmedQuery) {
      setResult(null);
      setExistsInGame(false);
      return;
    }

    const searchResult = searchQuestItem(trimmedQuery);
    setResult(searchResult);
    setExistsInGame(itemExistsInGame(trimmedQuery) || searchResult.isQuestItem);
  }, []);

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-runescape text-osrs-gold mb-2">
          Should I Keep It?
        </h1>
        <p className="text-gray-400 font-runescape text-lg">
          OSRS Quest Item Checker
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <SearchBox onSearch={handleSearch} />
        <p className="text-center text-gray-500 text-sm mt-2">
          Start typing to search for any item
        </p>
      </div>

      {/* Results */}
      {result && (
        <ResultCard
          item={result.item}
          isQuestItem={result.isQuestItem}
          searchedName={searchedName}
          itemExistsInGame={existsInGame}
        />
      )}

      {/* Info Section */}
      {!result && (
        <div className="max-w-xl mx-auto mt-12 text-center">
          <div className="p-6 bg-osrs-brown-dark/50 border border-osrs-brown-light rounded-lg">
            <h2 className="text-xl font-runescape text-osrs-gold mb-4">
              How to use
            </h2>
            <ul className="text-gray-300 font-runescape space-y-2 text-left">
              <li className="flex items-start">
                <span className="text-osrs-gold mr-2">1.</span>
                <span>Type the name of an item you want to check</span>
              </li>
              <li className="flex items-start">
                <span className="text-osrs-gold mr-2">2.</span>
                <span>Select from suggestions or press Enter</span>
              </li>
              <li className="flex items-start">
                <span className="text-osrs-gold mr-2">3.</span>
                <span>
                  See if the item is needed for future quests or can be safely
                  disposed
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-osrs-brown-dark/30 border border-osrs-brown-light/50 rounded-lg">
            <p className="text-gray-400 text-sm font-runescape">
              Database includes 129 quest items from OSRS. Items marked as
              &quot;KEEP IT!&quot; are required for future quests or achievement
              diaries.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600 text-sm">
        <p>Not affiliated with Jagex Ltd.</p>
      </footer>
    </main>
  );
}
