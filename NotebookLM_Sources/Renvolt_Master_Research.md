# Renvolt
## Comprehensive Financial Assumptions & Unit Economics
*Prepared: March 2026*

---

## 1. Executive Summary

This document establishes the baseline financial assumptions necessary to construct the 5-Year Pro Forma for Renvolt’s DC Fast Charging (DCFC) and Battery Energy Storage System (BESS) network.

Traditional un-buffered EV charging models suffer from crippling capital expenditures (CapEx) related to grid upgrades and unpredictable operational expenditures (OpEx) driven by utility Demand Charges. Renvolt's battery-buffered model fundamentally alters unit economics, converting high variable OpEx into a financed CapEx advantage.

---

## 2. Capital Expenditure (CapEx) Breakdown

Deploying a high-speed (150kW+) DCFC plaza is a highly capital-intensive process. A standard un-buffered site often exceeds $250,000 to $500,000 just in equipment and grid installation.

### 2.1 Standard DCFC Site CapEx (Per Station)
*   **Hardware (EVSE):** Commercial 150kW+ DCFC units cost between $50,000 and $100,000+. 
*   **Installation (The "Soft Cost" Trap):** Trenching, conduit, and labor typically equal or exceed the hardware cost ($50,000 - $100,000). 
*   **Grid Upgrades (The Deal Killer):** Un-buffered sites drawing >500kW often trigger $200,000+ localized transformer or substation upgrade fees levied by the utility (e.g., FortisAlberta).

### 2.2 Renvolt's CapEx Advantage
By integrating a central BESS:
1.  **Zero Grid Upgrade Fees:** Renvolt sidesteps the $200k+ utility grid upgrade fee because our grid connection remains artificially small (e.g., a standard 100A / 600V commercial service).
2.  **Lower Trenching Costs:** Battery arrays can be placed immediately adjacent to existing electrical rooms, minimizing heavy trenching.
3.  **BESS Hardware Cost:** By utilizing **Second-Life EV Batteries**, Renvolt secures stationary storage at roughly 30-40% of the cost of Tier-1 new lithium-ion cells.

*Assumption for Modeling:* Assume a blended site CapEx of $150,000 per combined DCFC/BESS node, prior to applying non-repayable government grants (which routinely cover 50% of eligible CapEx).

---

## 3. Operational Expenditure (OpEx)

OpEx is where traditional charging networks fail. Low utilization rates combined with high peak demand charges create deeply negative cash flows.

### 3.1 Electricity Supply & Demand Charges
*   **The Problem:** Traditional DCFCs trigger "Demand Charges" that can hit $15 to $30 per kW in Alberta. A single 150kW charging session can trigger a $4,500 monthly penalty, even if only 50 kWh of actual energy was sold.
*   **Renvolt's Solution:** The BESS artificially flattens the site's load profile. The site pays a blended flat energy rate (e.g., 12.01 cents/kWh under the 2025-2026 Alberta RoLR) with virtually negligible Demand Charges.
*   *Assumption for Modeling:* Peg baseline electricity Cost of Goods Sold (COGS) at $0.15/kWh (including distribution), completely eliminating the punitive Demand Charge multiplier.

### 3.2 Maintenance, Software, and Network SLAs
*   **O&M:** Assume 5% to 8% of initial hardware CapEx annually for preventative maintenance, filter replacements, and cable cooling checks.
*   **Network Fees:** OCPP back-end software management (billing, CRM, uptime monitoring) typically runs $400 - $800 per port annually.
*   **Credit Card Acquiring:** Standard 2.5% + $0.30 per transaction fee modeling.

---

## 4. Revenue Assumptions & Unit Economics

EV charging revenue scales logarithmically as EV adoption density increases. 

### 4.1 Utilization Rates
*   **Current Baseline:** The industry average utilization rate for Canadian DCFC in Q4 2025 was roughly 11.9%. 
*   *Assumption for Modeling:* Model Year 1 at 8% utilization (roughly 2 hours of active charging per day, per plug). Escalate by 35% Year-over-Year as the 2030 Federal 60% ZEV mandate forces adoption.

