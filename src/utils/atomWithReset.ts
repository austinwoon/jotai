import { atom } from 'jotai'
import type { SetStateAction, SetStateActionFunc, WritableAtom } from 'jotai'
import { RESET } from './constants'

export function atomWithReset<Value>(initialValue: Value) {
  type Update = SetStateAction<Value> | typeof RESET
  const anAtom = atom<Value, Update>(initialValue, (get, set, update) => {
    if (update === RESET) {
      set(anAtom, initialValue)
    } else {
      set(
        anAtom,
        typeof update === 'function'
          ? (update as SetStateActionFunc<Value>)(get(anAtom))
          : update
      )
    }
  })
  return anAtom as WritableAtom<Value, Update>
}
