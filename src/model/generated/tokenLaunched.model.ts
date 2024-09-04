import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class TokenLaunched {
    constructor(props?: Partial<TokenLaunched>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    token!: string

    @StringColumn_({nullable: false})
    pair!: string

    @StringColumn_({nullable: false})
    creator!: string

    @StringColumn_({nullable: false})
    name!: string

    @StringColumn_({nullable: false})
    ticker!: string

    @StringColumn_({nullable: false})
    description!: string

    @StringColumn_({nullable: false})
    image!: string

    @StringColumn_({nullable: false})
    twitter!: string

    @StringColumn_({nullable: false})
    telegram!: string

    @StringColumn_({nullable: false})
    youtube!: string

    @StringColumn_({nullable: false})
    website!: string

    @BigIntColumn_({nullable: false})
    supply!: bigint

    @BigIntColumn_({nullable: false})
    price!: bigint

    @BigIntColumn_({nullable: false})
    marketCap!: bigint

    @BigIntColumn_({nullable: false})
    liquidity!: bigint

    @BigIntColumn_({nullable: false})
    volume!: bigint

    @BigIntColumn_({nullable: false})
    volume24H!: bigint

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
