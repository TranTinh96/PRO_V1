import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import {useSelector } from 'react-redux';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

function ChartelEctric(props) {
    const chart = useRef(null);
   //CURRENT
    const I = useSelector((state) => state.CURRENT).I;
    const I1 = useSelector((state) => state.CURRENT).I1;
    const I2 = useSelector((state) => state.CURRENT).I2;
    const I3 = useSelector((state) => state.CURRENT).I3;

  useLayoutEffect(() => {
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.padding(0, 0, 0, 0);

    chart.zoomOutButton.disabled = true;

    var data = [];

    for (let i = 0; i <= 30; i++) {
       
        data.push({ date: new Date().setSeconds(i - 30), valueSummary: 0 ,valuePhase1: 0 ,valuePhase2: 0,valuePhase3: 0});
    }

    chart.data = data;

    //Create Data Axis
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 500;
    valueAxis.rangeChangeDuration = 500;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.grid.template.strokeWidth = 0;
    valueAxis.renderer.baseGrid.disabled = true;

    /**
     * SERIES
     */
    //Summary
    var seriesSummary = chart.series.push(new am4charts.LineSeries());
    seriesSummary.dataFields.dateX = "date";
    seriesSummary.dataFields.valueY = "valueSummary";
    seriesSummary.name="SUMMARY";
    seriesSummary.strokeWidth = 2;
    seriesSummary.interpolationDuration = 500;
    seriesSummary.defaultState.transitionDuration = 500;
    seriesSummary.tensionX = 0.8;
    seriesSummary.fill = chart.colors.getIndex(0);
    seriesSummary.tooltip.pointerOrientation = "vertical";
    seriesSummary.tooltip.background.cornerRadius = 20;
    seriesSummary.tooltip.background.fillOpacity = 0.5;
    seriesSummary.tooltip.label.padding(12,12,12,12)
    seriesSummary.tooltipText = "{valueY.valueSummary}"

     //Phase 1
     var seriesPhase1 = chart.series.push(new am4charts.LineSeries());
     seriesPhase1.dataFields.dateX = "date";
     seriesPhase1.dataFields.valueY = "valuePhase1";
     seriesPhase1.name="PHASE 1";
     seriesPhase1.strokeWidth = 2;
     seriesPhase1.interpolationDuration = 500;
     seriesPhase1.defaultState.transitionDuration = 500;
     seriesPhase1.tensionX = 0.8;
     seriesPhase1.fill = chart.colors.getIndex(4);
     seriesPhase1.tooltip.pointerOrientation = "vertical";
     seriesPhase1.tooltip.background.cornerRadius = 20;
     seriesPhase1.tooltip.background.fillOpacity = 0.5;
     seriesPhase1.tooltip.label.padding(12,12,12,12)
     seriesPhase1.tooltipText = "{valueY.valuePhase1}"

    //Phase 2
     var seriesPhase2 = chart.series.push(new am4charts.LineSeries());
     seriesPhase2.dataFields.dateX = "date";
     seriesPhase2.dataFields.valueY = "valuePhase2";
     seriesPhase2.name="PHASE 2";
     seriesPhase2.strokeWidth = 2;
     seriesPhase2.interpolationDuration = 500;
     seriesPhase2.defaultState.transitionDuration = 500;
     seriesPhase2.tensionX = 0.8;
     seriesPhase2.fill = chart.colors.getIndex(4);
     seriesPhase2.tooltip.pointerOrientation = "vertical";
     seriesPhase2.tooltip.background.cornerRadius = 20;
     seriesPhase2.tooltip.background.fillOpacity = 0.5;
     seriesPhase2.tooltip.label.padding(12,12,12,12)
     seriesPhase2.tooltipText = "{valueY.valuePhase2}"

    //Phase 3
     var seriesPhase3 = chart.series.push(new am4charts.LineSeries());
     seriesPhase3.dataFields.dateX = "date";
     seriesPhase3.dataFields.valueY = "valuePhase3";
     seriesPhase3.name="PHASE 3";
     seriesPhase3.strokeWidth = 2;
     seriesPhase3.interpolationDuration = 500;
     seriesPhase3.defaultState.transitionDuration = 500;
     seriesPhase3.tensionX = 0.8;
     seriesPhase3.fill = chart.colors.getIndex(4);
     seriesPhase3.tooltip.pointerOrientation = "vertical";
     seriesPhase3.tooltip.background.cornerRadius = 20;
     seriesPhase3.tooltip.background.fillOpacity = 0.5;
     seriesPhase3.tooltip.label.padding(12,12,12,12)
     seriesPhase3.tooltipText = "{valueY.valuePhase1}"

    

    

    
    /*
    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.minHeight = 40;
    chart.scrollbarX.thumb.background.fill = am4core.color("#CBA5A4");
    //chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.thumb.minWidth = 100;
    
    let scrollAxis = chart.scrollbarX.scrollbarChart.xAxes.getIndex(0);
    scrollAxis.renderer.labels.template.disabled = true;
    scrollAxis.renderer.grid.template.disabled = true;
    */
    

    chart.events.on("datavalidated", function () {
        dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
    });

    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;

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
            chart.addData(
                { date: new Date(new Date().getTime() + 1000), valueSummary:I,valuePhase1: I1 ,valuePhase2: I2,valuePhase3: I3},
                1
            );
        }, 1000);
    }

    startInterval();

    

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

    /**
     * BUlLET
     */
    //Summary
    var bulletSummary = seriesSummary.createChild(am4charts.CircleBullet);
    bulletSummary.circle.radius = 0;
    bulletSummary.fillOpacity = 1;
    bulletSummary.fill = chart.colors.getIndex(0);
    bulletSummary.isMeasured = false;

    seriesSummary.events.on("validated", function() {
        bulletSummary.moveTo(seriesSummary.dataItems.last.point);
        bulletSummary.validatePosition();
    });

      //Phase 1
    var bulletPhase1 = seriesPhase1.createChild(am4charts.CircleBullet);
    bulletPhase1.circle.radius = 0;
    bulletPhase1.fillOpacity = 1;
    bulletPhase1.fill =chart.colors.getIndex(4);
    bulletPhase1.isMeasured = false;
    seriesPhase1.events.on("validated", function() {
        bulletPhase1.moveTo(seriesPhase1.dataItems.last.point);
        bulletPhase1.validatePosition();
      });
      
    //Phase 2
    var bulletPhase2 = seriesPhase2.createChild(am4charts.CircleBullet);
    bulletPhase2.circle.radius = 0;
    bulletPhase2.fillOpacity = 1;
    bulletPhase2.fill =chart.colors.getIndex(4);
    bulletPhase2.isMeasured = false;
    seriesPhase2.events.on("validated", function() {
        bulletPhase2.moveTo(seriesPhase2.dataItems.last.point);
        bulletPhase2.validatePosition();
      });
      
    //Phase 3
    var bulletPhase3 = seriesPhase3.createChild(am4charts.CircleBullet);
    bulletPhase3.circle.radius = 0;
    bulletPhase3.fillOpacity = 1;
    bulletPhase3.fill =chart.colors.getIndex(4);
    bulletPhase3.isMeasured = false;
    seriesPhase3.events.on("validated", function() {
        bulletPhase3.moveTo(seriesPhase3.dataItems.last.point);
        bulletPhase3.validatePosition();
      });
  

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;

   // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
  
    return () => {
      chart.dispose();
    };
  }, [I,I1,I2,I3]);

  return <div id="chartdiv" style={{ width: "100%", height: "408px" }}></div>;
}

export default ChartelEctric;
