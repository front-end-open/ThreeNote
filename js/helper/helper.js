/*
 * @Author: wangshan
 * @Date: 2022-02-26 18:33:27
 * @LastEditors: wangshan
 * @LastEditTime: 2022-02-26 19:15:00
 * @Description:
 */
((global) => {
  function initShader(gl, vsShader, fsShader) {
    // 顶点着色器
    let vShaders = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShaders, vsShader);
    gl.compileShader(vShaders);

    if (!gl.getShaderParameter(vShaders, gl.COMPILE_STATUS)) {
      console.error("----->>>vShader 编译错误:", gl.getShaderInfoLog(vShaders));

      return false;
    }
    //片元着色器
    let fShaders = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShaders, fsShader);
    gl.compileShader(fShaders);

    if (!gl.getShaderParameter(fShaders, gl.COMPILE_STATUS)) {
      console.error("----->>>fShader 编译错误:", gl.getShaderInfoLog(fShaders));

      return false;
    }

    // 创建项目绑定着色器
    const shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vShaders);
    gl.attachShader(shaderProgram, fShaders);

    gl.program = shaderProgram;

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(
        "------>>>着色器链接失败: " + gl.getProgramInfoLog(shaderProgram)
      );

      return false;
    }

    // 3. 使用
    gl.useProgram(shaderProgram);

    return true;
  }

  global.initShader = initShader;
})(window);
