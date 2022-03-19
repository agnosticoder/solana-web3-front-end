import { web3 } from "@project-serum/anchor";
import kp from '../config/keypair.json';

const getBaseAccount = (kp: any) => {
    const arr: any = Object.values(kp._keypair.secretKey);
    const secret = new Uint8Array(arr);
    const baseAccount = web3.Keypair.fromSecretKey(secret);
    return baseAccount;
};

const baseAccount = getBaseAccount(kp);

console.log({baseAccount});

export default baseAccount;
