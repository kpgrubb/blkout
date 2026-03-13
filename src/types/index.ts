// ============================================
// BLKOUT Companion App - Core Type Definitions
// ============================================

// --- Factions & Forces ---

export type FactionId =
  | "harlow"
  | "un-raid-force-alpha"
  | "un-3rd-battalion"
  | "un-forces"
  | "manticor-borz"
  | "task-force-boone"
  | "ork"
  | "banak"
  | "the-headless"
  | "chimera";

export type Allegiance = "authority" | "chimera" | "independent" | "headless";

export interface Faction {
  id: FactionId;
  name: string;
  code: string; // e.g. "HFR", "RFA", "MBG", "TFB"
  allegiance: Allegiance;
  color: string; // CSS color for faction theming
  description: string; // Short flavor text
  forceRule: string; // The faction-wide passive rule
  loreId: string; // Reference to lore entry
}

// --- Units & Models ---

export interface Weapon {
  name: string;
  range: string; // e.g. "24\"", "4-16\"", "2\""
  damage: number;
  keywords: string[]; // e.g. ["CQB", "Sustained (1)", "AP (2)"]
}

export interface Specialist {
  slot: 1 | 2;
  title: string; // e.g. "Data Spike", "Machine Gunner", "Team Leader"
  weapon?: Weapon;
  ability?: string; // Free-text special ability
}

export interface Unit {
  id: string; // e.g. "hfr-assault-team"
  factionId: FactionId;
  name: string; // e.g. "Assault Team"
  fullName: string; // e.g. "Harlow Assault Team"
  catalogCode: string; // e.g. "HFR-6770"
  movement: number;
  skill: number;
  armor: string; // e.g. "1/6" (damage track / armor value)
  combatLoads: number; // Number of armory uses (triangle boxes)
  weapons: Weapon[];
  specialists: Specialist[];
  specialRules: string[]; // e.g. ["Jump (4)", "Low Tech", "AI", "Drone"]
  unitAbility?: string; // Unique unit text (e.g. "One Unit may be Activated after...")
  isDuster: boolean;
  isAI: boolean;
  isPowered: boolean;
}

export interface BattleDrill {
  name: string;
  description: string;
}

export interface ArmoryItem {
  name: string;
  weapon?: Weapon;
  ability?: string; // Non-weapon armory items (e.g. "BOOST JUMP: Model gains Jump (4)")
}

export interface ForceCard {
  factionId: FactionId;
  forceRule: string;
  battleDrills: BattleDrill[];
  armory: ArmoryItem[];
}

// --- Dusters ---

export interface DusterChassis {
  id: string;
  name: string; // e.g. "Caber", "Topor", "Mattis", "Aveles"
  skill: number;
  mobility: number;
  armor: string; // e.g. "3/4"
  weapons: Weapon[];
  specialRules: string[];
}

// --- Burn Cards ---

export interface BurnCard {
  id: string;
  name: string;
  timing: string; // When to play it
  effect: string;
}

// --- Special Rules & Keywords ---

export interface SpecialRule {
  id: string;
  name: string; // e.g. "CQB", "AP (X)", "Blast (X)"
  description: string;
  isWeaponKeyword: boolean; // true = weapon keyword, false = model/unit rule
}

// --- Rules ---

export interface RuleSection {
  id: string;
  number: string; // e.g. "1.0", "3.2"
  title: string;
  content: string; // Markdown or plain text
  subsections?: RuleSection[];
  keywords: string[]; // Searchable keywords found in this section
}

// --- FAQ & Errata ---

export interface FAQEntry {
  id: string;
  category: string; // e.g. "Explosives", "Combat", "Movement"
  question: string;
  answer: string;
}

export interface ErrataEntry {
  id: string;
  date: string;
  section: string;
  change: string;
}

// --- Scenarios ---

export type TableSize = "2x2" | "3x3";

export interface Scenario {
  id: string;
  name: string;
  tableSize: TableSize;
  description: string;
  setupInstructions: string;
  specialRules: string[];
  objectiveRules: string;
  hardpoints: number;
  isMatchedPlay: boolean;
}

// --- Lore ---

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: "earth" | "transit" | "abol" | "war";
}

export interface FactionLore {
  factionId: FactionId;
  fullHistory: string;
  keyFigures: string[];
  notableEvents: string[];
}

export interface PlanetEntry {
  id: string;
  name: string;
  category: "geography" | "climate" | "flora" | "fauna" | "settlement";
  description: string;
}

export interface KillwagerEntry {
  id: string;
  text: string; // In-universe flavor text
  factionTags: FactionId[];
}

// --- Game Session (Play & Track) ---

export type GamePhase = "setup" | "operations" | "execution" | "end";

export interface ModelState {
  unitId: string;
  modelIndex: number;
  currentDamage: number;
  maxDamage: number;
  isDown: boolean;
}

export interface UnitState {
  unitId: string;
  isActivated: boolean;
  models: ModelState[];
  tokens: {
    pinned: number;
    ready: number;
    overwatch: boolean;
  };
  combatLoadsUsed: number;
}

export interface SmokeToken {
  id: string;
  placedByUnit: string;
  roundPlaced: number;
  dissipateOn: number; // Roll needed to dissipate (default 7+, Chaff 10+)
}

export interface GameSession {
  id: string;
  round: number;
  phase: GamePhase;
  player1: {
    factionId: FactionId;
    units: UnitState[];
    controlPoints: number;
    burnCards: string[]; // BurnCard IDs in hand
  };
  player2: {
    factionId: FactionId;
    units: UnitState[];
    controlPoints: number;
    burnCards: string[];
  };
  smokeTokens: SmokeToken[];
  scenarioId: string;
  tableSize: TableSize;
}

// --- Dice ---

export interface DiceResult {
  rolls: number[];
  successes: number;
  aces: number; // Number of 10s rolled
  targetNumber: number;
}

// --- Force Builder ---

export interface ForceGroup {
  handlerUnitId: string | null;
  forceCardId: string | null;
  unitIds: string[];
  dusterId: string | null;
}

export interface ForceList {
  factionId: FactionId;
  groups: ForceGroup[];
  isMatchedPlay: boolean;
  gameSize: 1 | 2 | 3; // Number of groups
}
