const matches = [
    { matchId: 1, firstPlayer: 'rot9999', secondPlayer: 'iceman' },
    { matchId: 2, firstPlayer: 'lalrishav', secondPlayer: 'hirenbhuva' },
    { matchId: 3, firstPlayer: 'nik', secondPlayer: 'harshil' },
    { matchId: 4, firstPlayer: 'rashesh', secondPlayer: 'donzzz1717' },
    { matchId: 5, firstPlayer: 'saurabhkumar', secondPlayer: 'arunpoddar' },
    { matchId: 6, firstPlayer: 'srinathbingi', secondPlayer: 'mpower99' },
    { matchId: 7, firstPlayer: 'karthik', secondPlayer: 'iceman' },
    { matchId: 8, firstPlayer: 'rot9999', secondPlayer: 'harshil' },
    { matchId: 9, firstPlayer: 'lalrishav', secondPlayer: 'donzzz1717' },
    { matchId: 10, firstPlayer: 'nik', secondPlayer: 'arunpoddar' },
    { matchId: 11, firstPlayer: 'rashesh', secondPlayer: 'mpower99' },
    { matchId: 12, firstPlayer: 'saurabhkumar', secondPlayer: 'srinathbingi' },
    { matchId: 13, firstPlayer: 'karthik', secondPlayer: 'hirenbhuva' },
    { matchId: 14, firstPlayer: 'iceman', secondPlayer: 'harshil' },
    { matchId: 15, firstPlayer: 'rot9999', secondPlayer: 'arunpoddar' },
    { matchId: 16, firstPlayer: 'lalrishav', secondPlayer: 'mpower99' },
    { matchId: 17, firstPlayer: 'nik', secondPlayer: 'srinathbingi' },
    { matchId: 18, firstPlayer: 'rashesh', secondPlayer: 'saurabhkumar' },
    { matchId: 19, firstPlayer: 'karthik', secondPlayer: 'harshil' },
    { matchId: 20, firstPlayer: 'hirenbhuva', secondPlayer: 'donzzz1717' },
    { matchId: 21, firstPlayer: 'iceman', secondPlayer: 'arunpoddar' },
    { matchId: 22, firstPlayer: 'rot9999', secondPlayer: 'srinathbingi' },
    { matchId: 23, firstPlayer: 'lalrishav', secondPlayer: 'saurabhkumar' },
    { matchId: 24, firstPlayer: 'nik', secondPlayer: 'rashesh' },
    { matchId: 25, firstPlayer: 'karthik', secondPlayer: 'donzzz1717' },
    { matchId: 26, firstPlayer: 'harshil', secondPlayer: 'arunpoddar' },
    { matchId: 27, firstPlayer: 'hirenbhuva', secondPlayer: 'mpower99' },
    { matchId: 28, firstPlayer: 'iceman', secondPlayer: 'srinathbingi' },
    { matchId: 29, firstPlayer: 'rot9999', secondPlayer: 'rashesh' },
    { matchId: 30, firstPlayer: 'lalrishav', secondPlayer: 'nik' },
    { matchId: 31, firstPlayer: 'karthik', secondPlayer: 'arunpoddar' },
    { matchId: 32, firstPlayer: 'donzzz1717', secondPlayer: 'mpower99' },
    { matchId: 33, firstPlayer: 'harshil', secondPlayer: 'srinathbingi' },
    { matchId: 34, firstPlayer: 'hirenbhuva', secondPlayer: 'saurabhkumar' },
    { matchId: 35, firstPlayer: 'iceman', secondPlayer: 'rashesh' },
    { matchId: 36, firstPlayer: 'rot9999', secondPlayer: 'lalrishav' },
    { matchId: 37, firstPlayer: 'karthik', secondPlayer: 'mpower99' },
    { matchId: 38, firstPlayer: 'arunpoddar', secondPlayer: 'srinathbingi' },
    { matchId: 39, firstPlayer: 'donzzz1717', secondPlayer: 'saurabhkumar' },
    { matchId: 40, firstPlayer: 'harshil', secondPlayer: 'rashesh' },
    { matchId: 41, firstPlayer: 'hirenbhuva', secondPlayer: 'nik' },
    { matchId: 42, firstPlayer: 'iceman', secondPlayer: 'lalrishav' },
    { matchId: 43, firstPlayer: 'karthik', secondPlayer: 'srinathbingi' },
    { matchId: 44, firstPlayer: 'mpower99', secondPlayer: 'saurabhkumar' },
    { matchId: 45, firstPlayer: 'arunpoddar', secondPlayer: 'rashesh' },
    { matchId: 46, firstPlayer: 'donzzz1717', secondPlayer: 'nik' },
    { matchId: 47, firstPlayer: 'harshil', secondPlayer: 'lalrishav' },
    { matchId: 48, firstPlayer: 'hirenbhuva', secondPlayer: 'rot9999' },
    { matchId: 49, firstPlayer: 'karthik', secondPlayer: 'saurabhkumar' },
    { matchId: 50, firstPlayer: 'srinathbingi', secondPlayer: 'rashesh' },
    { matchId: 51, firstPlayer: 'mpower99', secondPlayer: 'nik' },
    { matchId: 52, firstPlayer: 'arunpoddar', secondPlayer: 'lalrishav' },
    { matchId: 53, firstPlayer: 'donzzz1717', secondPlayer: 'rot9999' },
    { matchId: 54, firstPlayer: 'hirenbhuva', secondPlayer: 'iceman' },
    { matchId: 55, firstPlayer: 'karthik', secondPlayer: 'rashesh' },
    { matchId: 56, firstPlayer: 'saurabhkumar', secondPlayer: 'nik' },
    { matchId: 57, firstPlayer: 'srinathbingi', secondPlayer: 'lalrishav' },
    { matchId: 58, firstPlayer: 'mpower99', secondPlayer: 'rot9999' },
    { matchId: 59, firstPlayer: 'donzzz1717', secondPlayer: 'iceman' },
    { matchId: 60, firstPlayer: 'harshil', secondPlayer: 'hirenbhuva' },
    { matchId: 61, firstPlayer: 'karthik', secondPlayer: 'nik' },
    { matchId: 62, firstPlayer: 'rashesh', secondPlayer: 'lalrishav' },
    { matchId: 63, firstPlayer: 'saurabhkumar', secondPlayer: 'rot9999' },
    { matchId: 64, firstPlayer: 'mpower99', secondPlayer: 'iceman' },
    { matchId: 65, firstPlayer: 'arunpoddar', secondPlayer: 'hirenbhuva' },
    { matchId: 66, firstPlayer: 'donzzz1717', secondPlayer: 'harshil' },
    { matchId: 67, firstPlayer: 'karthik', secondPlayer: 'lalrishav' },
    { matchId: 68, firstPlayer: 'nik', secondPlayer: 'rot9999' },
    { matchId: 69, firstPlayer: 'saurabhkumar', secondPlayer: 'iceman' },
    { matchId: 70, firstPlayer: 'srinathbingi', secondPlayer: 'hirenbhuva' },
    { matchId: 71, firstPlayer: 'mpower99', secondPlayer: 'harshil' },
    { matchId: 72, firstPlayer: 'arunpoddar', secondPlayer: 'donzzz1717' },
    { matchId: 73, firstPlayer: 'karthik', secondPlayer: 'rot9999' },
    { matchId: 74, firstPlayer: 'nik', secondPlayer: 'iceman' },
    { matchId: 75, firstPlayer: 'rashesh', secondPlayer: 'hirenbhuva' },
    { matchId: 76, firstPlayer: 'saurabhkumar', secondPlayer: 'harshil' },
    { matchId: 77, firstPlayer: 'srinathbingi', secondPlayer: 'donzzz1717' },
    { matchId: 78, firstPlayer: 'mpower99', secondPlayer: 'arunpoddar' }
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
    { name: 'arunpoddar', discordId: '1218564346821611643', discordUsername: 'arunpoddar' }
];

// Function to find user by name
function findUserByName(name) {
    return users.find((user)=>{
        console.log("inside find", user.name, name)
        console.log()
        return user => user.name === name
    });
}

// Function to generate JSON array for matches
function generateMatchesArray(matches, users) {
    const matchesArray = [];

    matches.forEach(match => {
        console.log(match.firstPlayer)
        console.log(match.secondPlayer)
        const firstPlayer = findUserByName(match.firstPlayer);
        const secondPlayer = findUserByName(match.secondPlayer);
        console.log("hello", match.matchId)
        console.log(firstPlayer, secondPlayer)
        if (true) {
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
        }else{
            matchesArray.push({});
        }
    });

    return matchesArray;
}

// Generate the JSON array for matches
const result = generateMatchesArray(matches, users);

// Convert the result to JSON string with double quotes around property names and string values
const jsonString = JSON.stringify(result, null, 2);

// Log the result
// console.log(jsonString);
