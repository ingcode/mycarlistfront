module.exports = {
  presets: [
    '@babel/preset-env', // 최신 JavaScript 기능을 ES5로 변환
    '@babel/preset-react' // React JSX 구문을 변환
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties', // 클래스 속성 문법 지원
    '@babel/plugin-transform-runtime' // 코드 재사용을 위한 Babel 런타임 변환
  ]
};