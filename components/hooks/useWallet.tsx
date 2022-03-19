import { useEffect, useState } from "react";

const useWallet = () => {
    const [account, setAccount] = useState('');
    const [error, setError] = useState('');

    const walletEventListers = () => {
        const { solana } = window;
        solana.on('connect', async () => {
            console.log('Connected');
        });
        solana.on('disconnect', () =>{
            console.log('Disconected');
            setAccount('');
            setError('');
        });
    };

    const isWallet = async () => {
        try {
            setError('');
            setAccount('');
            const { solana } = window;
            if (!solana?.isPhantom) return setError("Couldn't find phantom wallet");

            const walletAccount = await solana.connect({onlyIfTrusted: true});
            setAccount(walletAccount.publicKey.toString());
        } catch (err) {
            console.warn({ err });
            setError('Something went wrong')
        }
    };

    const onConnect = async () => {
        const { solana } = window;
        const walletAccount = await solana.connect();
        setAccount(walletAccount.publicKey.toString());
    };

    const onDisconnect = async () => {
        const { solana } = window;
        const res = await solana.disconnect();
        console.log({ res });
    };

    useEffect(() => {
        //* we are doing this because phantom wallet told us to do so, after dom fully loaded
        window.addEventListener('load', walletEventListers);
        window.addEventListener('load', isWallet);
        return () => {
            window.removeEventListener('load', isWallet);
            window.removeEventListener('load', walletEventListers);
        };
    }, []);

    return {account, error, onConnect, onDisconnect};
};

export default useWallet;
