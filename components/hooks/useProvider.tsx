import { Provider } from "@project-serum/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useState } from "react";

// Set the network to devnet
const network = clusterApiUrl('devnet');

// Control how we want to acknowledge when a transaction is "done".
const opts = { preflightCommitment: 'processed'};

const useProvider = () => {
    const [provider, setProvider] = useState<Provider>();

    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new Provider(connection, window.solana, opts.preflightCommitment);
        setProvider(provider);
    }

    useEffect(() => {
        getProvider();
    },[])

    return provider;
}

export default useProvider;
