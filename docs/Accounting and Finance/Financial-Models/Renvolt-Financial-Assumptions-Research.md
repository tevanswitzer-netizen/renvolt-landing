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
