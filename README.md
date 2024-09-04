### Documentation for Data Indexing Using Subsquid

This project uses Subsquid to index events from the **Pump Fun** smart contract, which handles tokens and transactions on the blockchain. Through this indexing process, relevant event data such as token creation, launches, and swaps are stored in a relational database for easier querying and analysis.

#### Dependencies

Make sure the following tools are installed:

- **Node.js** v16 or higher
- **Git**
- **Docker**
- **Subsquid CLI** (`@subsquid/cli`)

### Project Structure

The main indexing code is defined in the `processor.ts` file. The Subsquid processor monitors blockchain blocks and, upon identifying relevant events from the **Pump Fun** contract, decodes the data and stores it in a database using TypeORM.

#### Monitored Events:

- **Deployed**: Represents the creation of a new token.
- **Launched**: Refers to the launch of a token on the market.
- **ETHSwappedForTokens**: Indicates a transaction where ETH was swapped for tokens.
- **TokenLaunched**: Detailed information about a launched token, such as price, liquidity, and social media links.
- **TokensSwappedForETH**: Indicates a transaction where tokens were swapped for ETH.

### Example Code

```typescript
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Deployed, Launched, ETHSwappedForTokens, TokenLaunched, TokensSwappedForETH } from "./model";
import { processor, MEME_FORGE_CONTRACT } from "./processor";
import { events } from "./abi/meme-forge";

processor.run(new TypeormDatabase(), async (ctx) => {
  for (const c of ctx.blocks) {
    for (const e of c.logs) {
      if (e.address === MEME_FORGE_CONTRACT) {
        const transactionHash = e.transaction?.hash ? e.transaction.hash : e.block.hash;

        if (e.topics[0] === events.Deployed.topic) {
          const decodedEvent = events.Deployed.decode(e);
          const event = new Deployed({
            id: `0x${e.transaction?.hash}${e.transaction?.id}`,
            token: decodedEvent.token,
            amount0: decodedEvent.amount0,
            amount1: decodedEvent.amount1,
            transactionHash,
          });
          await ctx.store.save(event);
        }
        // Similar implementation for other events
      }
    }
  }
});
```

#### Technical Details

- **Processor**: Subsquid monitors blockchain blocks and processes event logs based on specific topics. Each event is identified by `topics[0]`, which determines which decoding function will be used.
  
- **Storage**: Events are stored in a database using TypeORM. The data model is defined in entity files such as `Deployed`, `Launched`, etc.

- **Timestamps and Blocks**: For each event, along with the main data, the block height (`blockNumber`), block timestamp (`blockTimestamp`), and transaction hash (`transactionHash`) are also stored.

---
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/mesquitaoliveira/sqd-meme-forge/tree/master)

---

### Steps to Start the Project

1. **Install Subsquid CLI**:
   Run the following command to install Subsquid CLI globally:
   ```bash
   npm i -g @subsquid/cli
   ```

2. **Clone the project repository**:
   Clone the project from GitHub and navigate to the directory:
   ```bash
   git clone https://github.com/mesquitaoliveira/sqd-meme-forge.git
   cd sqd-meme-forge
   ```

3. **Install dependencies**:
   Inside the project directory, run:
   ```bash
   npm ci
   ```

4. **Start the Postgres database container**:
   Start the database in a Docker container and run it in the background:
   ```bash
   sqd up
   ```

5. **Build the Squid**:
   To compile the project, run:
   ```bash
   sqd build
   ```

6. **Run the processor and GraphQL server**:
   To run both the indexer and the GraphQL server, execute:
   ```bash
   sqd run .
   ```
   The GraphiQL playground will be available at `http://localhost:4350/graphql`.

#### Additional Commands

- **Run only the processor**:
  ```bash
  sqd process
  ```

- **Run only the GraphQL server**:
  ```bash
  sqd serve
  ```

#### Development Workflow

1. **Define the database schema**:
   Define the database structure in the `schema.graphql` file.

2. **Generate TypeORM classes**:
   After defining the schema, generate the classes with the following command:
   ```bash
   sqd codegen
   ```

3. **Generate database migrations**:
   To apply changes to the database, generate migrations with:
   ```bash
   sqd migration:generate
   ```

