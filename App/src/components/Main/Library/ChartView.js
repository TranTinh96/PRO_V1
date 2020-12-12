import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChartLine = ({height, style, color}) => {
  return (
    <View style={[styles.line, {height}, style]}>
      <View style={[styles.fill, {height: '100%', backgroundColor: color}]} />
    </View>
  );
};

const ChartView = ({title, num, color,unit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.containerValue}>
          <Text style={[styles.number, {color}]}>{num}</Text>
          <Text style={[styles.unit, {color}]}>{unit}</Text>
        </View>
      </View>
      <View style={styles.chart}>
        <View style={styles.chartContainer}>
          {Array(15)
            .fill(0)
            .map((e, i) => {
              return (
                <ChartLine
                  key={i.toString()}
                  height={10 + parseInt(40 * Math.random())}
                  style={[i == 14 && {marginRight: 0}]}
                  color={color}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default ChartView;

const styles = StyleSheet.create({
  container: {
    height: 175,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 10,
  },
  containerValue:{
    flexDirection:"row"
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize:14,
    color:"#E48762",
  },
  number: {
    fontFamily: "OpenSans-SemiBold",
    fontSize:22,
    color: '#E25858',
    marginTop:10
  },
  unit:{
    fontFamily: "OpenSans-Bold",
    fontSize:13,
    color: '#E25858',
    marginLeft:6,
    marginTop:16
  },
  chart: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chartContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },

  line: {
    width: 3,
    height: 60,
    backgroundColor: '#EAEAE8',
    justifyContent: 'flex-end',
    marginRight: 8,
  },

  fill: {
    height: 10,
    backgroundColor: '#B56A63',
  },
  header: {
    padding: 20,
  },
});
