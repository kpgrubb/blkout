# BLKOUT: Unit Dossier

Coverage: every unit and Duster in `src/data/`, plus units that official or retail sources list but the repo does not have.

**Where the data comes from:**
- **Stats:** taken word for word from the repo files `units.json`, `dusters.json`, `dusterArmory.json`, `forceCards.json` and `specialRules.json`. No stat in this file was made up.
- **Web confirmation:** the egress proxy blocked direct page fetches (WebFetch) to blkoutgame.com, the wiki, Scribd and every retailer tried. Web facts below therefore come from **search-engine result summaries** of those pages (cited by URL). None of these summaries included a full official stat line, so no web number could be checked against a repo number. Web sources were used only for unit composition, weapon names, role descriptions and missing units.
- **Labels:** anything marked **[inferred]** is my own tactical commentary, not official text.

---

## 0. How to read a unit card (from repo `rules.json` §1.2 and others)

| Field | Meaning in repo data | Notes / caveats |
|---|---|---|
| **Mv (Movement)** | Inches each model moves in the Reposition Step (§2.0). Sprint is an Action that adds another Movement-worth of distance (§6.1). | Harlow's force rule adds +2" when Sprinting. |
| **Skill** | The target number for Skill Checks. Roll D10s, and each die that "meets or exceeds" Skill is a success. A 10 ("Ace") counts as 2 successes (§1.1, §3.1). | **Ambiguity:** read literally, a lower Skill is better. But elite units (Veterans, UTG, Ubiytsa, Springbok) carry Skill **6** and line troops carry **4**, which suggests a higher number is better. The repo's rules summary may be simplified. Check the official rulebook. |
| **Armor "x/y"** | `src/types/index.ts` says `"damage track / armor value"`. So **x** is the damage track (hits the model can take) and **y** is the Armor Check target ("Armor 6 means 6+ to save", §3.3). AP (X) adds X to y. | A lower y is a better save. This fits the lore: Manticor "layers of ballistic armor" have y = 4, while the Crikets mine has y = 8. |
| **Combat Loads (CL)** | How many times the unit can use Armory items from its faction's Force Card. These are the triangle boxes you mark on the card. | 0 means no Armory access (the drones). The Burn Card "Extras!" un-marks all Combat Loads. |
| **Weapons** | Range / Damage / Keywords. | A range like "8-32\"" gives the minimum and maximum range. |
| **Specialists** | Numbered slots (1, 2) for models with a special weapon or ability. All other models are Grunts with the base weapon. | |
| **Special Rules** | AI, Drone, Jump (X), Low Tech, Powered, Shield (see glossary in §9). | |

**Dusters** use **Mobility** in place of Movement and have **Hull and Mobility damage tracks** that an attacker targets separately (FAQ-7, §8.1). The repo stores Duster armor as a single "x/y" (for example Topor "3/2"), and nothing in the repo says how that maps onto the two tracks. **Unresolved:** it may mean Hull/Mobility, or damage/save as for infantry.

---

## 1. Harlow 1st Reaction Force (HFR, Authority)

**Force Rule:** +2 Movement when Sprinting.

**Battle Drills:**
- *Assaulters:* the unit can't be targeted by Overwatch while Repositioning.
- *Chaff:* place a Smoke token within 6"; it dissipates only on a 10+.
- *Stims:* +2 Movement for the Activation.

**Armory:**
- Boost Jump: Jump (4)
- Frag Launcher: 24", Damage 1, Sustained (2), Medium
- Head: 16", Damage 4, Blast (1)
- Micro Launcher: 4-16", Damage 2, Blast (1), Heavy

Official box contents ("HARLOW: 1st Reaction Force"): Assault Team (4), Control Team (3), Springbok AI (2). The Strikeforce expansion adds 3 Veterans, 2 Engineers and 2 Crickets.

### Assault Team: Harlow Assault Team (HFR-6772)
- **Stats:** Mv 6 | Skill 4 | Armor 1/6 | CL 2
- **Weapons:** FAL-32C, 24", Damage 1, CQB
- **Specialists:**
  1. Machine Gunner: P34, 24", Damage 1, Cyclic, Heavy
  2. Team Leader: when this model gains a Ready token, it may give it to a model in the unit that has already acted.
