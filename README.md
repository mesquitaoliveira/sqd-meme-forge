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

#### Final Considerations

- **Database Migrations**: Migrations are automatically generated and applied through files located in `db/migrations`.
- **Environment Variables Configuration**: Subsquid tools refer to the `.env` file for environment variables.

Now, you can start indexing smart contract data using Subsquid and query it directly through the GraphQL server.
