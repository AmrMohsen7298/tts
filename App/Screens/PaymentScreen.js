import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  requestSubscription,
  getSubscriptions,
  deepLinkToSubscriptionsAndroid,
} from 'react-native-iap';

const subscriptionSkus = Platform.select({
  ios: [BONZE_TIER, SILVER_TIER, GOLD_TIER],
  android: [BONZE_TIER, SILVER_TIER, GOLD_TIER],
});


const PaymentSceen = ({navigation}) => {
  const dispatch = useDispatch();
  const purchaseUpdateSubscription = useRef(null);
  const purchaseErrorSubscription = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await initConnection();
        {
          Platform.OS === ANDROID &&
          (await flushFailedPurchasesCachedAsPendingAndroid());
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    const handleGetSubscriptions = async () => {
      try {
        const data = await getSubscriptions({skus: subscriptionSkus});
        console.log('Subscription data:', data);
      } catch (error) {
        console.error('Error in handleGetSubscriptions:', error);
      }
    };

    const cleanupSubscriptions = () => {
      if (purchaseUpdateSubscription.current) {
        purchaseUpdateSubscription.current.remove();
        purchaseUpdateSubscription.current = null;
      }

      if (purchaseErrorSubscription.current) {
        purchaseErrorSubscription.current.remove();
        purchaseErrorSubscription.current = null;
      }
    };

    const initialize = async () => {
      try {
        await fetchData();
        await handleGetSubscriptions();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initialize();

    return cleanupSubscriptions;
  }, [subscriptionSkus]);

  const handlePurchaseUpdate = async purchase => {
    console.log('purchaseUpdatedListener', purchase);
    const receipt = purchase.transactionReceipt;
    // console.log('receipt', receipt);
    // if (receipt) {
    //   'yourAPI'
    //     .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
    //     .then(async deliveryResult => {
    //       if (deliveryResult) {
    //         await finishTransaction({purchase, isConsumable: true});
    //         await finishTransaction({purchase, isConsumable: false});
    //       } else {
    //         // Handle the case where deliveryResult is falsy
    //       }
    //     });
    // }
  };

  const handlePurchaseError = error => {
    console.warn('purchaseErrorListener', error);
  };

  // Set up listeners using useRef
  useEffect(() => {
    purchaseUpdateSubscription.current =
      purchaseUpdatedListener(handlePurchaseUpdate);
    purchaseErrorSubscription.current =
      purchaseErrorListener(handlePurchaseError);

    return () => {
      if (purchaseUpdateSubscription.current) {
        purchaseUpdateSubscription.current.remove();
        purchaseUpdateSubscription.current = null;
      }

      if (purchaseErrorSubscription.current) {
        purchaseErrorSubscription.current.remove();
        purchaseErrorSubscription.current = null;
      }
    };
  }, []);

  
  const handleBuySubscription = async (sku, offerToken) => {
    try {
      const data = await requestSubscription({
        sku,
        ...(Platform.OS === 'ANDROID' &&
          offerToken && {subscriptionOffers: [{sku, offerToken}]}),
      });
      console.log('data is', data);
      
    } catch (err) {
      console.error(err);
     
    }
  };
  
  const handleCancelSubscription = async prodictId => {
    if (Platform.OS === ANDROID) {
      await deepLinkToSubscriptionsAndroid({sku: prodictId});
    } else {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    }
  };
  return (
    <View>
        
          // For Android, offerToken is available, not for iOS.
 <TouchableOpacity onPress={handleBuySubscription(prductId, offerToken)}>
<Text>tierTitle</Text>
</TouchableOpacity>
        </View>
  );
};

export default PaymentSceen