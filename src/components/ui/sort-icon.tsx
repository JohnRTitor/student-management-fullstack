type SortIconProps = {
  direction: "ascending" | "descending" | null;
}

export default function SortIcon({ direction }: SortIconProps) {
  if (direction === "ascending") return <span>↑</span>;
  if (direction === "descending") return <span>↓</span>;
  return <span>⬍</span>; // neutral
}