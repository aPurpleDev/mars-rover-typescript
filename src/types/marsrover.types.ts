import { CARDINALS } from "../consts/cardinals";

export type Direction = typeof CARDINALS[number];

export type DirectionIncrement = Record<Direction, Increment>;

export type Increment = { x: number; y: number };
