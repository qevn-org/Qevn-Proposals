'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Proposal } from '@/types/proposal';

export async function exportProposalToPdf(
  proposal: Proposal,
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  const clientName = proposal.client.name || 'Client';
  const cleanClient = clientName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const dateStr = proposal.metadata.proposalDate || '2026';
  const fileName = `QEVN × ${cleanClient} Proposal – ${dateStr}.pdf`;

  const pages = proposal.pages.filter((p) => !p.hidden);
  if (pages.length === 0) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const totalPages = pages.length;

  for (let i = 0; i < totalPages; i++) {
    const page = pages[i];
    onProgress?.(
      Math.round(((i + 1) / totalPages) * 100),
      `Rendering page ${i + 1} of ${totalPages}...`
    );

    const pageElement = document.getElementById(`proposal-page-${page.pageNumber}`);
    if (!pageElement) continue;

    // Capture A4 canvas at high resolution
    const canvas = await html2canvas(pageElement, {
      scale: 2.2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 1200
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  onProgress?.(100, 'Saving PDF...');
  pdf.save(fileName);
}