### 4.2 Retail Pricing
*   Measurement Canada is transitioning the industry toward pure kWh billing (rather than per-minute billing).
*   *Assumption for Modeling:* Model gross retail pricing at $0.45 to $0.55 per kWh. 
*   **Gross Margin:** With COGS flat-lined at $0.15/kWh via the battery buffer, Renvolt models an unprecedented ~70% gross margin on electricity sales.

### 4.3 Ancillary Revenue Streams (BaaS)
For sites where Renvolt does not own the chargers (but acts as the equipment lessor):
*   Model a fixed $1,500 - $3,000 monthly Equipment Lease payment for the BESS/DCFC combo, effectively transferring utilization risk to the site host while guaranteeing Renvolt's IRR.


---

# Renvolt
## Comprehensive Tax, Compliance, and Carbon Credit Strategy
*Prepared: March 2026*

---

## 1. Executive Summary

A highly optimized corporate tax and carbon-credit strategy is a cornerstone of Renvolt's profitability. The Canadian federal government heavily subsidizes the deployment of clean energy and EV infrastructure through aggressive accelerated depreciation schedules and tradable carbon credits.

This document outlines the specific mechanisms—specifically Capital Cost Allowance (CCA) Classes 43.1/43.2, the Clean Technology Investment Tax Credit (ITC), and the Clean Fuel Regulations (CFR)—that Renvolt will employ to drive pre-tax IRR and free cash flow.

---

## 2. Capital Cost Allowance (CCA): Accelerated Depreciation

The Canada Revenue Agency (CRA) permits businesses to deduct the cost of capital assets over time. Clean energy assets benefit from vastly accelerated timelines, effectively acting as an upfront tax shield.

### 2.1 Class 43.1 and 43.2 Eligibility
Renvolt's core hardware components (DC Fast Chargers and stationary Battery Energy Storage Systems) are expressly eligible for accelerated CCA.

*   **Class 43.1 (30% Rate):** Applies to EV charging stations supplying more than 10 kW but less than 90 kW of continuous power. 
*   **Class 43.2 (50% Rate):** Applies to High-Power DCFC stations supplying 90 kW or *more* of continuous power. Almost all of Renvolt's public charging infrastructure (>150kW) falls into this highly favorable asset class.
*   **Stationary BESS:** Electrical energy storage equipment (batteries) also falls under these accelerated classes. Crucially, because the batteries do not use fossil fuels during operation, they qualify seamlessly without strict roundtrip efficiency thresholds when paired with grid power.

### 2.2 The "Immediate Expensing" Shield
For eligible property in Class 43.1 or 43.2 acquired before 2028, the CRA allows an enhanced first-year allowance. Historically, this has allowed for a **100% deduction** of the capital cost in the very first year of operation.
*   **Financial Impact:** If Renvolt spends $1,000,000 on infrastructure in FY1, it can deduct the entire $1,000,000 against any taxable corporate income generated that year, effectively dropping the company's tax burden to zero during the critical high-growth startup phase.

---

## 3. The Clean Technology Investment Tax Credit (ITC)

Separate from depreciation, the federal government offers a direct, refundable tax credit to incentivize CapEx.

*   **The Program:** A **30% refundable tax credit** is available for the capital cost of eligible clean energy equipment, which explicitly includes stationary battery storage systems.
*   **Refundable Nature:** Because the credit is *refundable*, it acts as a direct cash injection. If Renvolt has zero net income (due to sweeping Class 43.2 depreciation), the CRA will literally cut a check to the company for 30% of the eligible BESS hardware cost.
*   **Compliance Constraint:** To achieve the full 30% (rather than a reduced 20%), Renvolt's EPC (Engineering, Procurement, and Construction) contractors must adhere to strict federal labor and apprenticeship prevailing wage requirements during installation.

---

## 4. Canada Clean Fuel Regulations (CFR)

