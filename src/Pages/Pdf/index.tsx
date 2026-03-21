import { useEffect, useState } from "react";
import LZstring from "lz-string";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import styles from "./pdf.module.css";

interface DutyLeaveData {
  [date: string]: {
    [subject: string]: number[];
  };
}

function formatDate(key: string): string {
  const [year, month, day] = key.split("-");
  return `${day}/${month}/${year}`;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function generatePdf(data: DutyLeaveData) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 20;
  let y = 20;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Duty Leave Report", pageWidth / 2, y, { align: "center" });
  y += 8;

  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.3);
  doc.line(marginLeft, y, pageWidth - 20, y);
  y += 6;

  const sortedDates = Object.keys(data).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  for (const dateKey of sortedDates) {
    const subjects = data[dateKey];
    const subjectKeys = Object.keys(subjects).sort();
    const blockHeight = 6 + subjectKeys.length * 5;

    if (y + blockHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(formatDate(dateKey), marginLeft, y);
    y += 6;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    for (const subject of subjectKeys) {
      const hours = subjects[subject];
      const hoursText = hours.map((h) => ordinal(h) + " hr").join(", ");

      doc.setTextColor(0, 0, 0);
      doc.text(`${subject} :- ${hoursText}`, marginLeft + 4, y);
      y += 5;
    }

    y += 3;
  }

  if (y + 20 > pageHeight - 20) {
    doc.addPage();
    y = 25;
  }
  y += 5;
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y, pageWidth - 20, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Generated on ${new Date().toLocaleDateString("en-IN")}`,
    pageWidth / 2,
    y,
    { align: "center" },
  );

  doc.save("duty-leave-report.pdf");
}

export default function OpenPdf() {
  const [data, setData] = useState<DutyLeaveData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = window.location.search;
    const query = urlParams.split("?d=")[1].trim();
    if (query) {
      try {
        const decompressed = LZstring.decompressFromBase64(query);

        if (decompressed) {
          setData(JSON.parse(decompressed));
        } else {
          setError("No data found");
        }
      } catch (err) {
        console.log(err);
        setError("Invalid data");
      }
    }
  }, []);

  if (!data && !error) {
    return (
      <div className={styles.pdfStatus}>
        <div className={styles.pdfSpinner} />
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pdfStatus}>
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      </div>
    );
  }
  if (data) {
    const sortedDates = Object.keys(data).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    return (
      <div className={styles.pdfPage}>
        <h1 className={styles.pdfTitle}>Duty Leave Report</h1>

        <div className={styles.pdfContent}>
          {sortedDates.map((dateKey) => {
            const subjects = data[dateKey];
            const subjectKeys = Object.keys(subjects).sort();

            return (
              <div key={dateKey} className={styles.pdfDateBlock}>
                <h2 className={styles.pdfDate}>{formatDate(dateKey)}</h2>
                {subjectKeys.map((sub) => {
                  const hours = subjects[sub];
                  return (
                    <p key={sub} className={styles.pdfSubjectRow}>
                      {sub} :- {hours.map((h) => ordinal(h) + " hr").join(", ")}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>

        <button
          className={styles.pdfDownloadBtn}
          onClick={() => generatePdf(data)}
        >
          <FaDownload /> Download PDF
        </button>
      </div>
    );
  }
}
