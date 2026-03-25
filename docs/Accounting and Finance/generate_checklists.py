import os

base_dir = r"c:\dev\Web\company-landing\docs\Accounting and Finance"

checklists = {
    "Business-Plans": """# Business Plans - Index & Checklist

This folder contains the core strategic narratives and business plans for Renvolt.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [x] Executive Summary & Master Business Plan
- [ ] Pitch Deck / Presentation corresponding to the business plan
- [ ] Financial Model (Detailed Excel Pro Forma)
- [ ] Competitor Analysis Matrix
- [ ] Market Sizing Data & Demographic Research
- [ ] Capitalization Table (Cap Table)

## 💡 Relevant Information to Add
- **Target Audience:** Ensure different versions of the plan are tailored for their specific audience (e.g., Venture Capital vs. Government Grants).
- **Updates:** Business plans should be reviewed quarterly to reflect new traction (e.g., new Site Host agreements signed).
""",
    
    "Grant-Applications": """# Grant Applications - Index & Checklist

This folder tracks applications for government subsidies, particularly the Zero Emission Vehicle Infrastructure Program (ZEVIP) and provincial equivalents.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [x] ZEVIP Application Narrative
- [x] ZEVIP Scoring/Qualification Guide
- [ ] Budget Justification & Cost Breakdown Excel
- [ ] Letters of Support (from Site Hosts, Municipalities)
- [ ] Indigenous Consultation / ESG Impact Statements
- [ ] Environmental Assessment Approvals

## 💡 Relevant Information to Add
- **ZEVIP Timeline:** Federal funding windows open periodically. Ensure all narratives are pre-written so applications can be submitted on day 1 of the funding window.
- **Stacking Limits:** Remember that Canadian federal and provincial grants usually have a "stacking limit" (e.g., total government funding cannot exceed 75% of total project costs).
""",

    "Investor-Materials": """# Investor Materials - Index & Checklist

This folder contains collateral designed specifically for fundraising, venture capital pitches, and angel investor outreach.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [x] Investor Pitch Narratives
- [x] Pilot Site Financial Summaries
- [ ] 10-Slide Teaser Pitch Deck (.pptx or .pdf)
- [ ] Comprehensive Technical Due Diligence Room (Data Room link)
- [ ] Founder Biographies / Resumes
- [ ] Term Sheet / SAFE Note templates

## 💡 Relevant Information to Add
- **The Narrative:** Renvolt is an integrated energy platform (Pillar 1: Charging, Pillar 2: BaaS, Pillar 3: Second-life), not just a charging installer. Emphasize the synergistic 3x value creation in all pitches.
- **Traction:** Move metrics from "projected" to "actual" as soon as the first pilot sites are energized.
""",

    "Banking-and-Corporate": """# Banking and Corporate - Index & Checklist

This folder contains the legal, banking, and foundational corporate documents for the entity.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [ ] Articles of Incorporation & Corporate Bylaws (Found in Downloads/Archives)
- [ ] Shareholder Agreements
- [ ] CRA Business Number Registration
- [ ] Corporate Bank Account Details (e.g., Void Cheque)
- [ ] Director & Officer Register
- [ ] Annual Corporate Returns
- [ ] Board Meeting Minutes

## 💡 Relevant Information to Add
- Corporate structuring often requires distinct entities if holding significant real estate or hardware assets versus software IP. Consult with a corporate lawyer on liability isolation.
""",

    "Financial-Models": """# Financial Models - Index & Checklist

This folder contains the quantitative spreadsheets representing the business's unit economics and macro projections.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [ ] 5-Year Pro Forma (Income Statement, Balance Sheet, Cash Flow)
- [ ] Unit Economics Calculator (Per-site profitability)
- [ ] Demand Charge Savings Calculator
- [ ] Payroll & Hiring Schedule
- [ ] CapEx Depreciation Schedules

## 💡 Relevant Information to Add
- Ensure the Financial Models strictly align with the numbers quoted in the Business Plans and Investor Pitch. Discrepancies here will instantly fail investor due diligence.
- **Key Metric:** Payback period per site and LTV:CAC ratio.
""",

    "Insurance": """# Insurance - Index & Checklist

This folder contains risk mitigation policies and insurance certificates.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [ ] Commercial General Liability (CGL) Policy
- [ ] Directors & Officers (D&O) Insurance (Required for raising VC)
- [ ] Cyber Liability Insurance
- [ ] Property & Equipment Insurance (for chargers & batteries)
- [ ] Workers Compensation (WCB) Clearances
- [ ] Third-party Environmental Liability (Battery leakage/fire)

## 💡 Relevant Information to Add
- **Hardware Risk:** Second-life batteries and high-voltage DCFCs represent significant fire/liability risks. Standard CGL policies may not adequately cover energy storage systems without a specific rider.
""",

    "Tax-and-Compliance": """# Tax and Compliance - Index & Checklist

This folder tracks ongoing accounting, tax filings, and regulatory compliance.

## Current Documents
{files}

## 📋 Folder Checklist & Required Docs
- [ ] Annual T2 Corporate Tax Returns
- [ ] GST/HST Registration & Quarterly Remittances
- [ ] Monthly Bookkeeping & Financial Statements (Income, Balance)
- [ ] SR&ED Tax Credit Claims (For software/battery tech dev)
- [ ] Measurement Canada Compliance (for selling electricity by the kWh)
- [ ] Electrical Safety Authority (ESA) inspection records

## 💡 Relevant Information to Add
- **SR&ED Opportunity:** Building a proprietary energy management software stack to optimize battery dispatch might qualify for Canada's SR&ED tax credits, returning up to ~60% of eligible software engineering salaries.
- **Measurement Canada:** EV charging in Canada allows billing per kWh (not just time), but chargers must be Measurement Canada certified.
"""
}

# Generate reading lists and write checklists
for folder_name, template in checklists.items():
    folder_path = os.path.join(base_dir, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    
    # List files in folder (excluding READMEs)
    files_in_dir = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and not f.endswith('Checklist.md')]
    
    file_list_str = ""
    if not files_in_dir:
        file_list_str = "*(No documents currently in this folder)*"
    else:
        for f in files_in_dir:
            file_list_str += f"- [{f}](./{f})\n"
            
    content = template.format(files=file_list_str)
    
    readme_path = os.path.join(folder_path, "README_Checklist.md")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Created {readme_path}")
