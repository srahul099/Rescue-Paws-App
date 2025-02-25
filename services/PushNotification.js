import messaging, { subscribeToTopic } from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";

export const usePushNotifications = () => {
  const createNotificationChannel = async () => {
    if (Platform.OS === "android") {
      try {
        const channel = await messaging().android.createChannel({
          id: "high_priority_channel",
          name: "Rescue Paws Notifications",
          description: "Notifications for Rescue Paws updates",
          importance: messaging.AndroidImportance.HIGH,
          sound: "default",
          visibility: messaging.AndroidVisibility.PUBLIC,
          vibration: true,
          lightColor: "#FFA500",
        });
        console.log("Notification channel created:", channel);
      } catch (error) {
        console.error("Error creating notification channel:", error);
      }
    }
  };
  const requestPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (!hasPermission) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn("Push notification permissions are not granted.");
          return false;
        }
      }
    }

    const authStatus = await messaging().requestPermission();
    const isAuthorized =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (isAuthorized) {
      console.log("Push notification permissions granted.");
      await createNotificationChannel(); // Create channel after permissions are granted
    } else {
      console.warn("Push notification permissions are not granted.");
    }
    return isAuthorized;
  };

  const getToken = async () => {
    try {
      if (Platform.OS === "ios") {
        const apnsToken = await messaging().getAPNSToken();
        if (!apnsToken) {
          console.warn("APNs token is null. Check APNs setup.");
          return;
        }
        console.log("APNs Token:", apnsToken);
      }

      const fcmToken = await messaging().getToken();
      console.log("FCM Token:", fcmToken);

      return fcmToken;
    } catch (error) {
      console.error("Error fetching push notification token:", error);
    }
  };

  const subscribeToTopic = async (topic = "allUsers") => {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error("Error subscribing to topic:", error);
    }
  };

  const handleForegroundNotification = () => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground message received:", remoteMessage);
      Alert.alert(
        "New notification",
        JSON.stringify(remoteMessage.notification)
      );
    });
    return unsubscribe;
  };

  const handleBackgroundNotifications = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Background message received:", remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification opened from background:", remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification opened from quit state:", remoteMessage);
        }
      });
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await requestPermission();
      if (hasPermission) {
        await getToken();
        await subscribeToTopic("allUsers");
      }
    })();

    handleBackgroundNotifications();
    const unsubscribe = handleForegroundNotification();

    return () => {
      unsubscribe();
    };
  }, []);
};
