import { Parkplatztyp } from "./Parkplatztyp"
import { Preiskategorie } from "./Preiskategorie"

export interface Parkplatz {
    parkplatzID: number
    nummer: string
    xkoordinate: number
    ykoordinate: number
    parkplatztyp: Parkplatztyp
    preiskategorie: Preiskategorie
}