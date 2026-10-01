# BLKOUT Weapons and Weapon Keywords Dossier

Game: BLKOUT (Enemy Spotted Studios), 32mm sci-fi skirmish set on the colony world ABOL, c. 2110.
Compiled 2026-10-01.

## Sources and how to read the citations

- **[repo]**: `src/data/*.json` (units, dusters, dusterArmory, specialRules, rules, faq, burnCards, forceCards, factions) and `src/components/shared/KeywordBadge.tsx`. Every stat line in the tables below comes from the repo, copied without changes.
- **[web: URL]**: web search results. **Caveat:** the sandbox's egress proxy blocked direct page fetches. Every WebFetch attempt failed with `EGRESS_BLOCKED`, including blkoutgame.com, scribd.com, blkout.wiki.gg, 4pcdn.org, theminiaturespage.com, wordpress.com and ccgwinkel.com. So the web material is limited to **search-engine excerpts** of these pages, not full first-hand reads. Treat web quotes as close paraphrases of the source. Some excerpts look truncated or merged, and these are flagged where it matters.
- **[inferred]**: my own analysis, not a rule.

Main web pages the excerpts came from:
- Official rule PDFs mirrored on Scribd: "BLKOUT PRINT AT HOME RULEBOOK" https://www.scribd.com/document/736639078/BLKOUT-PRINT-AT-HOME-RULEBOOK ; "BLKOUT Supplemental 01" https://www.scribd.com/document/733891432/BLKOUT-Supplemental-01 ; "BLKOUT - Universal Rules - Digital 1" https://www.scribd.com/document/911035216/BLKOUT-universal-Rules-digital-1
- Community wiki: https://blkout.wiki.gg/ (keyword excerpts)
- Official blog posts: https://www.blkoutgame.com/blogs/news/ (faction breakdowns, IMPACT Duster preview, Matched Play updates)

---

## 1. How shooting, damage and armor work

### 1a. What the repo says [repo: rules.json, faq.json]
- **Dice:** D10s only. Skill Check: "roll a number of D10 equal to the action's dice pool. Each die that meets or exceeds the target's Skill value is a success. Rolling a 10 (an Ace) counts as 2 successes." (1.1)
- **Shooting (3.1):** "Roll D10 equal to the weapon's Shots value. Each result meeting or exceeding the shooter's Skill value is a hit. Aces (10s) count as 2 hits. Apply weapon keywords, then the target makes an Armor Check."
  - Note: no weapon in the repo has a "Shots" field. The data only has `range`, `damage` and `keywords`.
- **Cover (3.2):** "Models in Cover impose -1D10 on the attacker's Shooting roll." Seeking and Melee ignore this.
- **Armor Checks (3.3):** "roll D10 for an Armor Check. The target number is the model's Armor value (e.g., Armor 6 means 6+ to save). AP (X) adds X to this target number. Each failed save applies 1 point of damage. Sustained (X) forces X successful saves to be rerolled."
- **Aces (faq-10):** an Ace "applies to all Skill Checks, including Shooting and Armor Checks."
- **Dusters (8.1, faq-7):** Dusters have "front/rear arcs, dual damage tracks" (Hull and Mobility). The attacker declares which track to target, and "when either track is filled, the Duster is destroyed."

