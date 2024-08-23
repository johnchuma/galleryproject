"use client";
import { useEffect, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";

// Set the worker source
GlobalWorkerOptions.workerSrc = "/pdf-worker.mjs";

const PDFViewer = () => {
  const url =
    "https://firebasestorage.googleapis.com/v0/b/photogallery-44310.appspot.com/o/images%2Fsample-pdf.pdf?alt=media&token=a4aaa321-6b37-47b3-97b7-9f5ad374777f";
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = getDocument({ url, rangeChunkSize: 60680, });
        console.log(loadingTask);
        const loadedPdf = await loadingTask.promise;
        console.log(loadedPdf);
        setPdf(loadedPdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [url]);

  const renderPage = async (pageNum) => {
    if (pdf) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.getElementById("pdf-canvas");
      const context = canvas.getContext("2d");

      canvas.height = viewport.height - 400;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    }
  };

  useEffect(() => {
    renderPage(currentPage);
  }, [pdf, currentPage]);

  return (
    <div className="w-screen bg-black">
      <canvas className="mx-auto" id="pdf-canvas"></canvas>
      <div className="bg-white flex justify-center space-x-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous Page
        </button>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
