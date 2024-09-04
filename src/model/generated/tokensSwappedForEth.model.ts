import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class TokensSwappedForETH {
    constructor(props?: Partial<TokensSwappedForETH>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    token!: string

    @StringColumn_({nullable: false})
    pair!: string

    @StringColumn_({nullable: false})
    to!: string

    @StringColumn_({nullable: false})
    referree!: string

    @BigIntColumn_({nullable: false})
    amountIn!: bigint

    @BigIntColumn_({nullable: false})
    amountOut!: bigint

    @BigIntColumn_({nullable: false})
    newPrice!: bigint

    @BigIntColumn_({nullable: false})
    newMarketCap!: bigint

    @BigIntColumn_({nullable: false})
    newLiquidity!: bigint

    @BigIntColumn_({nullable: false})
    newVolume!: bigint

    @BigIntColumn_({nullable: false})
    newVolume24H!: bigint

    @BigIntColumn_({nullable: false})
    prevPrice!: bigint

    @DateTimeColumn_({nullable: false})
    lastUpdated!: Date

    @IntColumn_({nullable: false})
    blockNumber!: number

    @DateTimeColumn_({nullable: false})
    blockTimestamp!: Date

    @StringColumn_({nullable: false})
    transactionHash!: string
}
