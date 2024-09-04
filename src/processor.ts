
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { events } from "./abi/meme-forge";

export const MEME_FORGE_CONTRACT = "0xb5295bc6db0d542ef2c582024e44d97a87ff7dca".toLowerCase();


export const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/base-sepolia")
  .setRpcEndpoint({
    url: "https://sepolia.base.org",
    rateLimit: 10
  })
  .setFinalityConfirmation(75)
  .setFields({
    transaction: {
      hash: true
    },
    log: {
      data: true,
      topics: true
    }
  })
  .setBlockRange({
    from: 14_719_368
  })
  .addLog({
    address: [PUMP_FUN_CONTRACT],
    topic0: [
      events.Deployed.topic,
      events.Launched.topic,
      events.ETHSwappedForTokens.topic,
      events.TokenLaunched.topic,
      events.TokensSwappedForETH.topic
    ]
  });

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
