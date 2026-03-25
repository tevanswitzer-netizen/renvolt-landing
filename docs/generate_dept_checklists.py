import os

base_dir = r"c:\dev\Web\company-landing\docs"

checklists = {
    "Distribution": """# Distribution - Index & Checklist

This folder tracks logistics, deployment, and network operations for EV charging hardware and Battery-as-a-Service (BaaS) systems.

## Current Subfolders & Documents
{files}

## 📋 Department Checklist & Required Docs
- [ ] Logistics & Supply Chain Strategy
- [ ] Network Operations Manual
- [ ] Site Agreements (Standard execution copies)
- [ ] Transportation & Freight Contracts
- [ ] Site Deployment & Staging Plans

## 💡 Relevant Information to Add
- **Deployment Velocity:** Pre-staging hardware at a central Alberta warehouse minimizes downtime during the very short summer installation window.
- **Hardware Agnosticism:** Ensure deployment plans account for multiple charger brands (e.g., ABB, Tritium, ChargePoint) to prevent supply chain bottlenecks.
""",

    "Human Resource Management": """# Human Resource Management - Index & Checklist

This folder contains organizational structures, hiring documentation, and personnel policies.

## Current Subfolders & Documents
{files}

## 📋 Department Checklist & Required Docs
- [ ] Contractor Agreements (Independent Contractor Master Agreements)
- [ ] Job Descriptions (Operations, Engineering, Sales)
- [ ] Organizational Chart / Hiring Roadmap
- [ ] Employee Handbook / Policies and Procedures
- [ ] NDAs and IP Assignment Agreements

## 💡 Relevant Information to Add
- **Early-Stage Structuring:** As a pre-Series A startup, lean heavily on specialized contractors for immediate execution while reserving equity/full-time offers for core technical leadership.
- **IP Protection:** Every contractor and employee MUST sign a proprietary information and inventions assignment agreement to protect the software platform.
""",

    "Production": """# Production & Engineering - Index & Checklist

This folder serves as the technical repository for charger installation, battery refurbishment, and system engineering.

## Current Subfolders & Documents
{files}

## 📋 Department Checklist & Required Docs
- [ ] Engineering Reports (Site load studies, structural assessments)
- [ ] Equipment Specifications (DCFC hardware, battery cell data)
- [ ] Installation Records & Commissioning Sign-offs
- [ ] Maintenance and Operations Manuals
- [ ] Permits and Inspections (Municipal, Electrical Safety Authority)
- [ ] Technical Diagrams (Single-line diagrams)

## 💡 Relevant Information to Add
- **Second-Life Batteries:** Maintaining meticulous testing and diagnostic records is critical. Batteries must pass ISO 62619 and UN38.3 standards before redeployment.
- **Permitting:** Municipal permitting is often the longest bottleneck. Standardize the single-line electrical diagrams to expedite city approvals.
""",

    "Purchasing": """# Purchasing & Procurement - Index & Checklist

This folder manages the sourcing of hardware components, vendor relationships, and purchase tracking.

## Current Subfolders & Documents
{files}

## 📋 Department Checklist & Required Docs
- [ ] Approved Vendors List (Hardware, software, contractors)
- [ ] Purchase Orders (Archived)
- [ ] Requests for Quote (RFQs) Templates
- [ ] Vendor Contracts & Master Service Agreements
- [ ] Supply Chain Dependency Maps

## 💡 Relevant Information to Add
- **Risk Mitigation:** Implement dual-sourcing for critical failure points. Never rely on a single manufacturer for DC battery controllers or cooling units.
- **Volume Discounts:** Aggregate purchasing with early OEM partners (e.g., Tesla, Nissan) to hit Tier 1 pricing on second-life battery extraction.
""",

    "Research and Development": """# Research and Development - Index & Checklist

This folder contains competitive intelligence, market sizing, technology research, and regulatory tracking.

## Current Subfolders & Documents
{files}

## 📋 Department Checklist & Required Docs
- [ ] Competitor Analysis Matrix
- [ ] Market Research (EV adoption rates, grid capacity data)
- [ ] Regulatory Research (Utility commission rulings, demand charge rates)
- [ ] Technology Research (Solid-state batteries, sodium-ion)
- [ ] Site/Corridor Analysis (Traffic counts, nearest competitor)

## 💡 Relevant Information to Add
- **NACS Transition:** All research and future site deployments must account for the industry-wide shift to the North American Charging Standard (NACS).
- **Utility Tariffs:** Constantly monitor AUC (Alberta Utilities Commission) filings for changes to demand charges, as our entire BaaS model relies on energy arbitrage.
""",

    "Sales and Marketing": """# Sales and Marketing - Index & Checklist

This folder houses the brand assets, customer acquisition funnels, and public relations materials.

## Current Subfolders & Documents
{files}

## 📋 Department Checklist & Required Docs
- [ ] Brand Campaigns & Guidelines ("Midnight Luxe" aesthetic)
- [ ] Advertising Creatives (High-fidelity renders)
- [ ] Customer Pipeline / CRM Exports
- [ ] Strategic Partnerships (e.g., Gas station chains, fleet operators)
- [ ] Press and Media Kit
- [ ] Sales Presentations (For Site Hosts & BaaS customers)

## 💡 Relevant Information to Add
- **Value Proposition:** Renvolt is an integrated energy platform, not just a charger installer. All sales materials must emphasize the 3-pillar synergy (Charging + Storage + Recycling).
- **Targeting:** Lead with eliminating Demand Charges for site hosts. That is the highest-converting pain point.
"""
}

# Generate reading lists and write checklists
for folder_name, template in checklists.items():
    folder_path = os.path.join(base_dir, folder_name)
    if not os.path.exists(folder_path):
        continue
    
    # List files and dirs in folder (excluding READMEs)
    items_in_dir = []
    for item in os.listdir(folder_path):
        if item.endswith('Checklist.md') or item == 'README.md': continue
        items_in_dir.append(item)
    
    file_list_str = ""
    if not items_in_dir:
        file_list_str = "*(No subfolders or documents currently in this folder)*"
    else:
        for f in items_in_dir:
            file_list_str += f"- [{f}](./{f})\n"
            
    content = template.format(files=file_list_str)
    
    readme_path = os.path.join(folder_path, "README_Checklist.md")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Created {readme_path}")
