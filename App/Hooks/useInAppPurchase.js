import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { requestPurchase, requestSubscription, useIAP } from 'react-native-iap';
import { db } from '../../firebaseConfig';
import { useStateValue } from '../store/contextStore/StateContext';

// Play store item Ids
const itemSKUs = Platform.select({
  android: ['belarabisubscription'],
});

const useInAppPurchase = () => {
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');
  const {state, dispatch} = useStateValue();

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

  const uid = state.user?.uid;
  const isSubscribed = state.isSubscribed;
  const [subscription, setSubscription] = useState(null);
  const [offerToken, setOfferToken] = useState(null);

  const createSubscription = async (receipt) => {
    try {
      const docRef = await addDoc(collection(db, 'subscriptions'), {
        uid,
        receipt: receipt,
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
      console.log('itemsSkus', itemSKUs);
      let sub = async () => {
        let subs = await getSubscriptions({skus: itemSKUs});
      };
      sub();
      console.log('Getting subscriptions...');
    }
    console.log(subscriptions);
  }, [connected, getSubscriptions]);
  useEffect(() => {
    if (subscriptions) {
      setOfferToken(
        subscriptions?.[0]?.subscriptionOfferDetails?.[0]?.offerToken,
      );
    }
  }, [subscriptions]);
  // currentPurchase will change when the requestPurchase function is called. The purchase then needs to be checked and the purchase acknowledged so Google knows we have awared the user the in-app product.
  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        console.log('RECEIPT: ', receipt);
        if (receipt) {
          // Give full app access
          createSubscription(receipt);
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
    else if (subscriptions?.length > 0) {
      console.log('SUBSCRIPTIONS', subscriptions);
      console.log('OFFERTOKEN', offerToken);
      let data = await requestSubscription({
        sku: itemSKUs[0],
        ...(offerToken && {
          subscriptionOffers: [
            {
              sku: itemSKUs[0],
              offerToken: offerToken,
            },
          ],
        }),
      })
        .then(async requestSubscriptionIAP => {
          if (
            requestSubscriptionIAP &&
            (requestSubscriptionIAP[0]?.transactionReceipt ||
              requestSubscriptionIAP?.transactionReceipt)
          ) {
            console.log('RECEIPT', requestSubscriptionIAP);
          }
        })
        .catch(error => {
          return error;
        });

      console.log('Purchasing products::', data);
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
