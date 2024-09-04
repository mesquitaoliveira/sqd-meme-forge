module.exports = class Data1725292458103 {
    name = 'Data1725292458103'

    async up(db) {
        await db.query(`CREATE TABLE "deployed" ("id" character varying NOT NULL, "token" text NOT NULL, "amount0" numeric NOT NULL, "amount1" numeric NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_0a97a70959f7ac24a3dddc98c43" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "eth_swapped_for_tokens" ("id" character varying NOT NULL, "token" text NOT NULL, "pair" text NOT NULL, "to" text NOT NULL, "referree" text NOT NULL, "amount_in" numeric NOT NULL, "amount_out" numeric NOT NULL, "new_price" numeric NOT NULL, "new_market_cap" numeric NOT NULL, "new_liquidity" numeric NOT NULL, "new_volume" numeric NOT NULL, "new_volume24_h" numeric NOT NULL, "prev_price" numeric NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_0f48365f1e9bb8d3046c329e335" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "launched" ("id" character varying NOT NULL, "token" text NOT NULL, "pair" text NOT NULL, "param2" numeric NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_75b67913d7dabbdafd1bafde6d5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "token_launched" ("id" character varying NOT NULL, "token" text NOT NULL, "pair" text NOT NULL, "creator" text NOT NULL, "name" text NOT NULL, "ticker" text NOT NULL, "description" text NOT NULL, "image" text NOT NULL, "twitter" text NOT NULL, "telegram" text NOT NULL, "youtube" text NOT NULL, "website" text NOT NULL, "supply" numeric NOT NULL, "price" numeric NOT NULL, "market_cap" numeric NOT NULL, "liquidity" numeric NOT NULL, "volume" numeric NOT NULL, "volume24_h" numeric NOT NULL, "prev_price" numeric NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_072c30d34608cd41f0d299117f8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "tokens_swapped_for_eth" ("id" character varying NOT NULL, "token" text NOT NULL, "pair" text NOT NULL, "to" text NOT NULL, "referree" text NOT NULL, "amount_in" numeric NOT NULL, "amount_out" numeric NOT NULL, "new_price" numeric NOT NULL, "new_market_cap" numeric NOT NULL, "new_liquidity" numeric NOT NULL, "new_volume" numeric NOT NULL, "new_volume24_h" numeric NOT NULL, "prev_price" numeric NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_5c0d9be320443f706fe3b75c153" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "deployed"`)
        await db.query(`DROP TABLE "eth_swapped_for_tokens"`)
        await db.query(`DROP TABLE "launched"`)
        await db.query(`DROP TABLE "token_launched"`)
        await db.query(`DROP TABLE "tokens_swapped_for_eth"`)
    }
}
