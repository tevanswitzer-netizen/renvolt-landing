import React, { useState, useEffect } from 'react';
import { 
    Calculator, 
    ShieldCheck, 
    FileText, 
    TrendingUp, 
    Zap, 
    AlertTriangle, 
    CheckCircle2, 
    Layers, 
    Download, 
    DollarSign, 
    HelpCircle, 
    Smartphone,
    Image,
    Trash2,
    X,
    Users,
    Plus,
    Save
} from 'lucide-react';
import initialCustomers from '../data/customers.json';

// Circular Mils (CM) for standard copper conductors
const CM_MAP = {
    10: 10380,
    8: 16510,
    6: 26240,
    4: 41740,
    2: 66360
};

// Wire size labels based on ampacity
const WIRE_BY_AMPS = [
    { maxAmps: 30, size: '10', label: '#10 AWG Copper' },
    { maxAmps: 40, size: '8',  label: '#8 AWG Copper' },
    { maxAmps: 55, size: '6',  label: '#6 AWG Copper' },
    { maxAmps: 70, size: '4',  label: '#4 AWG Copper' },
    { maxAmps: 95, size: '2',  label: '#2 AWG Copper' }
];

const EV_CHARGER_TEMPLATES = [
    { name: 'Grizzl-E Classic (Canadian Made)', continuousAmps: 32, breakerAmps: 40, price: 550 },
    { name: 'Tesla Universal Wall Connector', continuousAmps: 40, breakerAmps: 50, price: 850 },
    { name: 'Flo Home X5 (Quebec Winter Rated)', continuousAmps: 40, breakerAmps: 50, price: 1295 },
    { name: 'High-Power Home EVSE', continuousAmps: 48, breakerAmps: 60, price: 950 },
    { name: 'Customer-Provided Charger', continuousAmps: 32, breakerAmps: 40, price: 0 }
];

