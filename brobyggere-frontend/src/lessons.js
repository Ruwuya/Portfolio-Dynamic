const lines = (output) => output.split("\n").map((l) => l.trim()).filter((l) => l !== "");

export const modules = [
    {
        id: 0,
        title: "Hvad er kode?",
        minutes: 15,
        bonus: false,
        tasks: [
            {
                id: "0.1",
                title: "Dit første program",
                text: "Kode er en opskrift til computeren. print() viser tekst på skærmen. Tryk på Kør og se, hvad der sker.",
                starter: 'print("Hello World!")',
                solution: 'print("Hello World!")',
                goodToKnow: 'Tekst skal stå mellem anførselstegn: "Hej" eller \'Hej\', anbefaler at bruge dobbelte anførselstegn: "Hej" -- bare de passer sammen. Parenteserne () hører til print().',
                hints: [
                    "Just press 'Kør' eedjit",
                    "Really? need more hints?"
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Du skal skrive noget kode, der udskriver tekst";
                    return true;
                }
            },
            {
                id: "0.2",
                title: "Skriv din egen text",
                text: "Du kan ændre teksten mellem anførselstegnene. Prøv at skrive dit eget navn i stedet for Hello World!",
                starter: 'print("Hello World!")',
                solution: 'print("Hej jeg hedder <NAME>")',
                goodToKnow: 'Du må ændre alt mellem anførselstegnene - Python viser det bare. Men  anførselstegnene og parenteserne skal blive stående.',
                hints: [
                    "Du skal kun ændre ordene mellem anførselstegnene.",
                    'Fx: print("Hej, jeg hedder Ali")',
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Du skal skrive noget kode, der udskriver tekst";
                    if (output.includes("Hello World!")) return 'Programmet skriver stadig "Hello World!". Ret teksten mellem anførselstegnene.';
                    return true;
                }
            },
            {
                id: "0.3",
                title: "Flere linjer",
                text: "Du kan skrive flere linjer kode. Python kører dem én ad gangen, oppefra og ned. Skriv tre linjer om dig selv: dit navn, din alder og din by. Tryk Kør og se, hvad der sker.",
                starter: '# Skriv tre linjer om dig selv herunder\n',
                solution: 'print("Hej jeg hedder <NAME>")\nprint("Jeg er X år gammel")\nprint("Jeg bor i <CITY>")',
                goodToKnow: 'Linjer der starter med # er kommentarer. Python springer dem over - de er beskeder til mennesker, der læser koden',
                hints: [
                    "Husk at skrive én print() per linje.",
                    "Du skal skrive tre linjer med print() funktionen.",
                ],
                check: (output) => {
                    const count = lines(output).length;
                    if (count < 3) return `Programmet skriver ${count} linje(r). Der skal være mindst 3 - én print( ) pr. linje.`;
                    return true;
                }
            },
            {
                id: "0.4",
                title: "Variabler",
                text: 'Kode kan huske ting. En variabel er en kasse med et navn på, hvor du kan gemme noget. I koden herunder hedder kassen name, og tegnet = betyder "gem i". Så name = "Hello World!" gemmer teksten "Hello World!" i kassen name. Når vi skriver print(name) uden anførselstegn, viser Python det der ligger i kassen. Tryk Kør. Ret så "Hello World!" til dit eget navn, og kør igen.',
                starter: '# name er en variabel - en kasse, hvor vi gemmer en tekst\nname = "Hello World!"\n\nprint("Hej")\nprint(name)  # uden anførselstegn: vis det, der ligger i kassen\nprint("Velkommen til kurset")\nprint(name)',
                solution: '# name er en variabel - en kasse, hvor vi gemmer en tekst\nname = "Ali"\n\nprint("Hej")\nprint(name)  # uden anførselstegn: vis det, der ligger i kassen\nprint("Velkommen til kurset")\nprint(name)',
                goodToKnow: 'Variablen name bliver brugt to gange, men du rettede kun ét sted. Det er det smarte ved variabler: ændrer du indholdet i kassen, ændres alt, der bruger den. Prøv at skrive print("name") med anførselstegn. Så viser Python bare ordet name, fordi det nu er tekst og ikke kassen.',
                hints: [
                    'Find linjen, hvor kassen name får sit indhold: name = "Hello World!"',
                    'Ret kun teksten mellem anførselstegnene i den linje, fx name = "Ali". De andre linjer skal ikke ændres.',
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Der kom ikke noget ud. Har du slettet print-linjerne?";
                    if (output.includes("Hello World!")) return 'Programmet skriver stadig "Hello World!". Ret teksten i linjen name = "Hello World!" til dit eget navn.';
                    return true;
                },
            },
        ],
    },
];

// All tasks in one flat list – for Forrige/Næste
export const allTasks = modules.flatMap((module) => module.tasks);