- **Special rules:** none
- **Role:** assault / breaching
- **Official composition:** 2 Grunts + 2 Specialists. Official text: "fast-moving shock troops… FAL-32C… machine gunner… cyclic suppressive fire… team leader".
- **Tip [inferred]:** use Stims or Sprint to reach CQB half-range (12"). Keep the P34 still when possible so it gets the Heavy bonus shot.

### Control Team: Harlow Control Team (HFR-6771)
- **Stats:** Mv 6 | Skill 4 | Armor 1/6 | CL 1
- **Weapons:** FAL-32C, 24", Damage 1, CQB
- **Specialists:**
  1. Data Spike (the repo has no ability text for this)
  2. Grenade Launcher: 24", Damage 2, Blast (1)
- **Unit ability:** one unit may activate after this one without spending a Control Point.
- **Role:** control / command / electronic warfare (EWAR)
- **Official composition:** 3 models, "coordination hub… grenade launchers and data systems".
- **Tip [inferred]:** activate it just before your strongest unit to get that unit a free activation. Keep it out of sight, because losing it costs you tempo.

### Springbok AI: Harlow Springbok AI (HFR-6770)
- **Stats:** Mv 6 | Skill 6 | Armor 2/6 | CL 2
- **Weapons:** FAL-32D, 24", Damage 1, CQB, Sustained (1)
- **Specialists:** none
- **Special rules:** AI
- **Role:** close-quarters strike unit made of inorganics (robots)
- **Official composition:** 2 models, "agile inorganics… FAL-32D rifles and **chaff discharge systems**".
- **Discrepancy:** the repo has no chaff ability on the unit. Chaff exists only as a faction Battle Drill.
- **Tip [inferred]:** its 2-point damage track lets it lead an advance. Watch out for EMP weapons (Pulse Grenades, Surge, Microwave Gun), which ignore armor against AI.

### Veterans: Harlow Veterans (HFR-6775)
- **Stats:** Mv 5 | Skill 6 | Armor 1/6 | CL 3
- **Weapons:**
  - Carbine: 18", Damage 1, CQB
  - Machetes: 2", Damage 1, AP (1), Melee
  - Pulse Grenades: 6", Damage 1, Blast (1), EMP
- **Specialists:** none
- **Special rules:** Jump (4), Low Tech
- **Role:** close assault, and hunting enemy AI
- **Official composition:** 3 models, "Low-tech infantry immune to data attacks… brutal close-quarters assaults and tactical leaps".
- **Tip [inferred]:** use them against AI-heavy lists, since Pulse Grenades deal EMP damage that allows no armor check. Their 3 Combat Loads make them the best unit to carry Armory items.

### Engineers: Harlow Engineers (HFR-6774)
- **Stats:** Mv 6 | Skill 4 | Armor 1/6 | CL 1
- **Weapons:** Carbine, 18", Damage 1, CQB
- **Specialists:**
  1. Engineer: AT Launcher, 8-32", Damage 3, AP (2), Blast (1)
- **Special rules:** none
- **Role:** anti-armor; also lets you field Crikets
- **Official composition:** 2 models, "anti-armor experts… breaching tools and heavy launchers. Their presence allows Crickets to be fielded without counting against your unit limit."
- **Tip [inferred]:** hang back past the AT Launcher's 8" minimum range and target Dusters and drones.

### Crikets: Harlow Crikets (HFR-6776)
- **Name:** spelled "Crickets" in official sources.
- **Stats:** Mv 7 | Skill 6 | Armor 1/8 | CL 2
- **Weapons:** Self Destruct, 4", Damage 1, AP (4), CQB
- **Specialists:** none
- **Special rules:** AI, Drone
- **Unit ability:** doesn't count toward the unit limit when grouped with Harlow Engineers. Can't benefit from Force Cards. Remove the model after it uses Self Destruct.
- **Role:** area denial / suicide drone
- **Official composition:** 2 models, "Self-detonating AI drones… infiltration and area denial".
- **Oddity:** the repo gives these one-shot models 2 Combat Loads even though they "cannot benefit from Force Cards".
- **Tip [inferred]:** Mv 7 plus a 4" range with AP (4) threatens heavily armored targets such as Cyka and Pointmen. Use them as free extra bodies alongside Engineers.

### Missing from repo: Harlow Special Activities Division
Official product: "HARLOW: Special Activities Division". A search snippet gives a release date of 15 Sep 2026; retailer SKU ESS-BLK-0135-PR.

| Unit (official name) | Models | Official description |
|---|---|---|
| SAD Enforcers | 3 | Powered and armored; close-quarters ranged weapons plus a CQC sword |
| SAD Skirmishers | 3 | PDWs, micro-grenades, assisted by an FPV drone |
| SAD Officers | 2 | Skilled shooters; "first reactions" and counter-EWAR |

No stats were found.

---

## 2. UN Raid Force Alpha (RFA, Authority)

**Force Rule:** UTG Assaulter and Specialist units roll +1 D10 on all Skill Checks, including shooting and CQC.
- The repo's Force Card text says "UN Raid **Team** Alpha".

**Battle Drills:**
- *Close Assault:* move 2" after activation, but only into CQC.
- *Cross Fire:* +1 Damage when several models shoot the same target.
- *Switchback:* place Smoke within 4", then move 2" before activating.

**Armory:**
- Boost Jump: Jump (6)
- Lance: 12", Damage 1, AP (3)
- Micro Launcher: 4-16", Damage 2, Blast (1), Heavy
- Surge: 16", Damage 2, EMP

Official box: 2 UTG Assaulters, 2 UTG Specialists, and 4 Golems split into two units.

### UTG Assaulters: UN UTG Assaulters (RFA-4391)
- **Stats:** Mv 5 | Skill 6 | Armor 1/5 | CL 1
- **Weapons:** M7 Carbine, 18", Damage 1, CQB
- **Specialists:**
  1. Grenadier: Grenade Launcher, 24", Damage 2, Blast (1)
- **Special rules:** Jump (4)
- **Role:** assault
- **Official:** "Jump-equipped operatives armed with M7 carbines and grenade launchers".
- **Tip [inferred]:** pair them with Cross Fire. Two carbine hits on the same model each deal +1 Damage.

### UTG Specialists: UN UTG Specialists (RFA-4392)
- **Stats:** Mv 5 | Skill 6 | Armor 1/5 | CL 1
- **Weapons:** M7 Carbine, 18", Damage 1, CQB
- **Specialists:**
  1. Marksman: Anti-Material Rifle, 32", Damage 2, AP (2), Deployed
- **Special rules:** Jump (4)
- **Role:** long-range fire support / sniping
- **Discrepancy:** official sources describe "a command and control unit, and a marksman with a high-powered anti-material rifle **and cloaking capabilities**". The repo has neither a command/control ability nor cloaking for this unit.
- **Tip [inferred]:** don't move the Marksman before shooting, because Deployed limits it to 1 D10 if it moved. Jump onto a high vantage point first, then shoot in a later activation.

### Golem Unit: UN Golem Unit (RFA-4393)
- **Stats:** Mv 5 | Skill 4 | Armor 3/5 | CL 1
- **Weapons:** FPR Auto, 24", Damage 1, Sustained (1)
- **Specialists:**
  1. Fire Support: Screecher, 18", Damage 2, Seeking
- **Special rules:** Jump (4), AI
- **Role:** heavy support; durable anchor unit
- **Official:** 4 Golems in two units of 2, "towering autonomous platforms providing heavy support fire". Lore says they carry the consciousness of fallen combatants.
- **Note:** the force rule's +D10 bonus does **not** apply to Golems; it covers only Assaulters and Specialists.
- **Tip [inferred]:** Seeking ignores the Cover penalty, so use the Screecher on units dug into cover.

---

## 3. UN 3rd Battalion (UNR, Authority)

**Force Rule:** non-AI infantry in base-to-base contact with another infantry model may re-roll failed shots with non-Armory weapons.

**Battle Drills:**
- *Arsenal:* use one Armory item without marking a Combat Load.
- *Peel Back:* move 2" after activation.
- *Switchback:* same as RFA.

**Armory:**
- Boost Jump: Jump (4)
- Corner Chasers: 16", Damage 1, CQB, Indirect
- Microwave Gun: 8", Damage 1, EMP
- Shotgun: 8", Damage 1, AP (3), CQB

The official product page is titled "UN: 3rd Battalion" (URL slug `un-reserve-force`).

### Reserve Fireteam: UN Reserve Fireteam (UNR-462)
- **Stats:** Mv 7 | Skill 4 | Armor 1/5 | CL 2
- **Weapons:**
  - Rifles: 24", Damage 1, no keywords
  - Micro Grenades: 6", Damage 1, Blast (1)
- **Specialists:**
  1. Data Specialist (the repo has no ability text)
  2. AT Specialist: AT Launcher, 8-32", Damage 3, AP (2), Blast (1)
- **Special rules:** none
- **Role:** line infantry / anti-armor / EWAR
- **Official:** "Core infantry… rifles and micro-grenades… Data Specialist… AT Specialist".
- **Tip [inferred]:** keep the models in base-to-base pairs to get force-rule re-rolls on Rifles and the AT Launcher.

### Pointmen: UN Pointmen (UNR-461)
- **Stats:** Mv 6 | Skill 4 | Armor 3/6 | CL 1
- **Weapons:** Rifles, 24", Damage 1, Medium
- **Specialists:**
  1. SAW Gunner: LMG, 32", Damage 1, Cyclic, Heavy
- **Special rules:** AI, Shield
- **Role:** front-line suppression / holding objectives
- **Official:** "Forward elements equipped with LMGs and advanced shielding".
- **Note:** because they are AI, the force-rule re-rolls do **not** apply.
- **Tip [inferred]:** use Shield to give Cover to a fragile Reserve Fireteam model in base contact. Watch out for EMP weapons.

### Peacemaker: UN Peacemaker (UNR-463)
- **Stats:** Mv 6 | Skill 4 | Armor 3/6 | CL 0
- **Weapons:**
  - HMG: 6-32", Damage 1, AP (2), Auto (1)
  - Missile System: 8-32", Damage 2, AP (2), Blast (1)
- **Specialists:** none
- **Special rules:** Drone, AI
- **Role:** fire support platform
- **Discrepancy:** official text says the unit is "backed by a **jammer** that disrupts hostile data attacks". The repo has no Jammer on the Peacemaker.
- **Tip [inferred]:** it can't enter CQC (Drone) and has no Combat Loads. Park it at long range and stay outside both weapons' minimum ranges.

---

## 4. UN Forces / UN Strikeforce (repo faction "un-forces", UNF)

The repo has **no Force Card** for this faction and an **empty force rule**. Officially these are the "UN Strikeforce" expansion units for UN forces, not a separate faction.

### UTG Mothers: UN UTG Mothers (UNF-881)
- **Stats:** Mv 4 | Skill 6 | Armor 2/5 | CL 2
- **Weapons:**
  - PDW: 8", Damage 1
  - Elite Melee: 4", Damage 1, AP (2), Cyclic, Melee
- **Specialists:** none
- **Special rules:** Jump (4)
- **Role:** melee assault
- **Official:** "Elite melee combatants… combat blades and PDWs".
- **Tip [inferred]:** Mv 4 is the slowest infantry in the repo. Use Jump to cut through terrain, and use Cyclic for follow-up attacks in CQC.

### Raid Team: UN Raid Team (UNF-882)
- **Stats:** Mv 5 | Skill 6 | Armor 1/5 | CL 3
- **Weapons:**
  - Carbines: 18", Damage 1, CQB
  - Micro Grenades: 6", Damage 1, Blast (1)
- **Specialists:** none
- **Special rules:** Jump (4)
- **Role:** flexible line troops / Armory carriers
- **Official:** "Raid Team Grunts… carbines and micro-grenades".
- **Tip [inferred]:** 3 Combat Loads make this the best unit to carry Armory items.

### BATCON: UN BATCON (UNF-883)
- **Stats:** Mv 5 | Skill 4 | Armor 1/5 | CL 1
- **Weapons:**
  - Rifles: 24", Damage 1, Medium
  - Micro Grenades: 6", Damage 1, Blast (1)
- **Specialists:**
  1. Comms Bot: "AI, 3/5, Data Spike". This is an AI model with its own armor, stored only as ability text.
- **Special rules:** Jump (4)
- **Unit ability:** one unit may activate after this one without spending a Control Point.
- **Role:** command / control / EWAR
- **Official:** "Data warfare specialists… armored AI bot support… data spikes".
- **Tip [inferred]:** the Comms Bot's 3-point damage track makes it a good model to screen the rest of the unit.

---

## 5. Manticor Borz Group (MBG, Chimera allegiance)

**Force Rule:** ignore the first point of damage taken from a Blast weapon.

**Battle Drills:**
- *Linked:* pass a Ready token to a model that has already acted.
- *Targeting Smoke:* place Smoke that your own unit ignores.
- *Thorax Shields:* +1 D10 on Armor Checks.

**Armory:**
- Air Burst Rifle: 24", Damage 1, Seeking
- RPG33: 16", Damage 4, Blast (1)
- Strip Grenades: 6", Damage 2, Blast (2)
- Thermite Launcher: 8", Damage 1, Sustained (6)

Official "Borz Group Force" box: Insertion Team, Bratva Team and Cyka (9 models). The Strikeforce expansion adds Cyka Bravo, 2 Ubiytsa Control Team models and 3 Ubiytsa Grunts.

### Bratva Team: Manticor Bratva Team (MBG-122)
- **Stats:** Mv 6 | Skill 4 | Armor 1/4 | CL 2
- **Weapons:** AKMZ-2, 24", Damage 1, Medium
- **Specialists:**
  1. Data Spike
  2. HMG: 4-24", Damage 2, Sustained (2), Deployed
- **Special rules:** Shield
- **Unit ability:** with 2 or more models on the table, roll an extra D10 for Initiative and keep the highest.
- **Role:** sustained fire / EWAR
- **Official:** "Elite riflemen supported by an HMG Specialist and Data Operative".
- **Tip [inferred]:** set the HMG up early and leave it stationary (Deployed). Keep 2 or more models alive to keep the Initiative bonus.

### Insertion Team: Manticor Insertion Team (MBG-121)
- **Stats:** Mv 6 | Skill 4 | Armor 1/4 | CL 2
- **Weapons:** AKMZ-2, 24", Damage 1, Medium
- **Specialists:**
  1. Machine Gunner: SYY-1, 24", Damage 1, Cyclic, Heavy
  2. Sidewinder: tick a box to make a Skill Check as an Action. On a pass, Pin a unit with a model within 12".
- **Special rules:** none
- **Role:** breaching / control (pinning)
- **Official:** "Frontline breachers… rifles and cyclic machine guns… Sidewinder Specialist capable of pinning enemy positions".
- **Tip [inferred]:** Pin the enemy's best Overwatch unit before you advance. The Sidewinder doesn't work on Low Tech units.

### Cyka Team: Manticor Cyka Team (MBG-123)
- **Stats:** Mv 6 | Skill 4 | Armor 2/4 | CL 1
- **Weapons:**
  - SYY-1: 24", Damage 1, Cyclic, Heavy
  - Grenade Launcher: 24", Damage 2, Blast (1)
- **Specialists:** none
- **Special rules:** Powered
- **Role:** heavy infantry / anti-infantry
- **Official:** "A **single**, powered heavy trooper". This conflicts with repo `rules.json` §1.0, which says units have 2-4 models.
- **Tip [inferred]:** the best armor save in the repo (y = 4) plus 2 damage. Watch out for Data Knives, which damage Powered models with no armor check allowed.

### Cyka Bravo: Manticor Cyka Bravo (MBG-126)
- **Stats:** Mv 6 | Skill 4 | Armor 2/4 | CL 2
- **Weapons:**
  - SMG: 12", Damage 1, CQB
  - Boarding Axe: 2", Damage 1, Melee, AP (3)
- **Specialists:** none
- **Special rules:** Powered
- **Role:** assault / melee
- **Official:** "powered frontline enforcers… SMGs and high-AP melee axes". The box has 2 models.
- **Tip [inferred]:** move straight into CQC. Melee ignores the Cover penalty, and the target can only fight back with a melee weapon or Juke.

### Ubiytsa: Manticor Ubiytsa (MBG-124)
- **Stats:** Mv 6 | Skill 6 | Armor 1/6 | CL 3
- **Weapons:**
  - Heavy Rifle: 12", Damage 1, AP (3)
  - Boarding Axe: 2", Damage 1, Melee, AP (3)
- **Specialists:** none
- **Special rules:** Low Tech
- **Role:** close assault / punching through armor
- **Official:** 3 "Ubiytsa Grunts… heavy rifles and axes".
- **Tip [inferred]:** Low Tech means they can't be Pinned by Data Attacks or targeted by Indirect fire, so they work well against Boone and UN 3rd Battalion EWAR.

### Ubiytsa Control Team: Manticor Ubiytsa Control Team (MBG-125)
- **Stats:** Mv 6 | Skill 6 | Armor 1/6 | CL 1
- **Weapons:** Heavy Rifle and Boarding Axe, same as Ubiytsa
- **Specialists:**
  1. Controller: one unit may activate after this one without spending a Control Point.
- **Special rules:** Low Tech
- **Role:** control / command
- **Official:** 2 models, "low-tech specialists".
- **Tip [inferred]:** a command unit that is immune to Data Attacks. That makes it harder to shut down than the Harlow or UN control units.

---

## 6. Task Force Boone (TFB, Independent, Martian)

**Force Rule:** once per round, one non-AI or Powered infantry model may make the Data Attack Action.
- **Ambiguous wording:** it is unclear whether "non-AI or Powered" means "neither AI nor Powered" or "a non-AI model, or a Powered model".

**Battle Drills:**
- *Overwhelming Fire:* Return Fire against this unit's Cyclic models rolls at most 1 D10.
- *Small Unit Tactics:* up to half the unit shoots during the Reposition Step.
- *Tactical Positioning:* Overwatch against this unit suffers -1 D10.

**Armory:**
- Disposable Launcher: 4-18", Damage 3, Blast (1)
- Pulse Grenade: 6", Damage 1, EMP, Blast (1)
- Smoke Grenade
- Tracking Bombs: 16", Damage 1, AP (2), Indirect

Official "Task Force Boone: Recon" box: Recon Team, VAT Element and Razorback.

### Recon Team: Boone Recon Team (TFB-9861)
- **Stats:** Mv 6 | Skill 4 | Armor 1/6 | CL 2
- **Weapons:** Heavy Rifle, 24", Damage 1, AP (1)
- **Specialists:**
  1. Team Leader: give a Ready token gained from the Ready Action to a model that has already acted.
  2. SAW Gunner: LMG, 32", Damage 1, Cyclic, Heavy
- **Special rules:** none
- **Role:** line infantry / suppression
- **Tip [inferred]:** combine Overwhelming Fire with the Cyclic LMG to outgun units that Return Fire.

### VAT Element: Boone VAT Element (TFB-9862)
- **Stats:** Mv 6 | Skill 6 | Armor 1/6 | CL 1
- **Weapons:** Carbine, 18", Damage 1, CQB
- **Specialists:**
  1. Data Specialist: Jammer 12", Data Knife 6"
  2. SAW Gunner: Compact LMG, 24", Damage 1, Cyclic, CQB
- **Special rules:** Jump (4)
- **Role:** assault / EWAR / hunting AI and Powered models
- **Official:** "Jump-capable assault troopers… compact LMG gunner and a data specialist carrying jammers and knives".
- **Tip [inferred]:** the Data Knife damages AI and Powered models with no armor check allowed. Use it on Cyka, Golems and Pointmen. The Jammer cancels Pins on nearby friendly units.

### Razorback: Boone Razorback (TFB-9863)
- **Stats:** Mv 5 | Skill 4 | Armor 3/4 | CL 0
- **Weapons:**
  - Gauss SAW: 32", Damage 1, Cyclic, AP (2), Auto (2)
  - Razorback ATGM: 6-32", Damage 2, Blast (1), Indirect
- **Specialists:** none
- **Special rules:** Drone, AI
- **Role:** fire support platform
- **Official:** "AI weapons platform… Gauss SAW and indirect-fire ATGM".
- **Tip [inferred]:** fire the ATGM without line of sight by using a spotter model. Its best save among drones (y = 4) lets it hold a firing lane.

### Missing from repo: Boone Strikeforce
| Unit (official) | Models | Official description |
|---|---|---|
| Control Team | 2 | Rifles and micro-grenades; data interference; overwatch |
| Marksman Team | 2 | One spotter and one shooter; Seeker DMR and carbine |
| Specialist Team | 3 | MMG gunner and AT launcher |

No stats were found.

---

## 7. Dusters (MIDAS walkers): `dusters.json` and `dusterArmory.json`

Notes that apply to all four Dusters:
- The repo does **not** link Dusters to factions, and they have **no catalog codes**.
- They are sold as two dual-build kits: the Medium Duster Kit builds a Caber or an Aveles; the Heavy Duster Kit builds a Topor or a Mattis.
- Each kit includes 2 Duster unit cards and 1 Duster Armory card (official).
- No Duster in the repo has a Combat Loads value.

| Chassis | Kit | Skill | Mobility | Armor | Weapons | Special |
|---|---|---|---|---|---|---|
| **Caber** | Medium | 5 | 12 | 3/4 | MMG 4-32", Damage 1, AP (2), Auto (2), CQB · Sword 6", Damage 2, AP (4), Auto (2), CQB | Jump (8) |
| **Aveles** | Medium | 5 | 10 | 3/3 | HMG 8-32", Damage 2, AP (4), Auto (2), CQB · Fist 2", Damage 1, AP (4), Auto (1), CQB | Jump (8) |
| **Topor** | Heavy | 5 | 8 | 3/2 | 30MM 12-48", Damage 3, AP (4), Auto (1), Deployed · MMG 4-32", Damage 1, AP (2), Auto (2), CQB | none |
| **Mattis** | Heavy | 5 | 8 | 3/2 | 30MM (as Topor) · Axe 4", Damage 2, AP (4), Auto (2), CQB | Jump (4) |

**Caber.** Fast assault.
- Official: "trades armor for raw acceleration… **14.5mm machine gun** and a brutal kinetic sword".
- The repo calls the gun "MMG".
- Tip [inferred]: Mobility 12 plus Jump 8 gets it to infantry quickly. The Sword's AP (4) and Damage 2 kill elites.

**Aveles.** Line anchor.
- Official: "heavy machine gun and hydraulic striking fist".
- Tip [inferred]: the HMG's Damage 2 and AP (4) at 32" outranges most infantry.

**Topor.** Support platform.
- Official: "30mm cannon and MMG for wide-area suppression".
- Tip [inferred]: don't move it before firing (30MM is Deployed). The 12" minimum range means it needs infantry nearby to screen it.

**Mattis.** Assault variant.
- Official: "30mm cannon and a powered combat axe, capable of leap-charging". This matches Jump (4) in the repo.

**Duster Armory** (shared by all Dusters):
- Smoke Discharge: place Smoke within 8" before Repositioning.
- TOW: 8-32", Damage 3, AP (2)
- Boost: Mobility can't be targeted, and the Duster gains Cover.
- Cluster: 8-32", Damage 1, Blast (4)
- Targeting Array: ignore Cover against infantry.

**Repo terminology clash:** `rules.json` §8.1 says Dusters have **front/rear arcs** and **dual damage tracks**, but `dusters.json` stores only a single armor string. The rules for arcs and tracks are not in the repo data.

---

## 8. Factions in `factions.json` with NO units in the repo

These units were found online. Composition comes from official product descriptions via search; no stats were found for any of them.

**ORK (Authority).** Box: "ORK: Task Force Upyr", 8 models.
- Korpus Straży (4): heavy rifles, armor-piercing rounds, a linked Spotter
- Strzyga Assaulters (2): Jump, cyclic SMGs, micro-grenades
- Strzyga Hunters (2): pursuit and target elimination

**ORK Szabla Quick Reaction Force.** From the "Badlands BLKLIST" box.
- 2 riflemen with FB-M3B battle rifles
- 1 EWAR operative
- 1 heavy marksman with the AM-190 Linear Gauss Rifle

**Banak Strategic (Independent).** "Dust Elements" from the BLKLIST box.
- 2 Grunts with PM50 subguns and disposable launchers
- 1 Data Specialist with a **Data Knife** (6")
- 1 Simulent **Djinn**, a near-inorganic AI, with the MASX-101 AP rifle

**The Headless (Impisi).** Box: "Impisi Force", 9 models.
- 4 Impisi Veterans
- 4 Impisi Insurgents
- 1 Scrap King
- Weapons: flechette projectors and improvised weapons
- Also listed: a print-on-demand "KW – IMPISI Defenders"

**Chimera.** Box: "CHIMERA: Krestonosets", 8 models.
- 4 Voyi: support fire, breaching axes, an AT gunner and a captain
- 2 Besrovny: shotguns, unstable from over-augmentation
- 2 Rytsari: leaders with an HMG and powered hammers

---

## 9. Special rules glossary (repo `specialRules.json`)

**Model special rules:**
- **AI:** affected by rules that target AI, such as EMP and Data Knife.
- **Drone:** can't enter CQC, use ladders or Lean Out.
- **Jump (X):** move X inches vertically, ignoring obstacles.
- **Low Tech:** can't be Pinned by Data Attacks or targeted by Indirect weapons.
- **Powered:** wears a powered combat suit with a separate damage track.
- **Shield:** this model and one friendly infantry model in base contact gain Cover.

**Weapon keywords:**
- **AP (X):** adds X to the target's Armor Check number.
- **Auto (X):** up to X extra shots at targets within 4" of the first. These shots can't be reacted to.
- **Blast (X):** hits X additional models within 2".
- **CQB:** re-roll failed shots against targets within half range.
- **Cyclic:** may make an extra Shoot or Ready Action.
- **Deployed:** only 1 D10 if the model moved during its Reposition Step.
- **EMP:** damages AI units only, with no armor check allowed.
- **Heavy:** +1 shot if the model didn't move.
- **Indirect:** may use a friendly model's line of sight to pick the target.
- **Medium:** re-roll one failed shot.
- **Melee:** ignores the Cover penalty; the target can only respond with Melee or Juke.
- **Seeking:** ignores the Cover penalty.
- **Sustained (X):** the target re-rolls X successful armor dice.

**EWAR items:**
- **Data Knife:** a Skill Check; on success, 1 damage to an AI or Powered model with no armor check allowed.
- **Jammer:** friendly models in range ignore Pins.

**Not defined in `specialRules.json`:** "Data Spike", "Data Specialist", "Data Attack" (only described in `rules.json` §8.0) and "Cloaking" (official, Raid Force Alpha).

---

## 10. Discrepancies and gaps

1. **Catalog codes not verified.** None of the repo codes (HFR-6770…6776, RFA-439x, UNR-46x, UNF-88x, MBG-12x, TFB-986x) appeared in any web result. Retailer SKUs follow a different scheme, for example ESS-BLK-0135-PR (Harlow SAD), ESS-BLK-0040-PR (Boone Strikeforce), BLK-DM001 (Medium Duster) and BLK-FB-BOON002. The repo codes may be invented for the app or may be internal card codes.
2. **Springbok AI:** official sources mention chaff discharge systems; the repo has nothing for this.
3. **Peacemaker:** official sources mention a jammer; the repo has no Jammer.
4. **UTG Specialists:** official sources mention a command-and-control role and cloaking; the repo has only the Marksman.
5. **Caber:** the gun is "MMG" in the repo and "14.5mm machine gun" officially. It may be the same weapon.
6. **"Crikets"** in the repo vs **"Crickets"** officially.
7. **"UN Forces" (UNF)** in the repo is not an official faction. Its units are the official "UN Strikeforce" expansion. In the repo it has no Force Card and an empty force rule.
8. **Unit size.** `rules.json` says units have 2-4 models. Officially the Cyka is "a single" trooper.
9. **Ambiguity in the repo's own rules:**
   - **Skill:** "meets or exceeds" would make a lower number better, yet elite units have higher values.
   - **Duster armor:** a single value in the data vs two tracks in the rules.
   - **Repeated wording:** the Team Leader ability is worded differently for Harlow and Boone.
10. **Missing descriptions.** Data Spike and Data Specialist specialists have no ability text in the repo.
11. **Missing units:** Harlow SAD (Enforcers, Skirmishers, Officers); Boone Strikeforce (Control Team, Marksman Team, Specialist Team); all ORK units (Korpus Straży, Strzyga Assaulters, Strzyga Hunters, Szabla); Banak Dust Element/Djinn; Headless Impisi (Veterans, Insurgents, Scrap King, Defenders); Chimera Krestonosets (Voyi, Besrovny, Rytsari). The ORK, Banak, Headless and Chimera factions exist in `factions.json` with no units, Force Cards or force rules.

---

## Sources

**Local** (`src/data/`): `units.json`, `dusters.json`, `dusterArmory.json`, `forceCards.json`, `specialRules.json`, `factions.json`, `rules.json`, `faq.json`, `burnCards.json`, `lore/factionLore.json`; also `src/types/index.ts`.

**Web.** Text was seen through search-result summaries only, because direct fetches were blocked by the proxy.
- https://www.blkoutgame.com/products/harlow-1st-reaction-force
- https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown
- https://www.blkoutgame.com/products/harlow-strikeforce-expansion
- https://www.blkoutgame.com/products/harlow-special-activities-division
- https://www.the-outpost.co.uk/product/blkout-harlow-special-activities-division-ess-blk-0135-pr/
- https://www.blkoutgame.com/products/un-raid-force-alpha
- https://store.401games.ca/products/blkout-un-raid-force-alpha
- https://www.blkoutgame.com/products/un-reserve-force (UN 3rd Battalion)
- https://www.blkoutgame.com/products/un-strikeforce-expansion
- https://www.blkoutgame.com/products/manticor-borz-group-force
- https://www.blkoutgame.com/products/manticor-strikeforce-expansion
- https://www.blkoutgame.com/products/task-force-boone-recon
- https://www.blkoutgame.com/products/boone-strikeforce-expansion
- https://www.blkoutgame.com/products/medium-duster-kit
- https://www.blkoutgame.com/products/heavy-duster-kit
- https://www.blkoutgame.com/products/ork-task-force-upyr
- https://www.blkoutgame.com/products/badlands-blkist-force-box
- https://www.blkoutgame.com/blogs/news/blklist-tactics
- https://www.blkoutgame.com/products/headless-ambush-force (Impisi Force)
- https://www.blkoutgame.com/products/chimera-krestonosets
- https://store.401games.ca/products/blkout-chimera-krestonosets
- https://blkout.wiki.gg/wiki/Harlow_Kinetic_Solutions
