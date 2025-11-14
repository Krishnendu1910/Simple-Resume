import React, { useRef, useState } from "react";
import { Phone, Mail, MapPin, Linkedin, Github } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const SectionTitle = ({ children }) => (
  <h2 className="tracking-widest text-teal-700 font-extrabold text-sm md:text-base mt-6 mb-3">
    {children}
  </h2>
);

const Bullet = ({ children }) => (
  <li className="relative pl-4 leading-relaxed text-[11px] md:text-[12px]">
    <span className="absolute left-0 top-[8px] h-1.5 w-1.5 rounded-full bg-gray-700" />
    {children}
  </li>
);

export default function Resume() {
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    type: "info", // 'info' | 'success' | 'error'
    message: "",
  });

  const showToast = (type, message, duration = 3000) => {
    setToast({ visible: true, type, message });
    // auto-hide
    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, duration);
  };

  const downloadPDF = async () => {
    const el = resumeRef.current;
    if (!el) return;

    try {
      setIsDownloading(true);
      showToast("info", "Preparing PDF…");

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = { width: canvas.width, height: canvas.height };
      // keep the math consistent with your previous approach
      const ratio = Math.min(
        pageWidth / (imgProps.width / 2),
        pageHeight / (imgProps.height / 2)
      );
      const imgW = (imgProps.width / 2) * ratio;
      const imgH = (imgProps.height / 2) * ratio;
      const x = (pageWidth - imgW) / 2;
      const y = (pageHeight - imgH) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgW, imgH);

      // prompt download
      pdf.save("Krishnendu_Sarkar_Resume.pdf");

      showToast("success", "Download ready — check your browser's downloads.");
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong while generating the PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 md:py-10">
      {/* Header with CTA */}
      <div className="max-w-4xl mx-auto px-3 md:px-0 flex items-center justify-between mb-4">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          aria-disabled={isDownloading}
          className={`px-4 py-2 rounded-2xl bg-teal-700 text-white text-sm font-semibold shadow hover:bg-teal-800 active:scale-[0.99] flex items-center gap-2 ${
            isDownloading ? "opacity-80 cursor-wait" : ""
          }`}
        >
          {isDownloading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                />
              </svg>
              Downloading...
            </>
          ) : (
            "Download PDF"
          )}
        </button>
      </div>

      {/* A4 Canvas */}
      <div className="max-w-4xl mx-auto shadow-xl">
        <div
          ref={resumeRef}
          className="bg-white mx-auto w-full md:w-[794px] min-h-[1123px] rounded-md border border-gray-200 overflow-hidden"
        >
          {/* Top header bar */}
          <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4 border-b">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <div>
                <div className="flex items-center gap-3">
                  {/* small teal accent */}
                  <div className="h-10 w-1.5 bg-teal-600 rounded" />
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-900 text-center md:text-left">
                      KRISHNENDU SARKAR
                    </div>
                    <div className="uppercase tracking-widest text-gray-600 text-xs md:text-sm font-semibold mt-1 text-center md:text-left">
                      BACKEND DEVELOPER 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Column */}
            <div className="md:col-span-4 border-b md:border-r md:border-b-0 px-4 md:px-8 pt-6 pb-6 md:pb-10 bg-gray-50">
              <SectionTitle>CONTACT</SectionTitle>
              <div className="space-y-2 text-[12px] break-words">
                <div className="flex items-start gap-2">
                  <Phone size={14} className="mt-0.5 text-gray-700" />
                  <a href="tel:+916290421047" className="hover:underline text-gray-800">
                    +91 7439020104
                  </a>
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Mail size={14} className="mt-0.5 text-gray-700" />
                  <a
                    href="mailto:krishnendu.sarkar.work@gmail.com"
                    className="hover:underline text-gray-800"
                  >
                    MAIL
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 text-gray-700" />
                  <span className="text-gray-800 text-[12px]">
                    Vill.+P.O.- Manushpur
                    <br />
                    Dist : Hooghly <br />
                    Near Katabattala More <br />
                    Bandel,Hooghly-712123
                  </span>
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Linkedin size={14} className="mt-0.5 text-gray-700" />
                  <a
                    href="https://www.linkedin.com/in/krishnendu-sarkar-087bba257/"
                    className="hover:underline text-gray-800"
                  >
                    LinkedIN
                  </a>
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Github size={14} className="mt-0.5 text-gray-700" />
                  <a
                    href="https://github.com/Krishnendu1910"
                    className="hover:underline text-gray-800"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <SectionTitle>SKILLS</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Data Structures and Algorithm</Bullet>
                <Bullet>HTML5 & CSS</Bullet>
                <Bullet>JAVASCRIPT</Bullet>
                <Bullet>REACT JS</Bullet>
                <Bullet>C++</Bullet>
                <Bullet>NEXT JS</Bullet>
                <Bullet>NODE JS</Bullet>
                <Bullet>EXPRESS JS</Bullet>
                <Bullet>MONGODB</Bullet>
                <Bullet>SQL</Bullet>
              </ul>

              <SectionTitle>LANGUAGES</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Bengali (Native)</Bullet>
                <Bullet>English (Professional)</Bullet>
                <Bullet>Hindi (Professional)</Bullet>
              </ul>

              <SectionTitle>HOBBIES</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Playing Mobile Games.</Bullet>
                <Bullet>Exploring UI/UX tools and learning new things.</Bullet>
                <Bullet>Learning New Technologies.</Bullet>
              </ul>

              <SectionTitle>STRENGTHS</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Fast learner | Problem-Solving | Soft Skills | Team-oriented</Bullet>
              </ul>
            </div>

            {/* Right Column */}
            <div className="md:col-span-8 px-4 md:px-8 pt-6 pb-6 md:pb-10">
              <SectionTitle>PROFILE</SectionTitle>
              <p className="text-[12px] leading-relaxed text-gray-800">
                Detail-oriented and solutions-driven Computer Science & Engineering graduate (B.Tech, 2025) with strong expertise in web development and modern frameworks. Proficient in Backend development viz NextJS, MongoDB, SQL, JavaScript,Node.js, Express.js,  with a solid foundation in data structures, algorithms, and object-oriented programming. Experienced in building responsive and scalable web applications. Known for strong problem-solving abilities, collaboration in team projects, and a passion for writing clean, maintainable code. Seeking to contribute technical skills and creativity in a dynamic software development role.
              </p>

              <SectionTitle>EDUCATION</SectionTitle>
              <div className="space-y-4">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-[13px]">
                      Techno International Newtown
                    </div>
                    <div className="text-[12px] text-gray-600">
                      Aug 2022 - Jun 2025
                    </div>
                  </div>
                  <ul className="space-y-1 mt-1">
                    <li className="text-[12px]">
                      B.Tech In Computer Science & Engineering
                    </li>
                    <li className="text-[12px]">Percentage - 75.7</li>
                  </ul>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-[13px]">
                      West Bengal Survey Institute
                    </div>
                    <div className="text-[12px] text-gray-600">
                      Jul 2018 - Sept 2020
                    </div>
                  </div>
                  <ul className="space-y-1 mt-1">
                    <li className="text-[12px]">Diploma In Survey Engineering</li>
                    <li className="text-[12px]">Percentage - 81.7</li>
                  </ul>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-[13px]">
                      Elite Co-ed(H.S.)
                    </div>
                    <div className="text-[12px] text-gray-600">
                      Jun 2017 - May 2018
                    </div>
                  </div>
                  <ul className="space-y-1 mt-1">
                    <li className="text-[12px]">Science(Computer)</li>
                    <li className="text-[12px]">Percentage - 67.2</li>
                  </ul>
                </div>
                
              </div>

              <SectionTitle>PROJECTS</SectionTitle>
              <ul className="space-y-2">
                <Bullet>
                  BEYONDMEET - An interactive 3D meeting platform. <br />
                  <span className="block mt-1">Tech Stack :</span>
                  <ul className="list-disc list-inside text-[11px] md:text-[12px] pl-2">
                    <li>NextJs - Used for SSR,API routes ,static site generations.</li>
                    <li>Clerk - Used for secure Authentication, authorization & session management. </li>
                    <li>Steam - Used for real time audio, video & chat features.</li>
                    <li>Three Js - Used to render immersive 3D environments & characters.</li>
                  </ul>
                </Bullet>
                <Bullet>
                  University Library Management System - An immersive online Library platform.  <br />
                  <span className="block mt-1">Tech Stack :</span>
                  <ul className="list-disc list-inside text-[11px] md:text-[12px] pl-2">
                    <li>PostgreSQL - Primary relational database for storing & managing library data securely.</li>
                    <li>Upstash - Serverless Data platform for low-latency and high scalability.</li>
                    <li>ImageKit - Provides images & videos with one real time API.</li>
                    <li>NextJs - Used for SSR,API routes ,static site generations.</li>
                    <li>Typescript - Used to add strong typing for safer & error-free code.</li>
                    <li>Resend - Transform email for developers.</li>
                    <li>Tailwind CSS - Used to design fast, responsive & consistent UI.</li>
                  </ul>
                </Bullet>
                <Bullet>
                  Learning Management System - Take your learning to next Level <br />
                  <span className="block mt-1">Tech Stack :</span>
                  <ul className="list-disc list-inside text-[11px] md:text-[12px] pl-2">
                    <li>Clerk - Used for enrollment management & secure access control.</li>
                    <li>Sentry - Automatically detects & notifies critical performance issues.</li>
                    <li>Shadcn/Ui - Used to build clean, modern & accessible ready-made components.</li>
                    <li>NextJs - Used for SSR,API routes ,static site generations.</li>
                    <li>Supabase - Used as the backend DB & storage system with real time capabilities..</li>
                    <li>Tailwind CSS - Utility first CSS framework for modern websites.</li>
                    <li>Vapi - Used to deploy Al voice / chat features..</li>
                    <li>Zod - Used to validate API inputs & form data to ensure type-safe, error- free logic.</li>
                  </ul>
                </Bullet>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="max-w-4xl mx-auto text-[11px] md:text-[12px] text-gray-500 mt-4 px-3 md:px-0 text-center md:text-left">
        Tip: Click the Download button above to save as a high-quality A4 PDF.
      </p>

      {/* Toast / Notification */}
      {/* aria-live for screen readers */}
      <div
        aria-live="polite"
        className="fixed right-4 bottom-4 z-50 flex items-end"
      >
        {toast.visible && (
          <div
            role="status"
            className={`max-w-sm w-full rounded-md p-3 shadow-lg ring-1 ring-black/5 transform transition-all duration-200 ${
              toast.type === "info"
                ? "bg-white text-gray-800"
                : toast.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {toast.type === "success" ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172l-2.293-2.293A1 1 0 003.293 11.293l3 3a1 1 0 001.414 0l9-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : toast.type === "error" ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59A1.75 1.75 0 0116.518 17H3.482a1.75 1.75 0 01-1.742-2.311L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v5a1 1 0 001.993.117L11 11V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2h-5l-4 4v-4H4a2 2 0 01-2-2V5z" />
                  </svg>
                )}
              </div>

              <div className="flex-1">
                <div className="text-sm font-medium">{toast.message}</div>
              </div>

              <button
                onClick={() => setToast((t) => ({ ...t, visible: false }))}
                className="text-xs ml-2 self-start opacity-70 hover:opacity-100"
                aria-label="dismiss"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
