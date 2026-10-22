const lines = (output) => output.split("\n").map((l) => l.trim()).filter((l) => l !== "");

// Finds e.g. "count =+ 1" or "count =- 1", where the signs are swapped round.
// Python doesn't give an error – it just reads it as count = +1 – so we have to catch it ourselves.
// Gives a message with the student's own variable name, or null if everything is fine.
function swappedSigns(code) {
    const match = code.match(/([\p{L}_][\p{L}\p{N}_]*)\s*=([+-])/u);
    if (!match) return null;
    const [, name, sign] = match;
    return `Du har skrevet ${name} =${sign}. Det skal være ${name} ${sign}= (${sign === "+" ? "plus" : "minus"} først, så lighedstegn).`;
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
                    "Du skal ikke ændre noget i koden – bare tryk Kør."
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
                text: "Du kan skrive flere linjer kode. Python kører dem én ad gangen, oppefra og ned. Skriv tre linjer om dig selv: dit navn, din alder og din by. Tryk Kør og se, hvad der sker.",
                starter: '# Skriv tre linjer om dig selv herunder\n',
                solution: 'print("Hej, jeg hedder Ali")\nprint("Jeg er 15 år gammel")\nprint("Jeg bor i Odense")',
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
                    'Linjen under: print(name) – uden anførselstegn om name.',
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
                text: 'Et variabelnavn må kun have bogstaver, tal og _ (understreg). Det må ikke starte med et tal, og det må ikke have mellemrum eller bindestreg. Koden herunder har tre dårlige navne. Ret dem, så programmet virker – husk at rette dem i print-linjerne også.',
                starter: '2name = "Ali"\nmy city = "Odense"\nfavourite-food = "pizza"\n\nprint(2name)\nprint(my city)\nprint(favourite-food)',
                solution: 'name2 = "Ali"\nmy_city = "Odense"\nfavourite_food = "pizza"\n\nprint(name2)\nprint(my_city)\nprint(favourite_food)',
                goodToKnow: 'Brug _ i stedet for mellemrum og bindestreg: my_city. Store og små bogstaver er forskellige – Name og name er to forskellige variabler.',
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
                goodToKnow: 'Tekst har anførselstegn: "Odense". Tal har ikke: 15. "15" med anførselstegn er tekst – det ligner et tal, men Python kan ikke regne med det. Det er præcis det, input() giver dig i modul 3.',
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
                    if ((code.match(/^\s*number\s*=/gm) || []).length < 2) return "Giv den samme variabel en ny værdi: number = 2. Brug print(number) – ikke print(2).";
                    return true;
                },
            },
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
                    // sum is one of Python's own functions – overwriting it causes odd errors later
                    if (/^\s*sum\s*=/m.test(code)) return "Kald ikke variablen sum – det navn bruger Python selv til noget andet. Kald den result.";
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
                    "Lav først age = 15 – med din egen alder.",
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
        ]
    }
];

// All tasks in one flat list – for Forrige/Næste
export const allTasks = modules.flatMap((module) => module.tasks);
