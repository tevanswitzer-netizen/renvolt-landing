<div align="center">
<br><br><br><br><br>
<img src="./public/logo-transparent-dark.png" width="300">
<br><br><br>

# PRELIMINARY ENGINEERING REPORT
## Phase 1: Battery-Backed DC Fast Charging Infrastructure

<br><br>
<p><b>Prepared For:</b> ZEVIP Grant Application & Phase 1 Site Hosts</p>
<p><b>Prepared By:</b> Renvolt Engineering</p>
<p><b>Date:</b> March 14, 2026</p>
<p><b>Status:</b> CONFIDENTIAL DRAFT</p>
<br><br><br><br><br>
</div>
<div style="page-break-after: always;"></div>

<br>

**Standard:** Canadian Electrical Code (CEC) CSA C22.1-2024 | CSA C22.2 No. 107.1  
**Jurisdiction:** Alberta, Canada — FortisAlberta / ATCO Electric service territory  
**Architecture:** 150 kW Shared DC Bus / 100 kWh Local BESS Storage  

---

## 1. Design Philosophy

This system is designed as a **zero-export, behind-the-meter** installation. The battery charges slowly from the grid (≤50 kW) and discharges rapidly (150 kW) into EV dispensers. From the utility's perspective, this site is a **predictable 50–70 kW commercial load** — not a generator.

> [!IMPORTANT]
> Zero-export configuration avoids the Generator Interconnection Application (GIA) requirement with FortisAlberta/ENMAX. The system qualifies as standard commercial service under AUC Rule 007 Section 3.

### Operating Modes

| Mode | Grid Draw | Battery State | DCFC Output |
|------|-----------|---------------|-------------|
| **Idle** (no vehicles) | 30–50 kW | Charging | 0 kW |
| **Single vehicle** | 50 kW | Discharging | 150 kW (ZEVIP Compliant) |
| **Multi-vehicle** (2 stalls) | 50 kW | Discharging | 75 kW × 2 (Dynamic Share) |
| **Battery depleted** | 50 kW (passthrough) | Depleted — recharging | 50 kW (degraded mode) |
| **Off-peak recovery** | 50 kW | Charging from 0–100% | 0 kW |

**Key metric:** Full battery recovery from 0% to 100% = 100 kWh ÷ 50 kW = **2 hours**

---

## 2. System Architecture

![Single-Line Architecture Diagram](./architecture.png)

---

## 3. Electrical Service Requirements

### 3.1 Utility Service Sizing

The grid connection only needs to support the **battery charge rate**, not the full 150 kW output. This is the core advantage.

| Parameter | Without Battery | With Battery |
|-----------|----------------|--------------|
| Peak grid demand | **150 kW** | **50 kW** |
| Service size needed | 600A @ 208V | **200A @ 208V** |
| Estimated service upgrade cost | $80,000–$150,000 | **$0–$15,000** |
| Monthly demand charge (@ $12/kW) | $1,800/mo | **$600/mo** |

### 3.2 Service Specification

