interface Store {
  name: string
}

interface Edge {
  store: string
  distance: number
}

export interface ShoppingCenter {
  stores: Record<string, Store>
  distances: Record<string, Edge[]> // Используем массив для хранения ребер между магазинами
}
