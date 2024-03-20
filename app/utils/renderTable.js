const getFixtureTable = (fixtures)=>{
    return {
        "title": "Fixtures",
        "columns": [
            {
                "title": "Match Number",
                "dataIndex": "matchNumber",
                "width": 200,
            },
            {
                "title": "Player 1",
                "dataIndex": "firstPlayer",
                "width": 200,
            },
            {
                "title": "Player 2",
                "dataIndex": "secondPlayer",
                "width": 200,
            },
            {
                "title": "Status",
                "dataIndex": "status",
                "width": 200,
            },
            {
                "title": "Result",
                "dataIndex": "result",
                "width": 200,
            }
        ],
        "dataSource": fixtures
    }
}

module.exports = {getFixtureTable}