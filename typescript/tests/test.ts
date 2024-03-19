import { CreateTournament } from "../utility/createTournament"

const CustomTest = ()=>{
    const tournament = CreateTournament("pepsi cup", "unlimited", "dry", ["rishav", "adarsh","ankit"])
    console.log(tournament)
}

CustomTest()

