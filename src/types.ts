export type Club = {
  id: string
  name: string
  type: string
  city: string
  coords: [number, number]
  description?: string
  contacts?: string
  image?: string
}
export type Banner = {
  id: string
  image: string
  link?: string
  text?: string
  active: boolean
  position: string
}