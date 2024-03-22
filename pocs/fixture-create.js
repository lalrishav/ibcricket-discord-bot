const matches = [
    { matchId: 3, firstPlayer: 'nik', secondPlayer: 'harshil' },
    { matchId: 8, firstPlayer: 'rot9999', secondPlayer: 'harshil' },
    { matchId: 14, firstPlayer: 'iceman', secondPlayer: 'harshil' },
    { matchId: 19, firstPlayer: 'karthik', secondPlayer: 'harshil' },
    { matchId: 26, firstPlayer: 'harshil', secondPlayer: 'arunpoddar' },
    { matchId: 33, firstPlayer: 'harshil', secondPlayer: 'srinathbingi' },
    { matchId: 40, firstPlayer: 'harshil', secondPlayer: 'rashesh' },
    { matchId: 47, firstPlayer: 'harshil', secondPlayer: 'lalrishav' },
    { matchId: 60, firstPlayer: 'harshil', secondPlayer: 'hirenbhuva' },
    { matchId: 66, firstPlayer: 'donzzz1717', secondPlayer: 'harshil' },
    { matchId: 71, firstPlayer: 'mpower99', secondPlayer: 'harshil' },
    { matchId: 76, firstPlayer: 'saurabhkumar', secondPlayer: 'harshil' },
];

const users = [
    { name: 'rot9999', discordId: '1129416139622068326', discordUsername: 'rot9999' },
    { name: 'lalrishav', discordId: '433712724753776651', discordUsername: 'lalrishav' },
    { name: 'nik', discordId: '1202684714297598005', discordUsername: 'nik' },
    { name: 'rashesh', discordId: '948383732669235230', discordUsername: 'rashesh' },
    { name: 'saurabhkumar', discordId: '1018278437439414333', discordUsername: 'saurabhkumar' },
    { name: 'srinathbingi', discordId: '1097817325903822968', discordUsername: 'srinathbingi' },
    { name: 'karthik', discordId: '533319320932188171', discordUsername: 'karthik' },
    { name: 'hirenbhuva', discordId: '824126372909809714', discordUsername: 'hirenbhuva' },
    { name: 'iceman', discordId: '923833652675239969', discordUsername: 'iceman' },
    { name: 'donzzz1717', discordId: '1062420491832406046', discordUsername: 'donzzz1717' },
    { name: 'mpower99', discordId: '967055935732351026', discordUsername: 'mpower99' },
    { name: 'arunpoddar', discordId: '1218564346821611643', discordUsername: 'arunpoddar' },
    { name: 'harshil', discordId: '786618821309759529', discordUsername: 'harshil' }

];

// Function to find user by name
function findUserByName(name) {
    return users.find(user => user.name === name);
}

// Function to generate JSON array for matches
function generateMatchesArray(matches, users) {
    const matchesArray = [];

    matches.forEach(match => {
        const firstPlayer = findUserByName(match.firstPlayer);
        const secondPlayer = findUserByName(match.secondPlayer);

        if (firstPlayer && secondPlayer) {
            const matchData = {
                "matchId": match.matchId.toString(),
                "firstPlayer": {
                    "name": firstPlayer.name,
                    "discordId": firstPlayer.discordId,
                    "discordUsername": firstPlayer.discordUsername
                },
                "secondPlayer": {
                    "name": secondPlayer.name,
                    "discordId": secondPlayer.discordId,
                    "discordUsername": secondPlayer.discordUsername
                },
                "pitch": "bounce",
                "status": "NOT_YET_STARTED"
            };

            matchesArray.push(matchData);
        }
    });

    return matchesArray;
}

// Generate the JSON array for matches
const result = generateMatchesArray(matches, users);

// Convert the result to JSON string with double quotes around property names and string values
const jsonString = JSON.stringify(result, null, 2);

// Log the result
console.log(jsonString);
