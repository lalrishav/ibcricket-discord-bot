const { Client, GatewayIntentBits } = require("discord.js");
const { createCanvas } = require("canvas");
const Chart = require("chart.js");
const puppeteer = require("puppeteer");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
  console.log("recieved ", message.content);
  if (message.content === "!graph") {
    // Generate graph
    const canvas = createGraph();
    console.log("canvas is ", canvas);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const partnershipData = {
      overs: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      runs: [5, 12, 22, 35, 45, 58, 70, 82, 95, 110], // Runs scored
      wickets: [0, 0, 1, 1, 1, 2, 2, 2, 2, 3], // Number of wickets fallen
    };

    const partnershipsData = [
        { players: ['Player A', 'Player B'], runs: 50 },
        { players: ['Player C', 'Player D'], runs: 30 },
        { players: ['Player E', 'Player F'], runs: 60 }
    ];
    
    // Prepare labels and runs data for the chart
    const labels = partnershipsData.map(pair => pair.players.join(' - '));
    const runs = partnershipsData.map(pair => pair.runs);
    
    // Construct the URL for the chart using QuickChart.io
    const chartUrl = `https://quickchart.io/chart?c={type:'bar',data:{labels:${JSON.stringify(labels)},datasets:[{label:'Runs',data:${JSON.stringify(runs)}}]}}`;
    

    await page.goto(chartUrl);
    const screenshot = await page.screenshot();
    await message.channel.send({
      files: [{ attachment: screenshot, name: "screenshot.png" }],
    });
    await browser.close();
  }
});

function createGraph() {
  const chart = {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Retweets",
          data: [12, 5, 40, 5],
        },
        {
          label: "Likes",
          data: [80, 42, 215, 30],
        },
      ],
    },
  };
  const encodedChart = encodeURIComponent(JSON.stringify(chart));
  const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
  console.log("chart usrl is ", chartUrl);
  return chartUrl;
}

client.login(
);
