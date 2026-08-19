import { Proposal, ProposalTemplate, CaseStudy, ReusableBlock } from '@/types/proposal';

export const DEFAULT_QEVN_PROPOSAL: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'> = {
  client: {
    id: 'client-infinium',
    name: 'INFINIUM GLOBAL RESEARCH',
    contactPerson: 'SHRIKANT',
    contactRole: 'Managing Director / Growth Head',
    email: 'shrikant@infiniumglobalresearch.com',
    website: 'https://infiniumglobalresearch.com',
    industry: 'Market Research & Strategic Intelligence',
    location: 'Pune / Global',
    brandColor: '#00A3E0',
    logo: ''
  },
  metadata: {
    title: 'AI-Powered Outbound\nGrowth Engine\nProposal',
    subtitle: 'Scalable multi-agent pipeline for intelligent prospect research, verification, and personalized client acquisition.',
    proposalDate: 'AUGUST 2026',
    validUntil: 'SEPTEMBER 2026',
    preparedFor: 'INFINIUM GLOBAL RESEARCH',
    presentedTo: 'SHRIKANT\nINFINIUM GLOBAL\nRESEARCH',
    presentedBy: 'Qevn',
    qevnRepresentative: 'Dhruv Pathak',
    referenceNumber: 'QEVN-PROP-2026-081',
    version: 1
  },
  branding: {
    primaryColor: '#A3FF38', // QEVN Signature Lime Green
    primaryDark: '#0A0A0A',
    accentColor: '#88E714',
    fontFamily: 'Plus Jakarta Sans',
    headingFont: 'Plus Jakarta Sans',
    headerStyle: 'curved-lime',
    footerStyle: 'curved-lime',
    borderRadius: '14px'
  },
  status: 'draft',
  pages: [
    // Page 1: Cover
    {
      id: 'page-1-cover',
      pageNumber: 1,
      title: 'Cover Page',
      pageType: 'cover',
      blocks: [
        {
          id: 'blk-cover-1',
          type: 'cover',
          data: {
            title: 'AI-Powered Outbound\nGrowth Engine\nProposal',
            subtitle: '',
            date: 'AUGUST 2026',
            preparedFor: 'INFINIUM GLOBAL RESEARCH',
            presentedTo: 'SHRIKANT\nINFINIUM GLOBAL\nRESEARCH',
            presentedBy: 'Qevn'
          }
        }
      ]
    },
    // Page 2: Executive Summary
    {
      id: 'page-2-exec-summary',
      pageNumber: 2,
      title: 'Executive Summary',
      pageType: 'executive_summary',
      blocks: [
        {
          id: 'blk-exec-1',
          type: 'executive-summary',
          data: {
            heading: 'Executive Summary:',
            paragraphs: [
              "Raochra is a forward-thinking company with a clear vision for growth. As the market becomes increasingly competitive, the ability to consistently identify, reach, and convert high-quality leads determines which businesses scale and which stagnate.",
              "QEVN has conducted a thorough review of Raochra's business model, growth objectives, and current outbound capabilities. We recognize that Raochra requires a modern, scalable, and intelligent approach to outbound lead generation one that moves beyond manual prospecting into fully automated AI-driven systems."
            ],
            sections: [
              {
                title: 'Why Outbound Matters Now',
                body: "The traditional approach to lead generation is broken. Manually sourcing contacts, sending generic emails, and hoping for replies is no longer competitive. Modern buyers expect personalized outreach. Modern businesses need volume, speed, and precision simultaneously.\n\nAI-powered outbound systems give businesses the ability to reach thousands of qualified prospects with hyper-personalized messaging at a fraction of the cost and time of traditional methods."
              },
              {
                title: 'Why QEVN',
                body: "QEVN is not a traditional agency. We are an AI engineering company that builds production-grade intelligent systems. We don't configure off-the-shelf tools we architect and deploy custom AI pipelines that are built around your specific business needs.\n\nOur approach combines multi-agent AI architectures, enterprise email infrastructure, and deep business automation expertise to deliver outcomes that compound over time."
              }
            ]
          }
        }
      ]
    },
    // Page 3: Scope & About QEVN & What We Build
    {
      id: 'page-3-about-scope',
      pageNumber: 3,
      title: 'Scope & About QEVN',
      pageType: 'about_scope',
      blocks: [
        {
          id: 'blk-scope-1',
          type: 'about-scope',
          data: {
            scopeTitle: 'Scope of This Proposal:',
            scopeItems: [
              'AI Agentic Lead Generation System — Multi-layer AI pipeline for research, verification, enrichment, and personalized outreach',
              'Intelligent Bulk Mailing Infrastructure — Enterprise-grade email delivery with warmup, reputation management, and AI campaign management',
              "Future MVP / Prototype Development — Product engineering for Raochra's upcoming platform or application"
            ],
            aboutTitle: 'About Us:',
            aboutText: 'QEVN is an AI Automation company building intelligent, production-grade systems that help businesses grow faster, operate leaner, and scale smarter. We specialize in Agentic AI systems where multiple AI agents work autonomously to accomplish complex, multi-step business goals.',
            whatWeBuildTitle: 'What We Build:',
            cards: [
              {
                title: 'Agentic AI Systems',
                desc: 'Multi-agent pipelines that research, decide, and execute autonomously'
              },
              {
                title: 'AI Calling Agents',
                desc: 'Intelligent voice agents that handle inbound and outbound calls'
              },
              {
                title: 'AI Employees',
                desc: 'Virtual workforce that handles tasks, emails, and operations 24/7'
              },
              {
                title: 'CRM Integrations',
                desc: 'Deep integrations with HubSpot, Salesforce, Pipedrive, and more'
              },
              {
                title: 'Custom SaaS Development',
                desc: 'Scalable SaaS products built for real business problems'
              },
              {
                title: 'Workflow Automation',
                desc: 'End-to-end automation of complex business processes'
              }
            ]
          }
        }
      ]
    },
    // Page 4: Understanding Client (Challenge -> Solution Table)
    {
      id: 'page-4-understanding',
      pageNumber: 4,
      title: 'Understanding Client',
      pageType: 'understanding_client',
      blocks: [
        {
          id: 'blk-understanding-1',
          type: 'challenge-solution-table',
          data: {
            title: 'Understanding INFINIUM GLOBAL :',
            subtitle: "Based on our analysis of Infinium business model and growth objectives, we've identified five core needs that are critical to achieving scalable outbound growth.",
            rows: [
              {
                challenge: 'Need for qualified leads',
                solution: 'AI agents research and identify high-fit prospects matching your exact ICP.'
              },
              {
                challenge: 'Need for verified contacts',
                solution: 'Multi-provider verification ensures every contact is real, reachable, and current.'
              },
              {
                challenge: 'Need for personalized outreach',
                solution: 'AI generates unique, researched copy for each prospect not mail-merge templates.'
              },
              {
                challenge: 'Scalable outbound system',
                solution: 'Fully automated pipeline that grows with your business without adding headcount.'
              },
              {
                challenge: 'Future product development',
                solution: 'QEVN will build your MVP/prototype with agile delivery after lead gen is live.'
              }
            ]
          }
        }
      ]
    },
    // Page 5: Solution Layers 1 & 2
    {
      id: 'page-5-solution-1-2',
      pageNumber: 5,
      title: 'AI Lead Generation (Layer 1 & 2)',
      pageType: 'solution_layer_1_2',
      blocks: [
        {
          id: 'blk-sol-1-2',
          type: 'solution-layers',
          data: {
            mainTitle: 'AI Agentic Lead Generation',
            mainSubtitle: 'This is NOT traditional lead generation. It is a Multi-Agent AI Pipeline where multiple specialized AI agents work simultaneously across research, verification, enrichment, and outreach.',
            layers: [
              {
                layerNumber: 'LAYER 1',
                title: 'AI Research Engine:',
                intro: 'AI agents first build a deep understanding of your ideal customer:',
                bullets: [
                  'Ideal Customer Profile (ICP) → Buyer Personas',
                  'TargetIndustries',
                  'TargetCompanies',
                  'Competitor Analysis',
                  'Decision Maker Mapping'
                ],
                footerLabel: 'Data collected from:',
                footerValue: 'Apollo · Apify · Clay · Firecrawl · Google Maps · LinkedIn · Company Websites · Public Directories · Web Scraping APIs'
              },
              {
                layerNumber: 'LAYER 2',
                title: 'Verification Engine:',
                intro: 'Every lead is validated across multiple verification providers:',
                bullets: [
                  'Company existence confirmed',
                  'Website active & reachable',
                  'Person existence verified',
                  'Job title validity checked',
                  'Industry & company size validated',
                  'Location verified',
                  'Duplicates removed',
                  'Fake or inaccurate data removed'
                ]
              }
            ]
          }
        }
      ]
    },
    // Page 6: Solution Layers 3 & 4 + Key Benefits
    {
      id: 'page-6-solution-3-4',
      pageNumber: 6,
      title: 'Enrichment, Outreach & Benefits',
      pageType: 'solution_layer_3_4_benefits',
      blocks: [
        {
          id: 'blk-sol-3-4',
          type: 'solution-layers',
          data: {
            layers: [
              {
                layerNumber: 'LAYER 3',
                title: 'Data Enrichment Engine',
                intro: 'AI agents enrich every verified lead into a sales-ready profile:',
                bullets: [
                  'Company details & employee count',
                  'Industry classification',
                  'Technologies used',
                  'Decision makers & org chart',
                  'Revenue (when available)',
                  'Contact details & social profiles',
                  'Business insights',
                  'AI-generated research summary'
                ]
              },
              {
                layerNumber: 'LAYER 4',
                title: 'Personalized Outreach Engine',
                intro: 'AI-powered personalization not generic bulk emails:',
                bullets: [
                  'Email discovery & verification',
                  'AI researches each individual prospect',
                  'Unique personalized copy generated per lead',
                  "Messaging aligned to prospect's role & industry",
                  'Campaign scheduling & sequencing',
                  'Automated sending with reply detection'
                ]
              }
            ]
          }
        },
        {
          id: 'blk-benefits-1',
          type: 'benefits-grid',
          data: {
            headerTitle: 'Key Benefits',
            benefits: [
              { title: 'Higher Quality Leads' },
              { title: 'Better Conversion Rates' },
              { title: 'Scalable Without Headcount' },
              { title: 'AI Research & Enrichment' },
              { title: 'Verified Contacts Only' },
              { title: 'Reduced Manual Work' }
            ]
          }
        }
      ]
    },
    // Page 7: Intelligent Bulk Mailing System
    {
      id: 'page-7-mailing',
      pageNumber: 7,
      title: 'Bulk Mailing System',
      pageType: 'infrastructure',
      blocks: [
        {
          id: 'blk-mailing-1',
          type: 'infrastructure-system',
          data: {
            title: 'Intelligent Bulk Mailing System',
            subtitle: 'A premium email infrastructure designed for high-volume, high-deliverability outbound campaigns. This is not a standard email tool it is an enterprise-grade sending ecosystem managed entirely by AI.',
            phases: [
              {
                phaseNumber: 'Phase 1 - Infrastructure Setup',
                description: 'We deploy approximately 30 Google Workspace mailboxes across multiple domains, configured with full SPF, DKIM, and DMARC authentication. AI automatically manages sending capacity across all mailboxes.'
              },
              {
                phaseNumber: 'Phase 2 - Warmup Process',
                scheduleTitle: 'Warmup Schedule (1–2 Months)',
                bullets: [
                  'Daily sending limits gradually increased',
                  'Inbox reputation built through positive engagement',
                  'SMTP configuration optimized per mailbox',
                  'Google Workspace compliance maintained throughout.',
                  'Spam prevention protocols active at all times',
                  'Sender reputation monitored daily',
                  'Domain health tracked and protected'
                ],
                notice: 'Gradual scaling is essential. Aggressive sending before warmup completion destroys deliverability. We protect your sender reputation as the foundation of the entire system.'
              },
              {
                phaseNumber: 'Phase 3 — AI Campaign Management',
                intro: 'Once infrastructure is warmed, AI takes over full campaign management:',
                bullets: [
                  'Daily quota management across all mailboxes',
                  'Campaign scheduling and optimal sending windows',
                  'Automated reply detection and routing',
                  'Bounce monitoring and list cleaning',
                  'Real-time performance analytics and reporting.'
                ]
              }
            ],
            operationalNotice: {
              title: 'Operational Notice — Mailbox Management:',
              text: "Email mailboxes are operational infrastructure resources. In the event a mailbox's deliverability reputation declines, the standard industry protocol is followed: the affected mailbox is retired, a new mailbox is provisioned, the warmup process restarts, and campaigns resume upon reputation recovery. This process protects the overall system health. There may be brief pauses in sending for the affected mailbox during this period. All other mailboxes continue operating normally."
            }
          }
        }
      ]
    },
    // Page 8: Future Product Development
    {
      id: 'page-8-product-dev',
      pageNumber: 8,
      title: 'Future Product Development',
      pageType: 'development_approach',
      blocks: [
        {
          id: 'blk-dev-1',
          type: 'development-approach',
          data: {
            title: 'Future Product Development',
            intro: "Following the successful launch and stabilization of the AI lead generation and mailing infrastructure, QEVN will proceed with building Raochra's requested MVP or prototype product.",
            approachColumn: {
              header: 'Development Approach',
              bullets: [
                'Rapid development cycles',
                'Agile delivery with weekly sprints.',
                'Interactive prototype first.',
                'Modern UI/UX design',
                'Scalable architecture from day one',
                'Fast iterations with feedback loops'
              ]
            },
            whatYouGetColumn: {
              header: 'What you Get',
              bullets: [
                'Production-ready codebase',
                'Cloud-deployed infrastructure',
                'Admin & user dashboards',
                'API integrations as needed',
                'Documentation included',
                'Support during launch.'
              ]
            },
            footerSummary: 'QEVN prioritizes fast execution without compromising quality. Every product we build is designed for future expansion and real-world performance.'
          }
        }
      ]
    },
    // Page 9: Case Studies
    {
      id: 'page-9-case-studies',
      pageNumber: 9,
      title: 'Case Studies',
      pageType: 'case_studies',
      blocks: [
        {
          id: 'blk-case-1',
          type: 'case-study-list',
          data: {
            title: 'Case Studies',
            studies: [
              {
                name: 'Education ERP System',
                client: 'Sarthak School, Maharshi Gurukul & Multiple Universities',
                bullets: [
                  'Complete ERP covering admissions, academics, attendance, and operations',
                  'Multi-institution deployment with centralized management',
                  "Custom workflows for each institution's unique processes",
                  'Real-time dashboards for administrators and faculty'
                ]
              },
              {
                name: 'Lead Generation & AI Calling Platform',
                client: 'Mr. Amit Rana',
                bullets: [
                  'End-to-end lead generation system with AI verification',
                  'AI Calling Agent for automated prospect qualification',
                  'Lead-to-closure workflow automation',
                  'Website development and CRM integration'
                ]
              },
              {
                name: 'Dubai Learning Management System',
                client: 'Prachi Chouhan',
                bullets: [
                  'Modern LMS built for the UAE education market',
                  'Scalable architecture supporting thousands of concurrent users',
                  'Full course management, assessments, and progress tracking',
                  'Custom UI/UX designed for premium user experience'
                ]
              }
            ]
          }
        }
      ]
    },
    // Page 10: Pricing
    {
      id: 'page-10-pricing',
      pageNumber: 10,
      title: 'Pricing Plan',
      pageType: 'pricing',
      blocks: [
        {
          id: 'blk-pricing-1',
          type: 'pricing-card',
          data: {
            pageTitle: 'Pricing',
            billingType: 'MONTHLY SUBSCRIPTION',
            price: '$ 600',
            period: 'per month',
            includedTitle: 'Everything Included:',
            includedItems: [
              'AI Agentic Lead Generation',
              'AI Verification Engine',
              'Data Enrichment Engine',
              'AI Research Automation',
              'Email Personalization Engine',
              'Bulk Mailing Infrastructure (~30 mailboxes)',
              'AI Campaign Management',
              'Performance Monitoring & Analytics',
              'Platform Maintenance & Updates',
              'Technical Support'
            ],
            infraTitle: 'Infrastructure Included:',
            infraDescription: 'Your subscription covers all operational infrastructure and third-party API costs:',
            infraItems: [
              'Apify, Apollo, Clay',
              'Firecrawl, Lusha, Hunter.io',
              'Web Scraping APIs, LLM APIs',
              'Google Workspace Mailboxes',
              'Cloud Infrastructure & Databases',
              'Development & Monitoring'
            ],
            infraNotice: 'Platform maintenance and updates are included at no additional cost for the duration of your active subscription.'
          }
        }
      ]
    },
    // Page 11: Project Timeline
    {
      id: 'page-11-timeline',
      pageNumber: 11,
      title: 'Project Timeline',
      pageType: 'timeline',
      blocks: [
        {
          id: 'blk-timeline-1',
          type: 'timeline-table',
          data: {
            title: 'Project Timeline',
            columns: ['Week', 'Milestone', 'Deliverables'],
            rows: [
              {
                week: 'Week 1',
                milestone: 'Discovery & ICP Research',
                deliverables: 'ICP definition, buyer personas, target company list, industry analysis.'
              },
              {
                week: 'Week 2',
                milestone: 'Lead Generation Pipeline',
                deliverables: 'Multi-agent pipeline live, initial lead collection across all sources.'
              },
              {
                week: 'Week 3',
                milestone: 'Verification & Enrichment',
                deliverables: 'All leads verified, enriched, and organized into sales- ready database.'
              },
              {
                week: 'Week 4',
                milestone: 'Email Infrastructure',
                deliverables: '30 mailboxes deployed, warmup initiated, SMTP configured.'
              },
              {
                week: 'Week 5',
                milestone: 'Campaign Launch',
                deliverables: 'First personalized campaigns live, monitoring active, reporting enabled.'
              },
              {
                week: '+',
                milestone: 'MVP Development',
                deliverables: 'Product engineering begins after lead gen system is stable.'
              }
            ]
          }
        }
      ]
    },
    // Page 12: Deliverables
    {
      id: 'page-12-deliverables',
      pageNumber: 12,
      title: 'Deliverables Checklist',
      pageType: 'deliverables',
      blocks: [
        {
          id: 'blk-deliverables-1',
          type: 'deliverables-checklist',
          data: {
            title: 'Deliverables:',
            intro: 'A complete checklist of everything Raochra receives as part of this engagement:',
            groups: [
              {
                groupName: 'AI Lead Generation System',
                items: [
                  'Configured multi-agent AI pipeline',
                  'ICP research and buyer persona documentation',
                  'Live lead collection from Apollo, Apify, LinkedIn, Clay, and custom sources',
                  'Multi-provider verification engine',
                  'Data enrichment for all collected leads',
                  'AI-generated research per prospect'
                ]
              },
              {
                groupName: 'Email Infrastructure',
                items: [
                  '30 Google Workspace mailboxes configured',
                  'Full DNS setup: SPF, DKIM, DMARC',
                  'Gradual warmup schedule with AI management',
                  'Deliverability monitoring dashboard'
                ]
              },
              {
                groupName: 'AI Campaign Management',
                items: [
                  'Personalized email copy for all prospects',
                  'Campaign scheduling and sequencing',
                  'Reply detection and routing',
                  'Bounce management and list hygiene',
                  'Weekly performance reports'
                ]
              },
              {
                groupName: 'Platform & Support',
                items: [
                  'Ongoing platform maintenance and updates',
                  'Technical support throughout subscription',
                  'Monthly performance reviews',
                  'Continuous system optimization'
                ]
              }
            ]
          }
        }
      ]
    },
    // Page 13: Terms & Closing
    {
      id: 'page-13-terms-closing',
      pageNumber: 13,
      title: 'Terms & Closing',
      pageType: 'terms_closing',
      blocks: [
        {
          id: 'blk-terms-1',
          type: 'terms-closing',
          data: {
            termsTitle: 'Terms & Assumptions:',
            terms: [
              'Third-party API limits may apply depending on data volume and provider policies.',
              'Email deliverability is dependent on maintaining mailbox reputation and adhering to sending best practices.',
              'Occasional mailbox replacement may be required to maintain overall system health this is standard industry practice.',
              'Infrastructure scales with business growth; additional capacity can be added as needed.',
              "Lead quality improves over time as the AI system learns Raochra's specific conversion patterns.",
              'The client is responsible for ensuring outreach messaging complies with applicable laws and regulations in their target markets.'
            ],
            closingCard: {
              badge: 'Ready to Scale?',
              leadText: 'QEVN is not just a service provider. We are a long-term technology partner dedicated to helping Raochra build an AI-powered outbound growth engine and future-ready products that compound in value over time.',
              subText: 'Every system we build is designed to give Raochra a durable competitive advantage through smarter prospecting, more efficient outreach, and faster product development than your competition.',
              quote: '"Let\'s build the future of intelligent growth together."',
              companyInfo: 'QEVN · www.qevn.in',
              footerLine: 'QEVN × INFINIUM GLOBAL RESEARCH· August 2026'
            }
          }
        }
      ]
    }
  ]
};

