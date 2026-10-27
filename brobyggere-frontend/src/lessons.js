const lines = (output) => output.split("\n").map((l) => l.trim()).filter((l) => l !== "");

// Finds e.g. "count =+ 1" or "count =- 1", where the signs are swapped round.
// Python doesn't give an error - it just reads it as count = +1 - so we have to catch it ourselves.
// Gives a message with the student's own variable name, or null if everything is fine.
function swappedSigns(code) {
    const match = code.match(/([\p{L}_][\p{L}\p{N}_]*)\s*=([+-])/u);
    if (!match) return null;
    const [, name, sign] = match;
    return `Du har skrevet ${name} =${sign}. Det skal være ${name} ${sign}= (${sign === "+" ? "plus" : "minus"} først, så lighedstegn).`;
}

// Runs the code with the given answers to input() and checks what it prints.
// Gives a message if something is wrong, or null if everything is fine.
// endsWith (optional): the last line must end with this, e.g. the secret number.
async function expectOutput(run, code, inputs, { when, shows, notShows = [], endsWith }) {
    const When = when[0].toUpperCase() + when.slice(1);
    const result = await run(code, inputs);
    if (result.error || result.timeout) return `Programmet giver en fejl, ${when}.`;
    if (!result.output.includes(shows)) return `${When}, skal programmet skrive noget med "${shows}".`;
    for (const word of notShows) {
        if (result.output.includes(word)) return `${When}, må programmet ikke skrive "${word}".`;
    }
    if (endsWith && !(lines(result.output).at(-1) || "").endsWith(endsWith)) return `${When}, skal programmet også vise tallet til sidst.`;
    return null;
}

