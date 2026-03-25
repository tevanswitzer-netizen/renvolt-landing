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
