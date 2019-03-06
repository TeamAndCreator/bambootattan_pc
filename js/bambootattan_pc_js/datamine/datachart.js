$(function () {
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
    var ctx = $("#myChart").get(0).getContext("2d");
    var myNewChart = new Chart(ctx);
    myNewChart.Bar(data);

});
function init(){

    var data = {
        labels: ["January", "March", "April", "May", "June", "July","August","October"],
        datasets: [
            {
                fillColor: "#CCCCFF",
                strokeColor: "rgba(220,220,220,1)",
                label: "2010年",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                fillColor: "#CCFFCC",
                strokeColor: "#CCFFCC",
                label:"2011年",
                data: [28, 48, 40, 19, 96, 27, 100]
            },
            {
                fillColor: "#FFFFCC",
                strokeColor: "#FFFFCC",
                label: "2012年",
                data: [13, 55, 40, 19, 23, 27, 64]
            },
            {
                fillColor: "#99FFFF",
                strokeColor: "#99FFFF",
                label: "2013年",
                data: [98, 11, 52, 19, 65, 20, 77]
            }
        ]
    }

    var options = {
        //Boolean - If we show the scale above the chart data
        //是否显示柱状图上面的数据
        scaleOverlay: true,

        //Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: null,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: 50,
        //Number - The scale starting value
        scaleStartValue: null,

        //String - Colour of the scale line
        //x/y轴坐标线的颜色
        scaleLineColor: "rgba(0,0,0,.1)",

        //Number - Pixel width of the scale line
        //坐标线的宽度
        scaleLineWidth: null,

        //Boolean - Whether to show labels on the scale
        //是否显示label值
        scaleShowLabels: true,

        //Interpolated JS string - can access value
        scaleLabel: "<%=value%>",

        //String - Scale label font declaration for the scale label
        //字体Family
        scaleFontFamily: "'Arial'",

        //Number - Scale label font size in pixels
        //字体大小
        scaleFontSize: 12,

        //String - Scale label font weight style
        //字体样式
        scaleFontStyle: "normal",

        //String - Scale label font colour
        //字体颜色
        scaleFontColor: "#666",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,

        //String - Colour of the grid lines
        //网格线颜色
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        // 柱状块与x值所形成的线（如：x=20这条线）之间的距离
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        // 在同一x值内的柱状块之间的间距
        barDatasetSpacing: 1,

        //Boolean - Whether to animate the chart
        animation: true,

        //Number - Number of animation steps
        animationSteps: 60,

        //String - Animation easing effect
        animationEasing: "easeOutQuart",

        //Function - Fires when the animation is complete
        onAnimationComplete: function () {
            var strHtml = "";
            for (var i = 0; i < this.datasets.length; i++) {
                strHtml += "<li><div><span style='background-color:" + this.datasets[i].fillColor + ";'></span><label>" + this.datasets[i].label + "</label></div><div style='clear:both;'></div></li>";
            }
            $("#ul_type").html(strHtml);
        }
    }
}