export const PREBUILT_TEMPLATES: ProposalTemplate[] = [
  {
    id: 'template-qevn-standard',
    name: 'QEVN Standard 13-Page Proposal',
    description: 'The master 13-page client proposal covering Outbound AI Engine, Mailing Infrastructure, Development, Case Studies, Pricing, Timeline, and Terms.',
    category: 'Full Proposal',
    industry: 'Technology & AI',
    isDefault: true,
    pagesCount: 13,
    proposalData: DEFAULT_QEVN_PROPOSAL
  },
  {
    id: 'template-ai-calling',
    name: 'AI Calling & Voice Agents Proposal',
    description: 'Specialized 8-page proposal focusing on conversational voice AI, inbound qualification, outbound campaigns, and telephony integrations.',
    category: 'Voice AI',
    industry: 'Enterprise & Call Centers',
    pagesCount: 8,
    proposalData: {
      ...DEFAULT_QEVN_PROPOSAL,
      metadata: {
        ...DEFAULT_QEVN_PROPOSAL.metadata,
        title: 'Autonomous AI Calling\n& Voice Qualification\nEngine Proposal'
      }
    }
  },
  {
    id: 'template-saas-mvp',
    name: 'Custom SaaS & AI Product Development',
    description: 'Product-first 10-page proposal for building production-grade web applications, custom agentic workflows, and cloud architecture.',
    category: 'Product Engineering',
    industry: 'SaaS & Startups',
    pagesCount: 10,
    proposalData: {
      ...DEFAULT_QEVN_PROPOSAL,
      metadata: {
        ...DEFAULT_QEVN_PROPOSAL.metadata,
        title: 'Custom SaaS & Agentic\nProduct Engineering\nProposal'
      }
    }
  }
];

