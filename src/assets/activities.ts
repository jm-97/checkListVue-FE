import type { Stato } from "@/interfaces/stati"

export const STATI: Stato[] = [
  { value: "non_completato", color: "red" },
  { value: "non_necessario", color: "black" },
  { value: "ongoing", color: "blue" },
  { value: "completato", color: "green" }
]
