# steamdb-js

*a library to get information, prices from all regions, and screenshots of a game as JSON data*

## Installation

```
npm i --save steamdb-js
```
or if you are using yarn:
```
yarn add steamdb-js
```

## Usage/Example (CommonJS):
```js
const { Game } = require("steamdb-js");

async function main() {
    const game = new Game(271590);
    await game.fetchData();
    const data = await game.parse();
    //console.log(data); // This prints out all parsed data, you can use it for easier in-code usage
    console.log(game.getGameInfo());
}

main();
```

## Usage/Example (+ES5):
```js
import { Game } from "steamdb-js";

async function main() {
    const game = new Game(271590);
    await game.fetchData();
    const data = await game.parse();
    //console.log(data); // This prints out all parsed data, you can use it for easier in-code usage
    console.log(game.getGameInfo());
}

main();
```

### Output (JSON):
```json
{
    "id": 271590,
    "type": "Game",
    "name": "Grand Theft Auto V",
    "developer": "Rockstar North",
    "publisher": "Rockstar Games",
    "os": [
        "Windows"
    ],
    "lastUpdate": 1578987453000,
    "releaseDate": 1428966000000,
    "description":
        "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
    "logoUrl":
        "https://steamcdn-a.akamaihd.net/steam/apps/271590/header.jpg?t=1578987453"
}
```

## Methods:
```ts
class Game {
    /**
    * region is optional and default value is set to `us`
    */
    constructor(gameid: number, region?: string);
    /**
    * fetch game data from steamdb.info website using passed gameid in constructor
    */
    fetchData(): void;
    /**
    * parse all already-fetched data (must be used after calling `fetchData`)
    * @return return value is an object with all parsed data
    */
    parse(): object;
    /**
    * export an array of prices from all regions
    * @Note must be used after `parse()`
    * @return an array of price objects
    */
    getPrices(): Array<{ countryCode: string, currency: string, price: string, convertedPrice: string }>;
    /**
    * export an array of screenshots
    * @Note must be used after `parse()`
    * @return an array of screenshot urls
    */
    getScreenshots(): Array<string>;
    /**
    * export name of the game
    * @Note must be used after `parse()`
    * @return game name
    */
    getName(): string;
    /**
    * export description of the game
    * @Note must be used after `parse()`
    * @return game description
    */
    getDescription(): string;
    /**
    * export logo url of the game
    * @Note must be used after `parse()`
    * @return game logo url
    */
    getLogoUrl(): string;
    /**
    * export game full information
    * @Note must be used after `parse()`
    * @return game info
    */
    getGameInfo(): { name: string, id: number, type: string, description: string, developer: string, publisher: string, lastUpdate: number, releaseDate: number, logoUrl: string };
}
```

## TODO:
- finish search api, to be able to search using steamdb search engine and get game ids
- add an api for something like steamdb.info main page, showing stats of trend games