import { prisma } from "@/lib/prisma";
import { foulCategory } from "@prisma/client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 12,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  header: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  cell: {
    textAlign: "center",
    padding: 2,
    borderRight: "1px solid black",
    flex: 1,
  },
  smallCell: {
    flex: 0.18,
  },
  gradeCell: {
    flex: 0.4,
  },
  mediumCell: {
    flex: 1.1,
  },
  largeCell: {
    flex: 1.35,
  },
  narrowCell: {
    flex: 1,
  },
  timeCell: {
    flex: 0.5,
  },
  categoryCell: {
    flex: 0.5,
  },
  pointCell: {
    flex: 0.25,
  },
  counsellorCell: {
    flex: 0.7,
  },
  lastCell: {
    borderRight: "none",
  },
});

type Filter = {
  id: string;
  after?: string;
  before?: string;
  order?: "desc" | "asc";
};

const PDFComponent = async ({
  filter: { after, before, id, order },
}: {
  filter: Filter;
}) => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      fouls: {
        include: { foulDetail: { include: { foul: true } } },
        orderBy: { date: order },
        where: {
          confirmed:true,
          date: {
            gte: after ? new Date(Number(after)) : undefined,
            lte: before ? new Date(Number(before)) : undefined,
          },
        },
      },
    },
  });
  if (!student) {
    throw new Error("Invalid Student Data");
  }
  const title = "PORTOFOLIO PENGGARAAN SANTRIWAN DAN SANTRIWATI";

  return (
    <Document title={title} >
      <Page size="A4" style={styles.page} orientation="landscape">
        <Text style={styles.title}>
          PORTOFOLIO PENGGARAAN SANTRIWAN DAN SANTRIWATI ESANTREN ALAZKA CISAUK
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Nama Santriwan / Santriwati: {student.name}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Nama Santriwan / Santriwati: {student.name}
        </Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.smallCell]}>No</Text>
            <Text style={[styles.cell, styles.timeCell]}>Waktu</Text>
            <Text style={[styles.cell, styles.largeCell]}>Jenis Pelanggaran</Text>
            <Text style={[styles.cell, styles.gradeCell]}>Grade</Text>
            <Text style={[styles.cell, styles.pointCell]}>Point</Text>
            <Text style={[styles.cell, styles.categoryCell]}>Kategori</Text>
            <Text style={[styles.cell, styles.counsellorCell]}>Konselor</Text>
            <Text style={[styles.cell, styles.largeCell]}>Ta&apos;zir</Text>
            <Text style={[styles.cell, styles.narrowCell, styles.lastCell]}>
              Keterangan
            </Text>
          </View>

          {/* Data Rows */}
          {student.fouls.map((foulData, i) => (
            <View style={styles.row} key={i}>
              <Text style={[styles.cell, styles.smallCell]}>{i + 1}</Text>
              <Text style={[styles.cell, styles.timeCell]}>
                {new Date(foulData.date).toLocaleDateString("id-ID")}
              </Text>
              <Text style={[styles.cell, styles.largeCell]}>
                {foulData.foulDetail.foul.activity}
              </Text>
              <Text style={[styles.cell, styles.gradeCell]}>
                {foulData.foulDetail.foul.grade}
              </Text>
              <Text style={[styles.cell, styles.pointCell]}>
                {foulData.foulDetail.foul.point}
              </Text>
              <Text style={[styles.cell, styles.categoryCell]}>
                {foulData.foulDetail.foul.category === foulCategory.LOW
                  ? "Ringan"
                  : foulData.foulDetail.foul.category === foulCategory.MEDIUM
                  ? "Sedang"
                  : "Berat"}
              </Text>
              <Text style={[styles.cell, styles.counsellorCell]}>
                {foulData.foulDetail.counsellor}
              </Text>
              <Text style={[styles.cell, styles.largeCell]}>
                {foulData.foulDetail.punishment}
              </Text>
              <Text style={[styles.cell, styles.narrowCell, styles.lastCell]}>
                {foulData.description || "-"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFComponent;