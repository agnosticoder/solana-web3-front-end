import { useState } from 'react';
import styles from '../styles/modules/App.module.scss';
import useWallet from './hooks/useWallet';
import useGifList from './hooks/useGifList';


const App = () => {
    const [gifURL, setGifURL] = useState('');

    //* Custom Hooks
    const { account, error, onConnect, onDisconnect } = useWallet();
    const {baseAccount, callback: createBaseAccount, onAddGif} = useGifList(
        account,
        gifURL,
        setGifURL
    );

    console.log({ account }, {baseAccount});

    return (
        <div className={styles.container}>
            {error && <pre>{error}</pre>}
            {account && (
                <div className={styles.container}>
                    <button onClick={onDisconnect}>Disconnect</button>
                    <h4 className={styles.test}>Account: {account}</h4>
                    {!baseAccount && (
                        <div>
                            <button onClick={createBaseAccount}>No Base Account Exist: Create Base Account</button>
                        </div>
                    )}
                    {baseAccount && (
                        <>
                            <form onSubmit={onAddGif}>
                                <input
                                    value={gifURL}
                                    onChange={(e) => setGifURL(e.currentTarget.value)}
                                    type="text"
                                    placeholder="Enter gif url"
                                    required
                                />
                                <button type="submit">Add Gif</button>
                            </form>
                            {/* {baseAccount && <pre>{JSON.stringify(baseAccount, null, 2)}</pre>} */}
                            <div>
                                <div className={styles.gifContainer}>
                                    {baseAccount.gifList.map(({gifLink, userAddress}) => (
                                        <div className="gif-item" key={gifLink}>
                                            {/* <Image src={gif} alt={gif} width={200} height={130} /> */}
                                            <img src={gifLink} alt={gifLink} width={200} height={130} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
            {!account && <button onClick={onConnect}>Connect</button>}
        </div>
    );
};

export default App;
