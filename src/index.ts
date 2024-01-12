import * as fs from 'fs'
import { ShoppingCenter } from './types'

const jsonData = fs.readFileSync('src/data.json', 'utf-8')
const shoppingCenter: ShoppingCenter = JSON.parse(jsonData)

function findShortestPath(store1: string, store2: string, visited: Set<string> = new Set()): number {
  if (store1 === store2) return 0

  visited.add(store1)

  const edges = shoppingCenter.distances[store1]
  if (!edges || edges.length === 0) return Infinity

  let shortestPath = Infinity

  edges.map((edge) => {
    if (!visited.has(edge.store)) {
      const pathLength = edge.distance + findShortestPath(edge.store, store2, visited)
      shortestPath = Math.min(shortestPath, pathLength)
    }
  })

  visited.delete(store1)
  return shortestPath
}

function estimateDistance(distance: number) {
  if (distance === Infinity) return 'Магазины не найдены'

  switch (true) {
    case distance <= 100:
      return 'рядом'
    case distance <= 150:
      return 'очень близко'
    case distance <= 300:
      return 'недалеко'
    case distance <= 500:
      return 'достаточно далеко'
    default:
      return 'очень далеко'
  }
}

function estimateDistanceBetweenMultipleStores(stores: string[]): void {
  if (stores.length < 2) {
    console.log('Выберите как минимум два магазина для оценки расстояния.')
    return
  }

  console.log(`Расстояние между магазинами:\n`)

  stores.map((store1, index) => {
    stores.slice(index + 1).map((store2) => {
      if (!shoppingCenter.stores[store1] || !shoppingCenter.stores[store2]) {
        console.log(`Ошибка: Неизвестное название магазина.`)
        return
      }

      const distance = findShortestPath(store1, store2)
      console.log(
        `${shoppingCenter.stores[store1].name} и ${shoppingCenter.stores[store2].name}: ${estimateDistance(
          distance,
        )} (${distance} метров)`,
      )
    })
  })
}

const selectedStores = ['store1', 'store2', 'store3', 'store4', 'store5', 'store6', 'store7']
estimateDistanceBetweenMultipleStores(selectedStores)
