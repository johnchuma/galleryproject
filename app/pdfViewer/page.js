"use client";
import { useEffect, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";

// Set the worker source
GlobalWorkerOptions.workerSrc = "";

const PDFViewer = () => {
  const url = "http://localhost:50/files/sample-pdf.pdf";
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = getDocument({
          url,
        });
        const loadedPdf = await loadingTask.promise;
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

      canvas.height = viewport.height;
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
    <div className="w-screen bg-black py-5">
      <canvas className="mx-auto" id="pdf-canvas"></canvas>
      <div className=" flex justify-center space-x-4 my-4">
        <button
          className="bg-primaryColor text-white p-4 cursor-pointer"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous Page
        </button>
        <button
          className="bg-primaryColor text-white p-4 cursor-pointer"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
