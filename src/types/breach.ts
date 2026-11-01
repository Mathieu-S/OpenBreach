import type { Card } from '@/types/card.ts'

export type Breach = {
  isOpen: boolean
  closeAngle: 0 | 90 | 180 | 270
  preparedSpell?: Card
}
