// Words students often write with the wrong capitalisation: lowercase version → correct spelling
const KNOWN_NAMES = {
    print: "print", input: "input", len: "len", str: "str", int: "int",
    float: "float", range: "range", true: "True", false: "False", none: "None",
    if: "if", elif: "elif", else: "else", while: "while", for: "for", in: "in",
    and: "and", or: "or", not: "not", is: "is", def: "def", return: "return",
    break: "break", continue: "continue", pass: "pass",
};

// Turns Python's English error text into a Danish explanation
export function explainError(errorText) {
    // The last line is the actual error, e.g. "NameError: name 'Vejle' is not defined"
    const lines = errorText.trim().split("\n");
    const original = lines[lines.length - 1];
    const [type, ...rest] = original.split(": ");
    const message = rest.join(": ");

    // The line number is in 'File "<exec>", line N' - we take the last one
    const found = [...errorText.matchAll(/File "<exec>", line (\d+)/g)];
    const line = found.length > 0 ? Number(found[found.length - 1][1]) : null;

    const result = (title, text) => ({ title, text, line, original });

    // --- Python doesn't know a name ---
    if (type === "NameError") {
        const name = (message.match(/name '(.+)' is not defined/) || [])[1] || "?";
        const correct = KNOWN_NAMES[name.toLowerCase()];
        if (correct && correct !== name) {
            return result("Store og små bogstaver",
                `Python kender ikke "${name}", men den kender "${correct}". Python skelner mellem store og små bogstaver, så skriv "${correct}".`);
        }
        return result(`Python kender ikke "${name}"`,
            `Python leder efter en variabel, der hedder ${name}, men den findes ikke. Skulle det have været tekst? Så mangler der anførselstegn: "${name}". Ellers er variablen måske stavet forkert, eller også bliver den brugt, før den er lavet.`);
    }

    // --- Indentation ---
    if (message.includes("expected an indented block")) {
        return result("Der mangler indrykning",
            "Linjen efter et kolon (:) skal rykkes 4 mellemrum ind. Tryk Tab eller skriv 4 mellemrum i starten af linjen.");
    }
    if (message.includes("unexpected indent")) {
        return result("Linjen er rykket ind",
            "Denne linje starter med mellemrum, men det må den kun efter en linje, der slutter med kolon (:). Fjern mellemrummene i starten af linjen.");
    }
    if (message.includes("unindent does not match")) {
        return result("Indrykningen passer ikke",
            "Linjerne i samme blok skal være rykket lige langt ind. Tjek at der er præcis 4 mellemrum.");
    }

    // --- Syntax ---
    if (message.includes("expected ':'")) {
        return result("Der mangler et kolon",
            "Linjer med if, elif, else, while og for skal slutte med et kolon (:).");
    }
    // Must come before the == check: Python suggests == here too, e.g. for favourite-food = "pizza"
    if (message.includes("cannot assign to expression")) {
        return result("Ugyldigt variabelnavn",
            "Til venstre for = skal der stå ét variabelnavn. Et navn må ikke have bindestreg (-), for så tror Python, det er et minus. Brug _ i stedet, fx favourite_food.");
    }
    if (message.includes("meant '=='")) {
        return result("= eller ==?",
            "Et enkelt = gemmer noget i en variabel. Når du vil spørge \"er de ens?\", skal du bruge to: ==. Fx: if age == 18:");
    }
    if (message.includes("unterminated string literal")) {
        return result("Der mangler et anførselstegn",
            "En tekst skal både starte og slutte med et anførselstegn, fx \"Hej\". Tjek at der er et \" i begge ender.");
    }
    if (message.includes("was never closed")) {
        return result("En parentes bliver aldrig lukket",
            "Der er en ( uden en ) til at lukke den. Tæl parenteserne - der skal være lige mange af hver.");
    }
    if (message.includes("unmatched ')'")) {
        return result("En parentes for meget",
            "Der er en ) uden en ( til at starte den. Tæl parenteserne - der skal være lige mange af hver.");
    }
    if (message.includes("invalid character") && /[“”„‘’]/.test(message)) {
        return result("Krøllede anførselstegn",
            "Du har brugt “krøllede” anførselstegn - det sker, når man kopierer fra Word eller en telefon. Slet dem og skriv \" fra tastaturet (Shift + 2).");
    }
    if (message.includes("invalid decimal literal")) {
        return result("Et navn må ikke starte med et tal",
            "Variabelnavne må gerne have tal i sig, men ikke først. Skriv fx navn2 i stedet for 2navn.");
    }
    if (message.includes("Missing parentheses in call to 'print'")) {
        return result("print skal have parenteser",
            "Det, der skal vises, skal stå inde i parenteser: print(\"Hej\").");
    }
    if (type === "SyntaxError") {
        return result("Python forstår ikke linjen",
            "Tjek stavning, anførselstegn, parenteser og kolon. Husk også at variabelnavne ikke må have mellemrum - brug _ i stedet, fx min_by.");
    }

    // --- Text and numbers ---
    if (message.includes('can only concatenate str (not "int") to str')) {
        return result("Tekst + tal",
            "Du prøver at sætte tekst og et tal sammen med +. Lav tallet om til tekst med str(): \"Jeg er \" + str(alder)");
    }
    // Any arithmetic sign (+ - * /) between a number and a text, e.g. 2026 - "2008"
    if (/unsupported operand type\(s\) for .+: '(int|float)' and 'str'|unsupported operand type\(s\) for .+: 'str' and '(int|float)'/.test(message)) {
        return result("Tal og tekst",
            "Du prøver at regne med et tal og en tekst. Python kan kun regne med tal. Hvis teksten kommer fra input(), så lav den om til et tal med int().");
    }
    if (type === "ValueError" && message.includes("invalid literal for int()")) {
        return result("Det er ikke et helt tal",
            "int() kan kun lave tekst om til et tal, hvis teksten er et helt tal, fx \"16\" - ikke \"seksten\" eller \"16.5\".");
    }
    if (type === "ZeroDivisionError") {
        return result("Division med 0", "Man kan ikke dividere med 0 - heller ikke i Python.");
    }

    // --- Everything else ---
    return result("Der skete en fejl",
        "Læs linjen igen, og se om noget er stavet forkert. Du kan også trykke på \"Vis et hint\".");
}
