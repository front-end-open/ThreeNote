/*
 * @LastEditTime: 2022-03-06 14:23:07
 * @Description:
 * @Date: 2022-03-06 01:17:32
 * @Author: wangshan
 * @LastEditors: wangshan
 */
// canvas绘制工具

// 房子

(function (global) {
  function house() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // // 矩形区域填充背景
    // ctx.fillStyle = "#fff";
    // ctx.fillRect(0, 0, 500, 500);
    // ctx.beginPath();

    // Set line width
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillStyle = "blue";
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();

    return canvas;
  }

  // 创建一个图像模式
  function imgPatter(call) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 500;
    canvas.height = 500;
    img.src = "http://127.0.0.1:3500/src/capter06/static/hai.jpeg";
    img.onload = (e) => {
      // 图片载入完成过后触发
      console.log(e);
      let pattern = ctx.createPattern(img, "repeat");

      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 500, 500);

      call(canvas);
    };
  }

  // 视频流作为纹理
  function videoFrame() {
    let video = document.createElement("video");
    video.src = "http://127.0.0.1:3500/src/capter06/static/hai.mp4";
    video.autoplay = "autoplay";

    return video;
  }

  global.video = videoFrame();
  global.imgPatter = imgPatter;
  global.house = house();
})(window);
