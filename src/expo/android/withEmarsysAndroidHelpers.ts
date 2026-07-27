export function setMetaData(
  app: any,
  name: string,
  { value, resource }: { value?: string | string[], resource?: string }
) {
  if (!app['meta-data']) {
    app['meta-data'] = [];
  }

  // Find existing entry
  const existingIndex = app['meta-data'].findIndex(
    (item: any) => item.$ && item.$['android:name'] === name
  );

  let metaDataEntry = undefined;
  if (value) {
    // Convert array values to comma-separated string
    const stringValue = Array.isArray(value) ? value.join(',') : value;
    metaDataEntry = {
      $: {
        'android:name': name,
        'android:value': stringValue,
      },
    };
  } else if (resource) {
    metaDataEntry = {
      $: {
        'android:name': name,
        'android:resource': resource,
      },
    };
  }

  if (metaDataEntry) {
    if (existingIndex !== -1) {
      // Update existing entry
      app['meta-data'][existingIndex] = metaDataEntry;
    } else {
      // Add new entry
      app['meta-data'].push(metaDataEntry);
    }
  }
}

export function addEmarsysMessagingService(app: any) {
  const SERVICE_NAME = "com.emarsys.service.EmarsysFirebaseMessagingService";
  const MESSAGING_EVENT = "com.google.firebase.MESSAGING_EVENT";
  app.service = app.service || [];

  const hasEmarsysMessagingService = app.service.some(
    (srv: any) => srv.$['android:name'] === SERVICE_NAME
  );

  const hasMessagingEventIntentFilter = app.service.some(
    (srv: any) => srv['intent-filter'] &&
      srv['intent-filter'].some((filter: any) =>
        filter.action &&
        filter.action.some((action: any) =>
          action.$ && action.$['android:name'] === MESSAGING_EVENT
        )
      )
  );

  if (!hasEmarsysMessagingService && !hasMessagingEventIntentFilter) {
    app.service.push({
      $: {
        'android:name': SERVICE_NAME,
        'android:exported': 'false',
      },
      'intent-filter': [
        {
          action: [
            {
              $: {
                'android:name': MESSAGING_EVENT,
              },
            },
          ],
        },
      ],
    });
  }
}
