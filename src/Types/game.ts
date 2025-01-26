export interface GameItem {
    name: string;
    type: string;
    amount: number;
    durability?: number;
    max_durability?: number;
    toughness?: number;
    rarity?: number;
    durability_cost?: number;
    emote?: string;
    worth?: number;
    level?: number;
    time_to_grow?: number;
    planted_At?: string;
    experience?: number;
}
export interface MobInterface {
    name: string;
    health: number;
    damage: number;
    crit_rate: number;
    crit_damage_percent: number;
    durability_cost: number;
    image: string;
    spawn_rate: number;
    experience: number;
    drops?: object[];
}
export interface WeaponInterface extends GameItem {
    damage: number;
    crit_rate: number;
    crit_damage_percent: number;
}

export interface FoodInterface extends GameItem {
    healing: number;
    canCook: boolean;
    cooksTo?: string;
    fuelCost?: number;
}
