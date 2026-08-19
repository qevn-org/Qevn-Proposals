export type ProposalStatus =
  | 'draft'
  | 'internal_review'
  | 'final'
  | 'sent'
  | 'approved'
  | 'rejected'
  | 'archived';

export interface ClientInfo {
  id: string;
  name: string;
  contactPerson: string;
  contactRole?: string;
  email: string;
  phone?: string;
  website?: string;
  logo?: string;
  industry?: string;
  location?: string;
  brandColor?: string;
}

export interface ProposalMetadata {
  title: string;
  subtitle?: string;
  proposalDate: string; // e.g. "AUGUST 2026"
  validUntil?: string;
  preparedFor: string;
  presentedTo: string;
  presentedBy: string;
  qevnRepresentative: string;
  referenceNumber: string;
  version: number;
}

export interface BrandTheme {
  primaryColor: string; // Default "#A3FF38" (QEVN Lime)
  primaryDark: string; // "#0A0A0A"
  accentColor: string; // "#88E714"
  fontFamily: string; // "Plus Jakarta Sans", sans-serif
  headingFont: string;
  headerStyle: 'curved-lime' | 'minimal' | 'bordered';
  footerStyle: 'curved-lime' | 'minimal' | 'bordered';
  borderRadius: string;
}

export type BlockType =
  | 'cover'
  | 'executive-summary'
  | 'about-scope'
  | 'challenge-solution-table'
  | 'solution-layers'
  | 'benefits-grid'
  | 'infrastructure-system'
  | 'development-approach'
  | 'case-study-list'
  | 'pricing-card'
  | 'timeline-table'
  | 'deliverables-checklist'
  | 'terms-closing'
  | 'rich-text'
  | 'two-column'
  | 'custom-card-grid'
  | 'metrics-callout';

export interface BlockItem {
  id: string;
  type: BlockType;
  title?: string;
  subtitle?: string;
  data: Record<string, any>;
  style?: Record<string, any>;
}

export interface ProposalPage {
  id: string;
  pageNumber: number;
  title: string;
  pageType:
    | 'cover'
    | 'executive_summary'
    | 'about_scope'
    | 'understanding_client'
    | 'solution_layer_1_2'
    | 'solution_layer_3_4_benefits'
    | 'infrastructure'
    | 'development_approach'
    | 'case_studies'
    | 'pricing'
    | 'timeline'
    | 'deliverables'
    | 'terms_closing'
    | 'custom';
  blocks: BlockItem[];
  hidden?: boolean;
}

export interface Proposal {
  id: string;
  slug?: string;
  client: ClientInfo;
  metadata: ProposalMetadata;
  branding: BrandTheme;
  status: ProposalStatus;
  templateId?: string;
  pages: ProposalPage[];
  createdAt: string;
  updatedAt: string;
  versions?: {
    id: string;
    version: number;
    createdAt: string;
    note: string;
    snapshot: string; // JSON
  }[];
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  isDefault?: boolean;
  pagesCount: number;
  thumbnail?: string;
  proposalData: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'>;
}

export interface ReusableBlock {
  id: string;
  name: string;
  category: 'qevn' | 'saved' | 'services' | 'terms' | 'deliverables';
  description?: string;
  block: BlockItem;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  bullets: string[];
  results?: string;
  website?: string;
}
