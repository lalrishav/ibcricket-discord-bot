const {CreateTournament} = require("../utility/tournament/tournament")
const {StartTournament} = require("../utility/start-tournament/startTournament")

const CustomTest = ()=>{
    const tournament = StartTournament("1")
    console.log(tournament)
}

CustomTest()

