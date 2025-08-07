import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { requestSubscription, useIAP } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebaseConfig';
import { useStateValue } from '../store/contextStore/StateContext';

// Play store item Ids
const itemSKUs = Platform.select({
  android: ['belarabisubscription'],
  ios: ['ttsbelarabi'],
});

const useInAppPurchase = () => {
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const {state, dispatch} = useStateValue();
  const currentUser = useSelector(state => state.storyReducer.user);
  const appDispatch = useDispatch();

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

  const uid = currentUser?.uid;
  const email = currentUser?.email;
  const isSubscribed = state.isSubscribed;
  const [subscription, setSubscription] = useState(null);
  const [offerToken, setOfferToken] = useState(null);

  const createSubscription = async receipt => {
    try {
      const docRef = await addDoc(collection(db, 'subscriptions'), {
        uid: uid ?? 0,
        email: email ?? '',
        receipt: receipt,
        timestamp: new Date().getTime(),
        endDateTimestamp: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
        createdAt: serverTimestamp(),
      });
      dispatch({type: 'IS_SUBSCRIBED', payload: !!docRef.id});
    } catch (e) {
      console.log('Could not create a subscription doc: ', e);
    }
  };

  // Get products from play store.
  useEffect(() => {
    if (connected) {
      console.log('itemsSkus', itemSKUs);
      let sub = async () => {
        let subs = await getSubscriptions({skus: itemSKUs});
        console.log('Current Subscriptions: ', subs);
      };
      sub();
      console.log('Getting subscriptions...');
    }
    console.log({subscriptions});
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
          if (!state.isSubscribed && currentUser) createSubscription(receipt);
          try {
            const ackResult = await finishTransaction({
              purchase,
              isConsumable: false,
            });
            console.log('ackResult: ', ackResult);
          } catch (ackErr) {
            // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
            console.log('ackError: ', ackErr);
          }
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [finishTransaction]);

  const subscribeToApp = async () => {
    // Reset error msg
    if (connectionErrorMsg !== '') setConnectionErrorMsg('');
    if (!connected) {
      setConnectionErrorMsg('Please check your internet connection');
    }
    // If we are connected & have products, purchase the item. Google will handle if user has no internet here.
    else if (subscriptions?.length > 0) {
      setIsSubscribing(true);
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
            console.log('RECEIPT:::', requestSubscriptionIAP);
          }
        })
        .catch(error => {
          return error;
        })
        .finally(() => {
          setIsSubscribing(false);
        });

      console.log('Purchasing products:::', data);
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      setIsSubscribing(true);
      console.log('No products. Now trying to get some...', itemSKUs);
      try {
        const prods = await getSubscriptions({skus: itemSKUs});
        console.log('Got products, now purchasing...', prods);
        const subscriptionState = await requestSubscription({
          sku: itemSKUs[0],
        });
        console.log('Purchased successfully', subscriptionState);
      } catch (error) {
        setConnectionErrorMsg('تأكد أن كنت متصل بالانترنت');
        console.log('Everything failed. Error: ', error);
        Alert.alert(error?.message ?? JSON.stringify(error));
      } finally {
        setIsSubscribing(false);
      }
    }
  };

  return {
    isSubscribed,
    connectionErrorMsg,
    isSubscribing,
    subscribeToApp,
  };
};
export default useInAppPurchase;
