import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set the worker source
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${getDocument.version}/pdf.worker.min.js`;

export async function parseResume(file: File): Promise<string> {
  const fileType = file.type;
  let content = '';

  if (fileType === 'application/pdf') {
    content = await parsePdf(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    content = await parseDocx(file);
  } else {
    throw new Error('Unsupported file type');
  }

  return content;
}

async function parsePdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let content = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    content += textContent.items.map((item: any) => item.str).join(' ') + '\n';
  }

  return content;
}

async function parseDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}