4. **Import ABI and generate interfaces**:
   Place the ABI JSON file in the `./abi` directory and generate the interfaces to decode EVM logs:
   ```bash
   sqd typegen
   ```

5. Example Query:
```graphql
query TokenDataquery($token: String!) {
    ethSwappedForTokens(
      where: { token_eq: $token }
      orderBy: id_DESC
      limit: 1
    ) {
      newVolume24H
      newLiquidity
      newPrice
    }
    tokenLauncheds(where: { token_eq: $token }) {
      name
      ticker
      image
      creator
      supply
      twitter
      youtube
      telegram
      website
    }
  }
```	

Query Variables:
```json
{
	"token": "0xfcfb6ba28dafeaa4983ef28d6d739f650f05ce17"
}
```
Result:
```json
{
	"data": {
		"ethSwappedForTokens": [
			{
				"newVolume24H": "90000000",
				"newLiquidity": "500000180000000",
				"newPrice": "99999999"
			}
		],
		"tokenLauncheds": [
			{
				"name": "The Animal",
				"ticker": "THEAN",
				"image": "QmcLnPrZmJzD2MG44fVtnwbaLk6V4URU4BmVikWcbLT5Ae",
				"creator": "0x3ed267ecb07a714dc590cb89748989e57afe6e04",
				"supply": "100000000000000000000000000",
				"twitter": "",
				"youtube": "",
				"telegram": "",
				"website": ""
			}
		]
	}
}
```

#### Final Considerations

- **Database Migrations**: Migrations are automatically generated and applied through files located in `db/migrations`.
- **Environment Variables Configuration**: Subsquid tools refer to the `.env` file for environment variables.

Now, you can start indexing smart contract data using Subsquid and query it directly through the GraphQL server.


> ⚠️ **Warning**: 😅 There is a known bug with the `timestamp` data type in this project. Please ensure that any operations involving timestamps are thoroughly tested and handled carefully to avoid inconsistencies in data processing.


Example:

````graphql
query TokenDataquery($token: String!) {
    ethSwappedForTokens(
      where: { token_eq: $token }
      orderBy: id_DESC
      limit: 1
    ) {
      newVolume24H
      newLiquidity
      newPrice
		blockTimestamp # 🐛 Bug with timestamp data type 
    }
    tokenLauncheds(where: { token_eq: $token }) {
      name
      ticker
      image
      creator
      supply
      twitter
      youtube
      telegram
      website
    }
  }
```
Query Variables:
```json
{
	"token": "0xfcfb6ba28dafeaa4983ef28d6d739f650f05ce17"
}
```	
Result:
```json
{
	"errors": [
		{
			"message": "Not a DateTime: 56644-03-15T08:40:00.000000Z",
			"locations": [
				{
					"line": 10,
					"column": 5
				}
			],
			"path": [
				"ethSwappedForTokens",
				0,
				"blockTimestamp"
			],
			"extensions": {
				"code": "INTERNAL_SERVER_ERROR",
				"exception": {
					"stacktrace": [
						"TypeError: Not a DateTime: 56644-03-15T08:40:00.000000Z",
						"    at invalidFormat (/squid/node_modules/@subsquid/openreader/lib/util/util.js:32:12)",
						"    at GraphQLScalarType.serialize (/squid/node_modules/@subsquid/openreader/lib/scalars/DateTime.js:15:48)",
						"    at completeLeafValue (/squid/node_modules/graphql/execution/execute.js:664:37)",
						"    at completeValue (/squid/node_modules/graphql/execution/execute.js:589:12)",
						"    at completeValue (/squid/node_modules/graphql/execution/execute.js:567:21)",
						"    at resolveField (/squid/node_modules/graphql/execution/execute.js:483:19)",
						"    at executeFields (/squid/node_modules/graphql/execution/execute.js:293:20)",
						"    at collectAndExecuteSubfields (/squid/node_modules/graphql/execution/execute.js:759:10)",
						"    at completeObjectValue (/squid/node_modules/graphql/execution/execute.js:749:10)",
						"    at completeValue (/squid/node_modules/graphql/execution/execute.js:601:12)"
					]
				}
			}
		}
	],
	"data": null
}
```