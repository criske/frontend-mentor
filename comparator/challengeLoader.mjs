/*jshint esversion: 9 */

export default async function (challenge) {
    const safeChallenge = challenge || 'sunnyside-agency-landing-page-main';
    const challenges = await $.get("../challenges.json");
    var found;
    challenges.forEach(ch => {
        if (ch.path.includes(safeChallenge)) {
            found = ch;
        }
    });
    if (!found) throw "Challenge not found";
    found = { ...found, path: found.path.replace('./', '../') };
    return found;
}