The CFR establishes an ongoing, high-margin operational revenue stream completely distinct from selling electricity to EV drivers.

### 4.1 Credit Generation
Under the CFR (effective July 2023), EV charging station owners generate highly valuable, tradable credits for displacing fossil fuels.
*   **The Math:** Credits are generated for every metric ton of CO2 equivalent (MTCO2e) emissions avoided by providing electricity to EVs.
*   **Value Arbitrage:** These credits are sold on an open market to major fossil fuel producers (oil refineries) who are legally mandated to lower their carbon intensity. Currently, CFR credits routinely trade between $200 and $400 CAD per credit, creating a massive secondary revenue vertical for every kWh dispensed at a Renvolt station.

### 4.2 The Reinvestment Mandate
There is a critical compliance catch concerning CFR credits:
*   **Charging Network Operators:** Entities operating public charging networks must legally reinvest **100%** of their CFR credit revenue within 730 days.
*   **Eligible Reinvestment:** This revenue cannot be routed to executive bonuses or general overhead. It must be reinvested into expanding EV charging infrastructure, upgrading grid connections, or providing financial incentives to EV drivers.
*   **Renvolt's Strategy:** Renvolt will seamlessly clear this mandate. 100% of CFR proceeds will be recycled directly into Renvolt's capital budget to deploy additional DCFC/BESS network nodes, creating a self-funding flywheel for hyper-scaling the network across Western Canada.


---

# Renvolt
## Initial Hardware Market Scan & Technical Specifications
*Prepared: March 2026*

---

## 1. Executive Summary

Renvolt's operational thesis requires two primary hardware components to function synchronously: high-reliability Direct Current Fast Chargers (DCFC) and high-density, centralized Battery Energy Storage Systems (BESS). 

This document outlines the desired technical specifications for procurement, comparing leading OEMs to establish our baseline equipment profile.

---

## 2. EVSE (DC Fast Charger) Specifications

With the bankruptcy of early market leaders (e.g., Tritium), Renvolt prioritizes OEMs with proven uptime durability, modular power scaling, and high-efficiency metrics.

### 2.1 Minimum Required Specifications
*   **Power Output:** 150 kW to 350 kW maximum output per dispenser.
*   **Voltage Range:** 150V to 1000V DC (critical for charging 800V architectures like Porsche Taycan and Hyundai Ioniq 5).
*   **Cable Cooling:** Liquid-cooled cables mandatory for outputs exceeding 250A to maintain 350kW continuous rating.
*   **Connector Standards:** NACS (J3400) and CCS1. (CHAdeMO may be excluded to optimize physical footprint and lower hardware costs, given its phasing out in North America).
*   **Networking:** OCPP 1.6J or 2.0.1 compliant for true hardware/software decoupling.

### 2.2 OEM Market Leaders
1.  **Alpitronic (Hypercharger series):**
    *   *Pros:* Exceptional efficiency (>97% on HYC400), highly reliable, modular 50kW-100kW power stacks. Capable of incredibly compact footprints.
    *   *Cons:* European supply chain dependency; higher initial unit cost.
2.  **Kempower (C-Series):**
    *   *Pros:* Best-in-class dynamic power sharing. Core "CPU" cabinets route power precisely to satellite dispensers based on the instant vehicle draw, eliminating wasted capacity. Highly scalable (up to 600kW CPUs driving 8 satellites).
    *   *Cons:* Complex installation topology requiring robust interconnect cabling between CPU blocks and satellites.
3.  **ChargePoint (Express Plus):**
    *   *Pros:* Deep North American presence, Omni Port integration (seamlessly switching between CCS and NACS), 40kW modular power blocks scaling to 350kW.
    *   *Cons:* Historically treated as a closed-ecosystem network; must ensure open OCPP capabilities for Renvolt’s proprietary backend routing.

*Procurement Recommendation:* **Kempower**. Their dynamic power allocation perfectly mimics Renvolt's broader philosophy of maximizing limited electrical capacity through intelligent distribution.

---

