import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Deployed: event("0x540bcec33387745b2ced30977dcfe4a623a245511eb0a133989c27c8bb95b4a9", "Deployed(address,uint256,uint256)", {"token": indexed(p.address), "amount0": p.uint256, "amount1": p.uint256}),
    ETHSwappedForTokens: event("0xf26c4825b7ed7c97192937eb8cec85119228ed9a92ee5843cd343510a85dac7a", "ETHSwappedForTokens(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)", {"token": indexed(p.address), "pair": indexed(p.address), "to": p.address, "referree": p.address, "amountIn": p.uint256, "amountOut": p.uint256, "newPrice": p.uint256, "newMarketCap": p.uint256, "newLiquidity": p.uint256, "newVolume": p.uint256, "newVolume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}),
    Launched: event("0x714aa39317ad9a7a7a99db52b44490da5d068a0b2710fffb1a1282ad3cadae1f", "Launched(address,address,uint256)", {"token": indexed(p.address), "pair": indexed(p.address), "_2": p.uint256}),
    TokenLaunched: event("0xf9d6952b606cd3f63d7b7e1f46006c888f0a56d6782f2b018d63dddf22373646", "TokenLaunched(address,address,address,string,string,string,string,string,string,string,string,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)", {"token": indexed(p.address), "pair": indexed(p.address), "creator": p.address, "name": p.string, "ticker": p.string, "description": p.string, "image": p.string, "twitter": p.string, "telegram": p.string, "youtube": p.string, "website": p.string, "supply": p.uint256, "price": p.uint256, "marketCap": p.uint256, "liquidity": p.uint256, "volume": p.uint256, "volume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}),
    TokensSwappedForETH: event("0x3e34b71611cf5734775d9bb8cda0521d8ece6accc1d9768b9feb6e8c973fb1f4", "TokensSwappedForETH(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)", {"token": indexed(p.address), "pair": indexed(p.address), "to": p.address, "referree": p.address, "amountIn": p.uint256, "amountOut": p.uint256, "newPrice": p.uint256, "newMarketCap": p.uint256, "newLiquidity": p.uint256, "newVolume": p.uint256, "newVolume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}),
}

export const functions = {
    approval: fun("0x5c52a5f2", "approval(address,address,uint256)", {"_user": p.address, "_token": p.address, "amount": p.uint256}, p.bool),
    deploy: fun("0x4c96a389", "deploy(address)", {"tk": p.address}, ),
    feeTo: viewFun("0x017e7e58", "feeTo()", {}, p.address),
    feeToSetter: viewFun("0x094b7415", "feeToSetter()", {}, p.address),
    getTokens: viewFun("0xaa6ca808", "getTokens()", {}, p.array(p.struct({"creator": p.address, "token": p.address, "pair": p.address, "data": p.struct({"token": p.address, "name": p.string, "ticker": p.string, "supply": p.uint256, "price": p.uint256, "marketCap": p.uint256, "liquidity": p.uint256, "_liquidity": p.uint256, "volume": p.uint256, "volume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}), "description": p.string, "image": p.string, "twitter": p.string, "telegram": p.string, "youtube": p.string, "website": p.string, "trading": p.bool, "tradingOnUniswap": p.bool}))),
    getUserTokens: viewFun("0x8a664ebc", "getUserTokens()", {}, p.array(p.struct({"creator": p.address, "token": p.address, "pair": p.address, "data": p.struct({"token": p.address, "name": p.string, "ticker": p.string, "supply": p.uint256, "price": p.uint256, "marketCap": p.uint256, "liquidity": p.uint256, "_liquidity": p.uint256, "volume": p.uint256, "volume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}), "description": p.string, "image": p.string, "twitter": p.string, "telegram": p.string, "youtube": p.string, "website": p.string, "trading": p.bool, "tradingOnUniswap": p.bool}))),
    launch: fun("0xad256f7d", "launch(string,string,string,string,string[4],uint256,uint256)", {"_name": p.string, "_ticker": p.string, "desc": p.string, "img": p.string, "urls": p.fixedSizeArray(p.string, 4), "_supply": p.uint256, "maxTx": p.uint256}, {"_0": p.address, "_1": p.address, "_2": p.uint256}),
    launchFee: viewFun("0xcf3cf573", "launchFee()", {}, p.uint256),
    liquidityFee: viewFun("0x98118cb4", "liquidityFee()", {}, p.uint256),
    marketCapLimit: viewFun("0x80997e47", "marketCapLimit()", {}, p.uint256),
    profile: viewFun("0x9dd9d0fd", "profile(address)", {"_0": p.address}, p.address),
    profiles: viewFun("0xc36fe3d6", "profiles(uint256)", {"_0": p.uint256}, p.address),
    setFeeTo: fun("0xf46901ed", "setFeeTo(address)", {"fee_to": p.address}, ),
    swapETHForTokens: fun("0x57f8d901", "swapETHForTokens(address,address,address)", {"tk": p.address, "to": p.address, "referree": p.address}, p.bool),
    swapTokensForETH: fun("0x512b1e6e", "swapTokensForETH(uint256,address,address,address)", {"amountIn": p.uint256, "tk": p.address, "to": p.address, "referree": p.address}, p.bool),
    token: viewFun("0x6d46a1db", "token(address)", {"_0": p.address}, {"creator": p.address, "token": p.address, "pair": p.address, "data": p.struct({"token": p.address, "name": p.string, "ticker": p.string, "supply": p.uint256, "price": p.uint256, "marketCap": p.uint256, "liquidity": p.uint256, "_liquidity": p.uint256, "volume": p.uint256, "volume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}), "description": p.string, "image": p.string, "twitter": p.string, "telegram": p.string, "youtube": p.string, "website": p.string, "trading": p.bool, "tradingOnUniswap": p.bool}),
    tokens: viewFun("0x4f64b2be", "tokens(uint256)", {"_0": p.uint256}, {"creator": p.address, "token": p.address, "pair": p.address, "data": p.struct({"token": p.address, "name": p.string, "ticker": p.string, "supply": p.uint256, "price": p.uint256, "marketCap": p.uint256, "liquidity": p.uint256, "_liquidity": p.uint256, "volume": p.uint256, "volume24H": p.uint256, "prevPrice": p.uint256, "lastUpdated": p.uint256}), "description": p.string, "image": p.string, "twitter": p.string, "telegram": p.string, "youtube": p.string, "website": p.string, "trading": p.bool, "tradingOnUniswap": p.bool}),
    updateLaunchFee: fun("0x7660f44a", "updateLaunchFee(uint256)", {"_fee": p.uint256}, p.uint256),
}

export class Contract extends ContractBase {

    feeTo() {
        return this.eth_call(functions.feeTo, {})
    }

    feeToSetter() {
        return this.eth_call(functions.feeToSetter, {})
    }

    getTokens() {
        return this.eth_call(functions.getTokens, {})
    }

    getUserTokens() {
        return this.eth_call(functions.getUserTokens, {})
    }

    launchFee() {
        return this.eth_call(functions.launchFee, {})
    }

    liquidityFee() {
        return this.eth_call(functions.liquidityFee, {})
    }

    marketCapLimit() {
        return this.eth_call(functions.marketCapLimit, {})
    }

    profile(_0: ProfileParams["_0"]) {
        return this.eth_call(functions.profile, {_0})
    }

    profiles(_0: ProfilesParams["_0"]) {
        return this.eth_call(functions.profiles, {_0})
    }

    token(_0: TokenParams["_0"]) {
        return this.eth_call(functions.token, {_0})
    }

    tokens(_0: TokensParams["_0"]) {
        return this.eth_call(functions.tokens, {_0})
    }
}

/// Event types
export type DeployedEventArgs = EParams<typeof events.Deployed>
export type ETHSwappedForTokensEventArgs = EParams<typeof events.ETHSwappedForTokens>
export type LaunchedEventArgs = EParams<typeof events.Launched>
export type TokenLaunchedEventArgs = EParams<typeof events.TokenLaunched>
export type TokensSwappedForETHEventArgs = EParams<typeof events.TokensSwappedForETH>

/// Function types
export type ApprovalParams = FunctionArguments<typeof functions.approval>
export type ApprovalReturn = FunctionReturn<typeof functions.approval>

export type DeployParams = FunctionArguments<typeof functions.deploy>
export type DeployReturn = FunctionReturn<typeof functions.deploy>

export type FeeToParams = FunctionArguments<typeof functions.feeTo>
export type FeeToReturn = FunctionReturn<typeof functions.feeTo>

export type FeeToSetterParams = FunctionArguments<typeof functions.feeToSetter>
export type FeeToSetterReturn = FunctionReturn<typeof functions.feeToSetter>

export type GetTokensParams = FunctionArguments<typeof functions.getTokens>
export type GetTokensReturn = FunctionReturn<typeof functions.getTokens>

export type GetUserTokensParams = FunctionArguments<typeof functions.getUserTokens>
export type GetUserTokensReturn = FunctionReturn<typeof functions.getUserTokens>

export type LaunchParams = FunctionArguments<typeof functions.launch>
export type LaunchReturn = FunctionReturn<typeof functions.launch>

export type LaunchFeeParams = FunctionArguments<typeof functions.launchFee>
export type LaunchFeeReturn = FunctionReturn<typeof functions.launchFee>

export type LiquidityFeeParams = FunctionArguments<typeof functions.liquidityFee>
export type LiquidityFeeReturn = FunctionReturn<typeof functions.liquidityFee>

export type MarketCapLimitParams = FunctionArguments<typeof functions.marketCapLimit>
export type MarketCapLimitReturn = FunctionReturn<typeof functions.marketCapLimit>

export type ProfileParams = FunctionArguments<typeof functions.profile>
export type ProfileReturn = FunctionReturn<typeof functions.profile>

export type ProfilesParams = FunctionArguments<typeof functions.profiles>
export type ProfilesReturn = FunctionReturn<typeof functions.profiles>

export type SetFeeToParams = FunctionArguments<typeof functions.setFeeTo>
export type SetFeeToReturn = FunctionReturn<typeof functions.setFeeTo>

export type SwapETHForTokensParams = FunctionArguments<typeof functions.swapETHForTokens>
export type SwapETHForTokensReturn = FunctionReturn<typeof functions.swapETHForTokens>

export type SwapTokensForETHParams = FunctionArguments<typeof functions.swapTokensForETH>
export type SwapTokensForETHReturn = FunctionReturn<typeof functions.swapTokensForETH>

export type TokenParams = FunctionArguments<typeof functions.token>
export type TokenReturn = FunctionReturn<typeof functions.token>

export type TokensParams = FunctionArguments<typeof functions.tokens>
export type TokensReturn = FunctionReturn<typeof functions.tokens>

export type UpdateLaunchFeeParams = FunctionArguments<typeof functions.updateLaunchFee>
export type UpdateLaunchFeeReturn = FunctionReturn<typeof functions.updateLaunchFee>

