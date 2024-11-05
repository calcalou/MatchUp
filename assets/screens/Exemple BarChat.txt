import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const datas = {
  labels: ["Foot", "Basket", "Volley", "Padel", "Badminton", "Squash"],
  datasets: [
    {
      data: [1100, 1700, 2000, 1500, 1800, 900],
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  fillShadowGradient: `rgba(0, 255, 0, 0)`,
  fillShadowGradientOpacity: 0,
};

const App = () => {
  return (
    <View>
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        data={datas}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
        yAxisInterval={1} // optional, defaults to 1
      />
    </View>
  );
};

export default App;
