import React, { useRef } from "react";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
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

  const downloadPDF = async () => {
    const el = resumeRef.current;
    if (!el) return;

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
    const ratio = Math.min(
      pageWidth / (imgProps.width / 2),
      pageHeight / (imgProps.height / 2)
    );
    const imgW = (imgProps.width / 2) * ratio;
    const imgH = (imgProps.height / 2) * ratio;
    const x = (pageWidth - imgW) / 2;
    const y = (pageHeight - imgH) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgW, imgH);
    pdf.save("Krishnendu_Sarkar_Resume.pdf");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-3 md:px-0 flex items-center justify-between mb-4">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 rounded-2xl bg-teal-700 text-white text-sm font-semibold shadow hover:bg-teal-800 active:scale-[0.99]"
        >
          Download PDF
        </button>
      </div>

      {/* A4 Canvas */}
      <div className="max-w-4xl mx-auto shadow-xl">
        <div
          ref={resumeRef}
          className="bg-white mx-auto w-full md:w-[794px] min-h-[1123px]"
        >
          {/* Top header bar */}
          <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4 border-b">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-900 text-center md:text-left">
                  KRISHNENDU SARKAR
                </div>
                <div className="uppercase tracking-widest text-gray-600 text-xs md:text-sm font-semibold mt-1 text-center md:text-left">
                  FRESHER
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Column */}
            <div className="md:col-span-4 border-b md:border-r md:border-b-0 px-4 md:px-8 pt-6 pb-6 md:pb-10">
              <SectionTitle>CONTACT</SectionTitle>
              <div className="space-y-2 text-[12px] break-words">
                <div className="flex items-start gap-2">
                  <Phone size={14} className="mt-0.5" />
                  <a href="tel:+916290421047" className="hover:underline">
                    +91 7439020104
                  </a>
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Mail size={14} className="mt-0.5" />
                  <a
                    href="mailto:adas34105@gmail.com"
                    className="hover:underline"
                  >
                    krishnendu.sarkar.work@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5" />
                  <span>
                    Vill.+P.O.- Manushpur
                    <br />
                    Dist : Hooghly <br />
                    Near Katabattala More <br />
                    Bandel,Hooghly-712123
                  </span>
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Globe size={14} className="mt-0.5" />
                  <a
                    href="https://www.linkedin.com/in/krishnendu-sarkar-087bba257/"
                    className="hover:underline"
                  >
                    linkedin.com/in/krishnendu-sarkar-087bba257
                  </a>
                </div>
                <div className="flex items-start gap-2 break-all">
                  <Globe size={14} className="mt-0.5" />
                  <a
                    href="https://github.com/Krishnendu1910"
                    className="hover:underline"
                  >
                    github.com/Krishnendu1910
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
                <Bullet>UI/UX DESIGN</Bullet>
              </ul>

              <SectionTitle>TOOLS</SectionTitle>
              <p className="text-[12px]">FIGMA | SPLINE | VS CODE</p>

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
                <Bullet>Learning frontend tech stack.</Bullet>
              </ul>

              <SectionTitle>STRENGTHS</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Fast learner | Problem-Solving | Soft Skills</Bullet>
              </ul>
            </div>

            {/* Right Column */}
            <div className="md:col-span-8 px-4 md:px-8 pt-6 pb-6 md:pb-10">
              <SectionTitle>PROFILE</SectionTitle>
              <p className="text-[12px] leading-relaxed">
                Detail-oriented and solutions-driven Computer Science & Engineering graduate (B.Tech, 2025) with strong expertise in frontend web development and modern frameworks. Proficient in JavaScript, React.js, Node.js, Express.js,  with a solid foundation in data structures, algorithms, and object-oriented programming. Experienced in building responsive and scalable web applications. Known for strong problem-solving abilities, collaboration in team projects, and a passion for writing clean, maintainable code. Seeking to contribute technical skills and creativity in a dynamic software development role.
              </p>

              <SectionTitle>EDUCATION</SectionTitle>
              <div className="space-y-4">
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
              </div>

              <SectionTitle>PROJECTS</SectionTitle>
              <ul className="space-y-2">
                <Bullet>
                  BEYONDMEET - An interactive 3D meeting platform. <br />
                  <span className="block mt-1">Tech Stack :</span>
                  <ul className="list-disc list-inside text-[11px] md:text-[12px] pl-2">
                    <li>NextJs</li>
                    <li>Clerk</li>
                    <li>Steam</li>
                    <li>Three Js</li>
                  </ul>
                </Bullet>
              </ul>

              <SectionTitle>CERTIFICATION</SectionTitle>
              <ul className="space-y-2">
                <Bullet>The Complete 2024 Web development Bootcamp – Udemy.</Bullet>
                <Bullet>100 Days of Code : Complete Python Pro Bootcamp – Udemy.</Bullet>
                <Bullet>Learn CSS - For Beginners – Udemy.</Bullet>
                <Bullet>Learn JavaScript - For Beginners – Udemy.</Bullet>
                <Bullet>Photography Masterclass – Udemy.</Bullet>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="max-w-4xl mx-auto text-[11px] md:text-[12px] text-gray-500 mt-4 px-3 md:px-0 text-center md:text-left">
        Tip: Click the Download button above to save as a high-quality A4 PDF.
      </p>
    </div>
  );
}
