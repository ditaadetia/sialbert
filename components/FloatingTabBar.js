import React, { useState } from "react";
import {
  Image,
  Dimensions,
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
const win = Dimensions.get("window");

const navBar = [
  {
    title: "Home",
    activeIcon: require("../assets/image/home-active.png"),
    inactiveIcon: require("../assets/image/home-inactive.png"),
    iconStyle: { width: 19, height: 20 },
  },
  {
    title: "Sewa",
    activeIcon: require("../assets/image/rent-active.png"),
    inactiveIcon: require("../assets/image/rent-inactive.png"),
    iconStyle: { width: 30, height: 30 },
  },
  {
    title: "Refund",
    activeIcon: require("../assets/image/refund-active.png"),
    inactiveIcon: require("../assets/image/refund-inactive.png"),
    iconStyle: { width: 16, height: 20 },
  },
  {
    title: "Reschedule",
    activeIcon: require("../assets/image/reschedule-active.png"),
    inactiveIcon: require("../assets/image/reschedule-inactive.png"),
    iconStyle: { width: 17, height: 20 },
  },
  {
    title: "Akun",
    activeIcon: require("../assets/image/acount-active.png"),
    inactiveIcon: require("../assets/image/acount-inactive.png"),
    iconStyle: { width: 17, height: 20 },
  },
];

function TabBarItem({
  navigation,
  idx,
  setIdx,
  active,
  title,
  activeIcon,
  inactiveIcon,
  iconStyle,
}) {
  return (
    <View style={styles.navButtonContainer}>
      <TouchableNativeFeedback
        onPress={() => {
          if (!active) {
            setIdx(idx);
          }
          // ToastAndroid.show(`You navigated to '${title}'!`, ToastAndroid.SHORT);
        }}
      >
        <View
          style={{
            backgroundColor: active ? "#fec830" : "white",
            ...styles.navButton,
          }}
        >
          <Image
            source={active ? activeIcon : inactiveIcon}
            style={iconStyle}
          />
          {active ? <Text style={styles.navBarText}>{title}</Text> : null}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default function FloatingTabBar({ navigation }) {
  const [idx, setIdx] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        {navBar.map((item, i) => {
          return (
            <TabBarItem
              key={i}
              idx={i}
              navigation={navigation}
              active={i === idx ? true : false}
              setIdx={setIdx}
              {...item}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = {
  container: {
    width: win.width,
    paddingHorizontal: 26,
    position: "absolute",
    bottom: 80,
  },
  tabBarContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 12,
    elevation: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonContainer: {
    borderRadius: 30,
    overflow: "hidden",
  },
  navButton: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12.5,
    flexDirection: "row",
  },
  navBarText: {
    color: "white",
    fontSize: 12,
    marginLeft: 6.5,
  },
};