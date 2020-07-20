import axios from "axios";
import cheerio from "cheerio";

export default class Game {
    constructor(gameid, region = "us") {
        this._gameId = gameid;
        this._userRegion = region.toString();
        this._gamePageData = null;
        this._gameData = {
            info: {},
            prices: [],
            screenshots: []
        };
    }

    async fetchData() {
        const result = await axios.get(
            'https://steamdb.info/app/' + this._gameId + '/',
            {
                headers: {
                    "Accept-language": "en-US,en;q=0.5",
                    "Cookie": "__Host-cc=" + this._userRegion,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0"
                },
            });
        this._gamePageData = cheerio.load(result.data);
    }

    async parse() {
        let pageData = this._gamePageData;
        this._gameData.info = await this._parseGameInformation(pageData);
        this._gameData.prices = await this._parsePrices(pageData);
        this._gameData.screenshots = await this._parseScreenshots(pageData);
        return this._gameData;
    }

    getPrices() {
        return this._gameData.prices;
    }

    getScreenshots() {
        return this._gameData.screenshots;
    }

    getName() {
        return this._gameData.info.name;
    }

    getDescription() {
        return this._gameData.info.description;
    }

    getLogoUrl() {
        return this._gameData.info.logoUrl;
    }

    getGameInfo() {
        return this._gameData.info;
    }

    async _parseGameInformation(pageData) {
        let gameInfo = {};
        await pageData('.table-dark > tbody > tr').each((_, element) => {
            let tableInfo = pageData(element).find('td').toArray();
            if (pageData(tableInfo[0]).text() == "App ID") {
                gameInfo.id = Number(pageData(tableInfo[1]).text());
            }
            else if (pageData(tableInfo[0]).text() == "App Type") {
                gameInfo.type = pageData(tableInfo[1]).text();
            }
            else if (pageData(tableInfo[0]).text() == "Developer") {
                gameInfo.developer = pageData(tableInfo[1]).text();
            }
            else if (pageData(tableInfo[0]).text() == "Publisher") {
                gameInfo.publisher = pageData(tableInfo[1]).text();
            }
            else if (pageData(tableInfo[0]).text() == "Last Record Update") {
                let time = new Date(pageData(tableInfo[1]).find("span").attr("title"));
                gameInfo.lastUpdate = time.getTime();
            }
            else if (pageData(tableInfo[0]).text() == "Name") {
                gameInfo.name = pageData(tableInfo[1]).text();
            }
            else if (pageData(tableInfo[0]).text() == "Release Date") {
                let time = new Date(pageData(tableInfo[1]).find("span").attr("title"));
                gameInfo.releaseDate = time.getTime();
            }
            else if (pageData(tableInfo[0]).text() == "Supported Systems") {
                let supportedSystems = pageData(tableInfo[1]).find("meta").attr("content").split(', ');
                gameInfo.os = supportedSystems;
            }
        });

        gameInfo.description = await pageData('p[class="header-description"]').text();
        gameInfo.logoUrl = await pageData('img[class="app-logo"]').attr("src");

        return gameInfo;
    }

    async _parsePrices(pageData) {
        let prices = [];
        await pageData(".table-prices > tbody > tr").each((_, element) => {
            let regionInfo = pageData(element).find("td").toArray();
            let _obj = {};
            _obj.countryCode = pageData(regionInfo[0]).attr("data-cc");
            _obj.currency = pageData(regionInfo[0]).text().replace("\n ", "").replace("\n", "");
            _obj.price = pageData(regionInfo[1]).text();
            _obj.convertedPrice = pageData(regionInfo[2]).text();
            prices.push(_obj);
        })
        return prices;
    }

    async _parseScreenshots(pageData) {
        let screenshots = [];
        await pageData('div[id="screenshots"]').find("a").each((_, element) => {
            screenshots.push(pageData(element).attr("href"));
        })
        return screenshots;
    }
}