## 3. Battery Energy Storage System (BESS) Specifications

While Renvolt's long-term proprietary IP lies in integrating "second-life" EV batteries, we must baseline our system against commercial Tier-1 BESS offerings to model spatial footprints and integration mechanics.

### 3.1 Minimum Required Specifications
*   **Energy Density:** 1 MWh to 5 MWh containerized units (depending on site AADT classification).
*   **Cell Chemistry:** Lithium Iron Phosphate (LFP) is strictly mandated over NMC due to vastly superior thermal runaway resistance, which is critical for securing municipal fire department approvals (NFPA 855) in commercial retail lots.
*   **Coupling:** AC-coupled systems pre-integrated with bidirectional inverters are required to interface seamlessly with existing site electrical rooms and the standalone DCFCs.
*   **Thermal Management:** Active liquid cooling to ensure 15+ year operational lifespan during harsh Canadian winters and peak summer loads.

### 3.2 Tier-1 OEM Baselines
1.  **Tesla Megapack (Gen 3):**
    *   *Specs:* ~5 MWh per unit, LFP chemistry, fully integrated inverter and thermal system. 
    *   *Footprint:* Single massive block; extremely high energy density but difficult to fit into strange retail lot geometries.
2.  **Powin (Pod Max / Stack series):**
    *   *Specs:* 5 MWh to 6.26 MWh per 20-foot container. StackOS proprietary EMS/BMS.
    *   *Advantage:* Offers highly granular scalability and is shifting to US-based manufacturing (IRA compliance).

*Procurement Direction:* Utilizing Tier-1 suppliers like Powin or Tesla for initial proof-of-concept sites before transitioning to Renvolt's Second-Life BESS enclosures. The physical footprint of a 20-foot shipping container (~160 sq ft) must be mapped into all municipal zoning applications.


---

# Renvolt
## Supply Chain Constraints & Lead Time Analysis
*Prepared: March 2026*

---

## 1. Executive Summary

The most significant risk to Renvolt's deployment timeline is not capital acquisition or real estate leasing, but rather raw physical supply chain bottlenecks. 

As of early 2026, the global push for data center expansion, grid modernization, and EV infrastructure has created unprecedented backlogs for high-voltage electrical equipment. This document maps current lead times to establish realistic project scheduling buffers.

---

## 2. Electrical Distribution Equipment

The hardware required to step down power from the localized grid to the Renvolt site is experiencing historic delays due to global shortages of copper, grain-oriented electrical steel (GOES), and manufacturing capacity.

### 2.1 Transformer Lead Times
*   **Pad-Mounted Service Transformers (Standard Commercial):** Typical lead times have blown out from a historical 12-20 weeks to **110 - 130 weeks** (over 2 years).
*   **Dry-Type Distribution Transformers:** Build-to-order units are ranging from **50 to 52 weeks**.
*   *Renvolt Mitigation Strategy:* Renvolt's battery-buffered model drastically reduces our reliance on massive, high-voltage transformer upgrades. By designing sites to pull from existing 480V/600V 100A-400A commercial panels, we actively bypass the 2-year queue for new pad-mount utility transformers. Where new transformers are unavoidable, we must source refurbished or in-stock secondary market units, prioritizing AC-coupled connections.

### 2.2 Switchgear and Breaker Panels
*   **Medium Voltage (MV) Switchgear:** Currently averaging **26 to 32 weeks**, an improvement from pandemic highs but still double the historical norm. 
*   **Custom Engineered Boards:** Any highly specific, non-off-the-shelf control panels will incur 40+ week delays. 
*   *Renvolt Mitigation Strategy:* Standardize site designs explicitly around "off-the-shelf" 600V 3-phase commercial panel boards. Avoid custom-engineered switchboards where possible.

---

## 3. EVSE & BESS Hardware Lead Times

Procuring the chargers and batteries themselves requires significant advance capital commitment.

