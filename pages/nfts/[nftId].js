import React, { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";

import Header from "../../components/Header";
import NFTImage from "../../components/nft/NFTImage";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import Purchase from "../../components/nft/Purchase";

const style = {
	wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
	container: `container p-6`,
	topContent: `flex`,
	nftImgContainer: `flex-1 mr-4`,
	detailsContainer: `flex-[2] ml-4`,
};

function Nft() {
	const { provider } = useWeb3();
	const [selectedNft, setSelectedNft] = useState();
	const [listings, setListings] = useState([]);
	const router = useRouter();

	const nftModule = useMemo(() => {
		if (!provider) return;

		const sdk = new ThirdwebSDK(
			provider.getSigner(),
			"https://eth-rinkeby.alchemyapi.io/v2/-0wgGIeeL9Oj-6FNKHGY-ambN4gyvtnJ"
		);
		return sdk.getNFTModule("0xc371900b5849276D77f67e36E48dB94D00f2dD61");
	}, [provider]);

	useEffect(() => {
		if (!nftModule) return;
		(async () => {
			const nfts = await nftModule.getAll();
			const selectedNftArray = nfts.find(
				(nft) => nft.id === router.query.nftId
			);
			setSelectedNft(selectedNftArray);
		})();
	}, [nftModule]);

	const marketPlaceModule = useMemo(() => {
		if (!provider) return;

		const sdk = new ThirdwebSDK(
			provider.getSigner(),
			"https://eth-rinkeby.alchemyapi.io/v2/-0wgGIeeL9Oj-6FNKHGY-ambN4gyvtnJ"
		);
		return sdk.getMarketplaceModule(
			"0x54B833726A97d36F2b89B02a2ae747A14FeC8794"
		);
	}, [provider]);

	useEffect(() => {
		if (!marketPlaceModule) return;
		(async () => {
			const Listings = await marketPlaceModule.getAllListings();
			setListings(Listings);
		})();
	}, [marketPlaceModule]);

	return (
		<div>
			<Header />
			<div className={style.wrapper}>
				<div className={style.container}>
					<div className={style.topContent}>
						<div className={style.nftImgContainer}>
							<NFTImage selectedNft={selectedNft} />
						</div>
						<div className={style.detailsContainer}>
							<GeneralDetails selectedNft={selectedNft} />
							<Purchase
								isListed={router.query.isListed}
								selectedNft={selectedNft}
								listings={listings}
								marketPlaceModule={marketPlaceModule}
							/>
						</div>
					</div>
					<ItemActivity />
				</div>
			</div>
		</div>
	);
}

export default Nft;
