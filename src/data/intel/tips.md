# BLKOUT: Tips for Playing Well (New and Intermediate Players)

**Provenance tags:** `[repo]` = `src/data/*.json` or app components. `[web: URL]` = a web source. All web material came from **search-result snippets only**: the egress proxy blocked direct fetches of blkoutgame.com, blkout.wiki.gg, BGG, Scribd, ccgwinkel, irondice and 4pcdn. `[inferred]` = my own tactical reasoning from the rules, not a stated rule.

> **Read this first: the repo data and the published rules disagree in places.** The repo's `rules.json` is a condensed paraphrase, and some of it conflicts with itself and with the official site's descriptions. These conflicts are marked **UNCERTAIN** throughout, and the main ones are listed in Section 7. Where it matters, check the current free rulebook and the Matched Play update posts on blkoutgame.com.

---

## 1. Core loop in 60 seconds

1. **Setup.** Agree on 1-3 Groups per side. Use a 2'x2' table for 1 Group or 3'x3' for 2-3 Groups. Pick a scenario, place terrain, then deploy using the scenario's rules. `[repo rules 4.0, 4.1]`
2. **Each round has two phases.** `[repo 5.0]`
   - **Operations Phase:** pick up tokens (Activation markers and similar) and roll for initiative. The higher roll chooses who activates first, and ties are rerolled. `[repo 5.1]` The app's initiative roller rolls 2D10 per player and keeps the higher die `[repo PlayPage.tsx]`. The Bratva Team ability ("roll an additional D10 for Initiative, use the highest") fits that model `[repo units.json]`.
   - **Execution Phase:** players take turns activating one unit at a time. `[repo 6.0]`
3. **Activating a unit.** The repo text says you spend a Control Point (CP) to activate `[repo 6.0]`. Then:
   - the **Reposition Step** moves the whole unit, each model up to its Movement, keeping coherency `[repo 2.0]`
   - then **each model takes ONE Action**: Shoot, Ready (gain a Ready token) or Sprint (move another Movement value) `[repo 6.1]`
   - then you place an **Activation marker** on the unit `[repo 6.1]`
4. **Reactions interrupt the active player.** A unit that has not activated (or a model holding a Ready token) can **Return Fire** when shot, **Overwatch** a unit moving in its line of sight, or **Juke** `[repo 7.0-7.3]` `[web: https://www.blkoutgame.com/pages/how-to-play]`. A unit that reacts gives up its activation for that round `[repo 7.0, faq-5]`. The official text describes this as the model gaining an **Engaged token**, which replaces any Ready token, and a model with an Engaged token cannot take an Action `[web: https://www.scribd.com/document/736639078/BLKOUT-PRINT-AT-HOME-RULEBOOK (snippet)]`.
5. **Dice.** All rolls use D10 pools. Each die that reaches the target number is a success, and a **10 (Ace) counts as 2 successes**, including on Armor Checks `[repo 1.1, faq-10]`. Hits then go to Armor Checks, and each failed save deals 1 damage `[repo 3.3]`.
6. **Ending the game.** Play continues for the scenario's number of rounds (4 or 5 for the repo scenarios), then you check the objectives `[repo scenarios.json]`.

---

## 2. Commonly misplayed rules and FAQ clarifications

