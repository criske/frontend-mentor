/*jshint esversion: 9 */

export default async function (challenge) {
    const challenges = await $.get("../challenges.json");
    var found;
    if (!challenge) {
        found = challenges[0].path;
    } else {
        challenges.forEach(ch => {
            if (ch.path.includes(challenge)) {
                found = ch;
            }
        });
    }
    if (!found) throw "Challenge not found";
    found = { ...found, path: found.path.replace('./', '../') };
    return found;
}