'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ProposalEditorLayout } from '@/components/editor/ProposalEditorLayout';

export default function ProposalEditorPage() {
  const params = useParams();
  const proposalId = params?.id as string;

  return <ProposalEditorLayout proposalId={proposalId} />;
}
