import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";


am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

class ChartElectric extends Component {

  componentDidMount() {
    var chart = am4core.create("chartLine", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    
    chart.padding(0, 0, 0, 0);
    
    chart.zoomOutButton.disabled = false;

    var value1,value2,value3;
   
    var i =0;
    var data = [];
    for (i = 0; i <= 30; i++) {
      
        data.push({ date: new Date().setSeconds(i - 30), value1:  Math.random() * 10 ,value2 : Math.random() * 100 ,value3: Math.random() * 200});
    }
    
    chart.data = data;
    
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 1;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    
    // Create series1
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value1";
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;
    series.strokeWidth = 2;
    series.name = "Bon Chiet";
    series.fill = chart.colors.getIndex(0);
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12,12,12,12)
    series.tooltipText = "{valueY.value}"
    // Create series4
    let series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.dateX = "date";
    series4.dataFields.valueY = "value1";
    series4.interpolationDuration = 500;
    series4.defaultState.transitionDuration = 0;
    series4.strokeWidth = 0;
    series4.name = "";

    // Create series 2
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.dateX = "date";
    series1.dataFields.valueY = "value2";
    series1.interpolationDuration = 500;
    series1.defaultState.transitionDuration = 0;
    series1.tensionX = 0.8;
    series1.strokeWidth = 2;
    series1.name = "Bon So Cap";
    series1.fill = chart.colors.getIndex(10);
    series1.tooltip.pointerOrientation = "vertical";
    series1.tooltip.background.cornerRadius = 20;
    series1.tooltip.background.fillOpacity = 0.5;
    series1.tooltip.label.padding(12,12,12,12)
    series1.tooltipText = "{valueY.value}"

    // Create series 5
    let series5 = chart.series.push(new am4charts.LineSeries());
    series5.dataFields.dateX = "date";
    series5.dataFields.valueY = "value1";
    series5.interpolationDuration = 500;
    series5.defaultState.transitionDuration = 0;
    series5.strokeWidth = 0;
    series5.name = "";

    // Create series 3
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "value3";
    series2.interpolationDuration = 500;
    series2.defaultState.transitionDuration = 0;
    series2.tensionX = 0.8;
    series2.strokeWidth = 2;
    series2.name = "Bon Thu Cap";
    series2.fill = chart.colors.getIndex(5);
    series2.tooltip.pointerOrientation = "vertical";
    series2.tooltip.background.cornerRadius = 20;
    series2.tooltip.background.fillOpacity = 0.5;
    series2.tooltip.label.padding(12,12,12,12)
    series2.tooltipText = "{valueY.value}"
    
    
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            if (interval) {
                clearInterval(interval);
            }
        }
        else {
            startInterval();
        }
    }, false);
    
    // add data
    var interval;
   
    function startInterval() {
        interval = setInterval(function() {
            
            var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
            chart.addData(
                { date: new Date(lastdataItem.dateX.getTime() + 1000), value1: value1 ,value2:value2,value3:value3},
            );
        }, 1000);
    }
    
    startInterval();
    
    // all the below is optional, makes some fancy effects
    // gradient fill of the series
    series.fillOpacity = 0;
    series1.fillOpacity = 0;
    series2.fillOpacity = 0;
  
    
    // this makes date axis labels to fade out
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
        var dataItem = target.dataItem;
        return dataItem.position;
    })
     // need to set this, otherwise fillOpacity is not changed and not set
     dateAxis.events.on("validated", function () {
      am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
          label.fillOpacity = label.fillOpacity;
      })
    })
  
    
    
    // this makes date axis labels which are at equal minutes to be rotated
    dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
        var dataItem = target.dataItem;
        if (dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
            
          target.verticalCenter = "middle";  
          target.horizontalCenter = "left";
            return -90;
        }
        else {
            target.verticalCenter = "bottom";  
            target.horizontalCenter = "middle";
            return 0;
        }
    })
    
    // bullet at the front of the line
    var bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 3;
    bullet.fillOpacity = 1;
    bullet.fill = chart.colors.getIndex(0);
    bullet.isMeasured = false;
    
    var bullet1 = series1.createChild(am4charts.CircleBullet);
    bullet1.circle.radius = 3;
    bullet.colors = "#ffffff";
    bullet1.fillOpacity = 1;
    bullet1.fill = chart.colors.getIndex(10);
    bullet1.isMeasured = false;

    var bullet2 = series2.createChild(am4charts.CircleBullet);
    bullet2.circle.radius = 3;
    bullet2.fillOpacity = 1;
    bullet2.fill = chart.colors.getIndex(5);
    bullet2.isMeasured = false;
    
    
  series.events.on("validated", function() {
      bullet.moveTo(series.dataItems.last.point);
      bullet.validatePosition();

      bullet1.moveTo(series1.dataItems.last.point);
      bullet1.validatePosition();

      bullet2.moveTo(series2.dataItems.last.point);
      bullet2.validatePosition();
  });

   // Add cursor
   chart.cursor = new am4charts.XYCursor();
   // Add legend
   chart.legend = new am4charts.Legend();
   chart.legend.position = "top";


}

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  

  render() {
    return (
      <div id="chartLine" style={{ width: "100%", height: "450px" }}></div>
    );
  }
}

export default ChartElectric;