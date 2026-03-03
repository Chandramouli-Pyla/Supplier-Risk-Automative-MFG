export type RiskLevel = "low" | "medium" | "high" | "critical"

export interface Supplier {
  id: string
  name: string
  code: string
  location: string
  category: string
  tier: number
  riskScore: number
  riskLevel: RiskLevel
  qualityScore: number
  deliveryScore: number
  costScore: number
  complianceScore: number
  lastAuditDate: string
  nextAuditDate: string
  activeAlerts: number
  status: "active" | "under-review" | "suspended"
  contactName: string
  contactEmail: string
  annualVolume: number
  defectRate: number
  onTimeDelivery: number
  leadTime: number
  certifications: string[]
}

export interface Alert {
  id: string
  supplierId: string
  supplierName: string
  type: "quality" | "delivery" | "compliance" | "financial" | "capacity"
  severity: RiskLevel
  title: string
  description: string
  createdAt: string
  status: "new" | "acknowledged" | "in-progress" | "resolved"
}

export interface PerformanceMetric {
  month: string
  qualityScore: number
  deliveryScore: number
  costScore: number
  overallScore: number
}

export interface RiskTrend {
  date: string
  lowRisk: number
  mediumRisk: number
  highRisk: number
  criticalRisk: number
}

export const suppliers: Supplier[] = [
  {
    id: "SUP001",
    name: "AutoParts Global Inc.",
    code: "APG-001",
    location: "Detroit, MI",
    category: "Powertrain Components",
    tier: 1,
    riskScore: 25,
    riskLevel: "low",
    qualityScore: 94,
    deliveryScore: 97,
    costScore: 88,
    complianceScore: 96,
    lastAuditDate: "2025-11-15",
    nextAuditDate: "2026-05-15",
    activeAlerts: 0,
    status: "active",
    contactName: "John Mitchell",
    contactEmail: "j.mitchell@autopglobal.com",
    annualVolume: 2450000,
    defectRate: 0.12,
    onTimeDelivery: 98.5,
    leadTime: 14,
    certifications: ["IATF 16949", "ISO 14001", "ISO 45001"],
  },
  {
    id: "SUP002",
    name: "PrecisionSteel Corp.",
    code: "PSC-002",
    location: "Cleveland, OH",
    category: "Raw Materials",
    tier: 2,
    riskScore: 45,
    riskLevel: "medium",
    qualityScore: 87,
    deliveryScore: 82,
    costScore: 91,
    complianceScore: 89,
    lastAuditDate: "2025-09-20",
    nextAuditDate: "2026-03-20",
    activeAlerts: 2,
    status: "active",
    contactName: "Sarah Chen",
    contactEmail: "s.chen@precisionsteel.com",
    annualVolume: 1850000,
    defectRate: 0.28,
    onTimeDelivery: 91.2,
    leadTime: 21,
    certifications: ["IATF 16949", "ISO 9001"],
  },
  {
    id: "SUP003",
    name: "TechnoElectric Systems",
    code: "TES-003",
    location: "San Jose, CA",
    category: "Electronics",
    tier: 1,
    riskScore: 72,
    riskLevel: "high",
    qualityScore: 78,
    deliveryScore: 71,
    costScore: 85,
    complianceScore: 82,
    lastAuditDate: "2025-08-10",
    nextAuditDate: "2026-02-10",
    activeAlerts: 5,
    status: "under-review",
    contactName: "Michael Rodriguez",
    contactEmail: "m.rodriguez@technoelectric.com",
    annualVolume: 3200000,
    defectRate: 0.45,
    onTimeDelivery: 84.3,
    leadTime: 28,
    certifications: ["IATF 16949"],
  },
  {
    id: "SUP004",
    name: "SafetyFirst Components",
    code: "SFC-004",
    location: "Nashville, TN",
    category: "Safety Systems",
    tier: 1,
    riskScore: 18,
    riskLevel: "low",
    qualityScore: 98,
    deliveryScore: 95,
    costScore: 82,
    complianceScore: 99,
    lastAuditDate: "2025-12-01",
    nextAuditDate: "2026-06-01",
    activeAlerts: 0,
    status: "active",
    contactName: "Emily Watson",
    contactEmail: "e.watson@safetyfirst.com",
    annualVolume: 980000,
    defectRate: 0.05,
    onTimeDelivery: 99.1,
    leadTime: 10,
    certifications: ["IATF 16949", "ISO 14001", "ISO 45001", "VDA 6.3"],
  },
  {
    id: "SUP005",
    name: "Dragon Manufacturing Ltd.",
    code: "DML-005",
    location: "Shenzhen, China",
    category: "Interior Components",
    tier: 2,
    riskScore: 85,
    riskLevel: "critical",
    qualityScore: 65,
    deliveryScore: 58,
    costScore: 95,
    complianceScore: 71,
    lastAuditDate: "2025-07-25",
    nextAuditDate: "2026-01-25",
    activeAlerts: 8,
    status: "under-review",
    contactName: "Li Wei",
    contactEmail: "l.wei@dragonmfg.cn",
    annualVolume: 4500000,
    defectRate: 0.82,
    onTimeDelivery: 76.4,
    leadTime: 45,
    certifications: ["ISO 9001"],
  },
  {
    id: "SUP006",
    name: "EuroPlastics GmbH",
    code: "EPG-006",
    location: "Stuttgart, Germany",
    category: "Plastic Components",
    tier: 1,
    riskScore: 32,
    riskLevel: "low",
    qualityScore: 92,
    deliveryScore: 89,
    costScore: 78,
    complianceScore: 94,
    lastAuditDate: "2025-10-05",
    nextAuditDate: "2026-04-05",
    activeAlerts: 1,
    status: "active",
    contactName: "Hans Mueller",
    contactEmail: "h.mueller@europlastics.de",
    annualVolume: 1650000,
    defectRate: 0.15,
    onTimeDelivery: 94.8,
    leadTime: 18,
    certifications: ["IATF 16949", "ISO 14001"],
  },
  {
    id: "SUP007",
    name: "Midwest Castings LLC",
    code: "MCL-007",
    location: "Indianapolis, IN",
    category: "Cast Components",
    tier: 2,
    riskScore: 58,
    riskLevel: "medium",
    qualityScore: 81,
    deliveryScore: 77,
    costScore: 89,
    complianceScore: 85,
    lastAuditDate: "2025-09-12",
    nextAuditDate: "2026-03-12",
    activeAlerts: 3,
    status: "active",
    contactName: "Robert Taylor",
    contactEmail: "r.taylor@midwestcastings.com",
    annualVolume: 2100000,
    defectRate: 0.38,
    onTimeDelivery: 88.2,
    leadTime: 25,
    certifications: ["IATF 16949", "ISO 9001"],
  },
  {
    id: "SUP008",
    name: "NipponSeiki Automotive",
    code: "NSA-008",
    location: "Nagoya, Japan",
    category: "Instrumentation",
    tier: 1,
    riskScore: 22,
    riskLevel: "low",
    qualityScore: 96,
    deliveryScore: 94,
    costScore: 75,
    complianceScore: 97,
    lastAuditDate: "2025-11-28",
    nextAuditDate: "2026-05-28",
    activeAlerts: 0,
    status: "active",
    contactName: "Takeshi Yamamoto",
    contactEmail: "t.yamamoto@nipponseiki.jp",
    annualVolume: 890000,
    defectRate: 0.08,
    onTimeDelivery: 97.6,
    leadTime: 22,
    certifications: ["IATF 16949", "ISO 14001", "JIS Q 9100"],
  },
]

