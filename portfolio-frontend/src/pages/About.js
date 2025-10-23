import React from "react";

export default function About({ language }) {
  return (
    <div className="about-container">
      <h1>{language === "en" ? "About Me" : "Om mig"}</h1>

      <p>
        {language === "en" ? (
          <>
            Hi! I'm <strong>Rene Hinrichsen</strong>, a data technician apprentice
            specializing in programming, currently studying at{" "}
            <strong>Syddansk Erhvervsskole (SDE)</strong> in Odense. I'm passionate
            about everything related to software development — especially{" "}
            <strong>C#, Python,</strong> and <strong>SQL</strong>.
          </>
        ) : (
          <>
            Hej! Jeg hedder <strong>Rene Hinrichsen</strong>, og jeg er
            datatekniker-elev med speciale i programmering på{" "}
            <strong>Syddansk Erhvervsskole (SDE)</strong> i Odense. Jeg brænder for
            softwareudvikling — især <strong>C#, Python</strong> og{" "}
            <strong>SQL</strong>.
          </>
        )}
      </p>

      <p>
        {language === "en" ? (
          <>
            I grew up in <strong>Greenland</strong> and moved to Denmark to pursue my
            education in IT. Before my current studies, I attended{" "}
            <strong>UCL Odense</strong> and completed three semesters of the
            Datamatiker program, where I learned about C#, system development, and
            network fundamentals.
          </>
        ) : (
          <>
            Jeg er opvokset i <strong>Grønland</strong> og flyttede til Danmark for at
            uddanne mig inden for IT. Før min nuværende uddannelse gik jeg på{" "}
            <strong>UCL Odense</strong> og gennemførte tre semestre på
            Datamatiker-uddannelsen, hvor jeg lærte om C#, systemudvikling og
            netværk.
          </>
        )}
      </p>

      <p>
        {language === "en" ? (
          <>
            When I'm not coding, you'll often find me gaming online with friends,
            exploring new technologies, or spending time with my family. I like taking
            on challenges, solving problems efficiently, and collaborating as part of
            a team.
          </>
        ) : (
          <>
            Når jeg ikke koder, kan jeg godt lide at game med venner, udforske nye
            teknologier og bruge tid sammen med familien. Jeg kan lide at tage nye
            udfordringer, finde effektive løsninger og samarbejde i teams.
          </>
        )}
      </p>

      <p>
        {language === "en" ? (
          <>
            If you'd like to see my CV in PDF format, please feel free to{" "}
            <a
              href="http://localhost/portfolio-backend/uploads/CV_-_Rene_Hinrichsen_EN.pdf"
              download
            >
              download it here
            </a>
            .
          </>
        ) : (
          <>
            Hvis du gerne vil se mit CV i PDF-format, kan du{" "}
            <a
              href="http://localhost/portfolio-backend/uploads/CV_-_Rene_Hinrichsen_DA.pdf"
              download
            >
              download det her
            </a>
            .
          </>
        )}
      </p>

      {/* Line break */}
      <hr style={{ margin: "30px 0" }} />

      <div>
        <h2>
          {language === "en" ? "Contact Information" : "Kontaktinformation"}
        </h2>
        <p>
          <strong>{language === "en" ? "Email:" : "E-mail:"}</strong>
        </p>
      </div>
    </div>
  );
}
