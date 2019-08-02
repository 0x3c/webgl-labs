/**
 * @description 初始化 webgl 上下文
 */
const initWebGl = (canvas: HTMLCanvasElement): WebGLRenderingContext => {
  let gl: WebGLRenderingContext | null;
  try {
    gl = canvas.getContext("experimental-webgl");
  } catch (e) {
    throw e.toString();
  }
  return <WebGLRenderingContext>gl;
};

/**
 * @description 设置 webgl 视口
 */
const initViewport = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement
): void => {
  gl.viewport(0, 0, canvas.width, canvas.height);
};

/**
 * @description 创建顶点数组 - 正方形
 */
const createSquare = (gl: WebGLRenderingContext) => {
  let vertexBuffer;
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  let verts = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  let square = {
    buffer: vertexBuffer,
    vertSize: 3,
    nVerts: 4,
    primtype: gl.TRIANGLE_STRIP
  };
  return square;
};

/**
 * 
 * @description 创建顶点着色器并完成配置
 */
const createVertexShader = (gl: WebGLRenderingContext): WebGLShader => {
  const vertexShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER)
  // GLSL程序代码的字符串。
  const vertexShaderSource =
    "   attribute vec3 vertexPos;\n" +
    "   uniform mat4 modelViewMatrix;\n" +
    "   uniform mat4 projectionMatrix;\n" +
    "   void main(void) {\n" +
    "       //返回变换并投影后的顶点数据\n" +
    "      gl_Position = projectionMatrix*modelViewMatrix*\n" +
    "          vec4(vertexPos,1.0);\n" +
    "   }\n";
  gl.shaderSource(vertexShader, vertexShaderSource); // 设置该着色器的 GLSL程序代码
  gl.compileShader(vertexShader); //编译GLSL 着色器
  return vertexShader
}

/**
 * 
 * @description 创建片段着色器并完成配置
 */
const createFragmentShader = (gl: WebGLRenderingContext): WebGLShader => {
  const fragmentShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER)
  // GLSL程序代码的字符串。
  const fragmentShaderSource =
    "   void main(void) {\n" +
    "       //返回像素颜色，这里为白色\n" +
    "      gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n" +
    "   }\n";
  gl.shaderSource(fragmentShader, fragmentShaderSource); // 设置该着色器的 GLSL程序代码
  gl.compileShader(fragmentShader); //编译GLSL 着色器
  return fragmentShader
}

/**
 * @description 创建着色器程序
 */
const createShaderProgram = (gl: WebGLRenderingContext): WebGLProgram => {
  const program = <WebGLProgram>gl.createProgram();
  gl.attachShader(program, createVertexShader(gl)); // 添加顶点着色器到 program
  gl.attachShader(program, createFragmentShader(gl)); // 添加片段着色器到 program
  gl.linkProgram(program); // 链接 program 到已附着的顶点着色器和片段着色器。what ??
  return program
}

const modelViewMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -3.333, 1
]);
const projectionMatrix = new Float32Array([2.41421, 0, 0, 0, 0, 2.41421, 0, 0, 0, 0, -1.002002, -1, 0, 0, -0.2002002, 0
]);




const draw = (gl: WebGLRenderingContext, obj) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 设置清空颜色缓冲区时的颜色默认值
  gl.clear(gl.COLOR_BUFFER_BIT); // 用预设值清空缓冲, 预设颜色缓冲区的颜色(默认 rgba(0, 0, 0, 0))、深度缓冲区的深度(默认1)

  //设置顶点数组
  gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer); // 将缓冲区绑定到 buffer

  const shaderProgram = createShaderProgram(gl); // 创建着色器程序

  // //设置着色器
  gl.useProgram(shaderProgram); // 将着色器 program 对象添加到当前的渲染状态中。

  // 获取属性指向
  const shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'vertexPos'); // 获取 program 中 vertexPos 的下标指向位置
  // 启用属性
  gl.enableVertexAttribArray(shaderVertexPositionAttribute); // 通过下标指向 启用该 program 的顶点属性

  const shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, 'projectionMatrix'); // 获取 program 的 uniform 变量 projectionMatrix
  const shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, 'modelViewMatrix'); // 获取 program 的 uniform 变量 modelViewMatrix

  // //设置着色器参数：顶点坐标、投影矩阵和模型视图矩阵
  gl.vertexAttribPointer(
    shaderVertexPositionAttribute, // 顶点属性索引
    obj.vertSize, // 顶点属性的组成数量, 1 | 2 | 3 | 4
    gl.FLOAT, // 数据类型
    false, // 转化为浮点数后是否归一化, 已经为浮点数则无效
    0, // 步长
    0 // 第一个 component 的位置
  ); // 让显卡从指定顶点属性索引读取顶点数据, 是 type 长度的整数倍

  // 指定 uniform 矩阵变量, 在 vertex shader 中使用到
  gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
  gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);

  // //绘制物体
  gl.drawArrays(obj.primtype, 0, obj.nVerts);
};

// 初始化程序
const init = (canvas: HTMLCanvasElement) => {
  const gl = initWebGl(canvas);
  initViewport(gl, canvas);
  const square = createSquare(gl);

  draw(gl, square);
};
export default init;
