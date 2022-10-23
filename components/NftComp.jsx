import React, { Fragment } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { NftUsersTokens } from "../graphql/query";
import { useRouter } from "next/router";
import Link from "next/link";

const NftComp = () => {
    const router = useRouter();
    const {id} = router.query;
    const { data, loading } = useQuery(NftUsersTokens, { variables: { owners: [id], network: "ETHEREUM_MAINNET", minEstimatedValueUsd:0, first: 24, collections:[]}});
    return (
        <Fragment>
            <div className="card-wrapper px-8 py-6 bg-white mb-10">
                {(!data || !data.nftUsersTokens.edges.length) && <div className="font-semibold flex items-center justify-center">No NFTs Found</div>}
                <div className="flex justify-between flex-wrap">
                    {data?.nftUsersTokens?.edges.map(token=>{
                        {console.log(token)}
                        return (
                            // <Link href={`/nft/${token.token.collection.network.split('_')[0].toLowerCase()}/${token.token.collection.address}/${token.token.tokenId}`} key={token.token?.tokenId} className="cursor-pointer">
                                <div className="nft-card p-2.5 my-4 dark:bg-black" key={token.token?.tokenId}>
                                    <img src={token?.token?.medias[0]?.url ? token.token.medias[0].url : `/images/nft-image.svg`} width={218} height={218} alt='' className="rounded-lg min-h-[218px] max-h-[218px]"/>
                                    <div className="mb-4 font-medium tokenid-nft">#{token.token?.tokenId}</div>
                                    <div className="flex justify-between">
                                        <div className="">
                                            <div className="text-xl font-semibold text-black">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(token.token?.estimatedValueEth)}</div>
                                            <div className="text-xs">{token.token?.lastSaleEth} ETH</div>
                                        </div>
                                        <Image src={`/images/export-icon.svg`} width={16} height={16} alt='' />
                                    </div>
                                </div>
                            // </Link>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default NftComp;