| Item | Specification |
|------|--------------|
| **Voltage** | 208Y/120V, 3-phase, 4-wire |
| **Service size** | 200A |
| **Service entrance** | Overhead or underground per utility |
| **Meter** | CT-rated revenue meter (utility-supplied) |
| **Service conductor** | 3/0 AWG copper, TECK90, per CEC Table 2 |
| **Grounding electrode** | Per CEC Rule 10-700 (min. #6 AWG copper to ground rod) |
| **Bonding** | Per CEC Rule 10-600 series |

### 3.3 Alternative: 600V Service

For sites with existing 347/600V 3-phase service (common in Alberta industrial areas):

| Item | Specification |
|------|--------------|
| **Voltage** | 347/600V, 3-phase, 4-wire |
| **Service size** | 100A (50 kW at 600V = ~48A, 125% = 60A) |
| **Service conductor** | #4 AWG copper, TECK90 |
| **Advantage** | Lower current = smaller wire, lower losses |
| **Disadvantage** | Requires step-down transformer if host building uses 208V |

---

## 4. Wire Sizing Calculations

All calculations per **CEC 2024**, using **75°C copper conductors** and **CEC Table 2** ampacities.

### 4.1 AC Side: Grid → Bidirectional Inverter

**Load:** 50 kW continuous at 208V, 3-phase

```
Current (I) = P / (V × √3 × PF)
           = 50,000 / (208 × 1.732 × 0.95)
           = 50,000 / 342.1
           = 146.1 A

CEC Rule 8-104(5): Continuous load × 125%
           = 146.1 × 1.25
           = 182.6 A → Use 200A breaker
```

| Component | Specification | CEC Reference |
|-----------|--------------|---------------|
| **Conductors** | 3/0 AWG copper, TECK90 (200A @ 75°C) | Table 2 |
| **Neutral** | 3/0 AWG copper (full-sized) | Rule 4-022 |
| **Ground** | #6 AWG copper (bonding conductor) | Table 16 |
| **Conduit** | 2" rigid metal conduit (RMC) or 2" TECK cable | Table D16 |
| **Breaker** | 200A, 3-pole, 42 kAIC minimum | Rule 14-012 |
| **Run length** | ≤ 25 m (voltage drop < 3%) | Rule 8-102 |

**Voltage Drop Check (25 m run):**
```
Vd = (2 × L × I × R) / 1000
   = (2 × 25 × 146 × 0.328) / 1000     [R for 3/0 AWG = 0.328 Ω/km]
   = 2.39 V per conductor
   = 2.39 / 208 × 100 = 1.15%           ✓ Under 3% limit
```

### 4.2 DC Side: Battery Bank → DC-DC Converter → Dispensers

**Load:** 150 kW at 800V DC bus

```
Current (I) = P / V
           = 150,000 / 800
           = 187.5 A

Continuous rating × 125%:
           = 187.5 × 1.25
           = 234.4 A → Use 250A DC fuse/breaker
```

| Component | Specification | Notes |
|-----------|--------------|-------|
| **DC bus conductors** | 4/0 AWG copper, PV Wire (USE-2), 600V DC min | 230A @ 75°C per Table 2 |
| **DC disconnect** | 250A, 1000V DC rated, lockable | Required per CEC Rule 64-112 |
| **DC fuses** | 250A, 1000V DC, gPV type | Per CEC Rule 64-060 |
| **Conduit** | 1.5" rigid metal or PV-rated tray cable | |

### 4.3 DC Side: Power Cabinet → Individual Dispenser Posts

**Load per dispenser:** Dynamic. Up to 150 kW (ZEVIP Compliant) for a single vehicle, or mathematically shared across two vehicles.

```
Worst case (single vehicle demanding full 150kW at 400V):
I = 150,000 / 400 = 375 A (Requires liquid-cooled dispenser cable or 400A continuous rating)

Shared case (two vehicles demanding 75kW at 400V):
I = 75,000 / 400 = 187.5 A → 125% = 234 A
```

| Component | Specification |
|-----------|--------------|
| **Conductors (per dispenser)** | 500 kcmil copper or specialized liquid-cooled assembly |
| **Breaker per dispenser** | 400A-500A, 1000V DC |
| **Cable length** | ≤ 10 m (dispenser cord is integral to unit) |

### 4.4 Wire Schedule Summary

| Circuit | Voltage | Current | Wire | Breaker/Fuse | Conduit |
|---------|---------|---------|------|-------------|---------|
| Grid → Main panel | 208V 3φ AC | 146A (182A rated) | 3/0 AWG Cu TECK90 × 3 + N + G | 200A 3P | 2" RMC |
| Main panel → Inverter | 208V 3φ AC | 146A | 3/0 AWG Cu TECK90 × 3 + N + G | 200A 3P | 2" RMC |
| Inverter ↔ Battery | 800V DC | 62.5A (charge) / 187.5A (discharge) | 4/0 AWG Cu USE-2 × 2 + G | 250A DC | 1.5" RMC |
| Battery → DC-DC converter | 800V DC | 187.5A | 4/0 AWG Cu USE-2 × 2 + G | 250A DC | 1.5" RMC |
| Cabinet → Dispenser 1 | 200–920V DC | up to 375A | 500 kcmil / Liquid-Cooled | 400A DC | Integral |
| Cabinet → Dispenser 2 | 200–920V DC | up to 375A | 500 kcmil / Liquid-Cooled | 400A DC | Integral |
| Host building sub-panel | 208V 3φ AC | 40A | #8 AWG Cu TECK90 × 3 + N + G | 50A 3P | 1" RMC |

---

## 5. Battery Bank Specification

### 5.1 Cell Chemistry & Configuration

| Parameter | Specification |
|-----------|--------------|
| **Chemistry** | LFP (Lithium Iron Phosphate — LiFePO₄) |
| **Why LFP** | No thermal runaway, 5000+ cycle life, –30°C operation, no cobalt |
| **Total capacity** | 100 kWh usable (110 kWh gross at 90% DoD) |
| **Nominal voltage** | 819.2V (16 modules × 51.2V/module) |
| **Module configuration** | 16S rack module, 51.2V, 100 Ah per module |
| **Modules in series** | 16 (total: 819.2V nominal) |
| **Min voltage (empty)** | 704V (16 × 44V cutoff) |
| **Max voltage (full)** | 921.6V (16 × 57.6V float) |

### 5.2 Charge / Discharge Rates

| Parameter | Value | C-Rate |
|-----------|-------|--------|
| **Max charge rate** | 50 kW (from grid) | 0.5C |
| **Max discharge rate** | 150 kW (to DCFC) | 1.5C |
| **Full charge time** | 2 hours (0–100%) | — |
| **Full discharge time** | 40 minutes (at 150 kW) | — |
| **Cycle life** | >5,000 cycles @ 80% DoD | — |
| **Calendar life** | 15+ years | — |

### 5.3 Thermal Management

| Condition | System Response |
|-----------|----------------|
| **>45°C cell temp** | Reduce charge/discharge to 50% |
| **>55°C cell temp** | Shutdown — thermal fault |
| **<–20°C cell temp** | Activate heated enclosure, delay charge until >0°C |
| **<–40°C ambient** | Enclosure heaters maintain battery at >5°C (500W heating element) |
| **Normal range** | 15–35°C (liquid or forced-air cooled) |

### 5.4 BMS Requirements

- Cell-level voltage monitoring (±10 mV accuracy)
- Cell-level temperature monitoring (NTC per module)
- Active cell balancing (top-balance at 3.65V/cell)
- SOC estimation (Coulomb counting + OCV correction)
- Communication: CAN bus to inverter, Modbus TCP to site controller
- Safety: pre-charge circuit, contactor control, fuse monitoring

---

## 6. Single-Line Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│  UTILITY (FortisAlberta)                                                │
│  208Y/120V, 3φ, 4W                                                     │
└─────────────────────────────┬────────────────────────────────────────────┘
                              │
                         ┌────┴────┐
                         │ CT Meter │  (Revenue meter, utility-owned)
                         └────┬────┘
                              │  3/0 AWG Cu TECK90 × 4 + #6G in 2" RMC
                              │
                    ┌─────────┴─────────┐
                    │   MAIN BREAKER    │
                    │   200A / 3P       │
                    │   42 kAIC min     │
                    └────┬─────────┬────┘
                         │         │
         ┌───────────────┘         └───────────────┐
         │                                         │
    ┌────┴────┐                            ┌───────┴───────┐
    │ SPD     │                            │ Host Sub-panel│
    │ Type 2  │                            │ 50A / 3P      │
    └─────────┘                            │ #8 AWG Cu     │
         │                                 │ Lights, CCTV, │
         │                                 │ Signage, HVAC │
    ┌────┴───────────────┐                 └───────────────┘
    │ BIDIRECTIONAL      │
    │ INVERTER           │
    │ 50 kW AC ↔ DC      │
    │ 208V AC → 800V DC  │
    │ 97.5% efficiency   │
    └────────┬───────────┘
             │  4/0 AWG Cu USE-2 × 2 + G in 1.5" RMC
             │
     ┌───────┴───────┐
     │ DC DISCONNECT │
     │ 250A / 1000V  │
     │ Lockable      │
     └───────┬───────┘
             │
     ┌───────┴───────┐        ┌──────────────────┐
     │ LFP BATTERY   │◄──────►│ BMS CONTROLLER   │
     │ 100 kWh       │  CAN   │ Cell monitoring   │
     │ 819.2V nom    │  bus   │ Thermal mgmt      │
     │ 16 modules    │        │ SOC estimation     │
     │ (16S × 51.2V) │        │ Contactor control  │
     └───────┬───────┘        └──────────────────┘
             │  4/0 AWG Cu USE-2 × 2 + G
             │
     ┌───────┴───────┐
     │ DC FUSE       │
     │ 250A / 1000V  │
     │ gPV type      │
     └───────┬───────┘
             │
    ┌────────┴────────────┐
    │ POWER CABINET       │
    │ 800V → 200-920V     │
    │ 150 kW total        │
    │ Dynamic power share │
    └───┬────────────┬────┘
        │            │
   ┌────┴────┐  ┌────┴────┐
   │DISP. 1  │  │DISP. 2  │
   │Up to    │  │Up to    │
   │150 kW   │  │150 kW   │
   │CCS1+NACS│  │CCS1+NACS│
   └─────────┘  └─────────┘


 GROUNDING SYSTEM
 ═══════════════
 Equipment ground: #6 AWG Cu to main panel ground bus
 Grounding electrode: 2× 10' ground rods, min 3m apart
 Bond: #6 AWG Cu between rods
 Battery enclosure: bonded to ground bus
 DCFC dispensers: equipment ground per CEC Rule 10-400
```

---

## 7. Protection & Safety

### 7.1 AC Protection

| Device | Rating | Purpose | CEC Rule |
|--------|--------|---------|----------|
| Main breaker | 200A, 3P, 42 kAIC | Overcurrent, service disconnect | 14-012 |
| SPD (Type 2) | 208V, 100 kA | Surge protection | 18-100 |
| Ground fault (GFCI) | 30 mA, Class A | Personnel protection at dispensers | 26-700 |
| AFCI | Per panel schedule | Arc fault (if required by AHJ) | 26-656 |

### 7.2 DC Protection

| Device | Rating | Purpose |
|--------|--------|---------|
| DC disconnect | 250A, 1000V DC, lockable | Battery isolation (maintenance/fire) |
| DC fuses (gPV) | 250A, 1000V DC | Short circuit protection |
| Pre-charge relay | 10A, 1000V DC | Inrush current limiting at startup |
| Contactor (×2) | 250A, 1000V DC | BMS-controlled battery isolation |

### 7.3 Fire Safety

| Requirement | Specification |
|-------------|--------------|
| **Enclosure rating** | NEMA 3R (outdoor, rain-tight) minimum |
| **Fire suppression** | Clean agent (Novec 1230 or aerosol) — NOT water or foam |
| **Thermal runaway detection** | Gas sensor (VOC) + rate-of-rise thermal sensor |
| **Emergency stop** | Exterior-mounted E-stop, red mushroom, opens DC contactors |
| **Clearances** | 1 m from building walls, 3 m from combustibles (per NFPA 855) |
| **Signage** | "DANGER: BATTERY ENERGY STORAGE — 800V DC" at all access points |
| **First responder placard** | Per NFPA 855 Section 4.1.5 — posted at site entrance |

### 7.4 Arc Flash Labeling

| Location | Estimated Incident Energy | PPE Category |
|----------|--------------------------|--------------|
| Main panel (AC) | 4–8 cal/cm² | Cat 1 |
| DC disconnect | 2–4 cal/cm² (limited by fuse) | Cat 1 |
| Battery rack | 8–15 cal/cm² | Cat 2 |

> [!WARNING]
> Arc flash study **must** be performed by a P.Eng. or certified technician before energization. These are estimates only.

---

## 8. Site Layout Considerations

### 8.1 Equipment Footprint

| Equipment | Dimensions (approx.) | Weight |
|-----------|---------------------|--------|
| Battery enclosure (outdoor rated) | 2.4 m × 1.2 m × 2.1 m (8' × 4' × 7') | ~2,500 kg |
| Inverter + DC-DC (integrated unit) | 1.5 m × 0.8 m × 2.0 m | ~800 kg |
| Main distribution panel | 0.9 m × 0.3 m × 1.5 m | ~100 kg |
| DCFC Dispenser (each) | 0.6 m × 0.5 m × 1.8 m | ~300 kg |
| **Total pad area** | **~3.5 m × 6 m (120 sq ft)** concrete pad | |

### 8.2 Pull-Through Bay Layout

```
                    ┌─────────────────────────────────┐
                    │       EQUIPMENT PAD              │
                    │  [BATT]  [INV/DCDC]  [PANEL]    │
                    │       (fenced, 1.8m chain-link)  │
                    └────────────┬────────────────────┘
                                 │  underground conduit
          ───────────────────────┼───────────────────────
         ← ENTRY                │                EXIT →
          ─────┌─────────────[DISP 1]─────────────┐─────
               │           Bay 1 (pull-through)    │
          ─────└──────────────────────────────────┘─────
          ─────┌─────────────[DISP 2]─────────────┐─────
               │           Bay 2 (pull-through)    │
          ─────└──────────────────────────────────┘─────
          ───────────────────────────────────────────────
                        HIGHWAY →
```

**Pull-through clearance:** 25 m length × 4 m width per bay (accommodates truck + 16 m trailer)

---

## 9. Bill of Materials (Preliminary)

| Item | Qty | Unit Cost (CAD) | Total (CAD) |
|------|-----|-----------------|-------------|
| LFP Battery modules (51.2V/100Ah) | 16 | $3,500 | $56,000 |
| Battery rack + enclosure (NEMA 3R, heated) | 1 | $12,000 | $12,000 |
| BMS controller + harness | 1 | $5,000 | $5,000 |
| Bidirectional inverter (50 kW, 208V↔800V) | 1 | $18,000 | $18,000 |
| Central Power Cabinet (150kW shared DC bus) | 1 | $22,000 | $22,000 |
| DCFC Dispenser Post (Capable of 150kW each) | 2 | $15,000 | $30,000 |
| Main distribution panel (200A) | 1 | $3,500 | $3,500 |
| DC disconnect (250A/1000V) | 2 | $1,200 | $2,400 |
| SPD, fuses, breakers, contactors | 1 lot | $4,000 | $4,000 |
| Cable & conduit (AC + DC) | 1 lot | $6,000 | $6,000 |
| Concrete pad + bollards + fencing | 1 | $15,000 | $15,000 |
| Fire suppression (Novec 1230) | 1 | $5,000 | $5,000 |
| Signage, markings, lighting | 1 lot | $3,000 | $3,000 |
| **Electrical installation labour** | ~120 hrs | $120/hr | **$14,400** |
| Engineering (P.Eng. stamp, drawings) | 1 | $8,000 | $8,000 |
| Permitting + inspection fees | 1 | $3,000 | $3,000 |
| **TOTAL (pre-grant)** | | | **$207,300** |
| **ZEVIP 75% (Indigenous partnership)** | | | **–$155,475** |
| **NET COST TO RBS** | | | **$51,825** |

> [!NOTE]
> These are Q1 2026 estimates. Battery module prices are declining ~15%/year. Actual costs will vary by site conditions, utility requirements, and equipment vendor.

---

## 10. Permit & Inspection Checklist

| Step | Responsible | Timeline |
|------|-------------|----------|
| Electrical permit application (Alberta Safety Codes) | Master Electrician | Week 1 |
| FortisAlberta service application (200A commercial) | RBS / Electrician | Weeks 1–4 |
| P.Eng. stamped drawings (single-line, site plan) | Contracted P.Eng. | Weeks 2–3 |
| AHJ review (municipal planning, if applicable) | Municipality | Weeks 3–6 |
| Foundation / concrete pour | Civil contractor | Week 5 |
| Equipment installation | RBS Master Electrician | Weeks 6–8 |
| Rough-in inspection | Safety Codes Officer | Week 7 |
| Energization request to FortisAlberta | RBS / Utility | Week 8 |
| Final inspection + system commissioning | Safety Codes Officer + RBS | Week 9 |
| CUL/CSA compliance verification | Equipment vendor | Pre-shipment |
| **Total timeline: ~9–12 weeks** (from permit to energized) | | |

---

## 11. Key Standards & References

| Standard | Application |
|----------|------------|
| **CEC CSA C22.1-2024** | All electrical installation requirements |
| **CSA C22.2 No. 107.1** | Power conversion equipment |
| **CSA C22.2 No. 340** | Battery ESS — safety requirements |
| **UL 9540 / UL 9540A** | ESS installation + thermal runaway testing |
| **NFPA 855** | Stationary energy storage systems |
| **SAE J1772 / J3068** | AC charging connector standards |
| **SAE J3400** | NACS connector standard |
| **IEC 61851-23** | DC EV supply equipment |
| **AUC Rule 007** | Alberta generator/storage interconnection |

---

> [!CAUTION]
> This document is for **preliminary design and planning purposes only.** All electrical designs must be reviewed and stamped by a licensed Professional Engineer (P.Eng.) registered in Alberta before construction. Wire sizing, protection coordination, and arc flash calculations must be verified against site-specific conditions.
