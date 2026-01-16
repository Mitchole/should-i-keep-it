"use client";

import { QuestItem } from "@/data/quest-items";

interface ResultCardProps {
  item: QuestItem | null;
  isQuestItem: boolean;
  searchedName: string;
  itemExistsInGame: boolean;
}

export function ResultCard({
  item,
  isQuestItem,
  searchedName,
  itemExistsInGame,
}: ResultCardProps) {
  if (!searchedName) {
    return null;
  }

  // Item not found in game database
  if (!itemExistsInGame && !isQuestItem) {
    return (
      <div className="max-w-xl mx-auto mt-6 p-6 bg-osrs-brown-dark border-2 border-gray-500 rounded-lg">
        <div className="text-center">
          <p className="text-gray-400 font-runescape text-lg">
            Item not found: &quot;{searchedName}&quot;
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try searching for a different item name
          </p>
        </div>
      </div>
    );
  }

  // Found quest item - show keep info
  if (isQuestItem && item) {
    const shouldKeep = item.neededForQuest;

    return (
      <div
        className={`max-w-xl mx-auto mt-6 p-6 bg-osrs-brown-dark border-4 rounded-lg
                    ${shouldKeep ? "border-osrs-green" : "border-osrs-gold"}`}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-runescape text-osrs-gold mb-2">
            {item.name}
          </h2>
          <div
            className={`inline-block px-4 py-2 rounded-lg font-bold text-xl
                        ${shouldKeep
                          ? "bg-green-900/50 text-osrs-green"
                          : "bg-yellow-900/50 text-osrs-gold"}`}
          >
            {shouldKeep ? "KEEP IT!" : "Keep for utility"}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 text-white font-runescape">
          <div className="flex">
            <span className="text-osrs-gold w-36 flex-shrink-0">Found in:</span>
            <span>{item.foundInQuest}</span>
          </div>

          {item.usedInQuest && item.usedInQuest !== "N/A" && (
            <div className="flex">
              <span className="text-osrs-gold w-36 flex-shrink-0">Used in:</span>
              <span>{item.usedInQuest}</span>
            </div>
          )}

          <div className="flex">
            <span className="text-osrs-gold w-36 flex-shrink-0">Purpose:</span>
            <span>{item.usedFor}</span>
          </div>

          {item.achievementDiary && (
            <div className="flex">
              <span className="text-osrs-gold w-36 flex-shrink-0">
                Achievement Diary:
              </span>
              <span className="text-yellow-300">{item.achievementDiary}</span>
            </div>
          )}
        </div>

        {/* Additional note for critical items */}
        {shouldKeep && (
          <div className="mt-4 p-3 bg-green-900/30 border border-osrs-green/50 rounded">
            <p className="text-osrs-green text-sm font-runescape">
              [!] This item is required for future quests. Do not drop or destroy it!
            </p>
          </div>
        )}
      </div>
    );
  }

  // Not a quest item - safe to dispose
  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-osrs-brown-dark border-4 border-osrs-red rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-runescape text-white mb-2">
          {searchedName}
        </h2>
        <div className="inline-block px-4 py-2 rounded-lg font-bold text-xl bg-red-900/50 text-osrs-red">
          Safe to dispose
        </div>
        <p className="text-gray-300 font-runescape mt-4">
          This item is not in our quest items database. It is likely safe to
          drop, sell, or destroy.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Note: Always double-check before destroying unique or rare items.
        </p>
      </div>
    </div>
  );
}
