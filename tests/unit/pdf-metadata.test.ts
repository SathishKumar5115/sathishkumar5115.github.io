// M3 acceptance: the public resume PDF carries no author/creator metadata beyond the owner's name.
import { PDFDocument, PDFName } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { checkPdf, inspectPdf, stripPdf } from "../../scripts/lib/pdf-metadata.mjs";

const OWNER = "Sathishkumar R";

async function leakyPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.addPage();
  doc.setTitle("resume_final_v7");
  doc.setAuthor("someone@laptop");
  doc.setSubject("Job application");
  doc.setKeywords(["phone", "address"]);
  doc.setCreator("LaTeX with hyperref");
  doc.setProducer("pdfTeX-1.40.25");
  const xmp = doc.context.stream("<x:xmpmeta><dc:creator>someone</dc:creator></x:xmpmeta>");
  doc.catalog.set(PDFName.of("Metadata"), doc.context.register(xmp));
  return doc.save();
}

describe("pdf metadata", () => {
  it("detects leaky metadata", async () => {
    const info = await inspectPdf(await leakyPdf());
    expect(info.author).toBe("someone@laptop");
    expect(info.creator).toBe("LaTeX with hyperref");
    expect(info.hasXmp).toBe(true);
    expect(checkPdf(info, OWNER)).not.toEqual([]);
  });

  it("strips everything except title and the owner's name", async () => {
    const stripped = await stripPdf(await leakyPdf(), { title: `${OWNER} – Resume`, author: OWNER });
    const info = await inspectPdf(stripped);
    expect(info).toMatchObject({
      title: `${OWNER} – Resume`,
      author: OWNER,
      subject: "",
      keywords: "",
      creator: "",
      producer: "",
      hasXmp: false,
    });
    expect(checkPdf(info, OWNER)).toEqual([]);
  });

  it("keeps the pages", async () => {
    const stripped = await stripPdf(await leakyPdf(), { title: "T", author: OWNER });
    expect((await PDFDocument.load(stripped)).getPageCount()).toBe(1);
  });
});