const EVOperationsToolkit = () => {
    const [activeTab, setActiveTab] = useState('crm'); // crm, load, volt, quote, checklist

    // --- CRM / CUSTOMER DATA STATE ---
    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem('renvolt_crm_customers');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error(e);
            }
        }
        localStorage.setItem('renvolt_crm_customers', JSON.stringify(initialCustomers));
        return initialCustomers;
    });

    const [currentClientId, setCurrentClientId] = useState(null);
    const [crmSearchQuery, setCrmSearchQuery] = useState('');
    const [selectedCrmCustomerId, setSelectedCrmCustomerId] = useState(null);

    const filteredCustomers = customers.filter(c => {
        const q = crmSearchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || 
               c.phone.includes(q) || 
               c.address.toLowerCase().includes(q);
    });

    const activeClientRecord = customers.find(c => c.id === (selectedCrmCustomerId || currentClientId));

    // --- TAB 1: LOAD HEADROOM CALCULATOR STATE ---
    const [panelSize, setPanelSize] = useState(100); // 100A, 125A, 200A
    const [livingArea, setLivingArea] = useState(150); // m2
    const [hasRange, setHasRange] = useState(true);
    const [rangePower, setRangePower] = useState(12000); // W
    const [hasDryer, setHasDryer] = useState(true);
    const [hasWaterHeater, setHasWaterHeater] = useState(true);
    const [hasHotTub, setHasHotTub] = useState(false);
    const [heatingType, setHeatingType] = useState('larger'); // larger of AC or furnace
    const [heatingPower, setHeatingPower] = useState(10000); // W (furnace fan/electric element)
    const [acPower, setAcPower] = useState(4000); // W
    const [otherLoads, setOtherLoads] = useState(0); // W
    const [evseAmps, setEvseAmps] = useState(32); // Amps continuous (32A = 7.68kW)
    const [useEVEMS, setUseEVEMS] = useState(false); // EVEMS load shedding toggled

    // Calculated states
    const [calcBasicLoad, setCalcBasicLoad] = useState(0);
    const [calcRangeLoad, setCalcRangeLoad] = useState(0);
    const [calcDryerLoad, setCalcDryerLoad] = useState(0);
    const [calcHeatingACLoad, setCalcHeatingACLoad] = useState(0);
    const [calcWaterHeaterLoad, setCalcWaterHeaterLoad] = useState(0);
    const [calcHotTubLoad, setCalcHotTubLoad] = useState(0);
    const [calcEvseLoad, setCalcEvseLoad] = useState(0);
    const [totalWatts, setTotalWatts] = useState(0);
    const [totalAmps, setTotalAmps] = useState(0);
    const [headroomAmps, setHeadroomAmps] = useState(0);
    const [loadCalcStatus, setLoadCalcStatus] = useState('PASS'); // PASS, BORDERLINE, FAIL

    // --- TAB 2: VOLTAGE DROP CALCULATOR STATE ---
    const [vdAmps, setVdAmps] = useState(32);
    const [vdLength, setVdLength] = useState(50); // ft
    const [vdGauge, setVdGauge] = useState('8'); // #8 AWG
    const [voltageDropVal, setVoltageDropVal] = useState(0);
    const [voltageDropPercent, setVoltageDropPercent] = useState(0);

    // --- TAB 3: QUOTE ESTIMATOR STATE ---
    const [garageType, setGarageType] = useState('attached'); // attached, detached
    const [runLength, setRunLength] = useState(25); // ft
    const [trenchLength, setTrenchLength] = useState(15); // ft
    const [selectedEVSE, setSelectedEVSE] = useState(EV_CHARGER_TEMPLATES[1]); // Tesla Wall Connector
    const [includePanelUpgrade, setIncludePanelUpgrade] = useState(false);
    const [includeEVEMS, setIncludeEVEMS] = useState(false);
    const [quoteSummary, setQuoteSummary] = useState({});

    // --- TAB 4: CHECKLIST STATE ---
    const [checklistData, setChecklistData] = useState({
        clientName: '',
        clientPhone: '',
        panelBrand: 'Square D',
        panelCapacity: '100A',
        panelSpaces: 'Available',
        garageSetup: 'Attached',
        distanceToPanel: '20ft',
        meterLocation: 'Outside Garage',
        groundingConfirmed: true,
        ab811Required: false,
        photoPanel: false,
        photoMeter: false,
        photoChargerLoc: false,
        photoPathway: false,
        photoPanelName: '',
        photoMeterName: '',
        photoChargerLocName: '',
        photoPathwayName: ''
    });

    const [uploadedPhotos, setUploadedPhotos] = useState({
        photoPanel: null,
        photoMeter: null,
        photoChargerLoc: null,
        photoPathway: null
    });

    const handlePhotoUpload = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setUploadedPhotos(prev => ({
                ...prev,
                [field]: event.target.result // Base64 data URI for rendering
            }));
            setChecklistData(prev => ({
                ...prev,
                [field]: true,
                [`${field}Name`]: file.name
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = (field) => {
        setUploadedPhotos(prev => ({
            ...prev,
            [field]: null
        }));
        setChecklistData(prev => ({
            ...prev,
            [field]: false,
            [`${field}Name`]: ''
        }));
    };

    // --- CRM CORE OPERATIONS ---
    const loadCustomerIntoCalculators = (cust) => {
        setCurrentClientId(cust.id);
        
        // TAB 1: Load Calculator
        const lc = cust.loadCalculator || {};
        setPanelSize(lc.panelSize ?? 100);
        setLivingArea(lc.livingArea ?? 150);
        setHasRange(lc.hasRange ?? true);
        setRangePower(lc.rangePower ?? 12000);
        setHasDryer(lc.hasDryer ?? true);
        setHasWaterHeater(lc.hasWaterHeater ?? true);
        setHasHotTub(lc.hasHotTub ?? false);
        setHeatingType(lc.heatingType ?? 'larger');
        setHeatingPower(lc.heatingPower ?? 10000);
        setAcPower(lc.acPower ?? 4000);
        setOtherLoads(lc.otherLoads ?? 0);
        setEvseAmps(lc.evseAmps ?? 32);
        setUseEVEMS(lc.useEVEMS ?? false);

        // TAB 2: Voltage Drop
        const vd = cust.voltageDrop || {};
        setVdAmps(vd.vdAmps ?? 32);
        setVdLength(vd.vdLength ?? 50);
        setVdGauge(vd.vdGauge ?? '8');

        // TAB 3: Quote
        const q = cust.quote || {};
        setGarageType(q.garageType ?? 'attached');
        setRunLength(q.runLength ?? 25);
        setTrenchLength(q.trenchLength ?? 15);
        if (q.selectedEVSE) {
            const found = EV_CHARGER_TEMPLATES.find(t => t.name === q.selectedEVSE) || EV_CHARGER_TEMPLATES[1];
            setSelectedEVSE(found);
        }
        setIncludePanelUpgrade(q.includePanelUpgrade ?? false);
        setIncludeEVEMS(q.includeEVEMS ?? false);

        // TAB 4: Checklist
        const cl = cust.checklist || {};
        setChecklistData({
            clientName: cust.name || '',
            clientPhone: cust.phone || '',
            panelBrand: cl.panelBrand ?? 'Square D',
            panelCapacity: cl.panelCapacity ?? '100A',
            panelSpaces: cl.panelSpaces ?? 'Available',
            garageSetup: cl.garageSetup ?? 'Attached',
            distanceToPanel: cl.distanceToPanel ?? '20ft',
            meterLocation: cl.meterLocation ?? 'Outside Garage',
            groundingConfirmed: cl.groundingConfirmed ?? true,
            ab811Required: cl.ab811Required ?? false,
            photoPanel: cl.photoPanel ?? false,
            photoMeter: cl.photoMeter ?? false,
            photoChargerLoc: cl.photoChargerLoc ?? false,
            photoPathway: cl.photoPathway ?? false,
            photoPanelName: cl.photoPanelName ?? '',
            photoMeterName: cl.photoMeterName ?? '',
            photoChargerLocName: cl.photoChargerLocName ?? '',
            photoPathwayName: cl.photoPathwayName ?? ''
        });

        const up = cust.uploadedPhotos || {};
        setUploadedPhotos({
            photoPanel: up.photoPanel ?? null,
            photoMeter: up.photoMeter ?? null,
            photoChargerLoc: up.photoChargerLoc ?? null,
            photoPathway: up.photoPathway ?? null
        });
    };

    const saveCustomerData = (idToSave) => {
        if (!idToSave) return;
        
        setCustomers(prev => {
            const updated = prev.map(c => {
                if (c.id === idToSave) {
                    return {
                        ...c,
                        // Update base info from Checklist input or keep original
                        name: checklistData.clientName || c.name,
                        phone: checklistData.clientPhone || c.phone,
                        
                        loadCalculator: {
                            panelSize,
                            livingArea,
                            hasRange,
                            rangePower,
                            hasDryer,
                            hasWaterHeater,
                            hasHotTub,
                            heatingType,
                            heatingPower,
                            acPower,
                            otherLoads,
                            evseAmps,
                            useEVEMS
                        },
                        voltageDrop: {
                            vdAmps,
                            vdLength,
                            vdGauge
                        },
                        quote: {
                            garageType,
                            runLength,
                            trenchLength,
                            selectedEVSE: selectedEVSE.name,
                            includePanelUpgrade,
                            includeEVEMS
                        },
                        checklist: {
                            panelBrand: checklistData.panelBrand,
                            panelCapacity: checklistData.panelCapacity,
                            panelSpaces: checklistData.panelSpaces,
                            garageSetup: checklistData.garageSetup,
                            distanceToPanel: checklistData.distanceToPanel,
                            meterLocation: checklistData.meterLocation,
                            groundingConfirmed: checklistData.groundingConfirmed,
                            ab811Required: checklistData.ab811Required,
                            photoPanel: checklistData.photoPanel,
                            photoMeter: checklistData.photoMeter,
                            photoChargerLoc: checklistData.photoChargerLoc,
                            photoPathway: checklistData.photoPathway,
                            photoPanelName: checklistData.photoPanelName,
                            photoMeterName: checklistData.photoMeterName,
                            photoChargerLocName: checklistData.photoChargerLocName,
                            photoPathwayName: checklistData.photoPathwayName
                        },
                        uploadedPhotos: {
                            photoPanel: uploadedPhotos.photoPanel,
                            photoMeter: uploadedPhotos.photoMeter,
                            photoChargerLoc: uploadedPhotos.photoChargerLoc,
                            photoPathway: uploadedPhotos.photoPathway
                        }
                    };
                }
                return c;
            });
            localStorage.setItem('renvolt_crm_customers', JSON.stringify(updated));
            return updated;
        });
    };

    const createNewCustomer = (name, phone, email = '', address = '') => {
        const newCust = {
            id: 'cust_' + Date.now(),
            name: name || 'New Client',
            phone: phone || '780-555-0100',
            email: email || `${(name || 'client').toLowerCase().replace(/\s+/g, '')}@example.com`,
            address: address || 'Edmonton, AB',
            status: 'Draft',
            createdAt: new Date().toISOString(),
            
            loadCalculator: {
                panelSize,
                livingArea,
                hasRange,
                rangePower,
                hasDryer,
                hasWaterHeater,
                hasHotTub,
                heatingType,
                heatingPower,
                acPower,
                otherLoads,
                evseAmps,
                useEVEMS
            },
            voltageDrop: {
                vdAmps,
                vdLength,
                vdGauge
            },
            quote: {
                garageType,
                runLength,
                trenchLength,
                selectedEVSE: selectedEVSE.name,
                includePanelUpgrade,
                includeEVEMS
            },
            checklist: {
                panelBrand: checklistData.panelBrand || 'Square D',
                panelCapacity: checklistData.panelCapacity || '100A',
                panelSpaces: checklistData.panelSpaces || 'Available',
                garageSetup: checklistData.garageSetup || 'Attached',
                distanceToPanel: checklistData.distanceToPanel || '20ft',
                meterLocation: checklistData.meterLocation || 'Outside Garage',
                groundingConfirmed: checklistData.groundingConfirmed ?? true,
                ab811Required: checklistData.ab811Required ?? false,
                photoPanel: checklistData.photoPanel ?? false,
                photoMeter: checklistData.photoMeter ?? false,
                photoChargerLoc: checklistData.photoChargerLoc ?? false,
                photoPathway: checklistData.photoPathway ?? false,
                photoPanelName: checklistData.photoPanelName ?? '',
                photoMeterName: checklistData.photoMeterName ?? '',
                photoChargerLocName: checklistData.photoChargerLocName ?? '',
                photoPathwayName: checklistData.photoPathwayName ?? ''
            },
            uploadedPhotos: {
                photoPanel: uploadedPhotos.photoPanel,
                photoMeter: uploadedPhotos.photoMeter,
                photoChargerLoc: uploadedPhotos.photoChargerLoc,
                photoPathway: uploadedPhotos.photoPathway
            }
        };

        setCustomers(prev => {
            const updated = [...prev, newCust];
            localStorage.setItem('renvolt_crm_customers', JSON.stringify(updated));
            return updated;
        });

        setCurrentClientId(newCust.id);
        
        setChecklistData(prev => ({
            ...prev,
            clientName: newCust.name,
            clientPhone: newCust.phone
        }));
    };

    const deleteCustomer = (idToDelete) => {
        setCustomers(prev => {
            const updated = prev.filter(c => c.id !== idToDelete);
            localStorage.setItem('renvolt_crm_customers', JSON.stringify(updated));
            return updated;
        });
        if (currentClientId === idToDelete) {
            setCurrentClientId(null);
        }
    };

    const updateCustomerStatus = (id, newStatus) => {
        setCustomers(prev => {
            const updated = prev.map(c => {
                if (c.id === id) {
                    return { ...c, status: newStatus };
                }
                return c;
            });
            localStorage.setItem('renvolt_crm_customers', JSON.stringify(updated));
            return updated;
        });
    };

    const backupDatabaseToFile = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customers, null, 4));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "customers.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert("Downloaded 'customers.json'! Copy this file and overwrite 'src/data/customers.json' in your project to commit updates directly to the repository!");
    };

    // --- LOGIC: CALCULATE LOAD (TAB 1) ---
    useEffect(() => {
        // 1. Basic Load based on Area (CEC Rule 8-200)
        let basic = 0;
        if (livingArea <= 45) {
            basic = 3500;
        } else if (livingArea <= 90) {
            basic = 5000;
        } else {
            basic = 5000 + Math.ceil((livingArea - 90) / 90) * 1000;
        }
        setCalcBasicLoad(basic);

        // 2. Range Load (6000W base + 40% of rating over 12kW)
        let range = 0;
        if (hasRange) {
            range = 6000;
            if (rangePower > 12000) {
                range += (rangePower - 12000) * 0.40;
            }
        }
        setCalcRangeLoad(range);

        // 3. Dryer Load
        let dryer = hasDryer ? 5000 : 0;
        setCalcDryerLoad(dryer);

        // 4. Water Heater Load
        let wh = hasWaterHeater ? 3000 : 0;
        setCalcWaterHeaterLoad(wh);

        // 5. Hot Tub / Pool Load
        let ht = hasHotTub ? 6000 : 0;
        setCalcHotTubLoad(ht);

        // 6. Heating & Cooling (Larger of the two)
        let heatAc = Math.max(heatingPower, acPower);
        setCalcHeatingACLoad(heatAc);

        // 7. EVSE Load (Continuous at 100% demand factor UNLESS EVEMS is active)
        let evWatts = evseAmps * 240;
        let evCalculated = useEVEMS ? 0 : evWatts;
        setCalcEvseLoad(evCalculated);

        // 8. Total Watts & Amps
        let totalW = basic + range + dryer + wh + ht + heatAc + otherLoads + evCalculated;
        let totalA = totalW / 240;
        let headA = panelSize - totalA;

        setTotalWatts(totalW);
        setTotalAmps(totalA);
        setHeadroomAmps(headA);

        // 9. Status Sizing
        let requiredBreaker = evseAmps * 1.25;
        if (headA < 0) {
            setLoadCalcStatus('FAIL');
        } else if (headA < requiredBreaker) {
            setLoadCalcStatus('BORDERLINE');
        } else {
            setLoadCalcStatus('PASS');
        }

    }, [panelSize, livingArea, hasRange, rangePower, hasDryer, hasWaterHeater, hasHotTub, heatingPower, acPower, otherLoads, evseAmps, useEVEMS]);

    // --- LOGIC: CALCULATE VOLTAGE DROP (TAB 2) ---
    useEffect(() => {
        const cm = CM_MAP[vdGauge];
        // Formula: Vd = (2 * K * I * L) / CM
        const vd = (2 * 12.9 * vdAmps * vdLength) / cm;
        const vdPercent = (vd / 240) * 100;
        setVoltageDropVal(vd);
        setVoltageDropPercent(vdPercent);
    }, [vdAmps, vdLength, vdGauge]);

    // --- LOGIC: GENERATE QUOTE (TAB 3) ---
    useEffect(() => {
        let baseInstall = garageType === 'attached' ? 650 : 1200;
        
        // Wire costs: #8 AWG = $3.50/ft, #6 AWG = $5.50/ft
        let wireSize = selectedEVSE.breakerAmps > 40 ? 6 : 8;
        let wireCostPerFt = wireSize === 6 ? 5.50 : 3.50;
        let wireTotal = runLength * wireCostPerFt;

        // Conduit costs
        let conduitCost = runLength * 1.50;

        // Trenching labor for detached ($25/ft)
        let trenchingCost = garageType === 'detached' ? (trenchLength * 28) : 0;
        let pvcConduitCost = garageType === 'detached' ? (trenchLength * 2.20) : 0;

        // Hardware selections
        let hardware = selectedEVSE.price;

        // Add-ons
        let evemsCost = includeEVEMS ? 1250 : 0; // DCC-9 hardware + extra labor
        let panelUpgradeCost = includePanelUpgrade ? 3200 : 0; // complete 100A -> 200A upgrade

        // Breaker cost
        let breakerCost = selectedEVSE.breakerAmps >= 50 ? 85 : 55;

        // Permits (City of Edmonton cost based on value)
        let prePermitSubtotal = baseInstall + wireTotal + conduitCost + trenchingCost + pvcConduitCost + hardware + evemsCost + panelUpgradeCost + breakerCost;
        
        // Edmonton permit scaling:
        let permitBase = 160.00;
        if (prePermitSubtotal > 3000) {
            permitBase = 225.00;
        } else if (prePermitSubtotal > 10000) {
            permitBase = 395.00;
        }
        let safetyCodesLevy = permitBase * 0.04;
        let permitTotal = permitBase + safetyCodesLevy;

        // Subtotal & Final Quote with markup (35% target margin on labor/mats, pass-through on permits/hardware)
        let laborAndMats = baseInstall + wireTotal + conduitCost + trenchingCost + pvcConduitCost + evemsCost + panelUpgradeCost + breakerCost;
        let laborMatsMarked = laborAndMats * 1.45; // 45% markup for ~31% margin
        let totalQuote = laborMatsMarked + hardware + permitTotal;

        setQuoteSummary({
            baseInstall,
            wireTotal,
            conduitCost,
            trenchingCost,
            pvcConduitCost,
            breakerCost,
            hardware,
            evemsCost,
            panelUpgradeCost,
            permitTotal,
            subtotal: prePermitSubtotal,
            totalQuote: Math.round(totalQuote),
            savings: includePanelUpgrade && includeEVEMS ? 2500 : 0
        });

    }, [garageType, runLength, trenchLength, selectedEVSE, includePanelUpgrade, includeEVEMS]);

    // Save Checklist to file handler (Mock download)
    const downloadChecklistReport = () => {
        const report = `# EV Home Installs - Site Assessment Report
**Client:** ${checklistData.clientName || 'N/A'}
**Phone:** ${checklistData.clientPhone || 'N/A'}
**Panel Brand/Capacity:** ${checklistData.panelBrand} / ${checklistData.panelCapacity}
**Available Spaces:** ${checklistData.panelSpaces}
**Garage Setup:** ${checklistData.garageSetup}
**Distance to Panel:** ${checklistData.distanceToPanel}
**Meter Location:** ${checklistData.meterLocation}
**Grounding Confirmed:** ${checklistData.groundingConfirmed ? 'Yes' : 'No'}
**AB811 (Utility Dig Locates) Required:** ${checklistData.ab811Required ? 'Yes' : 'No'}

## Photo Documentation Status
- [${checklistData.photoPanel ? 'x' : ' '}] Main Service Panel Photo ${checklistData.photoPanelName ? `(${checklistData.photoPanelName})` : ''}
- [${checklistData.photoMeter ? 'x' : ' '}] Exterior Meter Socket Photo ${checklistData.photoMeterName ? `(${checklistData.photoMeterName})` : ''}
- [${checklistData.photoChargerLoc ? 'x' : ' '}] Charger Mounting Area Photo ${checklistData.photoChargerLocName ? `(${checklistData.photoChargerLocName})` : ''}
- [${checklistData.photoPathway ? 'x' : ' '}] Conduit Run Pathway Photo ${checklistData.photoPathwayName ? `(${checklistData.photoPathwayName})` : ''}

---
*Generated by Renvolt Interactive Operations Suite - CEC 2024 Compliant*`;

        const blob = new Blob([report], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `EV_Assessment_${checklistData.clientName.replace(/\s+/g, '_') || 'Job'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <section id="ev-toolkit" className="py-24 bg-dark text-background overflow-hidden relative">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent font-mono text-sm uppercase tracking-widest block mb-3">
                        Renvolt Operations Suite
                    </span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-6">
                        Interactive EV Installation Tools
                    </h2>
                    <p className="text-background/80 text-lg text-balance">
                        Vetted operational estimators, CEC 2024 compliance calculators, and backyard trenching tools designed specifically for the Edmonton residential market.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-primary/20 pb-4">
                    <button 
                        onClick={() => setActiveTab('crm')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300
                            ${activeTab === 'crm' 
                                ? 'bg-primary text-background border border-primary' 
                                : 'bg-transparent text-background/60 hover:text-background border border-transparent'}`}
                    >
                        <Users size={16} /> Client Database (CRM)
                    </button>
                    <button 
                        onClick={() => setActiveTab('load')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300
                            ${activeTab === 'load' 
                                ? 'bg-primary text-background border border-primary' 
                                : 'bg-transparent text-background/60 hover:text-background border border-transparent'}`}
                    >
                        <Calculator size={16} /> Load Headroom Calculator
                    </button>
                    <button 
                        onClick={() => setActiveTab('volt')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300
                            ${activeTab === 'volt' 
                                ? 'bg-primary text-background border border-primary' 
                                : 'bg-transparent text-background/60 hover:text-background border border-transparent'}`}
                    >
                        <Zap size={16} /> Voltage Drop Sizer
                    </button>
                    <button 
                        onClick={() => setActiveTab('quote')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300
                            ${activeTab === 'quote' 
                                ? 'bg-primary text-background border border-primary' 
                                : 'bg-transparent text-background/60 hover:text-background border border-transparent'}`}
                    >
                        <DollarSign size={16} /> Flat-Rate Quote Estimator
                    </button>
                    <button 
                        onClick={() => setActiveTab('checklist')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all duration-300
                            ${activeTab === 'checklist' 
                                ? 'bg-primary text-background border border-primary' 
                                : 'bg-transparent text-background/60 hover:text-background border border-transparent'}`}
                    >
                        <FileText size={16} /> Field Assessment Checklist
                    </button>
                </div>

                {/* Tab Contents */}
                <div className="bg-[#242424] rounded-3xl p-8 md:p-12 border border-primary/10 shadow-2xl">
                    
                    {/* ==================== TAB 0: CLIENT DATABASE (CRM) ==================== */}
                    {activeTab === 'crm' && (
                        <div>
                            {/* CRM Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-primary/20 pb-6 mb-8">
                                <div>
                                    <h3 className="text-3xl font-sans font-bold flex items-center gap-3 text-background">
                                        <Users className="text-accent" /> Customer CRM Directory
                                    </h3>
                                    <p className="text-background/60 text-sm mt-1">
                                        Edmonton EV Charging Install Hub. Track profiles, load margins, and trench configurations offline-first.
                                    </p>
                                    <button 
                                        onClick={backupDatabaseToFile}
                                        className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <Save size={12} /> Sync Database to Project File (customers.json)
                                    </button>
                                </div>
                                
                                {/* Quick Add Client Form */}
                                <form 
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const form = e.target;
                                        const name = form.clientName.value;
                                        const phone = form.clientPhone.value;
                                        const address = form.clientAddress.value;
                                        if (!name) return;
                                        createNewCustomer(name, phone, '', address);
                                        form.reset();
                                    }}
                                    className="flex flex-wrap md:flex-nowrap gap-2 bg-dark/60 p-3 rounded-2xl border border-primary/20 w-full md:w-auto"
                                >
                                    <input 
                                        type="text" 
                                        name="clientName"
                                        placeholder="Full Name" 
                                        required
                                        className="bg-[#242424] border border-primary/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent text-background w-full md:w-44"
                                    />
                                    <input 
                                        type="text" 
                                        name="clientPhone"
                                        placeholder="Phone" 
                                        className="bg-[#242424] border border-primary/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent text-background w-full md:w-36"
                                    />
                                    <input 
                                        type="text" 
                                        name="clientAddress"
                                        placeholder="Edmonton Address" 
                                        className="bg-[#242424] border border-primary/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent text-background w-full md:w-48"
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-accent text-background font-semibold rounded-xl px-4 py-2 text-sm hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1 justify-center whitespace-nowrap w-full md:w-auto"
                                    >
                                        <Plus size={14} /> Add Client
                                    </button>
                                </form>
                            </div>

                            {/* Main CRM Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                
                                {/* Left column: Search and Client list */}
                                <div className="lg:col-span-1 space-y-4">
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Search by name, phone or address..." 
                                            onChange={(e) => setCrmSearchQuery(e.target.value)}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl pl-4 pr-10 py-3 font-sans text-sm text-background outline-none focus:border-accent"
                                        />
                                    </div>

                                    {/* Client List */}
                                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                        {filteredCustomers.map(cust => (
                                            <div 
                                                key={cust.id}
                                                onClick={() => {
                                                    setSelectedCrmCustomerId(cust.id);
                                                    loadCustomerIntoCalculators(cust);
                                                }}
                                                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 relative group
                                                    ${currentClientId === cust.id 
                                                        ? 'bg-primary/10 border-primary/50 shadow-md shadow-primary/5' 
                                                        : 'bg-dark/40 border-primary/10 hover:border-primary/30 hover:bg-dark/60'}`}
                                            >
                                                {/* Left Accent Bar */}
                                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all duration-300
                                                    ${currentClientId === cust.id ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/30'}`} 
                                                />
                                                
                                                <div className="flex justify-between items-start pl-2">
                                                    <div>
                                                        <h4 className="font-sans font-bold text-background text-lg">{cust.name}</h4>
                                                        <span className="text-xs text-background/50 font-mono">{cust.phone}</span>
                                                    </div>
                                                    
                                                    {/* Status Badge */}
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold font-mono tracking-wider uppercase
                                                        ${cust.status === 'Permit Approved' || cust.status === 'Ready for Permit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                          cust.status === 'Load Checked' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                                                          cust.status === 'Quote Issued' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                          'bg-background/20 text-background/60 border border-background/20'}`}
                                                    >
                                                        {cust.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="pl-2 flex justify-between items-center text-xs text-background/70">
                                                    <span className="truncate max-w-[180px]">{cust.address}</span>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteCustomer(cust.id);
                                                        }}
                                                        className="text-red-400/60 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                                                        title="Delete Customer"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredCustomers.length === 0 && (
                                            <div className="text-center py-12 text-background/40 text-sm">
                                                No customers matching query.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right column: Details panel */}
                                <div className="lg:col-span-2">
                                    {activeClientRecord ? (
                                        <div className="bg-dark/30 rounded-3xl p-6 border border-primary/10 space-y-6">
                                            
                                            {/* Header detail */}
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-primary/20 pb-4">
                                                <div>
                                                    <span className="text-xs text-accent font-mono">CLIENT DESIGN PROFILE</span>
                                                    <h3 className="text-2xl font-sans font-bold text-background mt-1">{activeClientRecord.name}</h3>
                                                    <p className="text-sm text-background/60 mt-0.5">{activeClientRecord.address}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {/* Status selector */}
                                                    <select 
                                                        value={activeClientRecord.status}
                                                        onChange={(e) => updateCustomerStatus(activeClientRecord.id, e.target.value)}
                                                        className="bg-[#242424] border border-primary/20 rounded-xl px-3 py-2 text-xs font-semibold text-background outline-none cursor-pointer"
                                                    >
                                                        <option value="Draft">Draft Status</option>
                                                        <option value="Load Checked">Load Checked</option>
                                                        <option value="Quote Issued">Quote Issued</option>
                                                        <option value="Ready for Permit">Ready for Permit</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Design specs summary */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                
                                                {/* Card 1: Electrical Calculations */}
                                                <div className="bg-dark/60 rounded-2xl p-4 border border-primary/5 space-y-3">
                                                    <div className="flex justify-between items-center text-sm font-bold border-b border-primary/10 pb-2">
                                                        <span className="flex items-center gap-2 text-accent"><Calculator size={14} /> Headroom</span>
                                                        <span className="font-mono text-background/60">{activeClientRecord.loadCalculator?.panelSize}A Service</span>
                                                    </div>
                                                    <div className="space-y-1.5 text-xs text-background/80">
                                                        <div className="flex justify-between">
                                                            <span>Living Area:</span>
                                                            <span className="font-mono">{activeClientRecord.loadCalculator?.livingArea} m²</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>EV Charger Target:</span>
                                                            <span className="font-mono">{activeClientRecord.loadCalculator?.evseAmps}A Continuous</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>EVEMS Smart Shedder:</span>
                                                            <span className="font-mono">{activeClientRecord.loadCalculator?.useEVEMS ? 'ENABLED (DCC-9)' : 'DISABLED'}</span>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => {
                                                            loadCustomerIntoCalculators(activeClientRecord);
                                                            setActiveTab('load');
                                                        }}
                                                        className="w-full mt-2 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all text-center block animate-pulse"
                                                    >
                                                        Refine Load Sizing &rarr;
                                                    </button>
                                                </div>

                                                {/* Card 2: Physical/Trenching Quote */}
                                                <div className="bg-dark/60 rounded-2xl p-4 border border-primary/5 space-y-3">
                                                    <div className="flex justify-between items-center text-sm font-bold border-b border-primary/10 pb-2">
                                                        <span className="flex items-center gap-2 text-accent"><DollarSign size={14} /> Estimated Quote</span>
                                                        <span className="font-mono text-emerald-400 capitalize">{activeClientRecord.quote?.garageType} Garage</span>
                                                    </div>
                                                    <div className="space-y-1.5 text-xs text-background/80">
                                                        <div className="flex justify-between">
                                                            <span>Selected EVSE:</span>
                                                            <span className="font-mono truncate max-w-[150px]">{activeClientRecord.quote?.selectedEVSE}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Conductor run:</span>
                                                            <span className="font-mono">{activeClientRecord.quote?.runLength} ft</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Trench length:</span>
                                                            <span className="font-mono">{activeClientRecord.quote?.trenchLength} ft</span>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => {
                                                            loadCustomerIntoCalculators(activeClientRecord);
                                                            setActiveTab('quote');
                                                        }}
                                                        className="w-full mt-2 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-all text-center block"
                                                    >
                                                        Adjust Pricing Quote &rarr;
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Photo checklist summary */}
                                            <div className="bg-dark/40 rounded-2xl p-4 border border-primary/5 space-y-3">
                                                <h4 className="text-sm font-bold text-background flex items-center gap-2"><FileText size={14} /> Virtual Permit Documents</h4>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-background/80">
                                                    <div className="flex flex-col p-2 bg-[#242424]/60 border border-primary/10 rounded-xl text-center">
                                                        <span>Service Panel</span>
                                                        <span className={`font-mono text-[10px] mt-1 font-bold ${activeClientRecord.checklist?.photoPanel ? 'text-emerald-400' : 'text-background/40'}`}>
                                                            {activeClientRecord.checklist?.photoPanel ? '✓ UPLOADED' : '✗ EMPTY'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col p-2 bg-[#242424]/60 border border-primary/10 rounded-xl text-center">
                                                        <span>Meter/Mast</span>
                                                        <span className={`font-mono text-[10px] mt-1 font-bold ${activeClientRecord.checklist?.photoMeter ? 'text-emerald-400' : 'text-background/40'}`}>
                                                            {activeClientRecord.checklist?.photoMeter ? '✓ UPLOADED' : '✗ EMPTY'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col p-2 bg-[#242424]/60 border border-primary/10 rounded-xl text-center">
                                                        <span>Charger Spot</span>
                                                        <span className={`font-mono text-[10px] mt-1 font-bold ${activeClientRecord.checklist?.photoChargerLoc ? 'text-emerald-400' : 'text-background/40'}`}>
                                                            {activeClientRecord.checklist?.photoChargerLoc ? '✓ UPLOADED' : '✗ EMPTY'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col p-2 bg-[#242424]/60 border border-primary/10 rounded-xl text-center">
                                                        <span>Conduit Run</span>
                                                        <span className={`font-mono text-[10px] mt-1 font-bold ${activeClientRecord.checklist?.photoPathway ? 'text-emerald-400' : 'text-background/40'}`}>
                                                            {activeClientRecord.checklist?.photoPathway ? '✓ UPLOADED' : '✗ EMPTY'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        loadCustomerIntoCalculators(activeClientRecord);
                                                        setActiveTab('checklist');
                                                    }}
                                                    className="w-full mt-2 py-2 rounded-xl bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-all text-center block"
                                                >
                                                    Manage Field Photos &rarr;
                                                </button>
                                            </div>

                                            {/* Action bar */}
                                            <div className="flex justify-between items-center bg-[#242424]/60 p-4 border border-primary/10 rounded-2xl text-xs">
                                                <span className="text-background/60 font-mono">ID: {activeClientRecord.id}</span>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => saveCustomerData(activeClientRecord.id)}
                                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background font-semibold hover:scale-105 active:scale-95 transition-all duration-300"
                                                    >
                                                        <Save size={13} /> Save Current Specs
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            loadCustomerIntoCalculators(activeClientRecord);
                                                            setTimeout(() => {
                                                                downloadChecklistReport();
                                                            }, 100);
                                                        }}
                                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark border border-primary/20 text-background font-semibold hover:bg-[#242424] transition-all duration-300"
                                                    >
                                                        <Download size={13} /> Export Report
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col justify-center items-center py-20 text-center bg-dark/20 rounded-3xl border border-primary/10 p-12">
                                            <Users size={48} className="text-background/20 mb-4 animate-pulse" />
                                            <h4 className="text-lg font-bold text-background/80">No Client Selected</h4>
                                            <p className="text-sm text-background/40 max-w-sm mt-1">
                                                Select a contractor design profile from the sidebar directory, or add a new customer file to get started.
                                            </p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ==================== TAB 1: LOAD HEADROOM CALCULATOR ==================== */}
                    {activeTab === 'load' && (
                        <div>
                            {currentClientId && (
                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                        <span className="text-sm font-sans font-bold text-background">
                                            Active Design Session: <span className="text-accent">{checklistData.clientName || 'Unnamed Client'}</span>
                                        </span>
                                        <span className="text-xs font-mono text-background/60">({currentClientId})</span>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => {
                                                saveCustomerData(currentClientId);
                                                alert("Specs synced successfully to client profile!");
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-semibold text-xs hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
                                        >
                                            <Save size={12} /> Sync Changes to Profile
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newName = prompt("Enter name for duplicate customer profile:", (checklistData.clientName || '') + " (Copy)");
                                                if (newName) {
                                                    createNewCustomer(newName, checklistData.clientPhone || '');
                                                    alert("Profile cloned successfully!");
                                                }
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark border border-primary/20 text-background text-xs hover:bg-[#242424] transition-all w-full sm:w-auto justify-center"
                                        >
                                            <Plus size={12} /> Save As Copy
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Inputs */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-3 border-b border-primary/20 pb-4 mb-6">
                                        <Layers className="text-accent" />
                                        <h3 className="text-2xl font-sans font-bold">CEC Section 8 Load Intake</h3>
                                    </div>

                                    {/* Panel rating */}
                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-2">Main Panel Service Rating (Amps)</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[100, 125, 200].map(amps => (
                                                <button 
                                                    key={amps}
                                                    onClick={() => setPanelSize(amps)}
                                                    className={`py-3 rounded-xl font-sans font-semibold border transition-all ${
                                                        panelSize === amps 
                                                            ? 'bg-accent border-accent text-background' 
                                                            : 'bg-dark/50 border-primary/20 text-background/80 hover:border-primary/40'
                                                    }`}
                                                >
                                                    {amps} A Service
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Floor area */}
                                        <div>
                                            <label className="block text-sm font-mono text-background/60 mb-2">Living Floor Area (m²)</label>
                                            <input 
                                                type="number" 
                                                value={livingArea} 
                                                onChange={(e) => setLivingArea(Number(e.target.value))}
                                                className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-3 font-sans text-background outline-none focus:border-accent"
                                            />
                                            <span className="text-xs text-background/40 mt-1 block">Excluding unfinished basement</span>
                                        </div>

                                        {/* EVSE current */}
                                        <div>
                                            <label className="block text-sm font-mono text-background/60 mb-2">Required EVSE Continuous Rate (Amps)</label>
                                            <select 
                                                value={evseAmps} 
                                                onChange={(e) => setEvseAmps(Number(e.target.value))}
                                                className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-3 font-sans text-background outline-none focus:border-accent"
                                            >
                                                <option value={16}>16A (3.8 kW Charger - 20A breaker)</option>
                                                <option value={24}>24A (5.8 kW Charger - 30A breaker)</option>
                                                <option value={32}>32A (7.7 kW Charger - 40A breaker)</option>
                                                <option value={40}>40A (9.6 kW Charger - 50A breaker)</option>
                                                <option value={48}>48A (11.5 kW Charger - 60A breaker)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Major Appliance Toggles */}
                                    <div className="space-y-4 bg-dark/30 p-6 rounded-2xl border border-primary/10">
                                        <h4 className="font-sans font-bold text-sm text-accent uppercase tracking-wider mb-2">Household Major Loads</h4>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-sm font-medium">Electric Range (Stove)</span>
                                                <span className="text-xs text-background/40">Sized under CEC Table 14</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={hasRange}
                                                onChange={() => setHasRange(!hasRange)}
                                                className="w-5 h-5 accent-accent"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-sm font-medium">Electric Clothes Dryer</span>
                                                <span className="text-xs text-background/40">Standard continuous load (5,000 W)</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={hasDryer}
                                                onChange={() => setHasDryer(!hasDryer)}
                                                className="w-5 h-5 accent-accent"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-sm font-medium">Electric Hot Water Tank</span>
                                                <span className="text-xs text-background/40">Standard residential tank (3,000 W)</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={hasWaterHeater}
                                                onChange={() => setHasWaterHeater(!hasWaterHeater)}
                                                className="w-5 h-5 accent-accent"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-sm font-medium">Hot Tub or Swimming Pool</span>
                                                <span className="text-xs text-background/40">Continuous heater load (6,000 W)</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={hasHotTub}
                                                onChange={() => setHasHotTub(!hasHotTub)}
                                                className="w-5 h-5 accent-accent"
                                            />
                                        </div>
                                    </div>

                                    {/* EVEMS Smart Toggle */}
                                    <div className="bg-primary/20 border border-primary/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex gap-4">
                                            <ShieldCheck className="text-accent shrink-0 mt-1 md:mt-0" size={24} />
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-background">Dynamic EVEMS Load Management</h4>
                                                <p className="text-sm text-background/70 mt-1">
                                                    Activate code-compliant monitoring (CEC Rule 8-106 11). EVSE continuous load contribution becomes **0 W** for service calculations.
                                                </p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setUseEVEMS(!useEVEMS)}
                                            className={`px-6 py-2.5 rounded-full font-sans text-sm font-bold border whitespace-nowrap transition-all ${
                                                useEVEMS 
                                                    ? 'bg-accent border-accent text-background' 
                                                    : 'bg-transparent border-background/20 text-background/60 hover:text-background'
                                            }`}
                                        >
                                            {useEVEMS ? 'EVEMS Enabled' : 'Enable EVEMS'}
                                        </button>
                                    </div>
                                </div>

                                {/* Results panel */}
                                <div className="w-full lg:w-[400px] bg-dark p-8 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-mono text-xs uppercase tracking-widest text-background/40 border-b border-primary/10 pb-3 mb-6">
                                            Live Panel Loading (Amps)
                                        </h4>

                                        {/* Status Indicator */}
                                        <div className="flex items-center gap-3 mb-6">
                                            {loadCalcStatus === 'PASS' && (
                                                <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 text-sm font-semibold">
                                                    <CheckCircle2 size={16} /> Calculation Passed
                                                </div>
                                            )}
                                            {loadCalcStatus === 'BORDERLINE' && (
                                                <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20 text-sm font-semibold">
                                                    <AlertTriangle size={16} /> Marginal Headroom
                                                </div>
                                            )}
                                            {loadCalcStatus === 'FAIL' && (
                                                <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/20 text-sm font-semibold">
                                                    <AlertTriangle size={16} /> Service Overload
                                                </div>
                                            )}
                                        </div>

                                        {/* Dynamic Load Circle */}
                                        <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-8">
                                            {/* Circular progress path */}
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle 
                                                    cx="96" cy="96" r="80" 
                                                    className="stroke-primary/10 fill-none" 
                                                    strokeWidth="10"
                                                />
                                                <circle 
                                                    cx="96" cy="96" r="80" 
                                                    className={`fill-none transition-all duration-500 ${
                                                        loadCalcStatus === 'FAIL' ? 'stroke-accent' : loadCalcStatus === 'BORDERLINE' ? 'stroke-yellow-500' : 'stroke-primary'
                                                    }`}
                                                    strokeWidth="10"
                                                    strokeDasharray="502"
                                                    strokeDashoffset={502 - (502 * Math.min(totalAmps / panelSize, 1))}
                                                />
                                            </svg>
                                            <div className="absolute text-center">
                                                <span className="block font-mono text-3xl font-bold text-background">
                                                    {totalAmps.toFixed(1)}A
                                                </span>
                                                <span className="block font-sans text-xs text-background/60 mt-1">
                                                    of {panelSize}A Limit
                                                </span>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-3 font-mono text-sm border-t border-primary/10 pt-6">
                                            <div className="flex justify-between">
                                                <span className="text-background/40">Calculated Load:</span>
                                                <span>{(totalWatts / 1000).toFixed(2)} kW</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-background/40">Available Headroom:</span>
                                                <span className={headroomAmps < 0 ? 'text-accent' : 'text-primary'}>
                                                    {headroomAmps.toFixed(1)} A
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-t border-primary/10 pt-3">
                                                <span className="text-background/40">Continuous Wire size:</span>
                                                <span>
                                                    #{WIRE_BY_AMPS.find(w => w.maxAmps >= evseAmps * 1.25)?.size || '6'} AWG
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-background/40">Breaker Sizing:</span>
                                                <span>{(evseAmps * 1.25).toFixed(0)}A 2-Pole</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action advice */}
                                    <div className="mt-8 pt-6 border-t border-primary/10">
                                        {loadCalcStatus === 'PASS' && (
                                            <p className="text-xs text-background/60 text-center text-balance leading-relaxed">
                                                ✅ Available capacity exceeds the 125% breaker sizing limit. Permitted for direct continuous wiring.
                                            </p>
                                        )}
                                        {loadCalcStatus === 'BORDERLINE' && (
                                            <div className="text-xs text-yellow-500/90 leading-relaxed text-center text-balance bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/10">
                                                ⚠️ Margins are narrow. Installing an EVEMS load-monitoring controller is highly recommended to protect the service from main fuse trips.
                                            </div>
                                        )}
                                        {loadCalcStatus === 'FAIL' && (
                                            <div className="text-xs text-accent leading-relaxed text-center text-balance bg-accent/5 p-4 rounded-xl border border-accent/10">
                                                ❌ **Calculated Overload.** Installing without management exceeds legal panel limits. **Action required:** Turn on the EVEMS switch above to immediately achieve code-compliance without a costly panel upgrade.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== TAB 2: VOLTAGE DROP CALCULATOR ==================== */}
                    {activeTab === 'volt' && (
                        <div className="max-w-4xl mx-auto">
                            {currentClientId && (
                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                        <span className="text-sm font-sans font-bold text-background">
                                            Active Design Session: <span className="text-accent">{checklistData.clientName || 'Unnamed Client'}</span>
                                        </span>
                                        <span className="text-xs font-mono text-background/60">({currentClientId})</span>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => {
                                                saveCustomerData(currentClientId);
                                                alert("Specs synced successfully to client profile!");
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-semibold text-xs hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
                                        >
                                            <Save size={12} /> Sync Changes to Profile
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newName = prompt("Enter name for duplicate customer profile:", (checklistData.clientName || '') + " (Copy)");
                                                if (newName) {
                                                    createNewCustomer(newName, checklistData.clientPhone || '');
                                                    alert("Profile cloned successfully!");
                                                }
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark border border-primary/20 text-background text-xs hover:bg-[#242424] transition-all w-full sm:w-auto justify-center"
                                        >
                                            <Plus size={12} /> Save As Copy
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 border-b border-primary/20 pb-4 mb-8">
                                <Zap className="text-accent" />
                                <h3 className="text-2xl font-sans font-bold">CEC Rule 8-102 Voltage Drop Check</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                {/* Inputs */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-3">EVSE Continuous Current: {vdAmps} A</label>
                                        <input 
                                            type="range" 
                                            min="16" max="48" step="8"
                                            value={vdAmps}
                                            onChange={(e) => setVdAmps(Number(e.target.value))}
                                            className="w-full accent-accent"
                                        />
                                        <div className="flex justify-between text-xs text-background/40 font-mono mt-1">
                                            <span>16A</span>
                                            <span>24A</span>
                                            <span>32A</span>
                                            <span>40A</span>
                                            <span>48A</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-3">One-Way Wire Path Distance: {vdLength} ft</label>
                                        <input 
                                            type="range" 
                                            min="10" max="150" step="5"
                                            value={vdLength}
                                            onChange={(e) => setVdLength(Number(e.target.value))}
                                            className="w-full accent-accent"
                                        />
                                        <div className="flex justify-between text-xs text-background/40 font-mono mt-1">
                                            <span>10 ft</span>
                                            <span>50 ft</span>
                                            <span>100 ft</span>
                                            <span>150 ft</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-2">Conductor Size Selected</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {Object.keys(CM_MAP).map(gauge => (
                                                <button 
                                                    key={gauge}
                                                    onClick={() => setVdGauge(gauge)}
                                                    className={`py-3 rounded-xl font-mono border text-sm transition-all ${
                                                        vdGauge === gauge 
                                                            ? 'bg-accent border-accent text-background' 
                                                            : 'bg-dark/50 border-primary/20 text-background/80 hover:border-primary/40'
                                                    }`}
                                                >
                                                    #{gauge}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-xs text-background/40 mt-2 block">CEC Table 2 (75°C Copper insulation)</span>
                                    </div>
                                </div>

                                {/* Results display */}
                                <div className="bg-dark p-8 rounded-2xl border border-primary/10 text-center">
                                    <span className="block font-mono text-xs uppercase tracking-widest text-background/40 mb-3">
                                        Calculated Voltage Drop
                                    </span>
                                    
                                    <div className="text-5xl font-mono font-bold tracking-tight mb-2">
                                        {voltageDropPercent.toFixed(2)}%
                                    </div>

                                    <div className="flex justify-center mb-6">
                                        {voltageDropPercent <= 3.0 ? (
                                            <span className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full font-semibold">
                                                <CheckCircle2 size={12} /> Within Code Target (≤ 3.0%)
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full font-semibold animate-pulse">
                                                <AlertTriangle size={12} /> Exceeds Code Target (&gt; 3.0%)
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-3 font-mono text-sm border-t border-primary/10 pt-6 text-left">
                                        <div className="flex justify-between">
                                            <span className="text-background/40">Total Voltage Lost:</span>
                                            <span>{voltageDropVal.toFixed(2)} V</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-background/40">Delivery Voltage:</span>
                                            <span>{(240 - voltageDropVal).toFixed(1)} V</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-background/40">Circular Mil Area:</span>
                                            <span>{CM_MAP[vdGauge].toLocaleString()} CM</span>
                                        </div>
                                    </div>

                                    {voltageDropPercent > 3.0 && (
                                        <div className="mt-6 text-xs text-accent bg-accent/5 p-4 rounded-xl border border-accent/10 leading-relaxed text-left text-balance">
                                            ⚠️ **Voltage drop exceeds the 3% branch limit.** This decreases charging efficiency and can generate heat inside the conductors. **Action:** Select a thicker conductor (e.g., upsize from #{vdGauge} to #{Object.keys(CM_MAP).find(k => Number(k) < Number(vdGauge))}) to bring the drop back within continuous compliance.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== TAB 3: FLAT-RATE QUOTE ESTIMATOR ==================== */}
                    {activeTab === 'quote' && (
                        <div>
                            {currentClientId && (
                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                        <span className="text-sm font-sans font-bold text-background">
                                            Active Design Session: <span className="text-accent">{checklistData.clientName || 'Unnamed Client'}</span>
                                        </span>
                                        <span className="text-xs font-mono text-background/60">({currentClientId})</span>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => {
                                                saveCustomerData(currentClientId);
                                                alert("Specs synced successfully to client profile!");
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-semibold text-xs hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
                                        >
                                            <Save size={12} /> Sync Changes to Profile
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newName = prompt("Enter name for duplicate customer profile:", (checklistData.clientName || '') + " (Copy)");
                                                if (newName) {
                                                    createNewCustomer(newName, checklistData.clientPhone || '');
                                                    alert("Profile cloned successfully!");
                                                }
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark border border-primary/20 text-background text-xs hover:bg-[#242424] transition-all w-full sm:w-auto justify-center"
                                        >
                                            <Plus size={12} /> Save As Copy
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Configuration inputs */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-primary/20 pb-4 mb-6">
                                        <Layers className="text-accent" />
                                        <h3 className="text-2xl font-sans font-bold">Configure Installation Spec</h3>
                                    </div>

                                    {/* Garage Setup */}
                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-2">Garage Archetype</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button 
                                                onClick={() => setGarageType('attached')}
                                                className={`py-3 rounded-xl font-sans font-semibold border transition-all ${
                                                    garageType === 'attached' 
                                                        ? 'bg-accent border-accent text-background' 
                                                        : 'bg-dark/50 border-primary/20 text-background/80 hover:border-primary/40'
                                                }`}
                                            >
                                                Attached Garage
                                            </button>
                                            <button 
                                                onClick={() => setGarageType('detached')}
                                                className={`py-3 rounded-xl font-sans font-semibold border transition-all ${
                                                    garageType === 'detached' 
                                                        ? 'bg-accent border-accent text-background' 
                                                        : 'bg-dark/50 border-primary/20 text-background/80 hover:border-primary/40'
                                                }`}
                                            >
                                                Detached / Laneway
                                            </button>
                                        </div>
                                    </div>

                                    {/* Chargers list */}
                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-2">EVSE Hardware Option</label>
                                        <select 
                                            value={selectedEVSE.name}
                                            onChange={(e) => setSelectedEVSE(EV_CHARGER_TEMPLATES.find(c => c.name === e.target.value))}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-3 font-sans text-background outline-none focus:border-accent"
                                        >
                                            {EV_CHARGER_TEMPLATES.map(charger => (
                                                <option key={charger.name} value={charger.name}>
                                                    {charger.name} ({charger.price > 0 ? `$${charger.price} CAD` : 'Excluding Cost'})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Runs length */}
                                    <div>
                                        <label className="block text-sm font-mono text-background/60 mb-3">Conduit/Wire Run length: {runLength} ft</label>
                                        <input 
                                            type="range" 
                                            min="10" max="150" step="5"
                                            value={runLength}
                                            onChange={(e) => setRunLength(Number(e.target.value))}
                                            className="w-full accent-accent"
                                        />
                                    </div>

                                    {/* Detached parameters */}
                                    {garageType === 'detached' && (
                                        <div className="space-y-4 bg-dark/30 p-6 rounded-2xl border border-primary/10 animate-[fadeIn_0.3s_ease-out]">
                                            <h4 className="font-sans font-bold text-sm text-accent uppercase tracking-wider mb-2">Excavation & Trench Sizing</h4>
                                            <div>
                                                <label className="block text-sm font-mono text-background/40 mb-3">Backyard Trenching/Directional Drilling: {trenchLength} ft</label>
                                                <input 
                                                    type="range" 
                                                    min="5" max="80" step="5"
                                                    value={trenchLength}
                                                    onChange={(e) => setTrenchLength(Number(e.target.value))}
                                                    className="w-full accent-accent"
                                                />
                                                <span className="text-[11px] text-background/40 mt-1 block">CEC Rule 12-012 compliant 18" depth burial in PVC conduit</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Upgrades */}
                                    <div className="space-y-3 bg-dark/30 p-6 rounded-2xl border border-primary/10">
                                        <h4 className="font-sans font-bold text-sm text-accent uppercase tracking-wider mb-2">Required Electrical Add-ons</h4>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-sm font-medium">Smart EVEMS Load Shedder</span>
                                                <span className="text-xs text-background/40">DCC-9 load monitor (avoids EPCOR upgrade)</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={includeEVEMS}
                                                onChange={() => {
                                                    setIncludeEVEMS(!includeEVEMS);
                                                    if (!includeEVEMS) setIncludePanelUpgrade(false);
                                                }}
                                                className="w-5 h-5 accent-accent"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-sm font-medium">Complete 200A Panel & Mast Upgrade</span>
                                                <span className="text-xs text-background/40">Full utility overhaul (excludes EPCOR grid fees)</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={includePanelUpgrade}
                                                disabled={includeEVEMS}
                                                onChange={() => setIncludePanelUpgrade(!includePanelUpgrade)}
                                                className="w-5 h-5 accent-accent disabled:opacity-40"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Live Quote Sheet */}
                                <div className="bg-dark p-8 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-center border-b border-primary/10 pb-4 mb-6">
                                            <span className="font-mono text-xs uppercase tracking-widest text-background/40">Operational Price Quote</span>
                                            <span className="font-mono text-xs text-accent">Edmonton Jurisdiction</span>
                                        </div>

                                        <div className="space-y-4 text-sm font-mono">
                                            <div className="flex justify-between">
                                                <span className="text-background/40">Base Electrical Install:</span>
                                                <span>${quoteSummary.baseInstall}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-background/40">Conductor Run ({runLength} ft):</span>
                                                <span>${quoteSummary.wireTotal?.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-background/40">Conduit materials:</span>
                                                <span>${quoteSummary.conduitCost?.toFixed(2)}</span>
                                            </div>

                                            {garageType === 'detached' && (
                                                <>
                                                    <div className="flex justify-between">
                                                        <span className="text-background/40">Trenching/Backfilling ({trenchLength} ft):</span>
                                                        <span>${quoteSummary.trenchingCost}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-background/40">Underground PVC conduit:</span>
                                                        <span>${quoteSummary.pvcConduitCost?.toFixed(2)}</span>
                                                    </div>
                                                </>
                                            )}

                                            {includeEVEMS && (
                                                <div className="flex justify-between text-yellow-500">
                                                    <span>DCC-9 EVEMS Module:</span>
                                                    <span>${quoteSummary.evemsCost}</span>
                                                </div>
                                            )}

                                            {includePanelUpgrade && (
                                                <div className="flex justify-between text-yellow-500">
                                                    <span>200A Service Upgrade:</span>
                                                    <span>${quoteSummary.panelUpgradeCost}</span>
                                                </div>
                                            )}

                                            <div className="flex justify-between">
                                                <span className="text-background/40">Charger Hardware:</span>
                                                <span>${quoteSummary.hardware}</span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-background/40">CoE Electrical Permit:</span>
                                                <span>${quoteSummary.permitTotal?.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {quoteSummary.savings > 0 && (
                                            <div className="mt-6 bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between text-xs font-mono text-primary font-bold">
                                                <span>⚡ EVEMS CHOSEN SAVINGS (Avoided 200A Service):</span>
                                                <span>-${quoteSummary.savings}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col gap-4">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="font-sans text-xs text-background/40">Estimate Total Quote</span>
                                                <span className="font-sans text-xs text-accent">Permits & Hardware Included</span>
                                            </div>
                                            <span className="text-4xl font-sans font-bold text-accent">
                                                ${quoteSummary.totalQuote?.toLocaleString()} CAD
                                            </span>
                                        </div>

                                        <button 
                                            onClick={() => {
                                                const quoteText = `RENVOLT CUSTOMER QUOTE ESTIMATE
Setup: ${garageType === 'attached' ? 'Attached Garage' : 'Detached Garage'}
EVSE: ${selectedEVSE.name}
Breaker Sizing: ${selectedEVSE.breakerAmps}A 2-Pole
Permit Value: City of Edmonton Registered Permit
Service Panel: ${includeEVEMS ? 'EVEMS Load Management Installed' : includePanelUpgrade ? '200A Panel Overhaul' : 'Standard Existing panel'}

ESTIMATED QUOTE PRICE: $${quoteSummary.totalQuote} CAD
------------------------------------------------------
*Quote generated is continuous code-compliant under CEC 2024.*`;
                                                navigator.clipboard.writeText(quoteText);
                                                alert("Quote copied to clipboard!");
                                            }}
                                            className="w-full py-4 rounded-full bg-accent hover:bg-accent/90 text-background font-sans font-semibold text-center hover:scale-[1.01] transition-all duration-300"
                                        >
                                            Copy Quote Summary to CRM
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== TAB 4: FIELD CHECKLIST WIZARD ==================== */}
                    {activeTab === 'checklist' && (
                        <div>
                            {currentClientId && (
                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                        <span className="text-sm font-sans font-bold text-background">
                                            Active Design Session: <span className="text-accent">{checklistData.clientName || 'Unnamed Client'}</span>
                                        </span>
                                        <span className="text-xs font-mono text-background/60">({currentClientId})</span>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => {
                                                saveCustomerData(currentClientId);
                                                alert("Specs synced successfully to client profile!");
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-background font-semibold text-xs hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
                                        >
                                            <Save size={12} /> Sync Changes to Profile
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newName = prompt("Enter name for duplicate customer profile:", (checklistData.clientName || '') + " (Copy)");
                                                if (newName) {
                                                    createNewCustomer(newName, checklistData.clientPhone || '');
                                                    alert("Profile cloned successfully!");
                                                }
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark border border-primary/20 text-background text-xs hover:bg-[#242424] transition-all w-full sm:w-auto justify-center"
                                        >
                                            <Plus size={12} /> Save As Copy
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 border-b border-primary/20 pb-4 mb-8">
                                <FileText className="text-accent" />
                                <h3 className="text-2xl font-sans font-bold">Tool 1: Field Site Assessment Worksheet</h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Inputs block 1 */}
                                <div className="space-y-6 bg-dark/20 p-6 rounded-2xl border border-primary/10">
                                    <h4 className="font-sans font-bold text-sm text-accent uppercase tracking-wider border-b border-primary/10 pb-2 mb-4">Client & Panel Info</h4>
                                    
                                    <div>
                                        <label className="block text-xs font-mono text-background/60 mb-2">Client Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John Doe"
                                            value={checklistData.clientName}
                                            onChange={(e) => setChecklistData({...checklistData, clientName: e.target.value})}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-2.5 font-sans text-background outline-none focus:border-accent text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-background/60 mb-2">Client Phone</label>
                                        <input 
                                            type="text" 
                                            placeholder="780-555-0199"
                                            value={checklistData.clientPhone}
                                            onChange={(e) => setChecklistData({...checklistData, clientPhone: e.target.value})}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-2.5 font-sans text-background outline-none focus:border-accent text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-background/60 mb-2">Panelboard Brand</label>
                                        <select 
                                            value={checklistData.panelBrand}
                                            onChange={(e) => setChecklistData({...checklistData, panelBrand: e.target.value})}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-2.5 font-sans text-background outline-none focus:border-accent text-sm"
                                        >
                                            <option>Square D (QO / Homeline)</option>
                                            <option>Siemens</option>
                                            <option>Cutler Hammer (Eaton)</option>
                                            <option>Federal Pioneer (FPE)</option>
                                            <option>Other / Obsolete</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-background/60 mb-2">Existing Panel Capacity</label>
                                        <select 
                                            value={checklistData.panelCapacity}
                                            onChange={(e) => setChecklistData({...checklistData, panelCapacity: e.target.value})}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-2.5 font-sans text-background outline-none focus:border-accent text-sm"
                                        >
                                            <option>60 A</option>
                                            <option>100 A</option>
                                            <option>125 A</option>
                                            <option>150 A</option>
                                            <option>200 A</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Inputs block 2 */}
                                <div className="space-y-6 bg-dark/20 p-6 rounded-2xl border border-primary/10">
                                    <h4 className="font-sans font-bold text-sm text-accent uppercase tracking-wider border-b border-primary/10 pb-2 mb-4">Garage & Mast Info</h4>
                                    
                                    <div>
                                        <label className="block text-xs font-mono text-background/60 mb-2">Conduit Sizing & Distance</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. 45ft through crawlspace"
                                            value={checklistData.distanceToPanel}
                                            onChange={(e) => setChecklistData({...checklistData, distanceToPanel: e.target.value})}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-2.5 font-sans text-background outline-none focus:border-accent text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-background/60 mb-2">Exterior Meter Socket Location</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Side of house near garage entrance"
                                            value={checklistData.meterLocation}
                                            onChange={(e) => setChecklistData({...checklistData, meterLocation: e.target.value})}
                                            className="w-full bg-dark/50 border border-primary/20 rounded-xl px-4 py-2.5 font-sans text-background outline-none focus:border-accent text-sm"
                                        />
                                    </div>

                                    {/* Toggle parameters */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-sans">Grounding System Checked</span>
                                            <input 
                                                type="checkbox" 
                                                checked={checklistData.groundingConfirmed}
                                                onChange={() => setChecklistData({...checklistData, groundingConfirmed: !checklistData.groundingConfirmed})}
                                                className="w-4 h-4 accent-accent"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                                            <span className="text-sm font-sans">AB811 Dig Locates Required</span>
                                            <input 
                                                type="checkbox" 
                                                checked={checklistData.ab811Required}
                                                onChange={() => setChecklistData({...checklistData, ab811Required: !checklistData.ab811Required})}
                                                className="w-4 h-4 accent-accent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Photo documentation checklist */}
                                <div className="space-y-6 bg-dark/30 p-6 rounded-2xl border border-primary/10 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-sans font-bold text-sm text-accent uppercase tracking-wider border-b border-primary/10 pb-2 mb-4">Site Photo Checklist</h4>
                                        <p className="text-xs text-background/60 mb-4 leading-relaxed">
                                            Electricians must photograph these key areas for the engineering team to approve permits virtually:
                                        </p>

                                        <div className="space-y-3">
                                            {[
                                                { id: 'photoPanel', title: '1. Main Service Panel', subtext: 'Click to upload labels & main fuse' },
                                                { id: 'photoMeter', title: '2. Exterior Meter & Mast', subtext: 'Click to upload overhead feeds' },
                                                { id: 'photoChargerLoc', title: '3. Mounting Location', subtext: 'Click to upload wall/stud mount area' },
                                                { id: 'photoPathway', title: '4. Conduit Run Pathway', subtext: 'Click to upload crawlspace/pathway' }
                                            ].map(slot => {
                                                const hasPhoto = checklistData[slot.id];
                                                const photoData = uploadedPhotos[slot.id];
                                                const fileName = checklistData[`${slot.id}Name`];

                                                return (
                                                    <div key={slot.id} className="relative group">
                                                        <input 
                                                            type="file" 
                                                            accept="image/*" 
                                                            id={`upload-${slot.id}`}
                                                            onChange={(e) => handlePhotoUpload(e, slot.id)}
                                                            className="hidden"
                                                        />
                                                        
                                                        {hasPhoto && photoData ? (
                                                            /* Populated state with background photo and overlay controls */
                                                            <div 
                                                                className="relative h-20 rounded-xl overflow-hidden border border-primary/20 bg-cover bg-center flex items-center justify-between px-4 transition-all duration-300 shadow-md"
                                                                style={{ backgroundImage: `url(${photoData})` }}
                                                            >
                                                                {/* Translucent backplate */}
                                                                <div className="absolute inset-0 bg-dark/75 backdrop-blur-[1px] group-hover:bg-dark/65 transition-colors" />
                                                                
                                                                {/* Details */}
                                                                <div className="relative z-10 flex items-center gap-2.5">
                                                                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                                                                        <CheckCircle2 size={14} />
                                                                    </div>
                                                                    <div className="flex flex-col min-w-0">
                                                                        <span className="text-[9px] font-mono uppercase tracking-wider text-primary font-bold">Uploaded</span>
                                                                        <span className="text-xs font-semibold text-white truncate max-w-[130px] sm:max-w-[160px]" title={fileName}>
                                                                            {slot.title.split('. ')[1]}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Actions */}
                                                                <div className="relative z-10 flex items-center gap-1.5">
                                                                    <button
                                                                        onClick={() => handleRemovePhoto(slot.id)}
                                                                        className="w-8 h-8 rounded-full bg-accent/20 hover:bg-accent/30 text-accent border border-accent/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                                                                        title="Remove photo"
                                                                    >
                                                                        <Trash2 size={13} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            /* Empty upload slot (dashed card) */
                                                            <button
                                                                onClick={() => document.getElementById(`upload-${slot.id}`).click()}
                                                                className="w-full h-20 rounded-xl border border-dashed border-primary/20 hover:border-accent/40 bg-dark/20 hover:bg-dark/40 flex items-center gap-4 px-4 text-left transition-all duration-300 cursor-pointer"
                                                            >
                                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-background/60 group-hover:text-accent transition-colors shrink-0">
                                                                    <Image size={18} />
                                                                </div>
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="text-xs font-semibold text-background/80 group-hover:text-white transition-colors truncate">
                                                                        {slot.title}
                                                                    </span>
                                                                    <span className="text-[10px] text-background/40 truncate">
                                                                        {slot.subtext}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={downloadChecklistReport}
                                        className="w-full mt-6 py-3 rounded-full border border-accent hover:bg-accent hover:text-background text-accent font-sans font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Download size={14} /> Download Field Report (.md)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back to top review */}
                <div className="text-center mt-12">
                    <p className="text-sm font-sans text-background/50">
                        *All calculations correspond to continuous continuous limits in the <strong>Canadian Electrical Code 2024 Edition</strong>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EVOperationsToolkit;