### 3.1 DC Fast Chargers (150kW - 350kW)
*   **Current Lead Times:** Most tier-1 commercial DCFC OEMs (Alpitronic, Kempower, ABB) are quoting **16 to 24 week** lead times from Purchase Order to delivery. 
*   **Market Dynamics:** As the NACS (J3400) standard aggressively rolls out in 2025/2026, manufacturers are re-tooling lines to include native NACS cables alongside CCS1. This transition periodically spikes lead times for specific connector configurations.

### 3.2 Battery Energy Storage Systems (BESS)
*   **Tier-1 OEM Lead Times (e.g., Megapack, Powin):** Utility-scale storage solutions have extreme backlogs, often quoting **12 to 18 months** (52 - 78 weeks) due to immense demand from grid operators and solar/wind developers.
*   *Renvolt Mitigation:* This bottleneck validates Renvolt’s core intellectual property thesis: utilizing **Second-Life EV Batteries**. By acquiring retired EV packs directly from automotive dismantlers and OEMs (e.g., Nissan, Ford) and repackaging them, Renvolt abstracts its supply chain away from heavily constrained Tier-1 stationary cell manufacturers. 

---

## 4. Strategic Procurement Plan

To prevent capital from sitting idle while waiting on equipment, Renvolt will implement the following procurement constraints:
1.  **Advance Staging:** Order basic switchgear and EVSE immediately upon signing a site host lease agreement, anticipating a 6-month delivery window aligning with the municipal permitting phase.
2.  **The "Site-in-a-Box" Model:** Move toward a fully containerized deployment model where the BESS, EVEMS (Energy Management System), and switchgear are pre-assembled off-site by our Production technicians, shipped to the commercial lot, and dropped into place via crane. This bypasses long on-site contractor delays and local supply house shortages.


---

# Renvolt
## EV Driver Demographics & Consumer Behavior
*Prepared: March 2026*

---

## 1. Executive Summary

Understanding the target consumer—the electric vehicle driver—is critical for Renvolt's Marketing team and Site Acquisition specialists. To justify premium pricing and guarantee high utilization, our charging plazas must be sited and designed to appeal to the distinct psychographic and demographic profiles of EV early-majority adopters in Western Canada.

As of early 2026, Alberta represents a unique, high-growth, yet highly skeptical market environment compared to the saturation seen in British Columbia and Quebec.

---

## 2. Demographic Profile of the Alberta EV Driver

The current EV owner in Alberta does not yet reflect the "average" Canadian motorist. They are a distinct demographic cohort.

*   **Age Profile:** The market skews significantly older, with 58% of respondents over the age of 55. This indicates a demographic with higher disposable income and a lower tolerance for "glitchy" technology or unsafe environments.
*   **Housing & Wealth:** Nearly 90% are homeowners, and roughly 80% reside in single-family detached homes. Crucially, over 50% of targeted EV households are "multi-vehicle," meaning they still own at least one internal combustion engine (ICE) vehicle for long-haul trips.
*   **Aversion to Public Charging Risk:** In a 2025/2026 CAA study, 70% of respondents expressed deep dissatisfaction with the availability and reliability of public fast chargers in Alberta. Range anxiety and "charger anxiety" (arriving at a broken charger in sub-zero weather) remain the highest barriers to adoption.

### 2.1 The "Hybrid Shift" of 2025/2026
Recent Q3 2025 data shows a profound shift in consumer preference toward standard Hybrid Electric Vehicles (HEVs) and Plug-In Hybrids (PHEVs) over pure Battery Electric Vehicles (BEVs) due to perceived infrastructure deficits. Renvolt's marketing must continually emphasize *reliability* and *availability* to recapture the BEV market consumer who is hesitant to commit due to infrastructure fears.

---

## 3. Charging Habits and Behavioral Analysis

How and where drivers charge dictates Renvolt's business model.

### 3.1 The Reality of Home Charging
Almost a third of Calgary EV drivers meet their entire commuting needs with Level 1 (120v) home charging. **Public DC Fast Charging (DCFC) accounts for less than 5% to 10% of total kWh dispensed to vehicles.**
*   *Strategic Implication:* Renvolt is not competing with the driver's home garage. Renvolt is building infrastructure explicitly for the inter-city "road trip" or the high-mileage commercial fleet operator (e.g., Uber/Lyft drivers).

