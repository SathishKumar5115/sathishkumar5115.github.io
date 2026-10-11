// Read, strip and check PDF document metadata (milestone M3: public resume).
import { PDFDocument, PDFName } from "pdf-lib";

/**
 * @typedef {{ title: string, author: string, subject: string, keywords: string,
 *   creator: string, producer: string, hasXmp: boolean }} PdfInfo
 */

/** @param {Uint8Array} bytes @returns {Promise<PdfInfo>} */
export async function inspectPdf(bytes) {
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  return {
    title: doc.getTitle() ?? "",
    author: doc.getAuthor() ?? "",
    subject: doc.getSubject() ?? "",
    keywords: doc.getKeywords() ?? "",
    creator: doc.getCreator() ?? "",
    producer: doc.getProducer() ?? "",
    hasXmp: doc.catalog.has(PDFName.of("Metadata")),
  };
}

/**
 * Keeps only a title and the owner's name; clears everything else, including XMP.
 * @param {Uint8Array} bytes @param {{ title: string, author: string }} keep
 * @returns {Promise<Uint8Array>}
 */
export async function stripPdf(bytes, { title, author }) {
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  doc.setTitle(title);
  doc.setAuthor(author);
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setCreator("");
  doc.setProducer("");
  doc.catalog.delete(PDFName.of("Metadata"));
  return doc.save({ updateFieldAppearances: false });
}

/**
 * Problems found in the metadata (empty array = OK).
 * @param {PdfInfo} info @param {string} owner @returns {string[]}
 */
export function checkPdf(info, owner) {
  const problems = [];
  if (info.author !== owner) problems.push(`author is "${info.author}", expected "${owner}"`);
  for (const field of /** @type {const} */ (["subject", "keywords", "creator", "producer"])) {
    if (info[field] !== "") problems.push(`${field} should be empty, is "${info[field]}"`);
  }
  if (info.hasXmp) problems.push("XMP metadata stream present");
  return problems;
}
