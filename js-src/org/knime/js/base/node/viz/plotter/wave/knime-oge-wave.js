knime_oge_wave = function() {
	
	view = {};
    var _representation = null;
    var _value = null;
    var _keyedDataset = null;
    var chartManager = null;
    var containerID = "lineContainer";
    var initialAxisBounds;

    var minWidth = 400;
    var minHeight = 300;
    var defaultFont = "sans-serif";
    var defaultFontSize = 12;

    var MISSING_VALUE_METHOD_GAP = "gap";
    var MISSING_VALUE_METHOD_NO_GAP = "noGap";
    var MISSING_VALUE_METHOD_REMOVE_COLUMN = "removeColumn";

    var xMissingValuesCount = 0;
    var yMissingValues = [];
    var isEmptyPlot = true;

    var MISSING_VALUES_X_AXIS_NOT_SHOWN = "missingValuesXAxisNotShown";
    var MISSING_VALUES_NOT_SHOWN = "missingValuesNotShown";
    var NO_DATA_AVAILABLE = "noDataAvailable";

    var isTooManyColumns = false;
    var errorSvgId = 'errorSvg';
    var MAX_COLUMNS = 200;


    /*
    todo
    */
    var canvasArr = [];
    var ctxArr = [];
    var width = 400;
    var _currentPoint = [];
    var height = 200;
    var spaceData = null;
    var style = {
        angelIndex: -26,
        barringType: "0",
        circleR: 45,
        dataType: 0,
        pointIndex: 253,
        weekIndex: 2
    };

    var amplitude = {
        "sdmin": 0,
        "sdmax": 0,
        "xdmin": 0,
        "xdmax": 0,
        "watermin": 0,
        "watermax": 0
    }





    var jsonString = "";

    view.init = function(representation, value) {

        console.log('begin');

        // require.config({
        //     paths: {
        //         alertify: "http://apps.bdimg.com/libs/alertify.js/0.3.11/alertify.min"
        //     }
        // });

        // require(["alertify"], function(alertify) {
        //     alertify.alert('mssages');

        // });


        // return;


        if (!representation.keyedDataset) {
            d3.select("body").text("Error: No data available");
            return;
        }

        for (var col = 0; col < representation.keyedDataset.columnKeys.length; col++) {
            var columnKey = representation.keyedDataset.columnKeys[col];
            var symbolProp = representation.keyedDataset.symbols[col];

            if (symbolProp) {
                for (var symbolKey in symbolProp) {
                    jsonString = symbolProp[symbolKey]
                    break;
                }
            }
            spaceData = JSON.parse(jsonString);
        }


        createControlButton();

        $('body').css({
            'background-color': 'black'
        });

        $('#divControl').after("<div id='navLeft'></div>");

        $('#navLeft').css({
            'height': '700px',
            'width': '30%',
            'float': 'left'
        });

        $('#navLeft').after('<div id="myDiv"></div>');



        var myDiv = $('#myDiv');

        var html = "<canvas id='mycanvas0'></canvas>";
        html += "<div style='z-index:2;margin-top:-205px;margin-left:100px;'><canvas id='mycanvas3'></canvas></div>";
        html += "<canvas id='mycanvas1'></canvas>";
        html += "<div style='z-index:2;margin-top:-205px;margin-left:100px;'><canvas id='mycanvas4'></canvas></div>";
        html += "<canvas id='mycanvas2'></canvas>";
        html += "<div style='z-index:2;margin-top:-205px;margin-left:100px;'><canvas id='mycanvas5'></canvas></div>";
        html += "<div style='z-index:-1;margin-top:-610px;'><canvas id='mycanvas6'></canvas></div>";
        html += "<div style='z-index:-1;margin-top:-610px;'><canvas id='mycanvas7'></canvas></div>";
        myDiv.html(html);

        myDiv.css({
            'float': 'left',
            'background-color': 'black',
            'padding-top': '50px'
        });


        for (var i = 0; i < 8; i++) {
            var canvas = document.getElementById("mycanvas" + i);
            canvasArr[i] = canvas;

            canvas.width = width;
            if (i == 3 || i == 4 || i == 5) {
                canvas.width = height;
            }

            if (i <= 5) {
                canvas.height = height;
            } else { //6-7是上下水的连线，高度等于宽度
                canvas.height = height * 3;
            }
            ctxArr[i] = canvas.getContext("2d");
        }

        //默认调用不盘车
        draw(spaceData, style, -1, 1, 2);

        createInfoPanel();

    };



    pancheTypeChange = function() { //盘车切换

        spaceData = JSON.parse(jsonString);

        style.barringType = $("#oPtPanche").val();

        if (style.barringType == 0) //不盘车
        {
            $(".basicPanel").show();
            $(".sdTitle").show();
            $(".xdTitle").show();
            $(".waterTitle").show();
            $(".sdAmplitude").hide();
            $(".xdAmplitude").hide();
            $(".waterAmplitude").hide();
        } else if (style.barringType == 1) {
            amplitude.xdmin = spaceData.amplitude[0];
            amplitude.xdmax = spaceData.amplitude[1];
            amplitude.watermin = spaceData.amplitude[2];
            amplitude.watermax = spaceData.amplitude[3];
            $(".basicPanel").hide();
            $(".sdTitle").hide();
            $(".sdAmplitude").hide();
            $(".xdTitle").show();
            $(".xdAmplitude").show();
            $(".waterTitle").show();
            $(".waterAmplitude").show();
        } else {
            amplitude.sdmin = spaceData.amplitude[4];
            amplitude.sdmax = spaceData.amplitude[5];
            amplitude.watermin = spaceData.amplitude[6];
            amplitude.watermax = spaceData.amplitude[7];
            $(".basicPanel").hide();
            $(".sdTitle").show();
            $(".sdAmplitude").show();
            $(".xdTitle").hide();
            $(".xdAmplitude").hide();
            $(".waterTitle").show();
            $(".waterAmplitude").show();
        }

        rebuild();

        updateInfoPanel();

    }


    getFixedNumber = function(num, unit) {
        if (!isNaN(Number(num).toFixed(1))) {
            return Number(num).toFixed(1) + " " + unit;
        }
        return "";
    }

    updateInfoPanel = function() { //更新面板信息

        var sdAmplitudeInfoHtml = "<li>盘车最小双幅值：" + Number(amplitude.sdmin.toFixed(1)) + " μm</li>";
        sdAmplitudeInfoHtml += "<li>盘车最大双幅值：" + Number(amplitude.sdmax.toFixed(1)) + " μm</li>";
        $('.sdAmplitude').html(sdAmplitudeInfoHtml);

        var xiaDaoInfoHtml = "<li>盘车最小双幅值：" + Number(amplitude.xdmin.toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>盘车最大双幅值：" + Number(amplitude.xdmax.toFixed(1)) + " μm</li>";
        $('.xdAmplitude').html(xiaDaoInfoHtml);


        var shuiDaoInfoHtml = "<li>盘车最小双幅值：" + Number(amplitude.watermin.toFixed(1)) + " μm</li>";
        shuiDaoInfoHtml += "<li>盘车最大双幅值：" + Number(amplitude.watermax.toFixed(1)) + " μm</li>";

        $('.waterAmplitude').html(shuiDaoInfoHtml);
    }

    createInfoPanel = function() { //创建面板信息
        $('#myDiv').after('<div id="sdTitleDiv"></div>');


        var divCtrl = $('#sdTitleDiv');

        var classPTitle = "font-size:20px;font-weight:bold;color:#33B5E5";

        var classUl = "font-size:small;color:#a2a2a2;";

        var shangDaoBaiDuYingXiangLiang = getFixedNumber(spaceData.caUpCapacitys[style.pointIndex], "μm");

        var shangJiJiaZhenDongYingXiangLiang = getFixedNumber(spaceData.daUpCapacitys[style.pointIndex], "μm");


        var shangDaoInfoHtml = "<p class='sdTitle' style='" + classPTitle + "'>上导</p><ul id='sdBasicPanel' class='basicPanel' style='" + classUl + "'>";
        shangDaoInfoHtml += "<li>X向1X幅值: " + Number(spaceData.X1[0]).toFixed(1) + " μm</li>";
        shangDaoInfoHtml += "<li>X向1X相位: " + Number(spaceData.X1P[0]).toFixed(1) + " °</li>";
        shangDaoInfoHtml += "<li>Y向1X幅值: " + Number(spaceData.X1[1]).toFixed(1) + " μm</li>";
        shangDaoInfoHtml += "<li>Y向1X相位: " + Number(spaceData.X1P[1]).toFixed(1) + " °</li>";
        shangDaoInfoHtml += "<li>摆度影响量: " + Number(spaceData.roundCaUpCapacitys).toFixed(1) + " μm</li>";
        shangDaoInfoHtml += "<li>上导摆度影响量: " + shangDaoBaiDuYingXiangLiang + " </li>";
        shangDaoInfoHtml += "<li>振动影响量: " + Number(spaceData.roundDaUpCapacitys).toFixed(1) + " μm</li>";
        shangDaoInfoHtml += "<li>上机架振动影响量: " + shangJiJiaZhenDongYingXiangLiang + " </li></ul>";

        shangDaoInfoHtml += "<ul class='sdAmplitude' style='" + classUl + "display:none;'>";
        shangDaoInfoHtml += "<li>盘车最小双幅值：" + Number(amplitude.sdmin.toFixed(1)) + " μm</li>";
        shangDaoInfoHtml += "<li>盘车最大双幅值：" + Number(amplitude.sdmax.toFixed(1)) + " μm</li>";
        shangDaoInfoHtml += "</ul>"


        var jingBanTiaoZhengJiao = getFixedNumber(spaceData.roundMirrorAngles, '°');
        var xiaDaoBaiDuYingXiangLiang = getFixedNumber(spaceData.caDownCapacitys[style.pointIndex], 'μm');
        var xiaJiJiaZhenDongYingXiangLiang = getFixedNumber(spaceData.daDownCapacitys[style.pointIndex], 'μm');

        var xiaDaoInfoHtml = "<p class='xdTitle' style='" + classPTitle + "'>下导</p><ul id='xdBasicPanel' class='basicPanel' style='" + classUl + "'>";
        xiaDaoInfoHtml += "<li>X向1X幅值：" + Number(spaceData.X1[2].toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>X向1X相位：" + Number(spaceData.X1P[2].toFixed(1)) + "°</li>";
        xiaDaoInfoHtml += "<li>Y向1X幅值：" + Number(spaceData.X1[3].toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>Y向1X相位：" + Number(spaceData.X1P[3].toFixed(1)) + "°</li>";
        xiaDaoInfoHtml += "<li>弯曲量：" + Number(spaceData.roundBendingCapacitys.toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>弯曲角：" + Number(spaceData.roundBendingAngles.toFixed(1)) + "°</li>";
        xiaDaoInfoHtml += "<li>偏心量：" + Number(spaceData.roundHeavyCapacitys.toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>偏心角：" + Number(spaceData.roundHeavyAngles.toFixed(1)) + "°</li>";
        xiaDaoInfoHtml += "<li>配重角：" + Number(spaceData.roundBobHeavyAngles.toFixed(1)) + "°</li>";
        xiaDaoInfoHtml += "<li>镜板不垂直量：" + Number(spaceData.roundMirrorCapacitys.toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>镜板调整角：" + jingBanTiaoZhengJiao + "</li>";
        xiaDaoInfoHtml += "<li>下导摆度影响量：" + xiaDaoBaiDuYingXiangLiang + " </li>";
        xiaDaoInfoHtml += "<li>下机架振动影响量：" + xiaJiJiaZhenDongYingXiangLiang + "</li>";
        xiaDaoInfoHtml += "</ul>";

        xiaDaoInfoHtml += "<ul class='xdAmplitude' style='" + classUl + "display:none;'>";
        xiaDaoInfoHtml += "<li>盘车最小双幅值：" + Number(amplitude.xdmin.toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "<li>盘车最大双幅值：" + Number(amplitude.xdmax.toFixed(1)) + " μm</li>";
        xiaDaoInfoHtml += "</ul>"


        var shuiDaoInfoHtml = "<p class='waterTitle' style='" + classPTitle + "'>水导</p><ul class='basicPanel' style='" + classUl + "'>";
        shuiDaoInfoHtml += "<li>X向1X幅值：" + Number(spaceData.X1[4].toFixed(1)) + " μm</li>";
        shuiDaoInfoHtml += "<li>X向1X相位：" + Number(spaceData.X1P[4].toFixed(1)) + "°</li>";
        shuiDaoInfoHtml += "<li>Y向1X幅值：" + Number(spaceData.X1[5].toFixed(1)) + " μm</li>";
        shuiDaoInfoHtml += "<li>Y向1X相位：" + Number(spaceData.X1P[5].toFixed(1)) + "°</li>";
        shuiDaoInfoHtml += "</ul>";

        shuiDaoInfoHtml += "<ul class='waterAmplitude' style='" + classUl + "display:none;'>";
        shuiDaoInfoHtml += "<li>盘车最小双幅值：" + Number(amplitude.watermin.toFixed(1)) + " μm</li>";
        shuiDaoInfoHtml += "<li>盘车最大双幅值：" + Number(amplitude.watermax.toFixed(1)) + " μm</li>";
        shuiDaoInfoHtml += "</ul>"

        divCtrl.html(shangDaoInfoHtml + xiaDaoInfoHtml + shuiDaoInfoHtml);

        divCtrl.css({
            'float': 'left',
            'padding-left': '50px',
            'padding-top': '50px'
        });

    }


    changeStyle = function(index) { //button event
        if (index == 0) {
            style.pointIndex++; //上一点
        } else if (index == 1) {
            style.pointIndex--; //下一点
        } else if (index == 2) {
            style.weekIndex++; //上一周
        } else if (index == 3) {
            style.weekIndex--; //下一周
        } else if (index == 4) {
            style.circleR = style.circleR + 5; //
        } else if (index == 5) {
            style.circleR = style.circleR - 5; //缩小
            if (style.circleR <= 5) {
                style.circleR = 5; //最小
            }
        } else if (index == 6) {
            style.angelIndex++; //左旋转
        } else if (index == 7) {
            style.angelIndex--; //右旋转
        }

        // if (index == 2 || index == 3) {
        //     useCacheData = false;
        // } else {
        //     useCacheData = true;
        // }

        rebuild();
    }


    rebuild = function() {
        //1，处理边缘样式:每周点索引
        if (style.pointIndex == -1) {
            style.pointIndex = 255; //数据长度固定256
        }
        if (style.pointIndex == 256) {
            style.pointIndex = 0; //数据长度固定256
        }

        //2,处理边缘样式：周索引
        var cirlNumber = spaceData.length;
        if (style.weekIndex == -1) {
            style.weekIndex = cirlNumber - 1;
        }
        if (style.weekIndex == cirlNumber) {
            style.weekIndex = 0;
        }

        //清理canvas，重绘
        for (var i = 0; i < ctxArr.length; i++) {
            ctxArr[i].clearRect(0, 0, canvasArr[i].width, canvasArr[i].height);
        }

        //3，绘图
        if (style.barringType == 0) //不盘车
        {
            draw(spaceData, style, -1, 1, 2);
        } else if (style.barringType == 1) //上导
        {
            draw(spaceData, style, 0, 1, 2);
        } else if (style.barringType == 2) //下导
        {
            draw(spaceData, style, 1, 0, 2);
        }
    }

    draw = function(param_SpaceData, param_Style, p, bp1, bp2) {
        if (p != -1) {
            var i;

            // 被盘1
            i = bp1 * 2;
            for (var j = 0; j < param_SpaceData.data[i].length; j++) {
                param_SpaceData.data[i][j] -= param_SpaceData.data[p * 2][j];
            }
            param_SpaceData.avg[i] -= param_SpaceData.avg[p * 2];
            i++;
            for (var j = 0; j < param_SpaceData.data[i].length; j++) {
                param_SpaceData.data[i][j] -= param_SpaceData.data[p * 2 + 1][j];
            }
            param_SpaceData.avg[i] -= param_SpaceData.avg[p * 2 + 1];

            // 被盘2          
            i = bp2 * 2;
            for (var j = 0; j < param_SpaceData.data[i].length; j++) {
                param_SpaceData.data[i][j] -= param_SpaceData.data[p * 2][j];
            }
            param_SpaceData.avg[i] -= param_SpaceData.avg[p * 2];
            i++;
            for (var j = 0; j < param_SpaceData.data[i].length; j++) {
                param_SpaceData.data[i][j] -= param_SpaceData.data[p * 2 + 1][j];
            }
            param_SpaceData.avg[i] -= param_SpaceData.avg[p * 2 + 1];

            // 盘
            i = p * 2;
            for (var j = 0; j < param_SpaceData.data[i].length; j++) {
                param_SpaceData.data[i][j] = param_SpaceData.avg[i];
            }

            i++;
            for (var j = 0; j < param_SpaceData.data[i].length; j++) {
                param_SpaceData.data[i][j] = param_SpaceData.avg[i];
            }
        }


        spaceData = param_SpaceData;
        style = param_Style;


        //1、正方形&点
        for (var i = 0; i < 3; i++) {
            drawFlipRectangle(width / 2, 100, ctxArr[i]);
        }

        //2、根据半径画圆
        for (var i = 3; i < 6; i++) {
            drawCircle(ctxArr[i], i - 3);
        }

        //4、画每个中心点连线（固定）
        drawCenterLine();

        //5、画上下水每个点的连线（变化）
        drawPointLine(style.pointIndex);

        rotateX();
    };

    //图像倾斜旋转
    rotateX = function() {
        for (var i = 0; i < 6; i++) {
            //第一步：水平方向倾斜，第二步：x轴旋转
            canvasArr[i].style.cssText = " -webkit-transform:  skew(" + style
                .angelIndex + "deg, 0deg) rotateX(" + style.angelIndex + "deg)";
        }
        reDrawPointLine();
    }

    getXY = function(x, y, rx0, ry0) {
        var angel = 0 - style.angelIndex;
        var radian = (2 * Math.PI / 360) * angel;
        var x0 = (x - rx0) * Math.cos(radian) - (y - ry0) * Math.sin(radian) + rx0;
        var y0 = (x - rx0) * Math.sin(radian) + (y - ry0) * Math.cos(radian) + ry0;
        return [x0, y0];
    }

    reDrawPointLine = function() {
        var ctx = ctxArr[7];
        ctx.clearRect(0, 0, width, height * 3);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        var newCurrentPoint = [];
        var currentPoint = _currentPoint;
        for (var i = 0; i < currentPoint.length; i++) {
            //水平方向倾斜反推
            //var arr = getXY(currentPoint[i][0], currentPoint[i][1], width/2, (2*i+1) * 100);

            //X轴旋转反推
            var arr = getXY(currentPoint[i][0], currentPoint[i][1], currentPoint[i]
                [0], (2 * i + 1) * 100);
            arr[1] = arr[1] + i * 5; //上下每个canvas有5像素的间隔
            newCurrentPoint.push(arr);
        }
        ctx.moveTo(newCurrentPoint[0][0], newCurrentPoint[0][1]);
        ctx.lineTo(newCurrentPoint[1][0], newCurrentPoint[1][1]);
        ctx.lineTo(newCurrentPoint[2][0], newCurrentPoint[2][1]);
        ctx.stroke();
        ctx.closePath();
    }

    /** 画圆 */
    drawCircle = function(ctx, index) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(height / 2, 100, style.circleR, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();

        //3、每个圆圈里面的点
        drawCirclePoint(ctx, index);
    }


    drawCenterLine = function() {
        var ctx = ctxArr[6];
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width / 2, 100 - 5); //第1个中心点
        ctx.lineTo(width / 2, 305); //第2个中心点
        ctx.lineTo(width / 2, 505); //第3个中心点
        ctx.stroke();
        ctx.closePath();
    }

    drawCirclePoint = function(ctx, index) {
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = 'white';
        ctx.beginPath();

        var xArr = spaceData.data[index * 2]; //x
        var yArr = spaceData.data[index * 2 + 1]; //y
        var xAvg = spaceData.avg[index * 2];
        var yAvg = spaceData.avg[index * 2 + 1];

        var center = height / 2;
        //根据圆的半径，反推放大系数(45是默认圆半径)
        var scareNumber = (style.circleR - 45) / 5 * 0.1 + 1;
        for (var j = 0; j < xArr.length - 1; j++) {
            if (yArr.length < j) {
                break;
            }
            ctx.moveTo(center - (xArr[j] - xAvg) * scareNumber, center + (yArr[j] - yAvg) * scareNumber); //右中
            ctx.lineTo(center - (xArr[j + 1] - xAvg) * scareNumber, center + (yArr[j + 1] - yAvg) * scareNumber); //左中
            ctx.stroke();
        }
        ctx.closePath();
    }


    drawPointLine = function(j) {
        var ctx = ctxArr[7];
        var currentPoint = [];

        //根据圆的半径，反推放大系数(45是默认圆半径)
        var scareNumber = (style.circleR - 45) / 5 * 0.1 + 1;
        var x = width / 2;

        for (var m = 0; m < spaceData.data.length; m++) { //0,2,4
            var xArr = spaceData.data[m];
            var yArr = spaceData.data[m + 1];
            if (m == 0) {
                currentPoint.push([x - (xArr[j] - spaceData.avg[0]) * scareNumber,
                    100 + (yArr[j] - spaceData.avg[1]) * scareNumber
                ]);
            } else if (m == 2) {
                currentPoint.push([x - (xArr[j] - spaceData.avg[2]) * scareNumber,
                    305 + (yArr[j] - spaceData.avg[3]) * scareNumber
                ]);
            } else if (m == 4) {
                currentPoint.push([x - (xArr[j] - spaceData.avg[4]) * scareNumber,
                    510 + (yArr[j] - spaceData.avg[5]) * scareNumber
                ]);
            }
            m = m + 1;
        }

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentPoint[0][0], currentPoint[0][1]);
        ctx.lineTo(currentPoint[1][0], currentPoint[1][1]);
        ctx.lineTo(currentPoint[2][0], currentPoint[2][1]);
        ctx.stroke();
        ctx.closePath();

        _currentPoint = currentPoint;
    }


    drawFlipRectangle = function(x, y, ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        var height = 100;
        var width = 100;
        ctx.moveTo(x - 100, y); //左中
        ctx.lineTo(x + 100, y); //右中
        ctx.lineTo(x + 100, y - 100); //右上
        ctx.lineTo(x - 100, y - 100); //左上
        ctx.lineTo(x - 100, y + 100); //左下
        ctx.lineTo(x + 100, y + 100); //右下
        ctx.lineTo(x + 100, y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x, y + height);
        ctx.lineTo(x, y - height);
        ctx.stroke();
        ctx.closePath();

        var sheight = height / 5;
        var swidth = width / 5;
        var length = width / 5;
        ctx.fillStyle = "green"; /*设置填充颜色*/
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                ctx.fillRect(x + swidth * (i + 1), y - sheight * (j + 1), 2, 2); //右上
                ctx.fillRect(x - swidth * (i + 1), y - sheight * (j + 1), 2, 2); //左上
                ctx.fillRect(x - swidth * (i + 1), y + sheight * (j + 1), 2, 2); //左下
                ctx.fillRect(x + swidth * (i + 1), y + sheight * (j + 1), 2, 2); //右上
            }
        }
    };


    createControlButton = function() {

        d3.select('body').append('div').attr('id', 'divControl');

        var divCtrl = $('#divControl');

        var btnStyle = "background-color: #e7e7e7; color: black;border:none;padding:15px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin:4px 2px;cursor:pointer;";

        var lastPointBtn = "<button style='" + btnStyle + "' onclick='changeStyle(0)'>上一点</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var nextPointBtn = "<button style='" + btnStyle + "' onclick='changeStyle(1)'>下一点</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var lastCircleBtn = "<button style='" + btnStyle + "' onclick='changeStyle(3)'>上一周</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var nextCircleBtn = "<button style='" + btnStyle + "' onclick='changeStyle(2)'>下一周</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var leftRotateBtn = "<button style='" + btnStyle + "' onclick='changeStyle(6)'>左旋</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var rightRotateBtn = "<button style='" + btnStyle + "' onclick='changeStyle(7)'>右旋</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

        var pancheOpt = "<select id='oPtPanche'onchange='pancheTypeChange()'><option label='不盘车' value='0' selected='selected'>不盘车</option><option label='上导盘'value='1'>上导盘</option><option label='下导盘'value='2'>下导盘</option></select>";


        var btnHtml = lastPointBtn + nextPointBtn + lastCircleBtn + nextCircleBtn + leftRotateBtn + rightRotateBtn + pancheOpt;


        divCtrl.html(btnHtml);

        divCtrl.css({
            'text-align': 'center',
            'padding': '5px'
        });

    }



    createDateFormatter = function(knimeColType) {
        var format;
        switch (knimeColType) {
            case 'Date and Time':
                format = _representation.dateTimeFormats.globalDateTimeFormat;
                break;
            case 'Local Date':
                format = _representation.dateTimeFormats.globalLocalDateFormat;
                break;
            case 'Local Date Time':
                format = _representation.dateTimeFormats.globalLocalDateTimeFormat;
                break;
            case 'Local Time':
                format = _representation.dateTimeFormats.globalLocalTimeFormat;
                break;
            case 'Zoned Date Time':
                format = _representation.dateTimeFormats.globalZonedDateTimeFormat;
                break;
            default:
                // might be not set correct in case of opening the view of the old workflow, i.e. for backward compatibility 
                knimeColType = 'Date and Time';
                format = _representation.dateTimeFormats.globalDateTimeFormat;
        }
        return new DateFormat(format, knimeColType);
    }

    DateFormat = function(format, knimeColType) {
        this._format = format;
        this._knimeColType = knimeColType;
    }

    DateFormat.prototype.format = function(n) {
        if (this._knimeColType == 'Date and Time' || this._knimeColType == 'Local Date' || this._knimeColType == 'Local Date Time' || this._knimeColType == 'Local Time') {
            return moment(n).utc().format(this._format);
        } else if (this._knimeColType == 'Zoned Date Time') {
            return moment(n).tz(_representation.dateTimeFormats.timezone).format(this._format);
        }
    };
	
	return view;
}();