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