### 1b. What official sources say [web]
- **Skill Check:** "roll 2D10 and compare the result to the Model's Skill. Each D10 that rolls equal to or higher than the Model's Skill is a Success." Aces (10s) count as 2 Successes, but "you can only Ace Skill Checks, not Armor Checks." [web: https://www.scribd.com/document/736639078/BLKOUT-PRINT-AT-HOME-RULEBOOK]
- **Shooting Action:** "you roll a Skill Check, adding a D10 if the Target is not in Cover and subtracting a D10 if the Target is in Cover. D10s in a Shooting Skill Check are called **Shots**." So the base is 2D10: 3 Shots against a target in the open, 1 Shot against a target in Cover. [web: same Scribd rulebook / Supplemental 01]
- **Damage:** "Each Success applies the Weapon's Damage." [web: Scribd rulebook]
- **Armor:** "The Target must make an Armor Check, rolling a number of D10 equal to the **first number** in their Armor. Each D10 that rolls equal to or higher than the **second number** prevents a point of Damage." The rulebook example: "Model B only has Armor 1/6, so it can only prevent one point of Damage total." [web: https://www.scribd.com/document/736639078/BLKOUT-PRINT-AT-HOME-RULEBOOK]
- **Matched Play cover (enhanced):** Full Cover subtracts a D10 only if the target is base-to-base with the terrain providing it. Partial Cover adds and subtracts nothing. [web: Scribd Supplemental / https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates]
- **Dusters (IMPACT update):** "Dusters no longer have a rear arc… they can rotate freely." To target Mobility, the shooter "must catch the Duster completely out of cover." [web: https://www.blkoutgame.com/blogs/news/impact-front-line-dusters]

### 1c. Plain-English summary [inferred, built from the official excerpts]
1. A shooter rolls **Shots**: 2D10, +1D10 if the target is in the open, -1D10 if it is in Cover. Keywords like Heavy add Shots, and Deployed caps them at 1.
2. Each die that is equal to or higher than the shooter's **Skill** is a success. A 10 counts as 2. Every success deals the weapon's **Damage**, so a Damage 2 weapon deals 2 per success.
3. The target makes an **Armor Check**. With **Armor "A/T"**, it rolls **A** dice, and each die of **T or higher** cancels 1 point of damage.
   - **"1/6"** means 1 Armor die that saves on 6+, so the model can cancel at most 1 point of damage per attack.
   - **"3/4"** means 3 dice saving on 4+.
   - **"3/2"** (Topor/Mattis) means 3 dice saving on 2+.
4. Any damage left over is applied to the model's damage track.

So **Damage** is "points per success". The **first Armor number** limits how much damage can ever be cancelled, and the **second number** is how reliably each die cancels.

Note on Skill [inferred, uncertain]: under the official wording a lower Skill is better (4+ beats 6+). Yet the repo gives elite units such as Veterans, Ubiytsa, UTG and the RFA units Skill 6, and line infantry Skill 4. This could be a repo data error, or a meaning of Skill that the excerpts don't show. I could not confirm from a primary source.

---

## 2. Keyword glossary

Format: repo text first [repo: specialRules.json], then the official or community wording where search excerpts surfaced it.
The `KeywordBadge.tsx` component matches tooltips by turning `(n)` into `(X)`. So "AP (2)" picks up the "AP (X)" entry, and every keyword in the data resolves to a definition [repo].

| Keyword | Repo text [repo] | Official / web text | Match? |
|---|---|---|---|
| **AP (X)** | "Adds X to the Target's Armor Check number. For example, AP (2) converts an Armor 3+ to 5+." | Rulebook excerpt: "AP (X): Add X to the Target of this Weapon's Armor Check number." [web: Scribd PRINT-AT-HOME]. Wiki excerpt: "Models suffering Damage from this Weapon roll -X Armor D10." [web: https://blkout.wiki.gg/ via search; Scribd Supplemental 01] | **Conflict between official versions**: the older print-at-home wording matches the repo. The newer Supplemental/Universal/wiki wording removes armor *dice* instead. |
| **Auto (X)** | "After shooting, the model may make up to X additional Shoot Actions. These additional shots cannot be Reacted to and must target models within 4\" of the initial target." | "allows a weapon to make X additional shooting actions after the first, before enemies can react, with these shots targeting enemy models within 4\" of the first target." [web: https://www.blkoutgame.com/blogs/news/impact-and-black-friday-launch] | Yes |
| **Blast (X)** | "When this weapon hits, it also hits X additional models within 2\" of the original target. Roll damage for each hit separately." | "Explosive Weapons, like grenades, include the Blast(X) Special Rule." A 25mm **Blast Marker** is placed. "After placing the Blast Marker the Shooting Model must make a Skill Check. For each Success, the Target suffers Damage equal to the Weapon's Damage." "Infantry within X\" of the Mark must make an Armor Check." [web: Scribd PRINT-AT-HOME / Supplemental 01] | **Differs**: officially it is a marker with an X-inch radius, not "X extra models within 2\"". One excerpt also reads "Explosive Weapons may not be used to Target Infantry Models", which may be truncated. |
| **CQB** | "Reroll all failed shots against targets within half range of the weapon." | "This Weapon may reroll all Failed Shots against a Target within half of its range." [web: Scribd rules via search]. Wiki excerpt: "This Weapon ignores Cover when Targeting Models from half of its Range." [web: blkout.wiki.gg via search] | Repo matches one official version. The wiki shows a different (possibly newer) wording. |
| **Cyclic** | "After a Shoot Action with this weapon, the model may make one additional Shoot or Ready Action." | "This Model may make one Shoot or Ready Action after a Shoot Action with the Cyclic Weapon." [web: Scribd Universal Rules / wiki] | Yes. One excerpt also attached "may reroll one Failed Shot" to Cyclic, which is probably bleed-over from Medium. |
| **Data Knife** | "Make a Data Attack Action (Skill Check). If successful, apply one Damage to an AI or Powered Model with no Armor Check allowed." | Excerpt (garbled): "may make a Data Attack Action… If it is successful, it may apply one … Damage to an AI or Powered Model within range of the Data Knife with no Armor Check allowed." [web: Scribd Universal Rules] | Yes |
| **Deployed** | "If the model moved during its Reposition Step, it may only roll 1D10 when shooting this weapon during its Activation. Reactions are unaffected." | "If the Model with this Weapon Moved during its Reposition Step it may never roll more than 1D10 when … in a Shooting Action." [web: Scribd Universal Rules] | Yes. The "Reactions are unaffected" clause was not seen in the excerpt. |
| **EMP** | "Can only apply Damage to units with the AI special rule. No Armor Check is allowed." | Present in the official list, but the text was cut off in the excerpts. | Unverified |
| **Heavy** | "Gain +1 Shot during Reactions and Activations where the model didn't Move during the Reposition Step." | "This Model gains +1 Shot during Reactions and Activations in which it didn't Move during the Reposition Step." / wiki: "+1 Shot if this Model did not Move" [web: Scribd; blkout.wiki.gg] | Yes |
| **Indirect** | "May use another model within the Group's line of sight to determine the target, but weapon range is measured from the original (firing) model." | "This Weapon may use another Model within its Group's line of sight to Target a Model, but Weapon range must be measured from the original Model." [web: Scribd Universal Rules] | Yes |
| **Jammer** | "Models within range ignore the effects of Pinned Markers on their Unit." | "Models within range of a Jammer ignore the effects of Pinned Markers on their Unit." Lore: "a 12\" bubble that nullifies the effects of Data Spikes and Knives." [web: Scribd Universal; https://www.blkoutgame.com/blogs/news/all-about-badlands] | Yes |
| **Medium** | "Reroll one Failed Shot when used in a Shoot Action." | "+1 Shot when Shooting." [web: Scribd Supplemental/Universal via search] | **Conflict**: the repo says a reroll, the web excerpt says +1 Shot. Low confidence on the web side. |
| **Melee** | "Never suffers -1D10 from Cover. When used in a Shooting Action, place the shooting model Base-to-Base with the target before resolving. Targets may only Return Fire with a Melee Weapon or Juke." | "This Weapon never suffers -1D10 from Cover." The base-to-base placement also appears in a garbled excerpt. [web: Scribd Universal Rules] | Yes, as far as visible |
| **Seeking** | "Does not suffer -1 Shot from the target being in Cover." | "This Weapon does not suffer -1 Shot from its Target being in Cover." [web: Scribd Universal Rules] | Yes |
| **Sustained (X)** | "The target must reroll X successful Armor D10 when making an Armor Check against this weapon." | "Target must roll X Armor D10 after marking. Each Failed D10 applies the Weapon's Damage to the Target." [web: Scribd Supplemental 01; blkout.wiki.gg] | **Differs**: officially it is a forced extra armor roll in which failures deal damage, not a reroll of successful saves. |

Non-weapon special rules that change how weapons interact [repo: specialRules.json]:
- **AI**: "Models may be affected by Special Rules that only affect AI Models." This matters for EMP and Data Knife.
- **Powered**: "powered combat suit with a separate damage track." Data Knife can target Powered models.
- **Low Tech**: "Cannot gain Pinned Markers from Data Attacks or be Targeted by Indirect weapons."
- **Drone**: "Cannot enter or participate in CQC…"
- **Shield**: "This model and one friendly Infantry model in Base-to-Base contact gain Cover…"
- **Jump (X)**: vertical movement.

---

## 3. Complete weapons table: unit weapons [repo: units.json]

"Base" means the unit's standard weapon. "Spec" means it is carried only by a named specialist slot.

| Weapon | Range | Dmg | Keywords | Carried by (faction - unit - base/spec) |
|---|---|---|---|---|
| FAL-32C | 24" | 1 | CQB | Harlow - Assault Team (base); Harlow - Control Team (base) |
| P34 | 24" | 1 | Cyclic, Heavy | Harlow - Assault Team (spec: Machine Gunner) |
| Grenade Launcher | 24" | 2 | Blast (1) | Harlow - Control Team (spec: Grenade Launcher); Manticor - Cyka Team (base); UN RFA - UTG Assaulters (spec: Grenadier) |
| FAL-32D | 24" | 1 | CQB, Sustained (1) | Harlow - Springbok AI (base) |
| Carbine | 18" | 1 | CQB | Harlow - Veterans (base); Harlow - Engineers (base); Boone - VAT Element (base) |
| Machetes | 2" | 1 | AP (1), Melee | Harlow - Veterans (base) |
| Pulse Grenades | 6" | 1 | Blast (1), EMP | Harlow - Veterans (base) |
| AT Launcher | 8-32" | 3 | AP (2), Blast (1) | Harlow - Engineers (spec: Engineer); UN 3rd Bn - Reserve Fireteam (spec: AT Specialist) |
| Self Destruct | 4" | 1 | AP (4), CQB | Harlow - Crikets (base; the model is removed after use) |
| AKMZ-2 | 24" | 1 | Medium | Manticor - Bratva Team (base); Manticor - Insertion Team (base) |
| HMG (Manticor) | 4-24" | 2 | Sustained (2), Deployed | Manticor - Bratva Team (spec: HMG) |
| SYY-1 | 24" | 1 | Cyclic, Heavy | Manticor - Insertion Team (spec: Machine Gunner); Manticor - Cyka Team (base) |
| SMG | 12" | 1 | CQB | Manticor - Cyka Bravo (base) |
| Boarding Axe | 2" | 1 | Melee, AP (3) | Manticor - Cyka Bravo, Ubiytsa, Ubiytsa Control Team (base) |
| Heavy Rifle (Manticor) | 12" | 1 | AP (3) | Manticor - Ubiytsa, Ubiytsa Control Team (base) |
| Heavy Rifle (Boone) | 24" | 1 | AP (1) | Boone - Recon Team (base) |
| M7 Carbine | 18" | 1 | CQB | UN RFA - UTG Assaulters, UTG Specialists (base) |
| Anti-Material Rifle | 32" | 2 | AP (2), Deployed | UN RFA - UTG Specialists (spec: Marksman) |
| FPR Auto | 24" | 1 | Sustained (1) | UN RFA - Golem Unit (base) |
| Screecher | 18" | 2 | Seeking | UN RFA - Golem Unit (spec: Fire Support) |
| Rifles (plain) | 24" | 1 | none | UN 3rd Bn - Reserve Fireteam (base) |
| Rifles (Medium) | 24" | 1 | Medium | UN 3rd Bn - Pointmen (base); UN Forces - BATCON (base) |
| Micro Grenades | 6" | 1 | Blast (1) | UN 3rd Bn - Reserve Fireteam; UN Forces - Raid Team, BATCON (base) |
| LMG | 32" | 1 | Cyclic, Heavy | UN 3rd Bn - Pointmen (spec: SAW Gunner); Boone - Recon Team (spec: SAW Gunner) |
| HMG (Peacemaker) | 6-32" | 1 | AP (2), Auto (1) | UN 3rd Bn - Peacemaker (base) |
| Missile System | 8-32" | 2 | AP (2), Blast (1) | UN 3rd Bn - Peacemaker (base) |
| PDW | 8" | 1 | none | UN Forces - UTG Mothers (base) |
| Elite Melee | 4" | 1 | AP (2), Cyclic, Melee | UN Forces - UTG Mothers (base) |
| Carbines | 18" | 1 | CQB | UN Forces - Raid Team (base) |
| Compact LMG | 24" | 1 | Cyclic, CQB | Boone - VAT Element (spec: SAW Gunner) |
| Gauss SAW | 32" | 1 | Cyclic, AP (2), Auto (2) | Boone - Razorback (base) |
| Razorback ATGM | 6-32" | 2 | Blast (1), Indirect | Boone - Razorback (base) |

Specialist slots that are not weapons [repo]:
- **Data Spike**: Harlow Control Team, Manticor Bratva Team; listed as a "Comms Bot" ability on UN Forces BATCON.
- **Data Specialist**: UN 3rd Bn Reserve Fireteam (no text). On Boone VAT Element it reads "Jammer 12\", Data Knife 6\"".
- **Team Leader / Sidewinder / Controller**: these are ability slots, not weapons.

Name collisions to watch [repo]:
- "HMG" has three different profiles: Manticor 4-24" D2 Sustained(2) Deployed; Peacemaker 6-32" D1 AP(2) Auto(1); Aveles Duster 8-32" D2 AP(4) Auto(2) CQB.
- "Heavy Rifle" has two profiles: Manticor 12" AP(3) and Boone 24" AP(1).
- "Rifles" appears with and without Medium.

### Armory weapons (Combat Loads) [repo: forceCards.json]
The units with 0 Combat Loads (Peacemaker, Razorback) cannot draw from the armory.

| Faction | Item | Range | Dmg | Keywords / ability |
|---|---|---|---|---|
| Harlow | Boost Jump | - | - | Model gains Jump (4) |
| Harlow | Frag Launcher | 24" | 1 | Sustained (2), Medium |
| Harlow | Head | 16" | 4 | Blast (1) |
| Harlow | Micro Launcher | 4-16" | 2 | Blast (1), Heavy |
| UN Raid Force Alpha | Boost Jump | - | - | Model gains Jump (6) |
| UN Raid Force Alpha | Lance | 12" | 1 | AP (3) |
| UN Raid Force Alpha | Micro Launcher | 4-16" | 2 | Blast (1), Heavy |
| UN Raid Force Alpha | Surge | 16" | 2 | EMP |
| UN 3rd Battalion | Boost Jump | - | - | Model gains Jump (4) |
| UN 3rd Battalion | Corner Chasers | 16" | 1 | CQB, Indirect |
| UN 3rd Battalion | Microwave Gun | 8" | 1 | EMP |
| UN 3rd Battalion | Shotgun | 8" | 1 | AP (3), CQB |
| Manticor Borz | Air Burst Rifle | 24" | 1 | Seeking |
| Manticor Borz | RPG33 | 16" | 4 | Blast (1) |
| Manticor Borz | Strip Grenades | 6" | 2 | Blast (2) |
| Manticor Borz | Thermite Launcher | 8" | 1 | Sustained (6) |
| Task Force Boone | Disposable Launcher | 4-18" | 3 | Blast (1) |
| Task Force Boone | Pulse Grenade | 6" | 1 | EMP, Blast (1) |
| Task Force Boone | Smoke Grenade | - | - | Smoke Token within 4" of a Grunt before Repositioning |
| Task Force Boone | Tracking Bombs | 16" | 1 | AP (2), Indirect |

UN Forces has no force card or armory in the repo.

---

## 4. Dusters [repo: dusters.json, dusterArmory.json]

| Chassis | Skill | Mobility | Armor | Weapons | Special |
|---|---|---|---|---|---|
| Caber | 5 | 12 | 3/4 | MMG 4-32" D1 AP(2) Auto(2) CQB; Sword 6" D2 AP(4) Auto(2) CQB | Jump (8) |
| Topor | 5 | 8 | 3/2 | 30MM 12-48" D3 AP(4) Auto(1) Deployed; MMG 4-32" D1 AP(2) Auto(2) CQB | none |
| Mattis | 5 | 8 | 3/2 | 30MM 12-48" D3 AP(4) Auto(1) Deployed; Axe 4" D2 AP(4) Auto(2) CQB | Jump (4) |
| Aveles | 5 | 10 | 3/3 | HMG 8-32" D2 AP(4) Auto(2) CQB; Fist 2" D1 AP(4) Auto(1) CQB | Jump (8) |

Web cross-checks [web: Duster kit store pages and https://www.blkoutgame.com/blogs/news/impact-front-line-dusters]:
- Topor: "stabilized 30mm cannon and belt-fed MMG". Matches the repo.
- Caber: "14.5mm machine gun and a brutal kinetic sword". This is the repo's MMG + Sword.
- Heavy kit: Topor and Mattis "both … feature the powerful 30mm cannon". Matches.
- Note: the Duster melee weapons (Sword/Axe/Fist) carry **CQB, not Melee**, in the repo. I could not verify this against an official card.

### Duster Armory [repo: dusterArmory.json]

| Item | Effect |
|---|---|
| Smoke Discharge | "Place a Smoke Marker within 8\" of this Model before Repositioning." |
| TOW | Weapon: 8-32", Damage 3, AP (2) |
| Boost | "This Model's mobility may not be Targeted during this Action. It gains Cover if it doesn't have it." |
| Cluster | Weapon: 8-32", Damage 1, Blast (4) |
| Targeting Array | "This Model may ignore Cover when Targeting Infantry Models during this Action." |

The official IMPACT preview describes the Duster armory as including "smoke dischargers, anti-tank missiles, and the ability to ignore infantry cover", which matches Smoke Discharge, TOW and Targeting Array [web: https://www.blkoutgame.com/blogs/news/impact-front-line-dusters].

---

## 5. Analysis [inferred]

All of this analysis is [inferred] from repo stats plus the official core loop (each success deals the weapon's Damage, and Armor A/T cancels at most A points).

**Key structural point:** most infantry have Armor 1/x, so they cancel **at most 1 point** per attack. That means:
- Any Damage 2+ weapon, or any attack with 2+ successes, will very likely get through.
- AP matters far less against infantry than raw Damage and Shot count do.
- Against 3/x targets (Pointmen, Peacemaker, Golems, Razorback, Dusters), Damage per success and AP become decisive.

### Best anti-infantry [inferred]
1. **Gauss SAW** (Razorback): 32", Cyclic + Auto (2). It can chain up to 3 Shoot Actions plus a Cyclic follow-up on targets within 4" of each other, and AP (2) strips 1-die armor entirely under either AP reading.
2. **LMG** (32", Cyclic, Heavy): best long-range specialist gun. With Heavy (+1 Shot when stationary) and Cyclic (a second Shoot), it gets the most dice per activation of any infantry weapon. Boone's Overwhelming Fire drill further protects Cyclic models from Return Fire [repo: forceCards]. **P34** and **SYY-1** are the same profile at 24".
3. **Peacemaker HMG** (Auto (1), AP (2), 6-32"). The official blog calls it able to "decimate infantry" [web: https://www.blkoutgame.com/blogs/news/un-3rd-battalion-overview].
4. Blast weapons against bunched units: **Strip Grenades** (Blast (2), D2) and the Duster **Cluster** (Blast (4)) are the widest splash. Manticor's own force rule ignores the first point of Blast damage, so Blast is weaker into Manticor.

### Best anti-armor / anti-Duster [inferred]
- **30MM** (Topor/Mattis): D3, AP (4), Auto (1), 12-48" reach. It is the heaviest sustained anti-armor gun, but it is Deployed, so it drops to 1D10 if the Duster moved.
- **RPG33** and **Head** (16", D4, Blast (1)): the highest Damage per success in the game, available as armory one-shots. Each success is 4 damage, which overwhelms 3-die armor.
- **AT Launcher** (D3, AP (2), Blast (1), 8-32") and Duster **TOW** (D3, AP (2), 8-32"). The **Disposable Launcher** (D3, Blast (1), 4-18") is Boone's version without AP.
- **Anti-Material Rifle** (32", D2, AP (2), Deployed). The official blog says it "will one-shot infantry and can destroy most vehicles in one shot" and becomes "a cannon" with RFA's Cross Fire drill (+1 Damage) [web: https://www.blkoutgame.com/blogs/news/un-raid-force-alpha].
- **Thermite Launcher** (Sustained (6), 8"). Under official Sustained it forces 6 extra armor dice, each failure dealing damage, which makes it a heavy-target killer. The official breakdown calls it "great to take down large or heavy targets" [web: https://www.blkoutgame.com/blogs/news/manticor-borz-group-breakdown]. Under the repo's "reroll X successes" wording it would be much weaker against 1-die infantry. This is a good example of why the Sustained discrepancy matters.
- **Against AI targets:** EMP (Surge D2 16", Microwave Gun, Pulse Grenades) and Data Knife skip armor entirely. This works against Golems, Pointmen, Peacemaker, Razorback and Crikets. The repo does not tag Dusters as AI.

### Best close-quarters [inferred]
- **Duster Sword** (Caber, 6", D2, AP (4), Auto (2)) and **Mattis Axe** (4", D2, AP (4), Auto (2)) are the strongest close-range weapons in the data.
- Among infantry: **Elite Melee** (UTG Mothers: AP (2), Cyclic, Melee, 4" reach) is the best melee weapon. **Boarding Axe** (AP (3)) is the best common melee weapon.
- **Shotgun** (8", AP (3), CQB) and **Compact LMG** (Cyclic + CQB at 24") are the best close-range guns.
- **Crikets' Self Destruct** (AP (4), CQB, 4") is a one-use suicide hit.
- Melee targets can only answer with Melee or Juke [repo: specialRules / faq-6].

### Notable comparisons [inferred]
- **FAL-32C vs Carbine vs M7:** all are D1 CQB, but FAL-32C reaches 24" (CQB rerolls inside 12") while Carbine/M7 reach 18" (CQB inside 9").
- **FAL-32D** (Springbok) is a FAL-32C plus Sustained (1): a strict upgrade.
- **AKMZ-2 / Medium Rifles vs plain Rifles:** Medium is the only difference, and its meaning is disputed (reroll vs +1 Shot).
- **Manticor Heavy Rifle (12", AP 3)** vs **Boone Heavy Rifle (24", AP 1)**: same name, opposite trade-off between punch and reach.
- **Grenade Launcher (24", D2, Blast 1)** is unlimited-use (official Harlow blurb [web: https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown]). It out-ranges the 6" Micro Grenades by 4x.
- **Micro Launcher** (armory) has a 4" minimum range and Heavy, so it rewards staying still.

---

## 6. Discrepancies

### Repo vs official / web
1. **AP (X):** the repo says it adds X to the armor target number, matching the older print-at-home rule. The newer Supplemental/wiki wording says the target rolls X fewer Armor D10. The repo's example ("Armor 3+ to 5+") also uses an older single-number armor notation, while unit cards use "A/T".
2. **Sustained (X):** the repo says reroll X successful saves. Official says the target rolls X extra Armor D10, and each failure applies Damage.
3. **Medium:** the repo says reroll one failed Shot. The web excerpt says +1 Shot.
4. **CQB:** the repo says reroll failed Shots within half range, matching one official version. The wiki says it ignores Cover within half range.
5. **Blast (X):** the repo says X extra models within 2". Official uses a 25mm Blast Marker with an X-inch radius and armor checks for infantry, plus a possibly truncated line that Explosive Weapons "may not be used to Target Infantry Models". faq-1 ("AP and HE modes") and faq-12 have no counterpart in the excerpts found.
6. **Aces on Armor Checks:** repo faq-10 says Aces apply to Armor Checks. Official says "you can only Ace Skill Checks, not Armor Checks."
7. **Armor notation:** repo rules 3.3 ("Armor 6 means 6+") ignores the first number of "1/6". Officially that first number is the number of armor dice.
8. **Shots:** repo rules 3.1 refers to a weapon "Shots value" that no weapon in the data has. Officially Shots are 2D10, plus or minus 1 for cover.
9. **Duster arcs:** repo rules 8.1 says "front/rear arcs". The official IMPACT update says Dusters "no longer have a rear arc".
10. **Peacemaker:** the official overview says it mounts "a HMG and missile system **with a jammer**". The repo Peacemaker has no Jammer.
11. **UTG Assaulters:** the official RFA breakdown lists "Carbines, Jump Packs, Grenade Launchers, and **melee weapons**". The repo has no melee weapon on Assaulters.
12. **Cyka Team:** the official blurb calls its gun an "LMG". The repo names it SYY-1 (Cyclic, Heavy), which may simply be the in-universe name.
13. **Thermite Launcher:** the official breakdown calls it "single use". The repo has no single-use flag (Combat Load rules may cover this).

### Internal repo inconsistencies
- Three different "HMG" profiles, two "Heavy Rifle" profiles, and two "Rifles" profiles.
- Seeking says "-1 Shot" while Cover (3.2) and Melee say "-1D10". These are equivalent if Shots are D10s.
- The Skill values (elites at 6, line troops at 4) look inverted if Skill is a meet-or-beat target number, as both repo 1.1 and the official text say.
