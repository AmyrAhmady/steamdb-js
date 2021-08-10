/// <reference types="node" />

export class Game {
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

export class Depot {
    /**
     * region is optional and default value is set to `us`
     */
   constructor(depotid: number, region?: string);
   /**
    * fetch depot data from steamdb.info website using passed depotid in constructor
    */
   fetchData(): void;
   /**
    * pase all already-fetched data (must be used after calling `fetchData`)
    * @return return value is an object with all parsed data
    */
   parse(): object;
   /**
    * export build id of depot
    * @Note must be used after `parse()`
    * @return build id
    */
   getBuildId(): string;
   /**
    * export manifest id of depot
    * @Note must be used after `parse()`
    * @return manifest id
    */
   getManifestId(): string;
   /**
    * export depot size on disk
    * @Note must be used after `parse()`
    * @return depot size on disk
    */
   getSize(): string;
   /**
    * export download size
    * @Note must be used after `parse()`
    * @return depot download size
    */
   getDownloadSize(): string;
   /**
    * export full depot information
    * @Note must be used after `parse()`
    * @return depot info
    */
   getDepotInfo(): { id: string, buildId: string, manifestId: string, creationDate: number, lastUpdate: number, size: string, downloadSize: string };
}

declare module 'steamdb-js';