| # | Rule | What it actually says | Source |
|---|---|---|---|
| 1 | **Sprint and Shoot** | You cannot do both. Sprint *is* the model's one Action. You can Reposition and then Shoot, or Reposition and then Sprint. | [repo faq-3, 6.1] |
| 2 | **One Reaction per round** | Reacting (or being activated) uses up the unit for the round. It cannot react again until next round. | [repo faq-5, 7.0] |
| 3 | **Return Fire vs Melee** | If you are attacked with a Melee weapon, you can only Return Fire with a Melee weapon or Juke. Your guns do not answer a knife. | [repo faq-6, 3.4, specialRules "Melee"] |
| 4 | **Return Fire is simultaneous** | Both attacks resolve at the same time, so a model that is killed still fires back. CQC is also simultaneous: if both models die, both are removed, and there is no first strike. | [repo 7.1, faq-2] |
| 5 | **Overwatch needs a Ready token** | The repo text ties Overwatch to holding a Ready token, and the moving unit cannot shoot back. | [repo 7.2] |
| 6 | **Aces apply to saves too** | A 10 on an Armor Check is 2 successes. | [repo faq-10] |
| 7 | **Blast and Cover** | The primary target uses normal Cover. Extra models hit by Blast (within 2") are hit **regardless of Cover**. | [repo faq-12, 3.5] |
| 8 | **Blast modes** | Declare AP or HE mode **before rolling**. | [repo faq-1] |
| 9 | **Low Tech** | Low Tech units cannot be Pinned by Data Attacks **and cannot be targeted by Indirect** weapons. | [repo faq-8, specialRules] |
| 10 | **Jump does not add horizontal distance** | Jump (X) is vertical movement only. | [repo faq-9] |
| 11 | **Smoke dissipation** | At the start of each round, roll for each Smoke token: it is removed on 7+. Chaff is removed only on 10+. | [repo faq-4, 8.2] |
| 12 | **Deployed weapons** | If the model moved in its Reposition Step, it rolls only 1D10 with that weapon. **Reactions are not affected**, so Deployed weapons are strong on Overwatch and Return Fire. | [repo specialRules "Deployed"] |
| 13 | **Heavy** | Heavy weapons get +1 Shot during Reactions and during activations where the model did not move. | [repo specialRules "Heavy"] |
| 14 | **Auto (X) follow-up shots** | The extra shots cannot be reacted to, but they must target models within 4" of the first target. | [repo specialRules "Auto"] |
| 15 | **EMP** | EMP damages **only AI** models, with no Armor Check allowed. It does nothing to human infantry. | [repo specialRules "EMP"] |
| 16 | **Drones** | Drones cannot enter CQC, use ladders or Lean Out. | [repo specialRules "Drone"] |
| 17 | **Shield** | The Shield model gives Cover to itself and **one** friendly Infantry model in base contact. | [repo specialRules "Shield"] |
| 18 | **Pinned** | The repo only says Pinned units "suffer penalties". The official text: Pinned units **cannot Reposition** during their activation, and Pinned is removed after the unit activates. **UNCERTAIN** wording in the repo. | [repo 8.0] [web: https://www.scribd.com/document/736639078/BLKOUT-PRINT-AT-HOME-RULEBOOK (snippet)] |
| 19 | **Handler re-activation (Matched Play)** | Once per round, spend 1 CP to remove the Activation marker and any Ready/Engaged tokens from a Handler *after* it finishes. This means a second full activation, not extra actions. The designers made this change to stop Handlers repeatedly shooting at models in cover. | [repo faq-11] [web: https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates (snippet)] |
| 20 | **Dusters: targeting mobility** | Attackers declare whether they target Hull or Mobility, and each has its own armor. Filling either track destroys the Duster. Per the IMPACT update, you must catch the Duster **completely out of cover** to target its mobility. Dusters can also rotate freely and no longer have a rear arc, which contradicts the repo's "front/rear arcs". | [repo faq-7, 8.1] [web: https://www.blkoutgame.com/blogs/news/impact-front-line-dusters (snippet)] |

---

## 3. Force-building tips

**Constraints**
- **Matched Play Group:** 1 Handler Unit, 1 Force Card and 3 *different* units (or BLKLIST units) `[repo 8.4]`. The official handler list is Assault, Covert, Data and Siege Handler `[web: https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates (snippet)]`. The repo's `units.json` has **no Handler units** and the force builder enforces **no limits**, so do not rely on the app for list legality `[repo ForceBuilderPage.tsx]`.
- **Units have 2-4 models** `[repo 1.0]`.
- **Harlow Crikets** do not count toward the unit limit when grouped with Harlow Engineers, and they cannot use Force Cards `[repo units.json]`.

**Tips**
- **Take a "free activation" unit.** Harlow Control Team, Manticor Ubiytsa Control Team and UN BATCON each let one unit activate after them without spending a CP `[repo units.json]`. This gives you two units in a row without spending your scarce CP `[inferred]`. The official site says Harlow chains movement this way `[web: https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown (snippet)]`.
- **Carry at least one Data Spike, Data Knife or Sidewinder** (Control Team, Bratva Team, Insertion Team, Reserve Fireteam, BATCON's Comms Bot, VAT Element). Pinning an enemy unit stops it from Repositioning, according to the official text `[repo units.json]` `[web snippet above]`. Low Tech units (Harlow Veterans, Ubiytsa) are immune, so check your opponent's list `[repo]`.
- **Bring an answer to armor and AI.** Useful tools:
  - AP weapons: Engineers' AT Launcher, Reserve Fireteam AT Specialist, Specialists' Anti-Material Rifle, Lance, Shotgun
  - EMP weapons against AI-heavy forces: Surge, Microwave Gun, Pulse Grenade
  - The official site says the Anti-Material Rifle "will one-shot infantry and can destroy most vehicles in one shot" `[web: https://www.blkoutgame.com/blogs/news/un-raid-force-alpha (snippet)]`.
  - Note that EMP does nothing to non-AI units `[repo specialRules]`.
- **Combat Loads are limited armory uses** `[repo 1.2]`. The "Extras!" burn card and the 3rd Battalion "Arsenal" drill refresh or bypass them `[repo burnCards, forceCards]`. Spread armory-heavy plans across units with high Combat Loads, such as Veterans (3), Ubiytsa (3) and Raid Team (3) `[inferred]`.
- **Smaller elite force vs larger force (Matched Play).** The standard scenario scores both enemy units destroyed and quadrant control. Small, powerful units are better at killing, while more bodies hold more quadrants `[web: https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates (snippet)]`.
- **A Duster can replace an entire unit,** but well-placed anti-vehicle weapons can bring it down `[web: https://www.blkoutgame.com/blogs/news/impact-front-line-dusters (snippet)]`.

**Faction quick notes**
- **Harlow 1st Reaction Force:** +2 Movement when Sprinting `[repo forceCards]`. This is the fastest force and its strength is denying enemy reactions. Combine Boost Jump with the **Assaulters** drill (no Overwatch against your Reposition) to land in a strong spot that the enemy cannot react to `[web: https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown (snippet)]`.
- **UN Raid Force Alpha:** UTG Assaulters and Specialists roll +1 D10 on every Skill Check, including CQC `[repo]`. Use **Cross Fire** so multiple models shooting the same target each get +1 Damage. Use **Switchback** smoke to approach for CQC `[web: https://www.blkoutgame.com/blogs/news/un-raid-force-alpha (snippet)]`.
- **UN 3rd Battalion:** non-AI infantry in base contact with another infantry model may re-roll failed shots with non-armory weapons `[repo]`. Move in pairs, base-to-base, to keep the re-roll `[inferred]`.
- **Manticor Borz Group:** ignores the first damage from Blast weapons `[repo]`. The designers call **Targeting Smoke** its strongest drill: drop smoke that only your unit ignores. Use **Thorax Shields** (+1D10 armor) when the smoke cannot be placed well. The **Bratva Team** (Shield + HMG + Data Spike) is described as one of the best units in the game `[web: https://www.blkoutgame.com/blogs/news/manticor-borz-group-breakdown (snippet)]`.
- **Task Force Boone:** one non-AI or Powered Infantry model per round may make a Data Attack even without a Data Spike `[repo]` `[web: https://www.blkoutgame.com/blogs/news/task-force-boone-recon-overview (snippet)]`. The **Razorback**'s strength is its Auto + Cyclic Gauss SAW more than its Indirect missiles. Positioned well, it can "annihilate poorly placed infantry" `[web: same]`.

---

## 4. Tactical tips

### 4.1 Activation economy and CP
- **CP is your tempo budget.** `[repo 6.2]` says "Managing your CP pool is critical". Official Matched Play rules: you **start with 3 CP and never regain them** `[web: https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates (snippet)]`. Under those rules, CP is spent on:
  - Battle Drills, before activating a Force Unit
  - Handler re-activation, once per round
  - **Chained Activation**: activating another unit right after one finishes
- **UNCERTAIN:** the repo's 6.0/6.2 instead say a CP is spent to *activate* every unit and that "each Group provides a base number of CP per round", and the app's tracker resets each player to 3. Agree with your opponent which version you are playing.
- **Hold units back to keep reactions available.** An unactivated unit can still Return Fire `[repo 7.0]`. Activating your last unit early leaves you with no reactions, so a common good habit is to keep one unactivated unit covering key lanes `[inferred]`.
- **Ready as a delayed shot.** If a model has no good shot, take Ready instead. It can Overwatch later, and the enemy cannot shoot back at Overwatch `[repo 6.1, 7.2]`. The Team Leader (Harlow Assault Team, Boone Recon Team) and the Manticor **Linked** drill can pass a Ready token to a model that has already acted. Example: the LMG shoots twice using Cyclic, then still holds a Ready token for later `[repo units/forceCards]` `[web: https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown (snippet)]`.
- **Cyclic weapons** give an extra Shoot *or* Ready Action after a Shoot Action `[repo specialRules]`. In practice, you shoot and then you can still threaten Overwatch `[inferred]`.
- **Burn your opponent's reactions.** One cheap shot can draw out a Return Fire. Because reacting uses up the unit for the round, your important unit can then move safely `[inferred from repo 7.0, faq-5]`.

### 4.2 Cover and line of sight
- **Cover costs the shooter 1D10** (repo 3.2). A model has Cover if more than half of it is hidden. Seeking and Melee ignore that penalty `[repo]`. Small pools of 1-3 dice are normal, so losing one die is a big swing `[inferred]`. The official site sums it up as "the better position rolls more dice" `[web: https://www.blkoutgame.com/]`.
- **Lean Out.** A model in Cover can lean out to gain line of sight and still keep Cover `[repo 2.2]`. The official text says leaning out costs **half the model's movement** and uses a 25mm Lean Out marker, and the model keeps Cover against shooters that can see only the marker `[web: https://www.scribd.com/document/733891432/BLKOUT-Supplemental-01 (snippet)]`.
- **Smoke blocks line of sight entirely** `[repo 8.2]`. Use it to cross open lanes or to shut down Overwatch angles `[inferred]`. Harlow Chaff stays until a 10+, so it lasts much longer `[repo]`.
- **Turn Cover against them with Blast.** Splash hits ignore Cover `[repo faq-12]`. Grenade launchers can be used to push enemies out of cover `[web: https://www.blkoutgame.com/blogs/news/un-raid-force-alpha (snippet)]`.
- **Indirect weapons** can target anything a friendly model in the Group can see, but range is measured from the shooter `[repo specialRules]`. Pair them with a forward spotter `[inferred]`. They cannot target Low Tech units `[repo]`.
- **Don't end in the open within enemy Overwatch range.** If you move too far, the enemy can shoot you first `[web: https://www.blkoutgame.com/]`.

### 4.3 Objectives and scenarios
- Scoring happens at **end of round** in Matched Play and at **game end** in the repo's narrative scenarios `[repo scenarios.json]`. Arrive late and in cover, and don't stand on an objective in the open for several rounds `[inferred]`.
- **UNCERTAIN:** the repo does not define "control" of a Hardpoint or objective, such as a range or a model count. Check the rulebook.

### 4.4 Burn cards and Force Cards
- **Burn cards are single-use** and are played only at the timing window printed on the card `[repo 8.3]`. The repo does not give the hand size **(UNCERTAIN)**.

| Card | Timing | How to use it well `[inferred unless noted]` |
|---|---|---|
| Juiced | when a Model suffers Damage | Ignore *all* damage from one hit. Save it for an AT, 30MM or Head hit (3-4 damage), or for your Handler. |
| Personal Shielding | when a Unit suffers Damage | +2 Armor D10 for the activation. Best against a multi-shot or Auto attack on one unit. |
| Amped | before Activation | +1 Damage. Pair it with an Auto or Cyclic unit, or a Cross Fire target. |
| Rewind | after Activating | Activate another unit **and get a free Battle Drill**, which saves a CP. |
| Perimeter Defense | when an Enemy Unit Activates | Pins that unit, which stops its Reposition per the official Pinned rule. Use it on a unit about to run onto an objective. |
| Phase Out | before Activation | A 2" free reposition: step out of Overwatch lines or into base contact. |
| Blade Runner | when a Unit Moves | +2" movement and bypasses Obstacles. Good for a last-round objective grab. |
| Extras! | when a Unit completes Activation | Unmarks all Combat Loads. Play it after you spend armory items. |

- **Battle Drills** cost 1 CP each, per the official rules `[web: matched play updates snippet]`. With only 3 CP per game, plan which 1-2 activations really need a drill, such as Assaulters before a big jump-in or Targeting Smoke before a firefight `[inferred]`.
- **Overwatch counter-drills:**
  - Harlow **Assaulters**: Overwatch cannot target the unit while it Repositions
  - Boone **Tactical Positioning**: Overwatch against the unit suffers -1D10
  - Boone **Overwhelming Fire**: limits Return Fire against its Cyclic models to 1D10
  - Use these on the activation where you cross a lane the enemy is watching `[repo forceCards]`.

### 4.5 Dealing with Dusters
- **Dusters have two tracks, Hull and Mobility, and filling either one destroys the Duster** `[repo faq-7]`. Shoot whichever track has the weaker armor value **(UNCERTAIN:** the armor strings like "3/4" are not explained in the repo, so it is unclear which number is which).
- Under the IMPACT update, mobility can be targeted only if the Duster is **completely out of cover** `[web: https://www.blkoutgame.com/blogs/news/impact-front-line-dusters (snippet)]`. Flank to catch it in the open.
- **Use high-AP, high-damage weapons:** AT Launcher (AP2, D3), Anti-Material Rifle, RPG33 (D4), Head (D4), 30MM (AP4, D3), Disposable Launcher, TOW `[repo]`.
- **Duster tools to watch for:** Boost (mobility cannot be targeted and the Duster gains Cover), Targeting Array (ignores infantry Cover) and Smoke Discharge `[repo dusterArmory]`.
- **The 30MM is Deployed with a 12" minimum range.** A Topor or Mattis that moved rolls only 1D10 with it during its own activation, and it cannot shoot within 12" `[repo dusters, specialRules]`. Getting **inside 12"** removes the cannon threat, although Auto MMGs and melee still apply `[inferred]`.
- Duster MMG and HMG ranges start at 4" or 8" `[repo]`, so infantry hugging the Duster avoids those guns but not the Sword, Axe or Fist `[inferred]`.

### 4.6 CQC vs shooting
- **Melee weapons ignore Cover, and the target can only Return Fire with Melee or Juke** `[repo 3.4, specialRules]`. Melee is the strongest answer to a well-dug-in gun team without melee weapons `[inferred]`.
- **CQC is simultaneous** `[repo faq-2]`. Only go in when you have the bigger dice pool, for example UN Raid Force Alpha's +1D10 or UTG Mothers' Cyclic AP2 Elite Melee `[repo]` `[inferred]`.
- **Ways to get into contact:**
  - RFA **Close Assault**: a 2" post-activation move, but only into CQC
  - **Switchback** smoke cover on the approach
  - Harlow **Stims** (+2")
  - the **Phase Out** burn card
  - `[repo forceCards, burnCards]` `[web: https://www.blkoutgame.com/blogs/news/un-raid-force-alpha (snippet)]`
- **CQB keyword (not melee):** re-roll failed shots within half the weapon's range `[repo specialRules]`. CQB carbines and SMGs are best at medium-close range, not only in base contact `[inferred]`.

### 4.7 When to Sprint
- **Sprint** costs the model's Action and moves it another Movement value. It cannot be combined with Shoot `[repo 6.1, faq-3]`. Harlow gets +2" on Sprints `[repo]`.
- **Sprint when:**
  - you need to reach an objective or the HVT extraction before scoring
  - you need to reach Cover or Smoke out of enemy line of sight
  - you need to close to CQC or CQB range when there is no good shot `[inferred]`
- **Don't Sprint across open ground** while an enemy unit is unactivated or holding a Ready token. Overwatch fires at moving units and you cannot shoot back `[repo 7.2]`. Smoke the lane first, or bait out the reaction `[inferred]`.
- **Don't Sprint models with Heavy or Deployed weapons** if they could shoot instead. Staying still is what gives those weapons their bonus `[repo specialRules]` `[inferred]`.

---

## 5. Scenario notes (from `scenarios.json`)

### Dockyard Assault (2x2, 4 rounds, 2 Hardpoints)
**Rules** `[repo]`:
- 2 Hardpoints in the centre.
- The Defender deploys within 4" of its edge.
- The **Attacker has initiative in Round 1**.
- The Defender places the Hardpoints.
- The Attacker must hold **both** Hardpoints at the end of Round 4. The Defender needs **one**.

**Attacker:** use the Round 1 initiative to seize forward cover before the Defender can set up Overwatch. Commit to *one* Hardpoint first, then swing to the second with a Sprint or Blade Runner in Round 4 `[inferred]`.
**Defender:** you only need to deny one Hardpoint. Stack Ready tokens and Deployed or Heavy weapons covering it, and keep a unit unactivated late in Round 4 to react to the final push `[inferred]`.
**UNCERTAIN:** whether the "Defender places Hardpoints" rule overrides "centre of the table".

### Server Defense (2x2, 4 rounds, 1 objective)
**Rules** `[repo]`:
- The Server has **3 damage points**.
- The Attacker can **hack it with a Data Attack in base contact**, or destroy it.
- The Defender deploys within 6" of the Server. The Attacker deploys on any edge, at least 8" away.

**Attacker:** bring Data Spikes, Data Knife or a Boone free Data Attack. Damage stacking (Cross Fire, Amped, Blast) can kill the 3-point Server from range `[inferred]`. **UNCERTAIN** whether the Server takes Armor Checks.
**Defender:** keep bodies between the Server and enemy approach lanes. Use Perimeter Defense or Pins on the hacker unit to stop its Reposition `[inferred]`.
**Low Tech note:** Low Tech defenders cannot be Pinned, but the Server hack is a scenario action, so it is unclear whether Low Tech interacts with it **(UNCERTAIN)**.

### HVT Evac (3x3, 5 rounds)
**Rules** `[repo]`:
- The HVT starts in the centre, moves with the escorting unit, has **2 damage points** and cannot fight.
- The extraction point is on the Defender's edge.
- The opposing force wins by killing the HVT **or by preventing extraction through Round 5**.

**Escort:**
- The HVT is fragile, so screen it with **Shield** units (Bratva, Pointmen) or Smoke.
- Sprint the escort unit; Harlow +2" helps a lot.
- Blade Runner and Phase Out help push it home `[inferred]`.

**Opposition:** a stall counts as a win, so Pins, Overwatch on the escort route and Indirect fire at the HVT are all strong. Low Tech HVT status is unknown `[inferred]`.
**UNCERTAIN:** what "Defender" means here, since the escort/opposition roles are named differently from the Defender in the setup text.

### Zero Day (3x3, 5 rounds, 3 objectives on the centre line)
**Rules** `[repo]`:
- Forces deploy on opposite **short** edges within 6".
- **No Data Attacks in Round 1.**
- **All AI units start Pinned.**
- Most objectives held at the end of Round 5 wins. Ties are broken by enemy models eliminated.

**Tips** `[inferred]`:
- AI-heavy lists (Golems, Pointmen, Peacemaker, Razorback, Springbok) lose their Round 1 Reposition if Pinned means no Reposition.
- Lead with human and **Low Tech** units, and use Jammer (VAT Element, 12") to ignore Pins.
- Only final control counts, so don't overcommit early. Kill count is the tie-breaker, so trading efficiently matters.

### Matched Play Standard (3x3, both on long edges)
**Rules** `[repo]` `[web: https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates (snippet)]`:
- 2 Hardpoints.
- Infiltrating deployment.
- Score **quadrants and Hardpoints at the end of each round**; enemy units destroyed also score, per the official site.
- Hardpoint effects are rolled randomly (Dome Shields, Drone Swarms, Jammers). They can change model positions and even deployment edges.
- Enhanced Cover (Full/Partial/Lean Out) and Counter EWAR apply.

**Tips** `[inferred]`:
- Because scoring is every round, an early quadrant presence pays off repeatedly.
- Spread out enough to contest quadrants, but avoid giving up cheap unit kills.
- Read the rolled Hardpoint effect before deploying.

**UNCERTAIN:** the exact effects of Dome Shields, Scrambling, Drone Swarms and Counter EWAR are not given in the repo or in the snippets I could reach.

---

## 6. Ten quick habits
1. Count enemy unactivated units and Ready tokens before every move: those are the guns that can react to you `[repo 7.0]`.
2. Finish every move in Cover or Smoke `[repo 3.2, 8.2]`.
3. Get your Heavy and Deployed weapons set up early and leave them still `[repo specialRules]`.
4. Use Ready when you have no shot `[repo 6.1]`.
5. Spend CP on chaining and drills only at decisive moments (3 per game in Matched Play) `[web]`.
6. Use free-activation units (Control Team, BATCON, Ubiytsa Control) to chain activations `[repo]`.
7. Use Melee or Blast against entrenched enemies `[repo]`.
8. Use EMP only against AI units `[repo]`.
9. Hold Juiced or Personal Shielding for your highest-value model `[repo burnCards]`.
10. Play the objective clock: know exactly which round scores `[repo scenarios]`.

---

## 7. Known discrepancies and uncertainties (check the rulebook)
- **Skill target:** `rules.json` 1.1 says dice must meet "the *target's* Skill value", while 3.1 says "the *shooter's* Skill". Elite units have Skill 6 and line units Skill 4 `[repo units.json]`. If success were "≥ Skill", elites would be worse, so the real mechanic may differ. A snippet of the official rules says "Skill Checks roll 2D10; Hard Skill Checks only ever roll 1D10" `[web: https://www.scribd.com/document/733891432/BLKOUT-Supplemental-01 (snippet)]`. **Treat the repo's dice-math wording as unreliable.**
- **Armor:** 3.3 says "Armor 6 means 6+", but the AP example converts "Armor 3+ to 5+". Unit armor is written as "1/6", "3/5" and so on. The two numbers might be the damage track and the save, but this is unconfirmed.
- **Cover penalty:** 3.2 says "-1D10", while Seeking says "-1 Shot". These are probably the same thing.
- **Control Points:** repo says per-Group, per-round CP spent to activate. The official Matched Play update says 3 CP per game, never regained, used for drills, Handler and Chained Activation.
- **Reactions:** repo says the reacting *unit* loses its activation. Official snippets describe *models* gaining Engaged tokens.
- **Juke:** repo says a 2" move. The official site says Juke is used "to duck into cover mid-shot" / "gain cover when targeted".
- **Lean Out cost:** this is not in the repo. Official: half movement plus a 25mm marker.
- **Dusters:** repo says front/rear arcs. IMPACT update says no rear arc, free rotation, and mobility targetable only when the Duster is completely out of cover.
- **Not in the repo at all:** burn card hand size, objective "control" definition, Handler units, and the effects of Matched Play Dome Shields, Scrambling, Drone Swarms and Counter EWAR.

## Sources
- Repo: `src/data/{rules,faq,scenarios,forceCards,burnCards,specialRules,factions,units,dusters,dusterArmory}.json`, `src/components/play/PlayPage.tsx`, `src/components/force-builder/ForceBuilderPage.tsx`
- Web (search snippets only; direct fetch was blocked):
  - https://www.blkoutgame.com/
  - https://www.blkoutgame.com/pages/how-to-play
  - https://www.blkoutgame.com/blogs/news/blkout-matched-play-updates
  - https://www.blkoutgame.com/blogs/news/harlow-first-reaction-force-breakdown
  - https://www.blkoutgame.com/blogs/news/un-raid-force-alpha
  - https://www.blkoutgame.com/blogs/news/manticor-borz-group-breakdown
  - https://www.blkoutgame.com/blogs/news/task-force-boone-recon-overview
  - https://www.blkoutgame.com/blogs/news/impact-front-line-dusters
  - https://www.scribd.com/document/736639078/BLKOUT-PRINT-AT-HOME-RULEBOOK
  - https://www.scribd.com/document/733891432/BLKOUT-Supplemental-01
