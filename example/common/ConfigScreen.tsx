import Emarsys from 'react-native-emarsys-sdk';
import { ScrollView, Button, Separator } from './Components';

export default function ConfigScreen() {
  return (
    <ScrollView>
      <Button title="Set Contact" action={async () => {
        const contactFieldId = 100009769;
        const contactFieldValue = 'B8mau1nMO8PilvTp6P'; // demoapp@emarsys.com
        await Emarsys.setContact(contactFieldId, contactFieldValue);
      }} />
      <Button title="Clear Contact" action={async () => {
        await Emarsys.clearContact();
      }} />
      <Button title="Track Custom Event" action={async () => {
        const eventName = 'test-event';
        const eventAttributes = { k1: 'v1', k2: 'v2' };
        await Emarsys.trackCustomEvent(eventName, eventAttributes);
      }} />
      <Button title="Track Deeplink" action={async () => {
        const url = 'https://github.com/emartech/react-native-emarsys-sdk?ems_dl=test';
        Emarsys.trackDeepLink(url);
      }} />

      <Separator />

      <Button title="Change Application Code" action={async () => {
        const applicationCode = 'EMSF6-F532D';
        await Emarsys.config.changeApplicationCode(applicationCode);
      }} />
      <Button title="Change Merchant Id" action={async () => {
        const merchantId = '1428C8EE286EC34B';
        await Emarsys.config.changeMerchantId(merchantId);
      }} />
      <Button title="Get Application Code" action={async () => {
        return await Emarsys.config.getApplicationCode();
      }} printResult />
      <Button title="Get Merchant Id" action={async () => {
        return await Emarsys.config.getMerchantId();
      }} printResult />
      <Button title="Get Contact Field Id" action={async () => {
        return await Emarsys.config.getContactFieldId();
      }} printResult />
      <Button title="Get Client Id" action={async () => {
        return await Emarsys.config.getClientId();
      }} printResult />
      <Button title="Get Language Code" action={async () => {
        return await Emarsys.config.getLanguageCode();
      }} printResult />
      <Button title="Get SDK Version" action={async () => {
        return await Emarsys.config.getSdkVersion();
      }} printResult />
      <Button title="Get RN Wrapper Version" action={async () => {
        return await Emarsys.config.getRNWrapperVersion();
      }} printResult />

    </ScrollView>
  );
}
