// A small easter egg: a dry comment when a student writes "67" as text.
// Only text in quotation marks counts - so 67 from a calculation or a guess never triggers it.

const SIX_SEVEN = /\b6\s*-?\s*7\b|six\s*seven|seks\s*syv/i;

const ROASTS = [
    "6-7? Seriøst? Det her er et programmeringskursus.",
    "Vi så godt det der 67. Tilbage til koden.",
    "67 er ikke et svar. Det er et symptom.",
    "Python har set mange ting. Men 67? Virkelig?",
];

// true if any text in quotation marks in the code is "67", "6 7", "6-7", "six seven" or "seks syv"
export function mentions67(code) {
    const texts = code.match(/"[^"\n]*"|'[^'\n]*'/g) || [];
    return texts.some((text) => SIX_SEVEN.test(text));
}

export function randomRoast() {
    return ROASTS[Math.floor(Math.random() * ROASTS.length)];
}