export const modules = [
    {
        id: 1,
        title: "Hvad er kode?",
        minutes: 15,
        bonus: false,
        tasks: [
            {
                id: "1.1",
                title: "Dit første program",
                text: "Kode er en opskrift til computeren. print() viser tekst på skærmen. Tryk på Kør og se, hvad der sker.",
                starter: 'print("Hello World!")',
                solution: 'print("Hello World!")',
                goodToKnow: 'Tekst skal stå mellem anførselstegn. Både "Hej" og \'Hej\' virker, bare de passer sammen. Vi bruger " i dette kursus. Parenteserne () hører til print().',
                hints: [
                    "Find knappen Kør under kodefeltet, og klik på den.",
                    "Du skal ikke ændre noget i koden - bare tryk Kør."
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Du skal skrive noget kode, der udskriver tekst";
                    return true;
                }
            },
            {
                id: "1.2",
                title: "Skriv din egen tekst",
                text: "Du kan ændre teksten mellem anførselstegnene. Prøv at skrive dit eget navn i stedet for Hello World!",
                starter: 'print("Hello World!")',
                solution: 'print("Hej, jeg hedder Ali")',
                goodToKnow: 'Du må ændre alt mellem anførselstegnene - Python viser det bare. Men anførselstegnene og parenteserne skal blive stående.',
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
                id: "1.3",
                title: "Flere linjer",
                text: 'Du kan skrive flere linjer kode. Python kører dem én ad gangen, oppefra og ned. Skriv tre linjer om dig selv: dit navn, din alder og din by. Hver linje skal være en print() med teksten i anførselstegn - ligesom i 1.2. Tryk Kør og se, hvad der sker.',
                starter: '# Skriv tre linjer om dig selv herunder - én print() på hver linje, fx:\n# print("Hej, jeg hedder Ali")\n\n',
                solution: 'print("Hej, jeg hedder Ali")\nprint("Jeg er 15 år gammel")\nprint("Jeg bor i Odense")',
                goodToKnow: 'Linjer der starter med # er kommentarer. Python springer dem over - de er beskeder til mennesker, der læser koden',
                hints: [
                    'Hver linje skal starte med print( og slutte med ). Teksten skal stå i anførselstegn: print("Jeg bor i Odense")',
                    'Skriv tre linjer under hinanden: print("Hej, jeg hedder Ali"), print("Jeg er 15 år gammel") og print("Jeg bor i Odense") - med dine egne oplysninger.',
                ],
                check: (output) => {
                    const count = lines(output).length;
                    if (count < 3) return `Programmet skriver ${count} linje(r). Der skal være mindst 3 - én print( ) pr. linje.`;
                    return true;
                }
            },
            {
                id: "1.4",
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
            {
                id: "1.5",
                type: "quiz",
                title: "Quiz",
                questions: [
                    {
                        question: "Hvad udskriver denne kode?",
                        code: 'print("Hej")\n# print("med dig")\nprint("Python")',
                        options: [
                            { text: "Hej, med dig, Python", why: "Linjen med # er en kommentar, så den bliver ikke kørt, Python springer den over" },
                            { text: "Hej og Python", correct: true, why: "Linjen med # er en kommentar, så den bliver ikke kørt, Python springer den over" },
                            { text: "Kun Hej", why: "Python kører alle linjer oppefra og ned, ikke kun den første." }
                        ]
                    },
                    {
                        question: "Hvad er en variabel?",
                        code: 'age = 18\nprint(age)',
                        options: [
                            { text: "En kasse med et navn på, hvor man kan gemme noget", correct: true, why: "age = 18 gemmer tallet 18 i kassen der hedder age. Når vi udskriver print(age), viser Python det, der ligger i kassen." },
                            { text: "Et regnestykke, der siger, at age er lig med 18", why: 'I Python betyder = "gem i",  ikke "er lig med" som i matematik. age = 18 gemmer 18 i kassen age.' },
                            { text: "En besked, som Python viser på skærmen", why: "Det er print(), der viser noget på skærmen. Variablen gemmer bare værdien, så du kan bruge den." },

                        ]
                    }
                ]
            }
        ],
    },
    {
        id: 2,
        title: "Variabler",
        minutes: 12,
        bonus: false,
        tasks: [
            {
                id: "2.1",
                title: "Lav din egen variabel",
                text: 'I 1.4 rettede du en variabel, der allerede fandtes. Nu skal du selv lave en fra bunden. Skriv name = og dit navn i anførselstegn på den første tomme linje. Udskriv den så med print(name) på linjen under.',
                starter: '# Lav en variabel, der hedder name, med dit navn\n\n# Udskriv variablen\n',
                solution: '# Lav en variabel, der hedder name, med dit navn\nname = "Ali"\n# Udskriv variablen\nprint(name)',
                goodToKnow: 'Tegnet = gemmer det, der står til højre, i variablen til venstre. Variablen står altid til venstre: name = "Ali" virker, men "Ali" = name giver en fejl.',
                hints: [
                    'Første linje: name = "Ali" (med dit eget navn).',
                    'Linjen under: print(name) - uden anførselstegn om name.',
                ],
                check: (output, code) => {
                    if (lines(output).length === 0) return "Der kom ikke noget ud. Husk at udskrive variablen med print(name).";
                    if (lines(output).includes("name")) return 'Programmet skriver ordet "name". Du har anførselstegn om name i print(), så Python viser bare ordet. Skriv print(name) uden anførselstegn.';
                    if (!/^\s*name\s*=/m.test(code)) return 'Lav variablen på en linje for sig: name = "dit navn"';
                    if (!/print\(\s*name\s*\)/.test(code)) return "Udskriv variablen med print(name).";
                    return true;
                },
            },
            {
                id: "2.2",
                title: "Gode variabelnavne",
                text: 'Et variabelnavn må kun have bogstaver, tal og _ (understreg). Det må ikke starte med et tal, og det må ikke have mellemrum eller bindestreg. Koden herunder har tre dårlige navne. Ret dem, så programmet virker - husk at rette dem i print-linjerne også.',
                starter: '2name = "Ali"\nmy city = "Odense"\nfavourite-food = "pizza"\n\nprint(2name)\nprint(my city)\nprint(favourite-food)',
                solution: 'name2 = "Ali"\nmy_city = "Odense"\nfavourite_food = "pizza"\n\nprint(name2)\nprint(my_city)\nprint(favourite_food)',
                goodToKnow: 'Brug _ i stedet for mellemrum og bindestreg: my_city. Store og små bogstaver er forskellige - Name og name er to forskellige variabler.',
                hints: [
                    'Python stopper ved den første fejl. Ret én linje ad gangen, og kør igen.',
                    'Gode navne er fx name2, my_city og favourite_food. Husk at bruge de samme navne i print-linjerne.',
                ],
                check: (output) => {
                    if (lines(output).length < 3) return "Programmet skal udskrive alle tre variabler. Har du slettet en print-linje?";
                    return true;
                },
            },
            {
                id: "2.3",
                title: "Tekst og tal",
                text: 'Variabler kan også gemme tal. Tekst skrives med anførselstegn, men tal skrives uden: age = 15. Ret koden, så den passer på dig: dit navn, din alder og din by.',
                starter: 'name = "Skriv dit navn"\nage = 0\ncity = "Skriv din by"\n\nprint(name)\nprint(age)\nprint(city)',
                solution: 'name = "Ali"\nage = 15\ncity = "Odense"\n\nprint(name)\nprint(age)\nprint(city)',
                goodToKnow: 'Tekst har anførselstegn: "Odense". Tal har ikke: 15. "15" med anførselstegn er tekst - det ligner et tal, men Python kan ikke regne med det. Det er præcis det, input() giver dig i modul 3.',
                hints: [
                    'Ret teksten mellem anførselstegnene i name og city, og skift 0 ud med din alder.',
                    'Alderen skal stå uden anførselstegn: age = 15',
                ],
                check: (output, code) => {
                    if (output.includes("Skriv dit navn")) return 'Ret "Skriv dit navn" til dit eget navn.';
                    if (output.includes("Skriv din by")) return 'Ret "Skriv din by" til din egen by.';
                    if (/^\s*age\s*=\s*["']/m.test(code)) return "age har anførselstegn om tallet, så Python gemmer det som tekst. Skriv tallet uden anførselstegn: age = 15";
                    if (/^\s*age\s*=\s*0\s*$/m.test(code)) return "Skift 0 ud med din alder.";
                    if (!/^\s*age\s*=\s*\d+/m.test(code)) return "Giv age din alder som et tal, fx age = 15.";
                    return true;
                },
            },
            {
                id: "2.4",
                title: "Datatyper: str og int",
                text: 'Python holder styr på, hvilken slags data der ligger i en variabel. Det kaldes datatypen. Tekst hedder str (kort for string), og hele tal hedder int (kort for integer). Med type() kan du spørge Python, hvilken datatype noget har. Kør koden og se. Lav så en variabel age_text = "15" med anførselstegn, og udskriv dens type.',
                starter: 'name = "Ali"\nage = 15\n\nprint(type(name))\nprint(type(age))\n\n# Lav age_text = "15" (med anførselstegn), og udskriv dens type\n',
                solution: 'name = "Ali"\nage = 15\n\nprint(type(name))\nprint(type(age))\n\n# Lav age_text = "15" (med anførselstegn), og udskriv dens type\nage_text = "15"\nprint(type(age_text))',
                goodToKnow: '15 og "15" ligner hinanden, men det er to forskellige datatyper: 15 er en int, og "15" er en str. Det er derfor, input() kan drille - den giver altid en str. Der findes også float, som er kommatal som 3.5. Den møder du i modul 4.',
                hints: [
                    'Skriv age_text = "15" på en ny linje - med anførselstegn om tallet.',
                    "Udskriv så typen med print(type(age_text)).",
                ],
                check: (output, code) => {
                    if (!/age_text\s*=\s*["']15["']/.test(code)) return 'Lav variablen age_text med "15" i anførselstegn.';
                    if (!/print\(\s*type\(\s*age_text\s*\)\s*\)/.test(code)) return "Udskriv typen med print(type(age_text)).";
                    const strCount = lines(output).filter((l) => l === "<class 'str'>").length;
                    if (strCount < 2) return "Programmet skal vise <class 'str'> for både name og age_text.";
                    return true;
                },
            },
            {
                id: "2.5",
                title: "En variabel kan skifte værdi",
                text: 'En variabel kan få en ny værdi senere i programmet. Udvid koden: giv number værdien 2, og udskriv den igen. Programmet skal skrive 17 og derefter 2.',
                starter: 'number = 17\nprint(number)\n\n# Giv number værdien 2, og udskriv den igen\n',
                solution: 'number = 17\nprint(number)\n\n# Giv number værdien 2, og udskriv den igen\nnumber = 2\nprint(number)',
                goodToKnow: 'En variabel kan kun gemme én ting ad gangen. Når du skriver number = 2, bliver 17 slettet og erstattet. Koden kører oppefra og ned, så den første print() nåede at vise 17, før værdien blev ændret.',
                hints: [
                    'Skriv number = 2 på en ny linje under kommentaren.',
                    'Skriv så print(number) igen på linjen under.',
                ],
                check: (output, code) => {
                    const out = lines(output);
                    if (out.length < 2) return "Programmet skal skrive to tal: først 17 og så 2.";
                    if (out[0] !== "17" || out.at(-1) !== "2") return "Det første tal skal være 17 og det sidste 2. Har du givet number værdien 2 efter den første print()?";
                    if ((code.match(/^\s*number\s*=/gm) || []).length < 2) return "Giv den samme variabel en ny værdi: number = 2. Brug print(number) - ikke print(2).";
                    return true;
                },
            },
            {
                id: "2.6",
                title: "Quiz",
                type: "quiz",
                questions: [
                    {
                        question: "Hvilket af disse variabelnavne er ulovligt?",
                        options: [
                            { text: "my_name", why: "my_name er lovligt: bogstaver og _ (understreg) er tilladt." },
                            { text: "2name", correct: true, why: "2name er ulovligt: et variabelnavn må ikke starte med et tal." },
                            { text: "name2", why: "name2 er lovligt: bogstaver og tal er tilladt, bare det ikke starter med et tal." },
                        ]
                    },
                    {
                        question: "Og nu omvendt: hvilket af disse variabelnavne er lovligt?",
                        options: [
                            { text: "my city", why: "my city er ulovligt: et variabelnavn må ikke have mellemrum." },
                            { text: "my-city", why: "my-city er ulovligt: et variabelnavn må ikke have bindestreg - Python tror, det er et minus." },
                            { text: "my_city", correct: true, why: "my_city er lovligt: brug _ (understreg) i stedet for mellemrum og bindestreg." },
                        ]
                    },
                    {
                        question: 'Hvilken datatype har variablen age = 15 ?',
                        options: [
                            { text: "str", why: "age = 15 er et helt tal, så det er en int (integer)." },
                            { text: "int", correct: true, why: "age = 15 er et helt tal, så det er en int (integer)." },
                            { text: "float", why: "age = 15 er et helt tal, så det er en int (integer), ikke en float (decimalt tal)." },
                        ]
                    }
                ]
            }
        ],
    },
    {
        id: 3,
        title: "Input",
        minutes: 15,
        bonus: false,
        tasks: [
            {
                id: "3.1",
                title: "Input",
                text: 'Python kan også spørge brugeren om noget. input() viser en besked og venter på, at brugeren skriver noget og trykker Enter. Det, brugeren skriver, gemmes i kassen name. Tryk Kør og skriv dit navn.',
                starter: '# input() spørger brugeren om noget\nname = input("Hvad hedder du? ")  # teksten mellem anførselstegnene vises som besked\nprint("Hej", name)',
                solution: '# input() spørger brugeren om noget\nname = input("Hvad hedder du? ")  # teksten mellem anførselstegnene vises som besked\nprint("Hej", name)',
                goodToKnow: 'input() giver altid tekst tilbage - også hvis man skriver et tal. Skriver brugeren 16, får du teksten "16" og ikke tallet 16. Det betyder noget, når du senere vil regne med svaret.',
                hints: [
                    "Tryk Kør og skriv dit navn i input-boksen. Tryk Enter, og se hvad der sker.",
                    "Du skal ikke ændre noget i koden - bare kør den og skriv dit navn.",
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Der kom ikke noget ud. Har du trykket Enter efter at have skrevet dit navn?";
                    if (!output.includes("Hej")) return 'Programmet skriver ikke "Hej". Har du slettet print-linjen?';
                    return true;
                }
            },
            {
                id: "3.2",
                title: "Sæt tekst sammen",
                text: 'Få programmet til at skrive Hej Ali! med dit eget navn - og uden mellemrum før udråbstegnet. Prøv først at tilføje "!" med et komma, og se hvad der sker. Brug så + i stedet for komma: + sætter tekst sammen præcis som den er, uden at sætte mellemrum ind.',
                starter: 'name = input("Hvad hedder du? ")\nprint("Hej", name)',
                solution: 'name = input("Hvad hedder du? ")\nprint("Hej " + name + "!")',
                goodToKnow: 'Komma i print() sætter selv et mellemrum ind mellem tingene. Med + bestemmer du selv, hvor der skal være mellemrum - derfor står der et mellemrum inde i "Hej ". Prøv at fjerne det og se, hvad der sker.',
                hints: [
                    'Byt kommaerne ud med +, og husk et mellemrum inde i anførselstegnene: "Hej "',
                    'Fx: print("Hej " + name + "!")',
                ],
                check: (output, code) => {
                    // The last line is the greeting - the first one is the input question and answer
                    const last = lines(output).at(-1) || "";
                    if (/\s!$/.test(last)) return "Der er et mellemrum før udråbstegnet. Det kommer fra kommaet - print() sætter selv mellemrum ind mellem tingene. Brug + i stedet.";
                    if (!last.endsWith("!")) return 'Husk udråbstegnet til sidst: + "!"';
                    if (/^Hej\S/.test(last)) return 'Der mangler et mellemrum efter "Hej". Skriv "Hej " med et mellemrum inden det sidste anførselstegn.';
                    if (!code.includes("+")) return "Brug + til at sætte teksten sammen.";
                    return true;
                },
            },
            {
                id: "3.3",
                title: "Input med tal",
                text: 'input() giver altid tekst tilbage. Hvis du vil regne med det, skal du lave det om til et tal med int(). Prøv at køre koden herunder og skriv dit fødselsår. Python regner så ud, hvor gammel du er.',
                starter: '# input() giver altid tekst tilbage - også tal\nbirth_year = input("Hvilket år blev du født? ")  # gemmer teksten i kassen birth_year\nage = 2026 - int(birth_year)  # lav teksten om til et tal med int()\nprint("Du er", age, "år gammel")',
                solution: '# input() giver altid tekst tilbage - også tal\nbirth_year = input("Hvilket år blev du født? ")  # gemmer teksten i kassen birth_year\nage = 2026 - int(birth_year)  # lav teksten om til et tal med int()\nprint("Du er", age, "år gammel")',
                goodToKnow: 'int() laver tekst om til et helt tal. Hvis du skriver 16 i input-boksen, får du teksten "16" tilbage. int("16") bliver til tallet 16.',
                hints: [
                    "Tryk Kør og skriv dit fødselsår i input-boksen. Tryk Enter, og se hvad der sker.",
                    "Du skal ikke ændre noget i koden - bare kør den og skriv dit fødselsår.",
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Der kom ikke noget ud. Har du trykket Enter efter at have skrevet dit fødselsår?";
                    if (!output.includes("Du er")) return 'Programmet skriver ikke "Du er". Har du slettet print-linjen?';
                    return true;
                }
            },
            {
                id: "3.4",
                title: "Tekst og tal sammen",
                text: 'Nu vil vi bruge + i stedet for komma. Men + kan kun sætte tekst sammen med tekst - og age er et tal. Kør koden, læs fejlen, og ret den med str(), som laver et tal om til tekst.',
                starter: 'birth_year = input("Hvilket år blev du født? ")\nage = 2026 - int(birth_year)\nprint("Du er " + age + " år gammel")',
                solution: 'birth_year = input("Hvilket år blev du født? ")\nage = 2026 - int(birth_year)\nprint("Du er " + str(age) + " år gammel")',
                goodToKnow: 'int() laver tekst om til et tal, så man kan regne med det. str() gør det modsatte: laver et tal om til tekst, så man kan sætte det sammen med anden tekst.',
                hints: [
                    "Fejlen sker, fordi age er et tal. Lav det om til tekst inde i print().",
                    'Skriv str(age) i stedet for age: "Du er " + str(age) + " år gammel"',
                ],
                check: (output, code) => {
                    if (!code.includes("str(")) return "Brug str() til at lave age om til tekst.";
                    if (!output.includes("Du er")) return 'Programmet skriver ikke "Du er". Har du slettet print-linjen?';
                    return true;
                },
            },
            {
                id: "3.5",
                title: "Quiz",
                type: "quiz",
                questions: [
                    {
                        question: "Brugeren skriver 15. Hvad udskriver programmet?",
                        code: 'age = input("Hvor gammel er du? ")\nprint(age + age)',
                        options: [
                            { text: "30", why: "Det ville ske med tallet 15. Men input() giver altid tekst - og + sætter tekst sammen." },
                            { text: "1515", correct: true, why: 'input() giver teksten "15", og "15" + "15" bliver til "1515". Skal du regne, skal du bruge int().' },
                            { text: "Fejl", why: "Det ville give en fejl med age + 1 (tekst + tal). Men her er begge dele tekst, så + sætter dem bare sammen." },
                        ],
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: 'print("Hej" + "med" + "dig")',
                        options: [
                            { text: "Hej med dig", why: "+ sætter tekst sammen præcis som den er - den sætter ikke selv mellemrum ind." },
                            { text: "Fejl", why: "Det er helt fint at sætte tekst sammen med +." },
                            { text: "Hejmeddig", correct: true, why: 'Uden mellemrum i teksterne bliver ordene klistret sammen. Skriv "Hej " med et mellemrum, hvis du vil have det.' },
                        ],
                    },

                ]
            }
        ],
    },
    {
        id: 4,
        title: "Tal og regning",
        minutes: 15,
        bonus: false,
        tasks: [
            {
                id: "4.1",
                title: "Python som lommeregner",
                text: 'Python kan regne. + er plus, - er minus, * er gange og / er divideret med. Skriv print() med regnestykket indeni, uden anførselstegn, ellers viser Python bare regnestykket som tekst. Udregn 13 + 14, 100 - 89, 7 * 6, 42 / 12.',
                starter: '# Udregn de fire regnestykker - et print() per linje.\n13 + 14\n100 - 89\n7 * 6\n42 / 12\n',
                solution: 'print(13 + 14)\nprint(100 - 89)\nprint(7 * 6)\nprint(42 / 12)',
                goodToKnow: 'Divider (/) giver altid et kommatal - også når det går op. Og Python bruger punktum i stedet for komma: 3.5, ikke 3,5.',
                hints: [
                    "Skriv et regnestykke inde i hver print(), fx print(13 + 14).",
                    "Gange er * (stjerne), og divider er / (skråstreg).",
                ],
                check: (output, code) => {
                    const out = lines(output);
                    if (out.length === 0) return "Der kom ikke noget ud. Python regner godt nok regnestykkerne ud, men du skal bruge print() for at vise resultatet.";
                    const sums = [
                        { re: /13\s*\+\s*14/, result: "27", text: "13 + 14" },
                        { re: /100\s*-\s*89/, result: "11", text: "100 - 89" },
                        { re: /7\s*\*\s*6/, result: "42", text: "7 * 6" },
                        { re: /42\s*\/\s*12/, result: "3.5", text: "42 / 12" },
                    ];
                    for (const sum of sums) {
                        if (!sum.re.test(code)) return `Lad Python regne ${sum.text} ud - skriv regnestykket inde i print().`;
                        if (!out.includes(sum.result)) return `Resultatet af ${sum.text} mangler. Har du anførselstegn om regnestykket? Så viser Python det bare som tekst.`;
                    }
                    return true;
                },
            },
            {
                id: "4.2",
                title: "Regn med variabler",
                text: 'Du kan regne med variabler ligesom med tal. Lav en variabel, der hedder number1, og giv den værdien 17. Lav en variabel number2 med værdien 9. Læg de to variabler sammen, gem summen i en variabel, der hedder result, og udskriv result.',
                starter: '# Lav to variabler med tal i\n\n# Læg dem sammen, gem summen i result, og udskriv result\n',
                solution: 'number1 = 17\nnumber2 = 9\nresult = number1 + number2\nprint(result)',
                goodToKnow: 'Prøv at ændre number1 til 100 og kør igen. Resultatet følger automatisk med - du skal ikke rette regnestykket. Det er hele pointen med variabler.',
                hints: [
                    "Lav først number1 = 17 og number2 = 9 på hver sin linje.",
                    "Udregn summen med result = number1 + number2, og udskriv den med print(result).",
                ],
                check: (output, code) => {
                    if (!/\bnumber1\s*=\s*17\b/.test(code)) return "Lav variablen number1 med værdien 17.";
                    if (!/\bnumber2\s*=\s*9\b/.test(code)) return "Lav variablen number2 med værdien 9.";
                    // sum is one of Python's own functions - overwriting it causes odd errors later
                    if (/^\s*sum\s*=/m.test(code)) return "Kald ikke variablen sum - det navn bruger Python selv til noget andet. Kald den result.";
                    if (!/number1\s*\+\s*number2|number2\s*\+\s*number1/.test(code)) return "Lad Python lægge variablerne sammen: number1 + number2";
                    if (!lines(output).includes("26")) return "Resultatet mangler. Udskriv det med print(result).";
                    return true;
                },
            },
            {
                id: "4.3",
                title: "Hvor mange dage gammel er du?",
                text: 'Et år er cirka 365 dage. Lav en variabel age med din alder, og regn ud, hvor mange dage gammel du cirka er. Gem resultatet i en variabel days, og udskriv den.',
                starter: '# Lav en variabel age med din alder\n\n# Regn ud, hvor mange dage du er, og gem det i days\n\n# Udskriv days\n',
                solution: '# Lav en variabel age med din alder\nage = 15  # skriv din egen alder\n# Regn ud, hvor mange dage du er, og gem det i days\ndays = age * 365\n# Udskriv days\nprint(days)',
                goodToKnow: 'Du kan også regne videre med days: days * 24 giver timer og days * 24 * 60 giver minutter. Prøv det!',
                hints: [
                    "Lav først age = 15 - med din egen alder.",
                    "Gange er *: days = age * 365. Udskriv den med print(days).",
                ],
                check: (output, code) => {
                    // The student picks their own age, so read it from the code and work out the right answer
                    const ageMatch = code.match(/^\s*age\s*=\s*(\d+)\s*(#.*)?$/m);
                    if (!ageMatch) return "Lav variablen age med din alder som et tal, fx age = 17.";
                    if (!/age\s*\*\s*365|365\s*\*\s*age/.test(code)) return "Lad Python regne: days = age * 365";
                    const expected = String(Number(ageMatch[1]) * 365);
                    if (!lines(output).includes(expected)) return `Programmet skal udskrive ${expected}. Husk print(days).`;
                    return true;
                },
            },
            {
                id: "4.4",
                title: "Læg én til med +=",
                text: 'Når noget skal tælles op, skriver du navnet på variablen, så += og så hvor meget der skal lægges til. For en variabel, der hedder likes, er det likes += 1. Nogen trykker like på dit opslag: brug += til at gøre likes én større, og udskriv likes igen. Programmet skal skrive 5 og derefter 6.',
                starter: 'likes = 5\nprint(likes)\n\n# Nogen trykker like! Brug += til at lægge 1 til likes\n\n# Udskriv likes igen\n',
                solution: 'likes = 5\nprint(likes)\n\n# Nogen trykker like! Brug += til at lægge 1 til likes\nlikes += 1\n# Udskriv likes igen\nprint(likes)',
                goodToKnow: 'x += 1 er en forkortelse af x = x + 1: tag værdien i x, læg 1 til, og gem den igen i x. Det virker med alle variabler og alle tal - x += 10 lægger 10 til. Og med andre tegn: -= trækker fra, og *= ganger. Du kommer til at bruge += meget, når du laver løkker.',
                hints: [
                    "Skriv likes += 1 på linjen under kommentaren.",
                    "Skriv så print(likes) igen nederst.",
                ],
                check: (output, code) => {
                    const swapped = swappedSigns(code);
                    if (swapped) return swapped;
                    if (!/likes\s*\+=\s*1\b/.test(code)) return "Brug += til at lægge 1 til: likes += 1";
                    const out = lines(output);
                    if (out[0] !== "5" || out.at(-1) !== "6") return "Programmet skal skrive 5 og derefter 6. Husk at udskrive likes igen efter +=.";
                    return true;
                },
            },
            {
                id: "4.5",
                title: "Quiz",
                type: "quiz",
                questions: [
                    {
                        question: "Hvilken af disse linjer giver en fejl?",
                        options: [
                            { text: "print(2 + 2)", why: "Den virker fint og udskriver 4." },
                            { text: "print(2 / 2)", why: "Den virker fint og udskriver 1.0." },
                            { text: "print(2 x 2)", correct: true, why: "I Python er gange en stjerne: 2 * 2. Et x forstår Python ikke som gange." },
                        ],
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: "print(10 / 2)",
                        options: [
                            { text: "5", why: "Tæt på! Men divider (/) giver altid et kommatal - også når det går op." },
                            { text: "5.0", correct: true, why: "Divider giver altid et kommatal, så 10 / 2 bliver 5.0. Og Python bruger punktum, ikke komma." },
                            { text: "5,0", why: "Python bruger punktum i stedet for komma i kommatal: 5.0." },
                        ],
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: "likes = 5\nlikes += 3\nprint(likes)",
                        options: [
                            { text: "3", why: "+= erstatter ikke værdien - den lægger til. likes = 3 ville have givet 3." },
                            { text: "8", correct: true, why: "likes += 3 betyder likes = likes + 3. Så 5 + 3 = 8 bliver gemt i likes." },
                            { text: "5", why: "+= ændrer variablen, så likes er ikke længere 5." },
                        ],
                    },

                ]
            }
        ]
    },
    {
        id: 5,
        title: "If-sætninger",
        minutes: 20,
        bonus: false,
        tasks: [
            {
                id: "5.1",
                title: "Er du voksen?",
                text: 'If-sætninger kan få programmet til at gøre forskellige ting, alt efter om noget er sandt eller falsk. Koden herunder spørger brugeren om deres alder. Hvis de er 18 eller ældre, skriver Python "Du er voksen", ellers skriver den "Du er ikke voksen". Linjerne med if og else slutter med et kolon (:), og linjerne under er rykket 4 mellemrum ind - det er de linjer, der hører til. >= betyder "større end eller lig med". Prøv at køre koden og skriv forskellige aldre.',
                starter: 'age = int(input("Hvor gammel er du? "))\n\nif age >= 18:\n    print("Du er voksen")\nelse:\n    print("Du er ikke voksen")',
                solution: 'age = int(input("Hvor gammel er du? "))\n\nif age >= 18:\n    print("Du er voksen")\nelse:\n    print("Du er ikke voksen")',
                goodToKnow: 'Du kan sammenligne med: > (større end), < (mindre end), >= (større end eller lig med), <= (mindre end eller lig med), == (lig med) og != (ikke lig med). Læg mærke til, at "lig med" er to lighedstegn: ==.',
                hints: [
                    "Tryk Kør og skriv forskellige aldre i input-boksen. Prøv både under og over 18.",
                    "Du skal ikke ændre noget i koden - bare kør den og skriv forskellige aldre.",
                ],
                check: (output) => {
                    if (lines(output).length === 0) return "Der kom ikke noget ud. Har du trykket Enter efter at have skrevet din alder?";
                    if (!output.includes("Du er voksen") && !output.includes("Du er ikke voksen")) return 'Programmet skriver ikke "Du er voksen" eller "Du er ikke voksen". Har du slettet print-linjerne?';
                    return true;
                }
            },
            {
                id: "5.2",
                title: "En konstant: MYNDIG",
                text: 'Tallet 18 står midt i koden. Hvis loven ændres, skal man lede efter det alle de steder det bruges. I stedet kan man gemme det i en konstant øverst i programmet: MYNDIG = 18. En konstant er en variabel, som ikke skal ændres, derfor skrives navnet med STORE bogstaver. Lav konstanten MYNDIG øverst, og brug den i if-linjen i stedet for 18.',
                starter: '# Lav konstanten MYNDIG her\n\nage = int(input("Hvor gammel er du? "))\n\nif age >= 18:\n    print("Du er voksen")\nelse:\n    print("Du er ikke voksen")',
                solution: '# Lav konstanten MYNDIG her\nMYNDIG = 18\n\nage = int(input("Hvor gammel er du? "))\n\nif age >= MYNDIG:\n    print("Du er voksen")\nelse:\n    print("Du er ikke voksen")',
                goodToKnow: 'Python stopper dig faktisk ikke, hvis du ændrer en konstant. STORE BOGSTAVER er bare en aftale mellem programmører, det betyder: "Den her skal du ikke ændre." Fordelen er, at hvis myndighedsalderen en dag ændres, retter du kun ét sted.',
                hints: [
                    "Skriv MYNDIG = 18 på linjen under kommentaren.",
                    "Skift 18 ud med MYNDIG i if-linjen: if age >= MYNDIG:",
                ],
                check: (output, code) => {
                    if (/^\s*myndig\s*=/im.test(code) && !/^\s*MYNDIG\s*=/m.test(code)) return "Skriv konstantens navn med STORE bogstaver: MYNDIG";
                    if (!/^\s*MYNDIG\s*=\s*18\s*$/m.test(code)) return "Lav konstanten øverst: MYNDIG = 18";
                    if (/if\s+age\s*>=\s*18/.test(code)) return "Brug konstanten i if-linjen i stedet for 18: if age >= MYNDIG:";
                    if (!/if\s+age\s*>=\s*MYNDIG/.test(code)) return "Skriv if-linjen sådan her: if age >= MYNDIG:";
                    if (!output.includes("voksen")) return 'Programmet skal stadig skrive "Du er voksen" eller "Du er ikke voksen".';
                    return true;
                }
            },
            {
                id: "5.3",
                title: "= eller ==?",
                text: 'Nu vil programmet sige tillykke, hvis man er præcis 18 år - så er man lige blevet myndig. Men der er en fejl i koden. Kør den, læs fejlbeskeden, og ret den.',
                starter: 'MYNDIG = 18\n\nage = int(input("Hvor gammel er du? "))\n\nif age = MYNDIG:\n    print("Tillykke - du er lige blevet myndig!")\nelse:\n    print("Du er ikke præcis 18")',
                solution: 'MYNDIG = 18\n\nage = int(input("Hvor gammel er du? "))\n\nif age == MYNDIG:\n    print("Tillykke - du er lige blevet myndig!")\nelse:\n    print("Du er ikke præcis 18")',
                goodToKnow: 'Ét lighedstegn (=) gemmer noget i en variabel: age = 18 betyder "gem 18 i age". To lighedstegn (==) spørger: age == 18 betyder "er age lig med 18?". Huskeregel: når du spørger om noget, skal du bruge to.',
                hints: [
                    'Kig på if-linjen. Den skal spørge "er age lig med MYNDIG?" - hvor mange lighedstegn skal der så være?',
                    "Skriv if age == MYNDIG: med to lighedstegn.",
                ],
                check: (output, code) => {
                    if (!/if\s+(age\s*==\s*MYNDIG|MYNDIG\s*==\s*age)\s*:/.test(code)) return "Brug == i if-linjen: if age == MYNDIG:";
                    if (!output.includes("myndig") && !output.includes("præcis 18")) return "Programmet skal stadig skrive en af de to beskeder.";
                    return true;
                },
            },
            {
                id: "5.4",
                title: "Flere muligheder med elif",
                text: 'Nogle gange er der mere end to muligheder. Med elif (kort for "else if") kan du tilføje flere. Udvid koden, så 17-årige får beskeden "Du bliver voksen om et år". Sæt elif-linjen ind mellem if og else.',
                starter: 'MYNDIG = 18\n\nage = int(input("Hvor gammel er du? "))\n\nif age >= MYNDIG:\n    print("Du er voksen")\n# Tilføj elif her\nelse:\n    print("Du er ikke voksen")',
                solution: 'MYNDIG = 18\n\nage = int(input("Hvor gammel er du? "))\n\nif age >= MYNDIG:\n    print("Du er voksen")\nelif age == 17:\n    print("Du bliver voksen om et år")\nelse:\n    print("Du er ikke voksen")',
                goodToKnow: 'Python tester betingelserne oppefra og ned og stopper ved den første, der er sand. Du kan have så mange elif, du vil - men kun én if i starten og højst én else til sidst. Smart trick: skriv MYNDIG - 1 i stedet for 17, så passer det stadig, hvis MYNDIG ændres.',
                hints: [
                    "elif-linjen skal spørge, om age er lig med 17 - husk to lighedstegn og kolon til sidst.",
                    'Skriv elif age == 17: og på linjen under (rykket ind): print("Du bliver voksen om et år")',
                ],
                check: (output, code) => {
                    // Positions of if, elif and else in the code (-1 if missing), to check the order
                    const ifPos = code.search(/^\s*if\s/m);
                    const elifPos = code.search(/^\s*elif\s/m);
                    const elsePos = code.search(/^\s*else\s*:/m);
                    if (elifPos === -1) return "Tilføj en elif-linje mellem if og else.";
                    if (!(ifPos < elifPos && elifPos < elsePos)) return "elif skal stå efter if-blokken og før else.";
                    if (!/elif\s+(age\s*==\s*(17|MYNDIG\s*-\s*1)|(17|MYNDIG\s*-\s*1)\s*==\s*age)\s*:/.test(code)) return "elif-linjen skal spørge, om age er 17: elif age == 17:";
                    if (!/om et år|om ét år/.test(code)) return 'Skriv beskeden "Du bliver voksen om et år" under elif-linjen.';
                    if (!output.includes("voksen")) return "Programmet skal stadig skrive en af beskederne.";
                    return true;
                },
            },
            {
                id: "5.5",
                title: "Kodeord",
                text: 'Lav et lille login-program. Kodeordet er gemt i konstanten PASSWORD, og brugerens gæt bliver gemt i guess. Skriv en if-sætning, der skriver "Adgang givet", hvis guess er lig med PASSWORD - og ellers "Forkert kodeord". == virker også på tekst, ikke kun på tal.',
                starter: 'PASSWORD = "Python123"\n\nguess = input("Skriv kodeordet: ")\n\n# Hvis guess er lig med PASSWORD: skriv "Adgang givet"\n# Ellers: skriv "Forkert kodeord"\n',
                solution: 'PASSWORD = "Python123"\n\nguess = input("Skriv kodeordet: ")\n\n# Hvis guess er lig med PASSWORD: skriv "Adgang givet"\n# Ellers: skriv "Forkert kodeord"\nif guess == PASSWORD:\n    print("Adgang givet")\nelse:\n    print("Forkert kodeord")',
                goodToKnow: 'Store og små bogstaver tæller: python123 med lille p er ikke det samme som Python123 - prøv det! Du kan også vende det om med != (ikke lig med): if guess != PASSWORD: print("Forkert kodeord"). Begge dele virker - det handler bare om, hvad der er nemmest at læse.',
                hints: [
                    "Start med if guess == PASSWORD: og husk kolon til sidst. Linjen under skal rykkes ind.",
                    'Under else: skriver du print("Forkert kodeord") - også rykket ind.',
                ],
                check: async (output, code, { run }) => {
                    if (/if\s+guess\s*(==|!=)\s*["']/.test(code)) return "Brug konstanten PASSWORD i if-linjen i stedet for at skrive kodeordet igen.";
                    if (!/if\s+(guess\s*(==|!=)\s*PASSWORD|PASSWORD\s*(==|!=)\s*guess)\s*:/.test(code)) return "Lav en if-linje, der sammenligner guess med PASSWORD: if guess == PASSWORD:";

                    // Test the program like a teacher would: once with the right password, once with a wrong one
                    const right = await run(code, ["Python123"]);
                    if (right.error || right.timeout) return "Programmet giver en fejl, når man skriver det rigtige kodeord.";
                    if (!right.output.includes("Adgang givet")) return 'Med det rigtige kodeord (Python123) skal programmet skrive "Adgang givet".';
                    if (right.output.includes("Forkert kodeord")) return 'Med det rigtige kodeord må programmet ikke også skrive "Forkert kodeord". Har du husket else:?';

                    const wrong = await run(code, ["python123"]);
                    if (wrong.error || wrong.timeout) return "Programmet giver en fejl, når man skriver et forkert kodeord.";
                    if (!wrong.output.includes("Forkert kodeord")) return 'Med et forkert kodeord skal programmet skrive "Forkert kodeord".';
                    if (wrong.output.includes("Adgang givet")) return 'Med et forkert kodeord må programmet ikke skrive "Adgang givet".';

                    // The program works - but only count it as solved when the student actually got in
                    if (!output.includes("Adgang givet")) return "Dit program virker - det afviser forkerte kodeord. Kør det igen og skriv det rigtige kodeord for at komme ind.";
                    return true;
                },
            },
            {
                id: "5.6",
                title: "Quiz",
                type: "quiz",
                questions: [
                    {
                        question: "Hvilken af disse linjer spørger, om age er lig med 18?",
                        options: [
                            { text: "if age = 18:", why: 'Et lighedstegn gemmer noget i en variabel, det kan man ikke spørge med. Python giver en fejl.' },
                            { text: "if age == 18:", correct: true, why: 'To lighedstegn spørger "er de ens?". Huskeregel: når du spørger om noget, skal du bruge to.' },
                            { text: "if age != 18:", why: '!= betyder "ikke lig med", den spørger altså om det modsatte.' },
                        ],
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: 'age = 17\n\nif age >= 18:\n    print("Voksen")\nelif age == 17:\n    print("Næsten voksen")\nelse:\n    print("Barn")',
                        options: [
                            { text: "Voksen", why: "17 er ikke større end eller lig med 18, så den første betingelse er falsk." },
                            { text: "Næsten voksen og Barn", why: "Python stopper ved den første betingelse, der er sand. else kører kun, hvis ingen af de andre var sande." },
                            { text: "Næsten voksen", correct: true, why: "age >= 18 er falsk, men age == 17 er sand, så Python kører den blok og springer resten over." },
                        ],
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: 'PASSWORD = "Python123"\nguess = "python123"\n\nif guess == PASSWORD:\n    print("Adgang givet")\nelse:\n    print("Forkert kodeord")',
                        options: [
                            { text: "Forkert kodeord", correct: true, why: "Store og små bogstaver tæller: python123 med lille p er ikke det samme som Python123." },
                            { text: "Adgang givet", why: 'Kig godt efter: guess starter med et lille p, men PASSWORD med et stort P. For Python er de forskellige.' },
                            { text: "Fejl", why: "Det er helt fint at sammenligne tekst med == - det giver bare ikke True her." },
                        ],
                    },
                ],
            },
        ]
    },
    {
        id: 6,
        title: "Tilfældige tal",
        minutes: 15,
        bonus: false,
        tasks: [
            {
                id: "6.1",
                title: "Tilfældige tal",
                text: 'Python kan lave tilfældige tal. Først skal du importere random, så kan du bruge random.randint(a, b) til at få et tilfældigt tal mellem a og b, inklusive begge ender. Kør koden herunder et par gange, og se hvad der sker. Lav den så om til en terning med 20 sider - sådan en, man bruger i rollespil.',
                starter: 'import random\n\n# randint(a, b) giver et tilfældigt tal fra a til b - begge tal kan komme\nnumber = random.randint(1, 6)\nprint("Du slog", number)',
                solution: 'import random\n\n# randint(a, b) giver et tilfældigt tal fra a til b - begge tal kan komme\nnumber = random.randint(1, 20)\nprint("Du slog", number)',
                goodToKnow: 'import henter ekstra værktøjer ind i Python. random er et af mange moduler, der følger med - der findes også fx math til matematik og time til tid. Du skal kun importere et modul én gang, øverst i programmet.',
                hints: [
                    "Tryk Kør et par gange først. Kig så på tallene inde i random.randint( ).",
                    "Skift 6 ud med 20: random.randint(1, 20)",
                ],
                check: (output, code) => {
                    const out = lines(output);
                    if (out.length === 0) return "Der kom ikke noget ud. Har du trykket Kør?";
                    if (!out[0].startsWith("Du slog")) return 'Programmet skal skrive "Du slog" efterfulgt af et tal. Har du slettet print-linjen?';
                    const num = Number(out[0].split(" ").at(-1));
                    if (isNaN(num)) return "Programmet skal vise et tal til sidst. Har du slettet print-linjen?";
                    if (!/random\.randint\(\s*1\s*,\s*20\s*\)/.test(code)) return "Lav terningen om, så den har 20 sider: random.randint(1, 20)";
                    if (num < 1 || num > 20) return "Programmet skal give et tal mellem 1 og 20.";
                    return true;
                }
            },
            {
                id: "6.2",
                title: "Gæt et tal",
                text: 'Lav et lille spil, hvor brugeren skal gætte et tilfældigt tal mellem 1 og 10. Gem det tilfældige tal i number, og gem brugerens gæt i guess. Hvis gættet er rigtigt, skal programmet skrive "Du gættede rigtigt" - ellers "Forkert, tallet var" efterfulgt af tallet.',
                starter: 'import random\n\n# Gem et tilfældigt tal mellem 1 og 10 i number\n\n# Spørg brugeren om et gæt, og gem det i guess\n\n# Tjek om gættet er rigtigt eller forkert\n',
                solution: 'import random\n\n# Gem et tilfældigt tal mellem 1 og 10 i number\nnumber = random.randint(1, 10)\n\n# Spørg brugeren om et gæt, og gem det i guess\nguess = int(input("Gæt et tal mellem 1 og 10: "))\n\n# Tjek om gættet er rigtigt eller forkert\nif guess == number:\n    print("Du gættede rigtigt")\nelse:\n    print("Forkert, tallet var", number)',
                goodToKnow: 'Med kun ét gæt er der 1 ud af 10 chance for at vinde - det er mest held. I modul 7 lærer du løkker, så man kan blive ved med at gætte, til man rammer.',
                hints: [
                    "Gem først et tilfældigt tal mellem 1 og 10 i number: number = random.randint(1, 10)",
                    "Spørg brugeren om et gæt, og lav det om til et tal: guess = int(input(...))",
                    'Brug en if-sætning til at tjekke, om guess er lig med number. Under else: skriver du print("Forkert, tallet var", number)',
                ],
                check: async (output, code, { run }) => {
                    if (!/random\.randint\(\s*1\s*,\s*10\s*\)/.test(code)) return "Gem et tilfældigt tal mellem 1 og 10 i number: number = random.randint(1, 10)";
                    if (!/int\s*\(\s*input\s*\(/.test(code)) return "Spørg brugeren om et gæt, og lav det om til et tal: guess = int(input(...))";
                    if (!/^\s*if\s/m.test(code)) return "Brug en if-sætning til at tjekke, om guess er lig med number.";

                    // Replace the random number with 5, so the check knows the right answer
                    const fixed = code.replace(/random\.randint\(\s*1\s*,\s*10\s*\)/, "5");

                    const right = await run(fixed, ["5"]);
                    if (right.error || right.timeout) return "Programmet giver en fejl, når man gætter rigtigt.";
                    if (!right.output.includes("rigtigt")) return 'Når man gætter rigtigt, skal programmet skrive "Du gættede rigtigt"';
                    if (right.output.includes("Forkert")) return 'Når man gætter rigtigt, må programmet ikke også skrive "Forkert". Har du husket else:?';

                    const wrong = await run(fixed, ["3"]);
                    if (wrong.error || wrong.timeout) return "Programmet giver en fejl, når man gætter forkert.";
                    if (!wrong.output.includes("Forkert")) return 'Når man gætter forkert, skal programmet skrive "Forkert Tallet var" og tallet.';
                    if (wrong.output.includes("rigtigt")) return 'Når man gætter forkert, må programmet ikke skrive "Du gættede rigtigt"';
                    if (!lines(wrong.output).at(-1).endsWith("5")) return 'Vis hvad tallet var, når man gætter forkert: print("Forkert, tallet var", number)';
                    return true;
                }
            },
            {
                id: "6.3",
                title: "Gæt et tal - med hints",
                text: 'Udvid spillet, så det giver hints. Hvis gættet er rigtigt, skal programmet skrive "Du gættede rigtigt". Hvis gættet er for lavt, skal det skrive "Tallet er højere - det var" og tallet. Og hvis gættet er for højt, skal det skrive "Tallet er lavere - det var" og tallet.',
                starter: 'import random\n\nnumber = random.randint(1, 10)\nguess = int(input("Gæt et tal mellem 1 og 10: "))\n\n# Tjek om gættet er rigtigt, for lavt eller for højt\n',
                solution: 'import random\n\nnumber = random.randint(1, 10)\nguess = int(input("Gæt et tal mellem 1 og 10: "))\n\n# Tjek om gættet er rigtigt, for lavt eller for højt\nif guess == number:\n    print("Du gættede rigtigt")\nelif guess < number:\n    print("Tallet er højere, det var", number)\nelse:\n    print("Tallet er lavere, det var", number)',
                goodToKnow: 'Du kan have så mange elif, du vil. Python tester dem oppefra og ned og stopper ved den første, der er sand.',
                hints: [
                    "Brug elif til at tjekke, om guess er mindre end number.",
                    'Under elif-linjen skriver du print("Tallet er højere - det var", number).',
                    "Under else: skriver du print(\"Tallet er lavere - det var\", number).",
                ],
                check: async (output, code, { run }) => {
                    if (!/random\.randint\(\s*1\s*,\s*10\s*\)/.test(code)) return "Lad number være random.randint(1, 10).";
                    if (!/int\s*\(\s*input\s*\(/.test(code)) return "Lav gættet om til et tal: guess = int(input(...))";

                    // Replace the random number with 5, so the check knows the right answer
                    const fixed = code.replace(/random\.randint\(\s*1\s*,\s*10\s*\)/, "5");
                    return await expectOutput(run, fixed, ["5"], { when: "når man gætter rigtigt", shows: "rigtigt", notShows: ["højere", "lavere"] })
                        ?? await expectOutput(run, fixed, ["3"], { when: "når man gætter for lavt", shows: "højere", notShows: ["lavere", "rigtigt"], endsWith: "5" })
                        ?? await expectOutput(run, fixed, ["7"], { when: "når man gætter for højt", shows: "lavere", notShows: ["højere", "rigtigt"], endsWith: "5" })
                        ?? true;
                },
            },
            {
                id: "6.4",
                title: "Quiz",
                type: "quiz",
                questions: [
                    {
                        question: "Hvilke tal kan random.randint(1, 8) give?",
                        options: [
                            { text: "1, 2, 3, 4, 5, 6, 7", why: "randint tager begge tal med, både 1 og 8 kan komme." },
                            { text: "1, 2, 3, 4, 5, 6, 7, 8", correct: true, why: "randint(a, b) giver et tal fra a til b, og begge tal kan komme, Lige som en rigtig terning. " },
                            { text: "0, 1, 2, 3, 4, 5, 6, 7, 8", why: "randint starter ved det første tal du skriver, her 1, og ikke 0." },
                        ]
                    },
                    {
                        question: "Brugeren skriver 5. Hvad udskriver programme?",
                        code: 'number = 5\nguess = input("Gæt et tal: ")\n\nif guess == number:\n    print("Rigtigt")\nelse:\n    print("Forkert")',
                        options: [
                            { text: "Rigtigt", why: 'Det ligner det samme, men input() giver teksten "5", og teksten "5" er ikke det samme som tallet 5.' },
                            { text: "Fejl", why: "Python giver ikke en fejl, den siger bare, at de ikke er ens." },
                            { text: "Forkert", correct: true, why: 'input() giver altid tekst. "5" og 5 er forskellige datatyper (str og int), så de er ikke ens. Brug int(input(...)).' },
                        ]
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: 'number = 5\nguess = 8\n\nif guess == number:\n    print("Du gættede rigtigt")\nelif guess < number:\n    print("Tallet er højere")\nelse:\n    print("Tallet er lavere")',
                        options: [
                            { text: "Tallet er lavere", correct: true, why: "8 er ikke lig med 5, og 8 er ikke mindre end 5 - så else kører. Gættet var for højt, så tallet er lavere." },
                            { text: "Tallet er højere", why: "Gættet (8) er højere end tallet (5) - så det hemmelige tal er lavere." },
                            { text: "Du gættede rigtigt", why: "8 er ikke lig med 5." },
                        ],
                    },

                ]
            }
        ]
    },
    {
        id: 7,
        title: "Løkker",
        minutes: 35,
        bonus: false,
        tasks: [
            {
                id: "7.1",
                title: "Gentag med for",
                text: 'En løkke gentager kode. for i in range(5): kører linjerne under sig 5 gange. Ligesom med if skal linjen slutte med et kolon, og det, der skal gentages, skal rykkes ind. Kør koden, og lav den så om, så den skriver "Hej" 10 gange.',
                starter: 'for i in range(5):\n    print("Hej")',
                solution: 'for i in range(10):\n    print("Hej")',
                goodToKnow: 'Alt, der er rykket ind under for-linjen, bliver gentaget. Linjer, der ikke er rykket ind, kører kun én gang - når løkken er færdig.',
                hints: [
                    "Tallet inde i range() bestemmer, hvor mange gange løkken kører.",
                    "Skift 5 ud med 10: for i in range(10):",
                ],
                check: (output, code) => {
                    if (!/^\s*for\s+\w+\s+in\s+range\(/m.test(code)) return "Brug en for-løkke: for i in range(10):";
                    if ((code.match(/print\(/g) || []).length > 1) return "Du behøver kun én print() - lad løkken gentage den for dig.";
                    const count = lines(output).filter((l) => l === "Hej").length;
                    if (count !== 10) return `Programmet skriver "Hej" ${count} gange. Det skal være 10.`;
                    return true;
                },
            },
            {
                id: "7.2",
                title: "Tæl til 10",
                text: 'Variablen i får et nyt tal, hver gang løkken kører. range(5) giver 0, 1, 2, 3, 4 - Python starter nemlig ved 0. Med range(1, 11) starter den ved 1 og stopper lige før 11. Kør koden og se tallene. Lav den så om, så den skriver tallene fra 1 til 10.',
                starter: 'for i in range(5):\n    print(i)',
                solution: 'for i in range(1, 11):\n    print(i)',
                goodToKnow: 'I range(start, stop) er stop-tallet ikke med. Derfor skal der stå 11, hvis 10 skal være med. Det driller alle programmører i starten - også dem, der har kodet i mange år.',
                hints: [
                    "Kør koden først. Hvilket tal starter den med, og hvilket stopper den ved?",
                    "Brug range(1, 11) - den starter ved 1 og stopper lige før 11.",
                ],
                check: (output, code) => {
                    if (!/^\s*for\s+\w+\s+in\s+range\(/m.test(code)) return "Brug en for-løkke: for i in range(1, 11):";
                    const out = lines(output);
                    const expected = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
                    if (out[0] === "0") return "Programmet starter ved 0. Giv range() et starttal: range(1, ...)";
                    if (out.at(-1) === "9") return "Programmet stopper ved 9. Husk, at stop-tallet ikke er med - brug 11.";
                    if (out.join(" ") !== expected.join(" ")) return "Programmet skal skrive tallene fra 1 til 10 - ét på hver linje.";
                    return true;
                },
            },
            {
                id: "7.3",
                title: "Gangetabel",
                text: 'Du kan regne med i inde i løkken. Skriv 7-tabellen: 7, 14, 21 ... op til 70 - ét tal på hver linje. Brug en for-løkke, der går fra 1 til 10, og gang i med 7.',
                starter: '# Skriv 7-tabellen med en for-løkke\n',
                solution: '# Skriv 7-tabellen med en for-løkke\nfor i in range(1, 11):\n    print(i * 7)',
                goodToKnow: 'Prøv at skrive print(i, "x 7 =", i * 7) - så ligner det en rigtig gangetabel. Og skift 7 ud med et andet tal, så får du en anden tabel. Det er det smarte ved løkker: lidt kode kan lave meget arbejde.',
                hints: [
                    "Start med samme løkke som i 7.2: for i in range(1, 11):",
                    "Inde i løkken (rykket ind): print(i * 7)",
                ],
                check: (output, code) => {
                    if (!/^\s*for\s+\w+\s+in\s+range\(/m.test(code)) return "Brug en for-løkke: for i in range(1, 11):";
                    if (!code.includes("*")) return "Lad Python regne: gang i med 7 inde i løkken.";
                    // The last word on each line must be the result, so print(i, "x 7 =", i * 7) is fine too
                    const results = lines(output).map((l) => l.split(" ").at(-1));
                    const expected = ["7", "14", "21", "28", "35", "42", "49", "56", "63", "70"];
                    if (results.join(" ") !== expected.join(" ")) return "Programmet skal skrive 7, 14, 21 ... op til 70 - ét tal på hver linje.";
                    return true;
                },
            },
            {
                id: "7.4",
                title: "Læg alle tal sammen",
                text: 'Løkker er gode til at lægge sammen. Start med total = 0, og læg i til total, hver gang løkken kører: total += i. Læg alle tal fra 1 til 100 sammen, og udskriv total til sidst - efter løkken, så den kun bliver udskrevet én gang.',
                starter: 'total = 0\n\n# Læg alle tal fra 1 til 100 til total\n\n# Udskriv total - efter løkken\n',
                solution: 'total = 0\n\n# Læg alle tal fra 1 til 100 til total\nfor i in range(1, 101):\n    total += i\n\n# Udskriv total - efter løkken\nprint(total)',
                goodToKnow: 'Svaret er 5050. Matematikeren Carl Friedrich Gauss skulle efter sigende have fået præcis den opgave som barn - og regnede den ud i hovedet: 1 + 100, 2 + 99, 3 + 98 ... giver 50 par, der hver giver 101. 50 * 101 = 5050. Python klarer det på et splitsekund.',
                hints: [
                    "for i in range(1, 101): - husk, at 101 ikke er med, så løkken stopper ved 100.",
                    "Inde i løkken (rykket ind): total += i. Efter løkken (ikke rykket ind): print(total)",
                ],
                check: (output, code) => {
                    const swapped = swappedSigns(code);
                    if (swapped) return swapped;
                    if (!/^\s*for\s+\w+\s+in\s+range\(/m.test(code)) return "Brug en for-løkke: for i in range(1, 101):";
                    if (!/total\s*\+=|total\s*=\s*total\s*\+/.test(code)) return "Læg i til total inde i løkken: total += i";
                    const out = lines(output);
                    if (out.length > 1) return "Programmet skriver mange tal. print(total) er rykket ind, så den kører hver gang - ryk den ud, så den står efter løkken.";
                    if (out[0] === "4950") return "Du får 4950 - tallet 100 er ikke med. Husk, at stop-tallet ikke er med: brug range(1, 101).";
                    if (out[0] !== "5050") return "Programmet skal skrive summen af tallene fra 1 til 100.";
                    return true;
                },
            },
            {
                id: "7.5",
                title: "Nedtælling med while",
                text: 'En while-løkke kører, så længe en betingelse er sand - lidt ligesom en if, der bliver ved. Koden herunder skal tælle ned fra 10 og så skrive "Affyring". Men der mangler noget: count bliver aldrig mindre. Kør den og se, hvad der sker. Ret den så med count -= 1.',
                starter: 'count = 10\n\nwhile count > 0:\n    print(count)\n    # Gør count én mindre her\n\nprint("Affyring")',
                solution: 'count = 10\n\nwhile count > 0:\n    print(count)\n    # Gør count én mindre her\n    count -= 1\n\nprint("Affyring")',
                goodToKnow: 'Glemmer man at ændre count, er count > 0 altid sand, og løkken kører for evigt. Det kaldes en uendelig løkke - og det er derfor, kurset stopper programmer efter 5 sekunder. Brug for, når du ved, hvor mange gange noget skal ske, og while, når det afhænger af noget, der ændrer sig.',
                hints: [
                    "Inde i løkken - under print(count) og rykket lige så langt ind: count -= 1",
                    'Får du "Programmet kørte i mere end 5 sekunder"? Så mangler count -= 1, eller også er den ikke rykket ind.',
                ],
                check: (output, code) => {
                    const swapped = swappedSigns(code);
                    if (swapped) return swapped;
                    if (!/^\s*while\s/m.test(code)) return "Brug en while-løkke: while count > 0:";
                    const out = lines(output);
                    if (out.filter((l) => l.includes("Affyring")).length > 1) return 'print("Affyring") er rykket ind, så den kører hver gang. Ryk den ud, så den står efter løkken.';
                    const expected = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Affyring"];
                    if (out.join(" ") !== expected.join(" ")) return 'Programmet skal tælle ned fra 10 til 1 og derefter skrive "Affyring".';
                    return true;
                },
            },
            {
                id: "7.6",
                title: "Gættespillet - færdigt",
                text: 'Nu kan du lave det rigtige gættespil. Tallet er mellem 1 og 100, og man skal blive ved med at gætte, til man rammer det. Lav en while-løkke, der kører, så længe guess ikke er lig med number - brug !=. Inde i løkken spørger du om et gæt og skriver "Tallet er højere" eller "Tallet er lavere". Opgaven er løst, når du har vundet et spil.',
                starter: 'import random\n\nnumber = random.randint(1, 100)\nguess = 0  # starter på 0, så løkken kører mindst én gang\n\n# Lav en while-løkke, der kører, så længe guess ikke er lig med number\n# Inde i løkken: spørg om et gæt, og skriv "Tallet er højere" eller "Tallet er lavere"\n\nprint("Du gættede rigtigt - tallet var", number)',
                solution: 'import random\n\nnumber = random.randint(1, 100)\nguess = 0  # starter på 0, så løkken kører mindst én gang\n\n# Lav en while-løkke, der kører, så længe guess ikke er lig med number\n# Inde i løkken: spørg om et gæt, og skriv "Tallet er højere" eller "Tallet er lavere"\nwhile guess != number:\n    guess = int(input("Gæt et tal mellem 1 og 100: "))\n    if guess < number:\n        print("Tallet er højere")\n    elif guess > number:\n        print("Tallet er lavere")\n\nprint("Du gættede rigtigt - tallet var", number)',
                goodToKnow: 'Smart strategi: gæt altid midt i det, der er tilbage - først 50, så 25 eller 75, og så videre. Så finder du tallet på højst 7 gæt. Det hedder binær søgning, og computere bruger det hele tiden til at finde ting hurtigt.',
                hints: [
                    "while guess != number: - og husk at rykke alt, der hører til løkken, ind.",
                    "Inde i løkken: guess = int(input(...)), og så if guess < number: og elif guess > number: med hver sin print. De skal rykkes 8 mellemrum ind, fordi de er inde i både løkken og if-sætningen.",
                ],
                check: async (output, code, { run }) => {
                    if (!/random\.randint\(\s*1\s*,\s*100\s*\)/.test(code)) return "Lad number være random.randint(1, 100).";
                    if (!/^\s*while\s/m.test(code)) return "Brug en while-løkke: while guess != number:";
                    if (!/int\s*\(\s*input\s*\(/.test(code)) return "Lav gættet om til et tal: guess = int(input(...))";

                    // Lock the secret number to 50, and play a game: too low, too high, right
                    const fixed = code.replace(/random\.randint\(\s*1\s*,\s*100\s*\)/, "50");
                    const game = await run(fixed, ["25", "75", "50"]);
                    if (game.timeout) return "Programmet kørte i mere end 5 sekunder. Spørger du om et gæt inde i løkken?";
                    if (game.error) return "Programmet giver en fejl, når man spiller et spil.";
                    if (game.missingInput) return "Programmet bliver ved med at spørge, selvom man har gættet rigtigt. Tjek while-linjen: while guess != number:";
                    if (!game.output.includes("25")) return "Programmet spørger aldrig om et gæt - løkken kører ikke. Tjek while-linjen: while guess != number:";
                    if (!game.output.includes("75")) return "Programmet skal blive ved med at spørge, indtil man gætter rigtigt. Er input() inde i løkken?";
                    if (!game.output.includes("højere")) return 'Når man gætter for lavt, skal programmet skrive "Tallet er højere".';
                    if (!game.output.includes("lavere")) return 'Når man gætter for højt, skal programmet skrive "Tallet er lavere".';
                    if (!game.output.includes("rigtigt")) return 'Når man gætter rigtigt, skal programmet skrive "Du gættede rigtigt".';

                    // The program works - and the student's own game only ends when they win
                    if (!output.includes("rigtigt")) return "Dit program virker. Kør det igen, og spil til du vinder.";
                    return true;
                },
            },
            {
                id: "7.7",
                title: "Quiz",
                type: "quiz",
                questions: [
                    {
                        question: "Hvilke tal giver range(1, 5)?",
                        options: [
                            { text: "1, 2, 3, 4 og 5", why: "I range() er stop-tallet ikke med - modsat randint(1, 5), hvor 5 godt kan komme." },
                            { text: "0, 1, 2, 3 og 4", why: "range() starter ved det første tal, du skriver - her 1. Kun range(5) starter ved 0." },
                            { text: "1, 2, 3 og 4", correct: true, why: "range(1, 5) starter ved 1 og stopper lige før 5. Vil du have 5 med, skal der stå range(1, 6)." },
                        ],
                    },
                    {
                        question: "Hvad udskriver denne kode?",
                        code: 'for i in range(3):\n    print("Hej")\nprint("Færdig")',
                        options: [
                            { text: "Hej, Hej, Hej og så Færdig", correct: true, why: 'Kun den indrykkede linje bliver gentaget. print("Færdig") er ikke rykket ind, så den kører én gang, når løkken er færdig.' },
                            { text: "Hej, Færdig - tre gange", why: 'print("Færdig") er ikke rykket ind, så den hører ikke til løkken. Den kører kun én gang - til sidst.' },
                            { text: "Hej og Færdig", why: 'range(3) får løkken til at køre tre gange, så "Hej" bliver skrevet tre gange.' },
                        ],
                    },
                    {
                        question: "Hvad sker der, når man kører denne kode?",
                        code: "count = 3\n\nwhile count > 0:\n    print(count)",
                        options: [
                            { text: "Den skriver 3, 2 og 1", why: "count bliver aldrig mindre - der mangler count -= 1 inde i løkken." },
                            { text: "Den skriver 3 igen og igen - for evigt", correct: true, why: "count er altid 3, så count > 0 er altid sand. Det er en uendelig løkke - kurset stopper den efter 5 sekunder." },
                            { text: "Den skriver ingenting", why: "count er 3 fra starten, så count > 0 er sand, og løkken kører." },
                        ],
                    },
                ],
            },
        ]
    }
];

// All tasks in one flat list - for Forrige/Næste
export const allTasks = modules.flatMap((module) => module.tasks);

// The Legeplads: a free editor with no check, hints or solution. TaskPage sees free: true.
export const playground = {
    id: "legeplads",
    title: "Legeplads",
    free: true,
    text: 'Her er der ingen opgave og ingen rigtige svar - du må skrive lige, hvad du vil. Brug for en idé? Lav dit eget quizspil med input() og if. Udvid gættespillet, så det tæller, hvor mange gæt du brugte. Lav en lommeregner, der spørger om to tal. Eller tegn en figur med print() og en løkke.',
    starter: '# Legepladsen - her må du skrive, hvad du vil.\n# Prøv at ændre koden herunder, eller slet den og start forfra.\n\nname = input("Hvad hedder du? ")\nprint("Hej " + name + ", velkommen til legepladsen")\n',
};
