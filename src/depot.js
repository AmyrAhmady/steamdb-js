const axios = require("axios");
const cherrio = require("cheerio");

class Depot {
    constructor(depotid, region = "us") {
        this._depotId = depotid;
        this._userRegion = region.toString();
        this._depotPageData = null;
        this._depotData = {
            info: {}
        };
    }

    async fetchData() {
        try {
            const result = await axios.get(
                'https://steamdb.info/depot/' + this._depotId + '/',
                {
                    headers: {
                        "Accept-language": "en-US,en;q=0.5",
                        "Cookie": "__Host-cc=" + this._userRegion,
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0"
                    },
                }).catch(error => {
                    console.error(error.message)
                })
            this._depotPageData = cherrio.load(result.data);
        } catch (e) {
            console.error(e.message)
        }
    }

    async parse() {
        let pageData = this._depotPageData;
        this._depotData.info = await this._parseDepotInformation(pageData);
        return this._depotData;
    }

    getBuildId() {
        return this._depotData.buildId;
    }

    getManifestId() {
        return this._depotData.manifestId;
    }

    getSize() {
        return this._depotData.size;
    }

    getDownloadSize() {
        return this._depotData.downloadSize;
    }

    getDepotInfo() {
        return this._depotData.info;
    }

    async _parseDepotInformation(pageData) {
        let depotInfo = {};
        await pageData('.table-hover > tbody > tr').each((_, element) => {
            let tableInfo = pageData(element).find('td').toArray();
            if (pageData(tableInfo[0]).text() == "Depot ID") {
                depotInfo.id = Number(pageData(tableInfo[1]).text());
            }
            else if (pageData(tableInfo[0]).text() == "Build ID") {
                depotInfo.buildId = Number(pageData(tableInfo[1]).text());
            }
            else if (pageData(tableInfo[0]).text() == "Manifest ID") {
                depotInfo.manifestId = Number(pageData(tableInfo[1]).text());
            }
            else if (pageData(tableInfo[0]).text() == "Creation date") {
                let rawTime = pageData(tableInfo[1]).text().replace("()", " ").trim().split(' – ');
                let time = new Date(rawTime[0] + ' ' + rawTime[1]);
                depotInfo.creationDate = time.getTime();
            }
            else if (pageData(tableInfo[0]).text() == "Last update") {
                let rawTime = pageData(tableInfo[1]).text().replace("()", " ").trim().split(' – ');
                let time = new Date(rawTime[0] + ' ' + rawTime[1]);
                depotInfo.lastUpdate = time.getTime();
            }
            else if (pageData(tableInfo[0]).text() == "Size on disk") {
                depotInfo.size = pageData(tableInfo[1]).text();
            }
            else if (pageData(tableInfo[0]).text() == "Download size") {
                depotInfo.downloadSize = pageData(tableInfo[1]).text().split('\n')[1];
            }
        });

        return depotInfo;
    }
}

module.exports = Depot;