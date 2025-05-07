import { NextResponse } from "next/server";
import { z } from "zod";
import PDFComponent from "./_pdfComponent";
import { renderToStream } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ [key: string]: string }>;
};

const searchParamsSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
  order: z.enum(["desc", "asc"]).optional(),
});

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;

  const searchParams = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );

  const sp = searchParamsSchema.parse(searchParams);

  const stream = await renderToStream(
    await PDFComponent({ filter: { id, ...{ sp } } })
  );
  const student = await prisma.student.findUnique({where:{id},select:{name:true}})
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${student.name}.pdf"`,
    },
  });
}