export const alerts: Alert[] = [
  {
    id: "ALT001",
    supplierId: "SUP005",
    supplierName: "Dragon Manufacturing Ltd.",
    type: "quality",
    severity: "critical",
    title: "Defect Rate Exceeded Threshold",
    description: "Defect rate has increased to 0.82%, exceeding the 0.5% critical threshold. Immediate corrective action required.",
    createdAt: "2026-02-26T09:30:00Z",
    status: "new",
  },
  {
    id: "ALT002",
    supplierId: "SUP005",
    supplierName: "Dragon Manufacturing Ltd.",
    type: "delivery",
    severity: "high",
    title: "Consecutive Late Shipments",
    description: "3 consecutive shipments have been delayed by more than 5 days. Supply chain continuity at risk.",
    createdAt: "2026-02-25T04:15:00Z",
    status: "acknowledged",
  },
  {
    id: "ALT003",
    supplierId: "SUP003",
    supplierName: "TechnoElectric Systems",
    type: "compliance",
    severity: "high",
    title: "IATF 16949 Certification Expiring",
    description: "Certification expires in 30 days. Supplier has not provided renewal documentation.",
    createdAt: "2026-02-24T06:00:00Z",
    status: "in-progress",
  },
  {
    id: "ALT004",
    supplierId: "SUP003",
    supplierName: "TechnoElectric Systems",
    type: "financial",
    severity: "medium",
    title: "Credit Rating Downgrade",
    description: "Supplier's credit rating has been downgraded from A to BBB. Financial health monitoring recommended.",
    createdAt: "2026-02-23T11:45:00Z",
    status: "acknowledged",
  },
  {
    id: "ALT005",
    supplierId: "SUP002",
    supplierName: "PrecisionSteel Corp.",
    type: "capacity",
    severity: "medium",
    title: "Capacity Utilization Warning",
    description: "Supplier operating at 95% capacity. May impact ability to handle demand spikes.",
    createdAt: "2026-02-22T03:30:00Z",
    status: "in-progress",
  },
  {
    id: "ALT006",
    supplierId: "SUP007",
    supplierName: "Midwest Castings LLC",
    type: "quality",
    severity: "medium",
    title: "Increased Rejection Rate",
    description: "Incoming inspection rejection rate increased by 15% over the last month.",
    createdAt: "2026-02-21T08:20:00Z",
    status: "acknowledged",
  },
  {
    id: "ALT007",
    supplierId: "SUP006",
    supplierName: "EuroPlastics GmbH",
    type: "delivery",
    severity: "low",
    title: "Minor Shipping Delay",
    description: "Single shipment delayed by 2 days due to customs processing.",
    createdAt: "2026-02-20T05:00:00Z",
    status: "resolved",
  },
]

