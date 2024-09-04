import { TypeormDatabase } from "@subsquid/typeorm-store";
import {
  Deployed,
  Launched,
  ETHSwappedForTokens,
  TokenLaunched,
  TokensSwappedForETH
} from "./model";
import { processor, MEME_FORGE_CONTRACT } from "./processor";
import { events } from "./abi/pump-fun";

processor.run(new TypeormDatabase(), async (ctx) => {
  for (const c of ctx.blocks) {
    for (const e of c.logs) {
      if (e.address === MEME_FORGE_CONTRACT) {
        const transactionHash = e.transaction?.hash
          ? e.transaction.hash
          : e.block.hash;

        if (e.topics[0] === events.Deployed.topic) {
          console.log("Deployed event detected");
          const decodedEvent = events.Deployed.decode(e);
          const event = new Deployed({
            id: `0x${e.transaction?.hash}${e.transaction?.id}`,
            token: decodedEvent.token,
            amount0: decodedEvent.amount0,
            amount1: decodedEvent.amount1,
            transactionHash
          });
          await ctx.store.save(event);
        } else if (e.topics[0] === events.Launched.topic) {
          console.log("Launched event detected");
          const decodedEvent = events.Launched.decode(e);
          const event = new Launched({
            id: `0x${e.block.hash}${e.transaction?.id}`,
            token: decodedEvent.token,
            pair: decodedEvent.pair,
            param2: decodedEvent._2,
            blockNumber: c.header.height,
            blockTimestamp: new Date(Number(c.header.timestamp) * 1000),
            transactionHash
          });
          await ctx.store.save(event);
        } else if (e.topics[0] === events.ETHSwappedForTokens.topic) {
          console.log("ETHSwappedForTokens event detected");
          const decodedEvent = events.ETHSwappedForTokens.decode(e);
          const event = new ETHSwappedForTokens({
            id: `0x${e.block.hash}${e.transaction?.id}`,
            token: decodedEvent.token,
            pair: decodedEvent.pair,
            to: decodedEvent.to,
            referree: decodedEvent.referree,
            amountIn: decodedEvent.amountIn,
            amountOut: decodedEvent.amountOut,
            newPrice: decodedEvent.newPrice,
            newMarketCap: decodedEvent.newMarketCap,
            newLiquidity: decodedEvent.newLiquidity,
            newVolume: decodedEvent.newVolume,
            newVolume24H: decodedEvent.newVolume24H,
            prevPrice: decodedEvent.prevPrice,
            lastUpdated: new Date(Number(c.header.timestamp) * 1000),
            blockNumber: c.header.height,
            blockTimestamp: new Date(Number(c.header.timestamp) * 1000),
            transactionHash
          });
          await ctx.store.save(event);
        } else if (e.topics[0] === events.TokenLaunched.topic) {
          console.log("TokenLaunched event detected");
          const decodedEvent = events.TokenLaunched.decode(e);
          const event = new TokenLaunched({
            id: `0x${e.block.hash}${e.transaction?.id}`,
            creator: decodedEvent.creator,
            description: decodedEvent.description,
            image: decodedEvent.image,
            price: decodedEvent.price,
            prevPrice: decodedEvent.prevPrice,
            lastUpdated: new Date(Number(decodedEvent.lastUpdated) * 1000),
            liquidity: decodedEvent.liquidity,
            marketCap: decodedEvent.marketCap,
            name: decodedEvent.name,
            pair: decodedEvent.pair,
            supply: decodedEvent.supply,
            telegram: decodedEvent.telegram,
            ticker: decodedEvent.ticker,
            token: decodedEvent.token,
            twitter: decodedEvent.twitter,
            volume: decodedEvent.volume,
            volume24H: decodedEvent.volume24H,
            website: decodedEvent.website,
            youtube: decodedEvent.youtube,
            blockNumber: c.header.height,
            blockTimestamp: new Date(Number(c.header.timestamp) * 1000),
            transactionHash
          });
          await ctx.store.save(event);
        } else if (e.topics[0] === events.TokensSwappedForETH.topic) {
          console.log("TokensSwappedForETH event detected");
          const decodedEvent = events.TokensSwappedForETH.decode(e);
          const event = new TokensSwappedForETH({
            id: `0x${e.block.hash}${e.transaction?.id}`,
            token: decodedEvent.token,
            pair: decodedEvent.pair,
            to: decodedEvent.to,
            referree: decodedEvent.referree,
            amountIn: decodedEvent.amountIn,
            amountOut: decodedEvent.amountOut,
            newPrice: decodedEvent.newPrice,
            newMarketCap: decodedEvent.newMarketCap,
            newLiquidity: decodedEvent.newLiquidity,
            newVolume: decodedEvent.newVolume,
            newVolume24H: decodedEvent.newVolume24H,
            prevPrice: decodedEvent.prevPrice,
            lastUpdated: new Date(Number(decodedEvent.lastUpdated) * 1000),
            transactionHash
          });
          await ctx.store.save(event);
        }
      }
    }
  }
});
