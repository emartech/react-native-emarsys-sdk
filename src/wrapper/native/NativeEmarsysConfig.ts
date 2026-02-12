import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  changeApplicationCode(applicationCode?: string | null): Promise<void>;
  changeMerchantId(merchantId?: string | null): Promise<void>;
  getApplicationCode(): Promise<string>;
  getMerchantId(): Promise<string>;
  getContactFieldId(): Promise<string>;
  getClientId(): Promise<string>;
  getLanguageCode(): Promise<string>;
  getSdkVersion(): Promise<string>;
  getRNWrapperVersion(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeEmarsysConfig'
);