export const performanceHistory: PerformanceMetric[] = [
  { month: "Sep 2025", qualityScore: 85, deliveryScore: 88, costScore: 82, overallScore: 85 },
  { month: "Oct 2025", qualityScore: 86, deliveryScore: 87, costScore: 84, overallScore: 86 },
  { month: "Nov 2025", qualityScore: 84, deliveryScore: 89, costScore: 83, overallScore: 85 },
  { month: "Dec 2025", qualityScore: 88, deliveryScore: 86, costScore: 85, overallScore: 86 },
  { month: "Jan 2026", qualityScore: 87, deliveryScore: 88, costScore: 86, overallScore: 87 },
  { month: "Feb 2026", qualityScore: 86, deliveryScore: 85, costScore: 87, overallScore: 86 },
]

export const riskTrends: RiskTrend[] = [
  { date: "Sep 2025", lowRisk: 4, mediumRisk: 2, highRisk: 1, criticalRisk: 1 },
  { date: "Oct 2025", lowRisk: 4, mediumRisk: 2, highRisk: 2, criticalRisk: 0 },
  { date: "Nov 2025", lowRisk: 5, mediumRisk: 1, highRisk: 1, criticalRisk: 1 },
  { date: "Dec 2025", lowRisk: 4, mediumRisk: 2, highRisk: 1, criticalRisk: 1 },
  { date: "Jan 2026", lowRisk: 4, mediumRisk: 2, highRisk: 1, criticalRisk: 1 },
  { date: "Feb 2026", lowRisk: 4, mediumRisk: 2, highRisk: 1, criticalRisk: 1 },
]

export const supplierCategories = [
  "Powertrain Components",
  "Raw Materials",
  "Electronics",
  "Safety Systems",
  "Interior Components",
  "Plastic Components",
  "Cast Components",
  "Instrumentation",
]

/**
 * FIXED: Colors for Status pills (single-line)
 */
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active': 
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'under-review': 
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'suspended':
      return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default: 
      return 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20';
  }
}

/**
 * FIXED: Colors for Risk Score squares (Matching Text to Box)
 */
export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    case "medium":
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
    case "high":
      return "bg-orange-950/30 text-orange-500 border border-orange-900/50"
    case "critical":
      return "bg-red-950/30 text-red-500 border border-red-900/50"
    default:
      return "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20"
  }
}

/**
 * Colors for Risk badges in Detail Panel
 */
export function getRiskBgColor(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-900/20 text-emerald-400 border border-emerald-800/50"
    case "medium":
      return "bg-amber-900/20 text-amber-400 border border-amber-800/50"
    case "high":
      return "bg-orange-950/40 text-orange-400 border border-orange-900/50"
    case "critical":
      return "bg-red-950/40 text-red-400 border border-red-900/50"
    default:
      return "bg-neutral-900/20 text-neutral-400 border border-neutral-800/50"
  }
}