export const PREBUILT_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-education-erp',
    title: 'Education ERP System',
    clientName: 'Sarthak School, Maharshi Gurukul & Multiple Universities',
    industry: 'Education & Institutional ERP',
    bullets: [
      'Complete ERP covering admissions, academics, attendance, and operations',
      'Multi-institution deployment with centralized management',
      "Custom workflows for each institution's unique processes",
      'Real-time dashboards for administrators and faculty'
    ],
    results: 'Streamlined operations across 12,000+ students and reduced administrative hours by 65%.'
  },
  {
    id: 'cs-lead-gen-calling',
    title: 'Lead Generation & AI Calling Platform',
    clientName: 'Mr. Amit Rana',
    industry: 'B2B Sales & Real Estate',
    bullets: [
      'End-to-end lead generation system with AI verification',
      'AI Calling Agent for automated prospect qualification',
      'Lead-to-closure workflow automation',
      'Website development and CRM integration'
    ],
    results: 'Generated 450+ qualified meetings in 60 days with 98.4% data verification rate.'
  },
  {
    id: 'cs-dubai-lms',
    title: 'Dubai Learning Management System',
    clientName: 'Prachi Chouhan',
    industry: 'EdTech & Corporate Training',
    bullets: [
      'Modern LMS built for the UAE education market',
      'Scalable architecture supporting thousands of concurrent users',
      'Full course management, assessments, and progress tracking',
      'Custom UI/UX designed for premium user experience'
    ],
    results: 'Live across UAE corporate clients with 99.9% uptime and sub-second page loads.'
  }
];

