
function removeEmptyLines (string) {
    const testeString = string.split(/\r?\n/).filter(line => line.trim()!== '').join('\n');
    return testeString
}


module.exports = removeEmptyLines;


// removeEmptyLines(`red

// green
// blue

// yellow`);