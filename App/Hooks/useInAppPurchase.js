import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {requestPurchase, useIAP} from 'react-native-iap';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';

// Play store item Ids
const itemSKUs = Platform.select({
    android: ['com.belarabi.basesubscription'],
});

const useInAppPurchase = () => {
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');
  const dispatch = useDispatch();

  const {
    connected,
      products,
    subscriptions,
      getProducts,
    getSubscriptions,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  const uid = useSelector(state => state.storyReducer.uid);
  const isSubscribed = useSelector(state => state.storyReducer.isSubscribed);

  const createSubscription = async () => {
    try {
      const docRef = await addDoc(collection(db, 'subscriptions'), {
        uid,
        timestamp: new Date().getMilliseconds(),
        createdAt: serverTimestamp(),
      });
      dispatch({type: 'IS_SUBSCRIBED', payload: !!docRef.id});
    } catch (e) {
      console.log('Could not create a subscription doc');
    }
  };

  // Get products from play store.
  useEffect(() => {
      if (connected) {
          console.log("itemsSkus", itemSKUs)
          getSubscriptions({ skus: itemSKUs });
      console.log('Getting subscriptions...');
    }
      console.log(subscriptions);
  }, [connected, getSubscriptions  ]);
  // currentPurchase will change when the requestPurchase function is called. The purchase then needs to be checked and the purchase acknowledged so Google knows we have awared the user the in-app product.
  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        console.log('RECEIPT: ', receipt);
        if (receipt) {
          // Give full app access
          createSubscription();
          try {
            const ackResult = await finishTransaction(purchase);
            console.log('ackResult: ', ackResult);
          } catch (ackErr) {
            // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
            console.log('ackError: ', ackErr);
          }
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  const subscribeToApp = async () => {
    // Reset error msg
    if (connectionErrorMsg !== '') setConnectionErrorMsg('');
    if (!connected) {
      setConnectionErrorMsg('Please check your internet connection');
    }
    // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
    else if (products?.length > 0) {
      requestPurchase(itemSKUs[0]);
      console.log('Purchasing products...');
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log('No products. Now trying to get some...');
      try {
        await getProducts(itemSKUs);
        requestPurchase(itemSKUs[0]);
        console.log('Got products, now purchasing...');
      } catch (error) {
        setConnectionErrorMsg('Please check your internet connection');
        console.log('Everything failed. Error: ', error);
      }
    }
  };

  return {
    isSubscribed,
    connectionErrorMsg,
    subscribeToApp,
  };
};
export default useInAppPurchase;