export const REUSABLE_BLOCK_LIBRARY: ReusableBlock[] = [
  {
    id: 'blk-lib-about-qevn',
    name: 'About QEVN Standard',
    category: 'qevn',
    description: 'Standard company description, mission, and agentic AI positioning.',
    block: {
      id: 'lib-about-1',
      type: 'about-scope',
      data: {
        aboutTitle: 'About Us:',
        aboutText: 'QEVN is an AI Automation company building intelligent, production-grade systems that help businesses grow faster, operate leaner, and scale smarter. We specialize in Agentic AI systems where multiple AI agents work autonomously to accomplish complex, multi-step business goals.'
      }
    }
  },
  {
    id: 'lib-what-we-build',
    name: 'What We Build (6 Capabilities Grid)',
    category: 'services',
    description: 'Grid of 6 core QEVN capabilities with descriptions.',
    block: {
      id: 'lib-cards-1',
      type: 'about-scope',
      data: {
        whatWeBuildTitle: 'What We Build:',
        cards: DEFAULT_QEVN_PROPOSAL.pages[2].blocks[0].data.cards
      }
    }
  },
  {
    id: 'lib-key-benefits',
    name: 'Key Benefits (6 Lime Cards)',
    category: 'qevn',
    description: '6 distinct lime green value cards for client outcomes.',
    block: {
      id: 'lib-benefits-1',
      type: 'benefits-grid',
      data: {
        headerTitle: 'Key Benefits',
        benefits: [
          { title: 'Higher Quality Leads' },
          { title: 'Better Conversion Rates' },
          { title: 'Scalable Without Headcount' },
          { title: 'AI Research & Enrichment' },
          { title: 'Verified Contacts Only' },
          { title: 'Reduced Manual Work' }
        ]
      }
    }
  },
  {
    id: 'lib-standard-terms',
    name: 'Standard Operational Terms & Assumptions',
    category: 'terms',
    description: 'Legal and technical assumptions covering APIs, deliverability, and infrastructure.',
    block: {
      id: 'lib-terms-1',
      type: 'terms-closing',
      data: {
        termsTitle: 'Terms & Assumptions:',
        terms: DEFAULT_QEVN_PROPOSAL.pages[12].blocks[0].data.terms
      }
    }
  }
];
