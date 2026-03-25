# Renvolt
## Comprehensive Electrical Code & Fire Safety Research
*Prepared: March 2026*

---

## 1. Executive Summary

This document details the hardware, installation, and fire safety compliance requirements necessary for Renvolt to deploy its integrated Public DC Fast Charging (DCFC) and commercial Battery Energy Storage Systems (BESS). 

Operating in Alberta requires adherence not only to the Canadian Electrical Code (CE Code), but also mandatory provincial variances (STANDATA), and stringent international fire safety and battery repurposing standards (NFPA 855 and UL 1974). Compliance with these standards is non-negotiable to secure municipal electrical permits and maintain commercial viability.

---

## 2. Electrical Code: DCFC & BESS Installation

Electrical installations in Alberta are governed by the Canadian Electrical Code (CE Code), coupled with mandatory, Alberta-specific variances known as **STANDATA** issued by the Safety Codes Council.

### 2.1 CE Code Section 64: Battery Energy Storage Systems (BESS)
Section 64 dictates how renewable energy and battery systems are wired and physically placed.
*   **Location Restrictions (Rule 64-918 & 64-1100):** Historically, the CE Code heavily restricted BESS placement (e.g., forbidding basement installations or capping residential sizes at 1kWh).
*   **Alberta STANDATA Variances:** Alberta Municipal Affairs has issued recent STANDATA variances (e.g., 21-ECV-064 and 24-ECI-086) that relax these rules to accommodate the booming energy storage industry, increasing capacity limits and outlining safe outdoor installation criteria. 
*   **Compliance Approach:** Renvolt's exterior commercial BESS units fall under heavy scrutiny regarding physical separation distances from property lines and combustible materials. Our standardized engineering drawings must explicitly cite the latest STANDATA exemptions allowing our targeted capacity sizes.

### 2.2 CE Code Section 86: Electric Vehicle Charging Systems
Section 86 governs the DC Fast Chargers.
*   **Power Requirements:** Level 3 DC Fast Chargers (150kW - 350kW) demand a 3-phase, 480VAC or 600VAC service. 
*   **Adjustable Ampacity:** Renvolt's chargers will dynamically adjust their power output based on real-time battery buffered capacity (to avoid tripping main breakers during peak site loads). 
*   **Labeling Compliance:** Alberta STANDATA (e.g., 21-ECI-086) specifically requires that EV systems with adjustable ampacities possess highly visible warning signs indicating the maximum demand load setting, ensuring subsequent electrical workers understand the branch circuit wiring is sized for that maximum potential.

---

## 3. Second-Life Battery & Fire Safety Standards

The use of *repurposed* (second-life) lithium-ion batteries introduces the most complex regulatory layer to Renvolt's business model. Overcoming this barrier creates a massive competitive moat.

### 3.1 UL 1974: The Repurposing Standard
*   **The Standard:** UL 1974 is the bi-national (US and Canada) standard specifically created for the "Evaluation for Repurposing Batteries." 
*   **Application:** While ISO 62619 governs the safety of *new* industrial lithium cells, UL 1974 is the critical gateway for second-life cells. It outlines mandatory sorting procedures, State-of-Health (SOH) testing, and quality control metrics.
*   **Renvolt's Position:** Renvolt cannot simply buy used EV batteries and informally wire them together. To satisfy insurance providers and municipal electrical inspectors, Renvolt must either achieve UL 1974 certification for its internal grading processes or exclusively partner with an aggregator that provides UL 1974 certified packs.

### 3.2 NFPA 855: Fire Code & Stationary Storage
*   **The Standard:** The National Fire Protection Association's NFPA 855 is the definitive standard for the Installation of Stationary Energy Storage Systems. It is heavily referenced and enforced via the International Fire Code (IFC) and Alberta Fire Code.
*   **Requirements:** NFPA 855 applies to lithium-ion systems over 20kWh (which encompasses all of Renvolt's commercial sites). It strictly mandates:
    1.  **UL 9540A Data:** Large-scale fire testing propagation data must be provided for the battery cabinets.
    2.  **Physical Spacing:** Specific physical spacing between battery racks (usually a minimum of 3 feet) is mandated to prevent thermal runaway propagation from cabinet to cabinet.
    3.  **Active Safety:** Emergency disconnect switches and advanced smoke/gas detection systems integrated with the centralized Battery Management System (BMS).

---

## 4. Strategic Compliance Roadmap

To ensure rapid, legal deployment of Renvolt's integrated sites while leveraging our second-life cost advantage, the engineering team must:

1.  **Standardize the Drawing Package:** Create a master Single-Line Diagram (SLD) template that explicitly references the prevailing Alberta STANDATA (24-ECI-086) for both the battery and the charger.
2.  **Supplier Contract Clauses:** Mandate UL 1974 documentation in all procurement contracts for second-life battery modules.
3.  **Enclosure Pre-Engineering:** Pre-engineer the external physical BESS enclosures to guarantee NFPA 855 3-foot spacing and UL 9540A thermal runway protections, thereby avoiding costly ad-hoc municipal fire inspector negotiations at each new site.
