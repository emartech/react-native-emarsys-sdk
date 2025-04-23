import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type AppEvent = {
  eventName: string;
  payload?: string;
};
type CompletedEvent = {
  error?: string;
};

export interface NativeProps extends ViewProps {
  // loadInApp (viewId: string): void;
  viewId?: string;
  onAppEvent?: DirectEventHandler<AppEvent> | null;
  onCompleted?: DirectEventHandler<CompletedEvent> | null;
  onClose?: DirectEventHandler<{}> | null;
}

export default codegenNativeComponent<NativeProps>(
  'RNEmarsysInlineInAppView',
) as HostComponent<NativeProps>;
