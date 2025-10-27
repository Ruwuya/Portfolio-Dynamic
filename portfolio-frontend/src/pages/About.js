import React from 'react';

export default function About({ language }) {
  return (
    <div className="about-container">
      <h1>{language === 'en' ? 'About Me' : 'Om mig'}</h1>

      <div className="about-card">
        <p>
          {language === 'en' ? (
            <>
              Hi! I'm <strong>Rene Hinrichsen</strong>, a data technician apprentice
              specializing in programming, currently studying at{' '}
              <strong>Syddansk Erhvervsskole (SDE)</strong> in Odense. I'm passionate
              about everything related to software development — especially{' '}
              <strong>C#, Python,</strong> and <strong>SQL</strong>.
            </>
          ) : (
            <>
              Hej! Jeg hedder <strong>Rene Hinrichsen</strong>, og jeg er
              datatekniker-elev med speciale i programmering på{' '}
              <strong>Syddansk Erhvervsskole (SDE)</strong> i Odense. Jeg brænder for
              softwareudvikling — især <strong>C#, Python</strong> og{' '}
              <strong>SQL</strong>.
            </>
          )}
        </p>

        <p>
          {language === 'en' ? (
            <>
              I grew up in <strong>Greenland</strong> and moved to Denmark to pursue my
              education in IT. Before my current studies, I attended{' '}
              <strong>UCL Odense</strong> and completed three semesters of the
              Datamatiker program, where I learned about C#, system development, and
              network fundamentals.
            </>
          ) : (
            <>
              Jeg er opvokset i <strong>Grønland</strong> og flyttede til Danmark for at
              uddanne mig inden for IT. Før min nuværende uddannelse gik jeg på{' '}
              <strong>UCL Odense</strong> og gennemførte tre semestre på
              Datamatiker-uddannelsen, hvor jeg lærte om C#, systemudvikling og
              netværk.
            </>
          )}
        </p>

        <p>
          {language === 'en' ? (
            <>
              When I'm not coding, you'll often find me gaming online with friends,
              exploring new technologies, or spending time with my family. I like
              taking on challenges, solving problems efficiently, and collaborating
              as part of a team.
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
          {language === 'en' ? (
            <>
              If you'd like to see my CV in PDF format, please feel free to{' '}
              <a href="http://localhost/portfolio-backend/uploads/CV_-_Rene_Hinrichsen_EN.pdf" download>download it here</a>
              .
            </>
          ) : (
            <>
              Hvis du gerne vil se mit CV i PDF-format, kan du{' '}
              <a href="http://localhost/portfolio-backend/uploads/CV_-_Rene_Hinrichsen_DA.pdf" download>downloade det her</a>
              .
            </>
          )}
        </p>
      </div>

      <div className="about-card">
        <div>
          <h2>
            {language === 'en' ? 'Contact Information' : 'Kontaktinformation'}
          </h2>
          <p>
            <strong>{language === 'en' ? 'Email:' : 'E-mail:'}</strong>{' '}
            <em>renehinrichsen@outlook.com</em>
          </p>
          <p>
          <strong>GitHub:</strong>{' '}
          <a href="https://github.com/Ruwuya" target="_blank" rel="noreferrer">github.com/Ruwuya</a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/rene-hinrichsen/" target="_blank" rel="noreferrer">linkedin.com/in/rene-hinrichsen</a>
        </p>
        </div>
      </div>
        {/* Grades / Education Results */}
        <div className="grades-section">
          <h2>{language === "en" ? "Grades Overview" : "Karakteroversigt"}</h2>

          <table className="grades-table">
            <thead>
              <tr>
                <th>{language === "en" ? "Subject & Level" : "Fag og Niveau"}</th>
                <th>{language === "en" ? "Grade" : "Standpunktskarakter"}</th>
                <th>{language === "en" ? "Exam Grade" : "Prøvekarakter"}</th>
                <th>{language === "en" ? "Notes" : "Særlige Oplysninger"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{language === "en" ? "Client-side Programming, Advanced" : "Clientsideprogrammering, Avanceret"}</td>
                <td>12 (A)</td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>{language === "en" ? "Core Applications, Intermediate" : "Core Applications, Rutineret"}</td>
                <td>{language === "en" ? "Passed" : "Bestået"}</td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>{language === "en" ? "Database Programming, Advanced" : "Databaseprogrammering, Avanceret"}</td>
                <td>12 (A)</td>
                <td>-</td>
                <td>{language === "en" ? "Partial grade" : "Delkarakter"}</td>
              </tr>
              <tr>
                <td>{language === "en" ? "Fundamental Programming, Advanced" : "Grundlæggende programmering, Avanceret"}</td>
                <td>12 (A)</td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>{language === "en" ? "Object-Oriented Programming, Advanced" : "Objektorienteret programmering, Avanceret"}</td>
                <td>12 (A)</td>
                <td>-</td>
                <td>{language === "en" ? "Partial grade" : "Delkarakter"}</td>
              </tr>
              <tr>
                <td>{language === "en" ? "Programming Methodology, Advanced" : "Programmeringsmetodik, Avanceret"}</td>
                <td>12 (A)</td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>{language === "en" ? "Server Technology - Database Server, Advanced" : "Serverteknologi - Databaseserver, Avanceret"}</td>
                <td>12 (A)</td>
                <td>-</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}