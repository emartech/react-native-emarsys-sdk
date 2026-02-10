import NativeEmarsysConfig from './native/NativeEmarsysConfig';

NativeEmarsysConfig.getRNWrapperVersion = () => {
  return require('../../package.json').version;
};

export default NativeEmarsysConfig;
