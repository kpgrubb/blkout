# BLKOUT Faction Dossier

Research date: 2026-10-01. Setting: planet ABOL (Proxima Centauri), main game era 2103–2104 ("BLKOUT" begins 2104) [repo: lore/timeline.json].

## Read this first: provenance and limits

- **[repo]** means the claim comes from `src/data/` (factions.json, forceCards.json, units.json, lore/*.json, specialRules.json, faq.json, killwager.json).
- **[web: URL]** means the claim comes from web search. **Important:** every attempt to fetch a page directly with WebFetch or curl was blocked by network restrictions during research. This covered blkoutgame.com, blkout.wiki.gg, scribd, irondice.org, ontabletop, leadadventureforum, retailer sites and blogspot. So every web claim here comes from **search-engine result summaries** of the cited URL, not from reading the page. Treat web claims as **medium confidence**, and never as exact rules wording. **No exact force-rule wording was confirmed from an official source.** All verbatim force rules below come from the repo.
- **[inferred]** means my own tactical analysis, built from the repo stats and keywords. It is not official.
- Repo keyword glossary (from specialRules.json): CQB = reroll failed shots within half range. Cyclic = an extra Shoot/Ready after shooting. Heavy = +1 shot if the model didn't move. Sustained (X) = the target rerolls X successful armor dice. Low Tech = immune to Data Attack pins and to Indirect targeting. Shield = Cover for self and one friendly model in base contact. Jump (X) = vertical movement. Ace (a natural 10) = 2 successes [repo: faq.json].

---

## Faction roster: repo compared with official sources

| Faction | Repo id / code | Repo allegiance | Official status (web) |
|---|---|---|---|
| Harlow 1st Reaction Force | harlow / HFR | authority | Playable core force [web] |
| UN Raid Force Alpha | un-raid-force-alpha / RFA | authority | Playable core force [web] |
| UN 3rd Battalion | un-3rd-battalion / UNR | authority | Playable core force [web] |
| UN Forces | un-forces / UNF | authority | **No official faction by this name.** Its units are in the "UN Strikeforce" expansion [web] |
| Manticor Borz Group | manticor-borz / MBG | chimera | Playable core force [web] |
| Task Force Boone | task-force-boone / TFB | independent | Playable core force (Recon) [web] |
| ORK | ork / ORK | authority | Was "For Hire" (Szabla BLKLIST unit). Now has a core force: **ORK Task Force Upyr** [web] |
| Banak Strategic | banak / BNK | independent | "For Hire" BLKLIST unit (Badlands) [web] |
| The Headless | the-headless / THL | headless | Lore faction. Playable only through the **Headless Power Card** (mixed-faction groups) [web] |
| Chimera | chimera / CHM | chimera | Lore faction until recently. Now has a playable core force: **CHIMERA: Krestonosets** (released Sept 2026) [web] |
| **Black Pact** | *missing* | — | Playable core force [web] |
| **Impisi** | *missing* | — | Playable core force (Labyrinth expansion; Headless-aligned) [web] |
| **Harlow Special Activities Division (SAD)** | *missing* | — | New Harlow core force (Conquest starter) [web] |
| Janus, Sabra, IRAFEL, PAOC/Ibragim | *lore mentions only* | — | Lore/minor factions, not playable [web] |

Sources for the roster: [web: https://blkout.wiki.gg/wiki/Factions], [web: https://blkout.wiki.gg/wiki/Minor_Factions], [web: https://www.blkoutgame.com/blogs/news/q2-matched-play-updates], [web: https://www.blkoutgame.com/products/chimera-krestonosets], [web: https://www.blkoutgame.com/products/ork-task-force-upyr], [web: https://www.blkoutgame.com/products/harlow-special-activities-division].

Per search summaries, the wiki's Factions page lists these as **playable**: UN (Raid Force Alpha, 3rd Battalion), Task Force Boone, Harlow Kinetic Solutions, Manticor Borz, Black Pact and Impisi. It lists Banak Strategic and P3 (ORK – Szabla Group) as "For Hire" factions that can attach to any playable faction. It lists PAOC (Ibragim), Chimera, The Headless and IRAFEL as lore-relevant only, with Janus and Sabra as minor factions [web: https://blkout.wiki.gg/wiki/Factions]. That wiki snapshot is older than the Chimera Krestonosets and ORK Task Force Upyr releases.

---

## 1. Harlow 1st Reaction Force (HFR)

- **Allegiance:** The Authority [repo]. Harlow Kinetic Solutions is the Authority's primary enforcement arm and replaced the original UN Peacekeepers [repo: factionLore.json].
- **Lore:** Harlow is a PMC that draws many members from Western Tier 1 forces. It landed with the Second Wave in 2080 to support UN counter-insurgency. It is known for efficiency and brutality, and keeps getting contract renewals despite public discontent [repo]. The 1st Reaction Force recruits "from the most brutal of their Earth based forces", equipped with "jump jets, smart weapons, and combat inorganics" [web: https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown].
- **Force rule (repo wording):** "Harlow First Reaction Force Units gain +2 Movement when Sprinting." [repo]. The web agrees in substance: "force rules add movement to their sprint actions" [web: breakdown URL above]. Exact official wording is not verified.
- **Battle Drills [repo: forceCards.json]:**
  - *Assaulters*: no Overwatch against the unit while it Repositions.
  - *Chaff*: a smoke token that dissipates only on a 10+.
  - *Stims*: +2 Movement.
- **Armory [repo]:** Boost Jump (Jump 4), Frag Launcher, "Head" (16", Dmg 4, Blast 1), Micro Launcher.
- **Signature units [repo: units.json]:**
  - Assault Team: Sk4, A 1/6, 2 Combat Loads (CL). P34 Cyclic/Heavy MG gunner; the Team Leader passes Ready tokens.
  - Control Team: activates a follow-on unit without spending a Control Point (CP). Has a Data Spike and a grenade launcher.
  - **Springbok AI**: Sk6, A 2/6, FAL-32D with CQB and Sustained (1). The web calls them "the essential Harlow units… two extremely fast and durable AIs… can completely ignore overwatch reactions" [web: breakdown URL].
  - Strikeforce units: Veterans (Low Tech, Jump 4, machetes, EMP pulse grenades), Engineers (AT launcher), and Crikets (self-destruct AI drones that don't count toward the unit limit when grouped with Engineers) [repo]. The web confirms the Strikeforce contents (3 Veterans, 2 Engineers, 2 "Crickets") [web: https://www.blkoutgame.com/products/harlow-strikeforce-expansion].
- **Playstyle:** "the fastest force in BLKOUT… battledrills block reactions… smoke only dissipates on a roll of 10 or higher"; "plays fast and brutal but is a very high-skill ceiling force" [web: breakdown URL].
- **Strengths [inferred]:** tempo and mobility (Sprint +2, Stims, Jump), denial of Overwatch, good armor saves (x/6), activation chaining through the Control Team, and strong anti-AI tools (EMP pulse grenades on the Veterans).
- **Weaknesses [inferred]:** base Skill 4 on line infantry, low armor dice count (1/6), and few models. It is punished if a fast unit overextends without support. Crikets are one-use.
- **How to play [inferred]:** Use Chaff or Assaulters to cross firing lanes. Then strike with Springboks or the Assault Team, whose P34 is best when stationary (Heavy). Chain activations with the Control Team so the opponent cannot react in between. Use Veterans against Data-Attack-heavy or AI-heavy lists.

## 2. Harlow Special Activities Division (SAD) — not in repo

- **Status:** a new Harlow core force, also sold in the "Conquest" 2-player starter against Chimera [web: https://www.blkoutgame.com/products/harlow-special-activities-division], [web: https://www.blkoutgame.com/products/2-player-starter-set-conquest].
- **Lore/role:** "the Authority's counter insurgency strike team", built for "command and control, advancing and eliminating in a fluid motion" [web].
- **Units [web]:**
  - SAD Enforcers: powered, with a CQC sword.
  - SAD Skirmishers: PDWs and micro-grenades, with FPV drone targeting.
  - SAD Officers: skilled shooters with "first reactions" and counter-EWAR.
  - The box has 8 models.
- **Force rule:** not found.
- **Strengths, weaknesses and how to play:** not assessed, because there are no stats [inferred: not enough data].

## 3. UN Raid Force Alpha (RFA)

- **Allegiance:** The Authority [repo].
- **Lore:** These are the products of the UN **Twin Moons Program**: gene-therapy-enhanced women "trained from birth", fighting in pairs. In the UTG hierarchy, "Athena" (mothers) are officers and "Artemis" (daughters) are NCOs, and they can self-replicate. They are supported by **Golem** drones carrying the consciousness of fallen combatants. UTG-003 "Hera" was the first combat-ready UTG [repo: factionLore.json]. The web describes RFA as "cybernetically and genetically enhanced operatives working alongside armored Golem drones… the most elite force in BLKOUT" [web: https://www.blkoutgame.com/blogs/news/un-raid-force-alpha].
- **Force rule (repo wording):** "All UN Raid Team Alpha UTG Assaulter and Specialist Units gain an additional D10 roll in all Skill Checks, including Shooting and Close Quarters Combat (CQC)." [repo]. The web agrees: "UTG models in the force will always roll an additional D10 in skill checks… the most powerful [force rule] in the game" [web: same URL].
- **Battle Drills [repo]:**
  - *Close Assault*: a 2" move into CQC after activating.
  - *Cross Fire*: +1 Damage when several models target one enemy.
  - *Switchback*: smoke plus a 2" pre-move.
- **Armory [repo]:** Boost Jump (Jump 6), Lance (AP 3), Micro Launcher, Surge (16", Dmg 2, EMP).
- **Signature units [repo]:**
  - UTG Assaulters: Sk6, A 1/5, Jump 4, M7 carbine, grenadier.
  - UTG Specialists: anti-materiel rifle, 32", Dmg 2, AP 2, Deployed.
  - Golem Unit: AI, A 3/5, FPR Auto Sustained (1), Screecher Seeking.
  - The web says the box holds 2 Assaulters, 2 Specialists and 4 Golems, with "Only 2 Golems… deployed during normal play" [web: same URL].
- **Playstyle:** an elite force with low model count. "Each model… is worth 2-3 of a regular unit" [web].
- **Strengths [inferred]:** Sk6 plus an extra die is the most reliable shooting and CQC in the repo data. Cross Fire focus-fire, long-range anti-armor, and vertical mobility round it out.
- **Weaknesses [inferred]:** very few models, so every loss is a large share of the force, and it is vulnerable to Blast and to being outnumbered in activations. Golems are AI, which makes them exposed to EMP and Data Knife effects.
- **How to play [inferred]:** Pair models on one target to get the Cross Fire bonus. Keep Specialists stationary in long lanes, because their rifle is Deployed. Use Golems as the durable anchor and Assaulters for the decisive close strike (Close Assault). Avoid trading in the open.

## 4. UN 3rd Battalion (UNR)

- **Allegiance:** The Authority [repo].
- **Lore:** Veterans of the "Yellow Riots" (the Yellow Revolution, 2077) and the professional arm of UN Force Command. They carry smart rifles and Combat Kinetic Suits and are supported by "Pointman" inorganics [repo].
- **Force rule (repo wording):** "All UN 3rd Battalion non-AI Infantry Models that are Base-to-Base with another Infantry Model may re-roll all Failed Shots with non-Armory weapons." [repo]. The web search summary names the rule **"Strength in Unity"** and describes it as moving reservists into base contact with a Pointman to gain the Shield ability [web: https://www.blkoutgame.com/blogs/news/un-3rd-battalion-overview]. **Possible discrepancy:** the official overview may describe a different or older rule version, or the summary may have mixed the rule up with the Pointmen's Shield. This needs checking against the force sheet.
- **Battle Drills [repo]:**
  - *Arsenal*: a free Armory use.
  - *Peel Back*: a 2" move after activating.
  - *Switchback*.
- **Armory [repo]:** Boost Jump, Corner Chasers (Indirect, CQB), Microwave Gun (EMP), Shotgun (AP 3, CQB).
- **Signature units [repo]:**
  - Reserve Fireteam: M7, Sk4, 2 CL, Data Specialist, AT Specialist.
  - Pointmen: AI, A 3/6, Shield, LMG 32" Cyclic/Heavy.
  - Peacemaker: AI drone, A 3/6, HMG AP 2 Auto (1), Missile System.
  - The web agrees on all three ("Reservists… data spike, and an AT launcher"; Pointmen "shield ability and an LMG"; the Peacemaker's missiles are "a nightmare for larger threats like Dusters") [web: overview URL].
- **Playstyle:** "rewards careful positioning and teamwork" [web].
- **Strengths [inferred]:** dependable shooting rerolls while in formation, and the Pointmen Shield gives cover anywhere. The Peacemaker is anti-Duster and anti-heavy. Overwatch zones are strong.
- **Weaknesses [inferred]:** base-to-base clumps are vulnerable to Blast (the Manticor and Boone ATGM). Two of its three units are AI and vulnerable to EMP and Data Knife (Boone VATs, Harlow Veterans). It is slow to reposition.
- **How to play [inferred]:** Advance in pairs, with Reservists base-to-base with Pointmen to get both the reroll and cover. Use the Peacemaker as long-range fire support against powered, Duster or AI targets. Use Peel Back to break line of sight after shooting.

## 5. "UN Forces" (UNF) — repo-only grouping

- **Repo:** described as general UN forces: UTG Mothers, Raid Team and BATCON. The force rule is **empty**, and the lore is generic [repo].
- **Official:** these three units are the contents of the **UN Strikeforce** expansion. UTG Mothers are "elite melee combatants bonded through neural conditioning"; Raid Team Grunts carry carbines and micro-grenades; BATCON are "data warfare specialists with armored AI bot support" [web: https://www.blkoutgame.com/products/un-strikeforce-expansion]. No standalone "UN Forces" faction or force card was found.
- **Discrepancy:** the repo treats an expansion as its own faction. Officially these are likely add-on units for the UN forces, probably Raid Force Alpha given the UTG and Raid theme [inferred]. That would need confirmation.
- **Units [repo]:**
  - UTG Mothers: M4, Sk6, A 2/5, Elite Melee AP 2 Cyclic.
  - Raid Team: Sk6, 3 CL.
  - BATCON: activates a follow-on unit without spending CP; Comms Bot with Data Spike.
- **How to play [inferred]:** Use them as additions to a UN list. Mothers act as CQC hammers, the Raid Team as a flexible elite fireteam, and BATCON for tempo and data attacks.

## 6. Manticor Borz Group (MBG)

- **Allegiance:** the repo puts it under "chimera". Its lore calls Manticor Borz "the formidable right arm of Chimera" [repo]. The web describes Manticor as "primarily an anti-UN faction taking jobs against them, though recently… the UN hiring Manticor in their fight against Task Force Boone" [web: https://blkout.wiki.gg/wiki/Manticor_&_Chimera], and the Borz Group as "augmented commandos forged in Chimera's labs and hardened across a dozen proxy wars" [web: https://www.blkoutgame.com/blogs/news/manticor-borz-group-breakdown]. **Nuance:** Manticor appears to be a mercenary power allied with Chimera, not strictly part of Chimera.
- **Lore:** Manticor prides itself on physical strength and wears heavy ballistic armor. Chimera's integration gave it bionic augmentation and the Cyka powered suits [repo].
- **Force rule (repo wording):** "Manticor Borz Group Models ignore the first point of Damage suffered from a Blast Weapon." [repo]. The web agrees in substance: "makes them harder to take down with explosives" [web: breakdown URL].
- **Battle Drills [repo]:**
  - *Linked*: shares a Ready token.
  - *Targeting Smoke*: the unit ignores its own smoke.
  - *Thorax Shields*: +1D10 armor.
- **Armory [repo]:** Air Burst Rifle (Seeking), RPG33 (Dmg 4, Blast 1), Strip Grenades (Blast 2), Thermite Launcher (Sustained 6).
- **Signature units [repo]:**
  - **Bratva Team**: Shield, HMG Dmg 2 Sustained (2) Deployed, Data Spike; adds an Initiative die. The web calls it "one of the best units in the game" [web: breakdown URL].
  - Insertion Team: SYY-1 Cyclic/Heavy MG; the Sidewinder applies pins.
  - Cyka Team and Cyka Bravo: Powered, A 2/4.
  - Ubiytsa and Ubiytsa Control Team: Sk6, Low Tech, AP 3 heavy rifles and boarding axes. These are Strikeforce units [web: https://www.blkoutgame.com/products/manticor-strikeforce-expansion].
- **Playstyle:** "heavily armored and slower, with a primary focus on overwhelming firepower and mobility denial" [web: breakdown URL].
- **Strengths [inferred]:** durability (Blast immunity on the first point of damage, Shield, Powered suits, Thorax Shields). Pins through Sidewinder and Data Spike, Initiative control through Bratva, and Low Tech Ubiytsa resist data play.
- **Weaknesses [inferred]:** armor saves of 4+ (x/4) are worse than the x/5 and x/6 of other factions. Also lower speed and Deployed HMGs that want to stay still. AP-heavy weapons (Lance, Shotgun, Gauss SAW) blunt its armor advantage.
- **How to play [inferred]:** Take ground methodically. Park the Bratva HMG in a firing lane and pin key enemy units with Sidewinder and the Data Spike. Push Cyka Bravo or Ubiytsa through cover to break entrenched or armored targets. Use Targeting Smoke to deny enemy lines of fire while you keep your own.

## 7. Task Force Boone (TFB)

- **Allegiance:** "independent" in the repo. Officially it is the **United Martian Protectorate (UMP)**, Mars: "an expeditionary brigade combat team deployed… to enact regime change on ABOL" [web: https://blkout.wiki.gg/wiki/Task_Force_Boone], [web: https://www.blkoutgame.com/products/task-force-boone-recon].
- **Lore:** Boone fought a war against UN forces in Earth's solar system before arriving at ABOL in 2104. Its planet-wide nuclear EMP attack triggered the BLKOUT itself [repo]. It is "hardened by years of orbital and zero-G combat" [web].
- **Force rule (repo wording):** "Once Per Round one non-AI or Powered Infantry Model may make the Data Attack Action." [repo]. The web agrees: "allows one model per round to perform a data attack action—even without a data spike" [web: https://www.blkoutgame.com/blogs/news/task-force-boone-recon-overview].
- **Battle Drills [repo]:**
  - *Overwhelming Fire*: limits Return Fire against Cyclic units.
  - *Small Unit Tactics*: up to half of the unit shoots during the Reposition step.
  - *Tactical Positioning*: -1D10 to Overwatch against the unit.
- **Armory [repo]:** Disposable Launcher, Pulse Grenade (EMP), Smoke Grenade, Tracking Bombs (Indirect, AP 2).
- **Signature units [repo]:**
  - Recon Team: Heavy Rifle AP 1, LMG gunner, Team Leader.
  - **VAT Element** (Void Assault Troopers): Sk6, Jump 4; Data Specialist with Jammer 12" and Data Knife 6"; compact LMG.
  - **Razorback**: AI drone, A 3/4, Gauss SAW Cyclic AP 2 Auto (2), ATGM Indirect.
  - The web gives the Recon box as **3 VAT Elements + 1 Razorback** [web: overview URL]. It calls the recon/pathfinder elements "Pathfinders… equipped with the M7 Rifle" [web: search summary of the TFB pages], and the Headless Power Card example lists a "Task Force Boone Pathfinder Unit" [web: Q2 Matched Play Updates].
- **Playstyle:** "emphasis on synergy and tactical depth"; "fire, maneuver, and finish" [repo, web].
- **Strengths [inferred]:** the best electronic-warfare kit in the repo data (a free Data Attack each round, Data Knife, Jammer, EMP). Overwatch suppression, Indirect fire (ATGM, Tracking Bombs), and two Cyclic LMGs for wiping out fireteams.
- **Weaknesses [inferred]:** Recon Team and Razorback are Sk4. Low Tech enemies (Harlow Veterans, Ubiytsa) ignore its pin game. The Razorback is AI and vulnerable to opposing EMP. The force needs careful sequencing.
- **How to play [inferred]:** Open each round with the free Data Attack to pin the biggest threat. Advance under Tactical Positioning. Use Small Unit Tactics so half the unit fires before the rest moves. Data Knife enemy AI and Powered models, and let the Razorback's Indirect ATGM punish units hiding in cover.

## 8. ORK (Rozwiązania Konfliktów Orłów) / P3

- **Allegiance:** The Authority [repo]. Szabla "has served the Authority under UN Charter since arriving on planet in the First Wave" [web: https://www.blkoutgame.com/products/badlands-blkist-force-box].
- **Lore:** ORK is the military arm of the Polish state company P3, made up mainly of former Polish Special Forces. It grew from mining security into patrol and QRF work during the Yellow Revolution and fought a covert Shadow War against PAOC/Ibragim using **Strzyga** covert teams. It is the second-largest PMC on ABOL, with gear such as the T3 "Czaska" Kinetic Suite and the AM-190 Linear Gauss Rifle [repo].
- **Playable forms (web):**
  - **Szabla** BLKLIST unit (Badlands): 2 riflemen with FB-M3B battle rifles, an EWAR operative, and a heavy marksman with the AM-190. It introduces "the game's first jammer" [web: Badlands BLKLIST URL].
  - **ORK: Task Force Upyr** core force: 4 Korpus Straży (heavy rifles, AP rounds, specialist support) and 2 Strzyga Assaulters (SMGs, micro-grenades) [web: https://www.blkoutgame.com/products/ork-task-force-upyr].
- **Force rule:** **none in the repo (empty string)**, and none found on the web.
- **Repo units:** **none**. units.json has no ORK entries.
- **Playstyle:** Szabla is "durable and defensive" [web: search summary of the Badlands pages]. TF Upyr pairs a disciplined line force with a fast direct-action arm [web].
- **How to play [inferred, low data]:** Use the Korpus Straży and Szabla to hold ranged lanes and resist data attacks with the Jammer and EWAR. Commit the Strzyga for close-range strikes.

## 9. Banak Strategic (BNK)

- **Allegiance:** independent [repo]. Officially it is a "For Hire" BLKLIST unit that can join other factions [web: wiki Factions].
- **Lore:** founded in 2084 by Hakob Dharbinyan from the remnants of Ibragim Strategic, after a split with PAOC over a secret project. Banak is a leading Badlands extraction team with advanced bionics and Kinetic Suits. It came into conflict with the Authority over old-world tech recovered from a quarantine zone (the SOC-SAR incident) [repo].
- **Playable form (web):** the Badlands BLKLIST unit. It has 2 Banak Grunts (PM50 subguns, disposable launchers), a Data Specialist, and a "near-inorganic Djinn" with the AP MASX-101 rifle. It introduced the offensive **Data Knife**. "Excels in speed and maneuverability" [web: https://www.blkoutgame.com/products/badlands-blkist-force-box]. The Headless Power Card example lists a "Banak Dust Element" [web: Q2 Matched Play Updates].
- **Force rule:** none in the repo, and none found. As a BLKLIST unit it probably has none of its own [inferred].
- **Repo units:** none.
- **How to play [inferred]:** Use it as a fast anti-AI raider. Knife Golems, Pointmen, Springboks and Razorbacks, and use the Djinn's AP rifle against armored targets.

## 10. The Headless (THL)

- **Allegiance:** its own bloc, the anti-Authority confederation [repo].
- **Lore:** After the 2073 ash storms cut UN supply, the cartels (Sabra) and the Killwager grew. The Battle of Ethron (2077) inspired IRAFEL. In 2084, remnants of IRAFEL, Impisi, Sabra, Jackal Team and others formed The Headless under **James Vasquez**. It governs a confederation of independent cities and sits in a cold-war stalemate with the Authority [repo]. The web adds that leadership includes "James Vasquez, Mary, and a council of represented factions" [web: wiki Factions].
- **Playable form (web):** the **Headless Power Card**. It "allows a group that draws from different factions and includes a BLKLIST model to all benefit from the rules and Armory provided by the card". Power Cards are "intentionally less potent than standard force cards". The example group is TFB Pathfinders + Banak Dust Element + Impisi Veterans [web: https://www.blkoutgame.com/blogs/news/q2-matched-play-updates]. The Impisi are "a part of the anti-Authority Headless organization" [web: same]. The Impisi product URL is literally `headless-ambush-force` [web].
- **Force rule:** none in the repo. The Power Card's exact text was not found.
- **Repo units:** none.
- **How to play [inferred]:** Use it as a list-building "toolbox": mix your best units across factions, accepting a weaker force-level bonus in exchange for flexibility.

## 11. Chimera (CHM)

- **Allegiance:** its own bloc, allied with Manticor [repo].
- **Lore:** Chimera began as extremists from the Ibragim civil war who took refuge with Manticor. They are zealots who fuse technology and biology; their most augmented members are the **Disciples**, who operate Cyka suits. In 2103 they descended from ABOL's moon and assaulted Fort Hope at the space elevator base [repo]. The web describes them as "religiously fanatical… obsessed with technological perfection of humanity", "emerging from the PAOC split after the Breath Of God Incident" [web: wiki Factions; Manticor & Chimera].
- **Playable form (web):** **CHIMERA: Krestonosets** core force (8 models), released Sept 2026 and also in the Conquest starter [web: https://www.blkoutgame.com/products/chimera-krestonosets]:
  - 2 **Besrovny**: unstable shotgun berserkers.
  - 2 **Rytsari**: leaders with an HMG and powered hammers.
  - 4 **Voyi**: line troops with support fire, breaching axes, an AT gunner and a captain.
- **Force rule:** none in the repo, and not found on the web.
- **Repo units:** none.
- **How to play [inferred, low data]:** It looks like a close-range shock force. The Rytsari anchor while the Besrovny and Voyi breach. No stats are available to confirm this.

## 12. Black Pact — missing from repo

- **Status:** playable core force [web: wiki Factions; https://www.blkoutgame.com/products/black-pact-extradition-force].
- **Lore/identity:** a criminal syndicate, "basically space pirates", with "the underworld's most feared enforcers and assassins". They are "frontline shock troops forged in warzones and anarchic slums" using "shotguns, old earth explosives, and improvised heavy arms" [web: search summaries of product and forum pages].
- **Units (web):**
  - 3 Liquidation Team Veterans: carbines and machetes.
  - 3 Security Team Operatives: a DMR marksman, a ground drone and a carbine grunt.
  - 1 **Pact Boss**: armored, with a compact LMG, "chaining activations across the field".
  - A "Clean-Up Team" box also exists [web].
- **Force rule:** not found. A forum summary says they are "generally average skill but… have access to their opponents special weapons but have to spend a limited resource to do so" [web: https://www.ontabletop.com/forums/topic/blkout-near-future-sci-fi-by-enemy-spotted-studios/]. This is unverified paraphrase.
- **How to play [inferred]:** Use the Boss for activation chaining, the Veterans for close breaches, and the Security Team for overwatch and ranged picks. Spend the limited resource to copy the opponent's best armory tools at key moments.

## 13. Impisi — missing from repo

- **Status:** playable core force (Labyrinth expansion era). Part of The Headless [web].
- **Lore:** "native resistance fighters from Abol, bitterly opposed to UN influence". The repo timeline confirms that IMPISI civil-defence militias formed in 2073 and were targeted by Ibragim hunters in 2078 [repo: timeline.json], [web: https://www.blkoutgame.com/blogs/news/labyrinth-expansion-the-impisi].
- **Units (web):**
  - 4 Impisi Veterans: scavenged weapons, tight-quarters ambushers.
  - 4 Impisi Insurgents: lightly armoured disruptors, with a special rule that lets them **replace destroyed models**.
  - 1 **Scrap King**: a repurposed industrial exo-frame that "hurls munitions and shields allies".
  - Signature weapons: flechette projectors [web: https://www.blkoutgame.com/products/headless-ambush-force].
- **Playstyle:** "BLKOUT's closest equivalent to a 'horde' faction… thrive on movement, misdirection, and unit synergy. Battle Drills let them reposition tactically or surge toward objectives" [web: Labyrinth blog summary].
- **Force rule:** not found.
- **How to play [inferred]:** Play objectives and ambushes. Use cheap Insurgents (which come back) to absorb fire and contest objectives, Veterans to spring close-range ambushes, and the Scrap King as a mobile shield.

---

## Discrepancies and gaps (repo vs official/web)

1. **Missing playable factions:** Black Pact, Impisi, Harlow SAD and Chimera Krestonosets (Chimera exists in the repo only as lore, with no rule and no units). ORK Task Force Upyr is also missing; ORK exists in the repo with no units or rule.
2. **"UN Forces" (UNF)** is not an official faction. Its units are the **UN Strikeforce** expansion. Its force rule is empty.
3. **ORK, Banak, Headless and Chimera** all have **empty `forceRule`** strings and **no units** in units.json. Officially, Banak and ORK (Szabla) are **For Hire / BLKLIST** units, and Headless is a **Power Card** rather than a standard faction. The repo's faction model does not represent For Hire units or Power Cards.
4. **TFB allegiance:** the repo says "independent", but officially Boone serves the **United Martian Protectorate (Mars)**. Not an outright error, but the UMP name is missing.
5. **Manticor allegiance:** the repo puts it under "chimera". Web lore shows Manticor as a mercenary power that also takes UN contracts (against Boone). A label like "chimera-allied / mercenary" may be more accurate.
6. **UN 3rd Battalion force rule:** the repo has a reroll for base-to-base infantry. The web summary of the official overview describes "Strength in Unity" as being about base contact with Pointmen for Shield. **Needs verification against the force sheet.**
7. **Naming inconsistency inside the repo:** the faction is "UN Raid Force Alpha", but its forceRule text says "UN Raid Team Alpha". Retailers use both names (e.g. "UN Raid Team Alpha Force"), so the inconsistency probably comes from the official cards themselves.
8. **Boone units:** the repo has "Recon Team" (Heavy Rifle). Web sources refer to "Pathfinders" with the M7 Rifle and to a Recon box of 3 VAT Elements + 1 Razorback. The repo's Recon Team may correspond to the Pathfinder unit or the Strikeforce. Unverified.
9. **Spelling:** the repo has "Crikets"; the retail copy says "Crickets". The repo has "Rozwizania"; the correct Polish is "Rozwiązania".
10. **faq.json** says Blast weapons may fire in "AP mode or HE mode". No other repo rule supports this, and I could not verify it [repo, unverified].

## Sources

**Repo:** `src/data/factions.json`, `forceCards.json`, `units.json`, `specialRules.json`, `faq.json`, `rules.json`, `dusters.json`, `lore/factionLore.json`, `lore/timeline.json`, `lore/planet.json`, `lore/killwager.json`.

**Web.** All of these were seen through search-result summaries only; direct fetches were blocked:
- https://blkout.wiki.gg/wiki/Factions
- https://blkout.wiki.gg/wiki/Minor_Factions
- https://blkout.wiki.gg/wiki/Manticor_&_Chimera
- https://blkout.wiki.gg/wiki/Task_Force_Boone
- https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown
- https://www.blkoutgame.com/blogs/news/un-raid-force-alpha
- https://www.blkoutgame.com/blogs/news/un-3rd-battalion-overview
- https://www.blkoutgame.com/blogs/news/manticor-borz-group-breakdown
- https://www.blkoutgame.com/blogs/news/task-force-boone-recon-overview
- https://www.blkoutgame.com/blogs/news/labyrinth-expansion-the-impisi
- https://www.blkoutgame.com/blogs/news/q2-matched-play-updates
- https://www.blkoutgame.com/products/badlands-blkist-force-box
- https://www.blkoutgame.com/products/harlow-strikeforce-expansion
- https://www.blkoutgame.com/products/manticor-strikeforce-expansion
- https://www.blkoutgame.com/products/un-strikeforce-expansion
- https://www.blkoutgame.com/products/black-pact-extradition-force
- https://www.blkoutgame.com/products/headless-ambush-force
- https://www.blkoutgame.com/products/chimera-krestonosets
- https://www.blkoutgame.com/products/harlow-special-activities-division
- https://www.blkoutgame.com/products/ork-task-force-upyr
- https://www.ontabletop.com/forums/topic/blkout-near-future-sci-fi-by-enemy-spotted-studios/
- Publisher: Enemy Spotted Studios (https://enemyspottedstudios.com.au)
