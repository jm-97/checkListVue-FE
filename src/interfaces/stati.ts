export type singleStato = "non_completato" | "non_necessario" | "ongoing" | "completato";
export interface Stato {
  value: singleStato,
  color: string
}

export interface Stati {
  stati: Stato[],
  preSelectedStatus: Stato
}
