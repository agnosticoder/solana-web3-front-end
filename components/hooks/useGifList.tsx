import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import useProgram from "./usePrgram";
import baseAccountKeys from "../../lib/baseAccount";
import useProvider from "./useProvider";
import { web3, IdlTypes, Idl } from "@project-serum/anchor";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl";

const {SystemProgram} = web3;

const useGifList = (account: string, gifURL: string, setGifURL: Dispatch<SetStateAction<string>>) => {
    const [baseAccount, setBaseAccount] = useState<TypeDef<IdlTypeDef, IdlTypes<Idl>> | null>();
    const program = useProgram();
    const provider = useProvider();

    const getBaseAccount = async () => {
        try {
            if (!program) return;
            const account = await program.account.baseAccount.fetch(baseAccountKeys.publicKey);
            setBaseAccount(account);
        } catch (err) {
            setBaseAccount(null);
            console.warn('Account Not Found');
            console.error({err});
        }
    };


    const onAddGif = async (e: FormEvent) => {
        e.preventDefault();
        if(gifURL.length === 0) return console.log('No Gif Link Given');
        console.log('Gif URL: ', gifURL);
        try{
            if(!program || !provider) return;
            const tx = await program.rpc.addGif(gifURL,{
                accounts: {
                    baseAccount: baseAccountKeys.publicKey,
                    user: provider.wallet.publicKey,
                }
            });
            getBaseAccount();
            console.log('Created Base Account with Txn:  😘 ', tx);
            console.log('Everything went good so far 😘 🛏');
        }catch(err){
            console.error({err});
        }
        setGifURL('');
    };

    const createBaseAccount = async () => {
        try{
            if(!program || !provider) return;
            console.log({baseAccountKeys});
            const tx = await program.rpc.startStuffOff({
                accounts: {
                    baseAccount: baseAccountKeys.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [baseAccountKeys],
            });

            getBaseAccount();
            console.log('Created Base Account with Txn:  😘 ', tx);
        }catch(err){
            console.warn({err});
        }
    }

    const callback = useCallback(() => {
        if(!account || !program || baseAccount === undefined) return;
        if(account && baseAccount === null){
            createBaseAccount();
        }
    }, [account, baseAccount, program])

    useEffect(() => {
        getBaseAccount();
    },[program])

    return {baseAccount, callback, onAddGif};
}

export default useGifList;