### 3.2 Dwell Time Psychology
Drivers fundamentally resent taking indirect, non-highway routes to find chargers (44% reported this as a major annoyance). 
*   **The Amenity Expectation:** When forced to stop for 20-40 minutes at a DCFC, the demographic profile (older, wealthier homeowners) expects a premium experience. Co-locating chargers at isolated industrial parks is a failed model. Sites must be anchored by high-end QSRs (Quick Service Restaurants), premium coffee, spotless 24/7 restrooms, and immaculate lot lighting. 
*   **Safety Over Price:** In remote Alberta highway corridors, driver safety (especially during evening hours in winter) vastly outweighs the actual per-kWh price of the electricity. They will pay $0.55/kWh for a well-lit, fully operational, amenity-rich plaza over $0.40/kWh at an isolated, dark municipal parking lot.

---

## 4. Policy Tailwinds and Market Sentiment

Alberta exhibits the lowest EV purchase intent in Canada (only 28% of Albertans surveyed in late 2025 intended to buy an EV). This is driven by deep-seated political ideologies, the $200 provincial EV tax, and fears of winter range degradation.

### 4.1 The Federal EVAP Program
The introduction of the new federal Electric Vehicle Affordability Program (EVAP) in February 2026 ($5,000 rebate) is projected to act as a significant demand-side stimulus.

### 4.2 Targeted Marketing Verticals
Because mass-market consumer adoption in Alberta is facing friction, Renvolt's immediate B2B marketing must focus on:
1.  **Commercial Fleets:** Light/Medium duty delivery vans adopting EVs to hit corporate ESG mandates.
2.  **Municipal "Range Anxiety" Deserts:** Heavily marketing our locations on apps like PlugShare and ABRP (A Better Routeplanner) to capture the captive audience traveling the Edmonton-Calgary or Calgary-Banff corridors.


---

# Renvolt
## Comprehensive Site Selection & Feasibility Analysis
*Prepared: March 2026*

---

## 1. Executive Summary

Selecting optimal sites for Renvolt’s integrated DC Fast Charging (DCFC) and Battery Energy Storage Systems (BESS) requires a multi-variant analysis balancing consumer demand, physical space requirements, and electrical grid capacity.

Unlike traditional charging networks that are almost entirely dictated by proximity to high-capacity high-voltage substations, Renvolt’s battery-buffered model unlocks "grid-constrained" geographic locations. This site analysis outlines the critical criteria and data sources used to identify and acquire highly profitable locations across Western Canada, specifically Alberta.

---

## 2. Traffic Flow & EV Driver Behavior

The primary determinant of top-line charging revenue is the volume of addressable traffic passing the site.

### 2.1 AADT and Corridor Prioritization
*   **Data Source:** Alberta Transportation and Economic Corridors publishes Annual Average Daily Traffic (AADT) and Average Summer Daily Traffic (ASDT) maps.
*   **Target Metrics:** Renvolt prioritizes primary and secondary provincial highway corridors exhibiting high AADT (e.g., Highway 2, Highway 16, Highway 1) but specifically targets the "gaps" between major urban clusters where drivers experience range anxiety.
*   **The "EV Desert" Strategy:** While competitors cluster inside Calgary and Edmonton, Renvolt targets AADT-heavy strategic waypoints (e.g., Red Deer, Whitecourt, Canmore) where the ratio of passing EVs to available DCFC plugs is highest.

### 2.2 Dwell Time & Amenity Proximity
Because a typical DC Fast Charge takes 20 to 40 minutes, the site must offer a high quality of life during the "dwell time."
*   **Co-location Partners:** Sites must be located within a 3-minute walk of safe, 24/7 or extended-hour amenities. Ideal host profiles include:
    *   Highway commercial retail plazas
    *   Quick Service Restaurants (QSRs) and coffee chains
    *   Large-format grocery or big-box retail
