import { useRef, useState } from 'react';
import Emarsys, { InlineInAppView, Message, Tag } from 'react-native-emarsys-sdk';
import { ScrollView, Button, Alert, Separator, SectionTitle } from './Components';

let inboxMessages: Message[] | null | undefined = undefined

export default function PushScreen() {
  const inlineInAppView = useRef<any>(null);
  const [inlineInAppViewHeight, setInlineInAppViewHeight] = useState(0);

  return (
    <ScrollView>
      <Button title="Pause" action={async () => {
        await Emarsys.inApp.pause();
      }} />
      <Button title="Resume" action={async () => {
        await Emarsys.inApp.resume();
      }} />
      <Button title="Is Paused" action={async () => {
        return await Emarsys.inApp.isPaused();
      }} printResult />
      <Button title="Load Inline InApp" action={async () => {
        const viewId = 'view-id';
        Emarsys.inApp.loadInlineInApp(inlineInAppView.current, viewId);
      }} />
      <InlineInAppView
        ref={inlineInAppView}
        style={{ width: '100%', height: inlineInAppViewHeight }}
        onEvent={(event) => {
          Alert('InlineInAppView', `onEvent: ${event.nativeEvent.name}: ${JSON.stringify(event.nativeEvent.payload)}`);
        }}
        onCompletion={(event) => {
          if (!event.nativeEvent.error) {
            setInlineInAppViewHeight(125);
          } else {
            Alert('InlineInAppView', `onCompletion: Error: ${event.nativeEvent.error}`);
          }
        }}
        onClose={() => {
          setInlineInAppViewHeight(0);
        }}
      />

      <Separator />

      <SectionTitle title="Inbox" />

      <Button title="Fetch Messages" action={async () => {
        inboxMessages = await Emarsys.inbox.fetchMessages();
        return JSON.stringify(inboxMessages, null, 2);
      }} printResult />
      <Button title="Add Tag" action={async () => {
        if (inboxMessages && inboxMessages[0]) {
          await Emarsys.inbox.addTag(Tag.seen, inboxMessages[0].id);
          return inboxMessages[0].id;
        } else {
          return 'No inbox messages. Call Inbox Fetch Messages first.';
        }
      }} printResult />
      <Button title="Remove Tag" action={async () => {
        if (inboxMessages && inboxMessages[0]) {
          await Emarsys.inbox.removeTag(Tag.seen, inboxMessages[0].id);
          return inboxMessages[0].id;
        } else {
          return 'No inbox messages. Call Inbox Fetch Messages first.';
        }
      }} printResult />

    </ScrollView>
  );
}
