import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from '../../../back_end/target/idl/learn_solana_anchor.json';
import { useEffect, useState } from "react";
import useProvider from "./useProvider";

// Get out program id from idl file
const programId = new PublicKey(idl.metadata.address);

const useProgram = () => {
    const [program, setProgram] = useState<Program | null>(null);
    const provider = useProvider();


    const getProgram = async  () => {
        try{
            const _ =  new Program(idl, programId, provider);
            setProgram(_);
        }catch(err){
            console.warn({err});
            setProgram(null);
        }
    }
    
    useEffect(() => {
        if(!provider) return console.log('No provider found');
        console.log('Provider found');
        getProgram();
    }, [provider])

    return program;
}

export default useProgram;