*   **Driver Security:** Sites must possess strong lot lighting and passive surveillance (e.g., visible from the main roadway or storefronts) to ensure driver safety during nighttime charging.

---

## 3. Grid Capacity & Electrical Feasibility

The most expensive failure point in EV charger deployment is underestimating the cost of pulling power from the grid to the plug.

### 3.1 Proximity to Substation vs. The Battery Buffer
*   **Traditional Competitors:** Need to find sites located physically close to massive transmission substations that can handle 1 to 2 Megawatts of instant, un-buffered draw without triggering grid collapse. If they choose poorly, they face $1M+ substation upgrade tabs from the utility.
*   **Renvolt's Siting Advantage:** Because our integrated BESS limits the grid draw to a steady, low-amperage trickle, Renvolt can target existing commercial lots running on standard 3-phase 208V or 480V/600V distribution lines. We do *not* strictly require proximity to a massive substation. 
*   **Trenching Costs:** Within the site parcel itself, Renvolt prioritizes locations where the BESS and chargers can be placed as close as possible to the existing electrical room/transformer. Trenching through existing asphalt costs roughly $150-$250 per linear foot; minimizing this distance radically reduces initial CapEx.

### 3.2 Electrical Permitting 
*   **Dedicated Circuits & EVEMS:** The Canadian Electrical Code demands dedicated circuits for Level 3 chargers. However, where total site capacity is constrained, Renvolt employs an EV Energy Management System (EVEMS) linked directly to our BESS, enabling us to legally install massive charging capacity on a mathematically smaller municipal grid connection.

---

## 4. Zoning, Real Estate & Permitting

Land use and municipal bylaws act as the final gatekeeper to site activation.

### 4.1 Municipal Commercial Zoning
There is no unified provincial zoning law in Alberta for EV chargers; it is dictated line-by-line by municipalities (e.g., City of Calgary, City of Edmonton, rural counties).
*   **Target Land Use:** C-COR (Commercial Corridor), C-HWY (Highway Commercial), and general retail zoning designations.
*   **Parking Minimums:** Installing equipment often eliminates 1-3 existing parking stalls. We must ensure the host site does not fall below the municipality’s minimum mandated parking stall count, or we risk a protracted variance hearing.

### 4.2 Property Characteristics
*   **Physical Layout:** Renvolt requires accessible, flat terrain. The equipment pad must accommodate not just the charging dispensers (which are small), but the centralized power cabinets and BESS enclosures (which have the footprint of small shipping containers).
*   **Fire Separations:** Due to NFPA 855 requirements for lithium-ion storage, the BESS footprint must allow for at least 10-15 feet of spatial separation from property lines, combustible vegetation, and main building egress routes.

---

## 5. Site Scoring Matrix

All prospective real estate leads are fed through Renvolt’s proprietary Site Scoring Matrix before a lease or revenue-share agreement is offered:

| Weight | Criteria | Optimal Conditions | Red Flags |
| :--- | :--- | :--- | :--- |
| **30%** | **Grid Connection** | Existing 3-phase power, close to proposed pad, low trenching distance. | Exhausted site transformer, >200ft trenching required. |
| **25%** | **Traffic & Geometry** | High AADT, easy on/off highway access, safe 24/7 lighting. | Complex routing off highway, isolated dark corner of lot. |
| **20%** | **Amenity Proximity** | 24/7 restrooms, food/coffee within 200 feet. | No nearby amenities, unsafe walking paths. |
| **15%** | **Space & Fire Code** | Ample space to satisfy NFPA 855 separation for BESS enclosures. | Tight lot boundaries, cannot meet fire separation from buildings. |
| **10%** | **Zoning/Permitting** | Highway Commercial, surplus parking stalls available. | Strict aesthetic bylaws, already at minimum parking capacity. |

Sites scoring 80/100 or above are immediately greenlit for High-Level DER Interconnection Study applications with the local utility.


---

