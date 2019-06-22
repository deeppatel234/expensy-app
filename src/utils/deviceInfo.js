import DeviceInfo from 'react-native-device-info';

export default {
  brand: DeviceInfo.getBrand(),
  deviceCountry: DeviceInfo.getDeviceCountry(),
  deviceId: DeviceInfo.getDeviceId(),
  deviceLocale: DeviceInfo.getDeviceLocale(),
  manufacturer: DeviceInfo.getManufacturer(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  timezone: DeviceInfo.getTimezone(),
  uniqueId: DeviceInfo.getUniqueID(),
  userAgent: DeviceInfo.getUserAgent(),
  version: DeviceInfo.getVersion(),
  deviceType: DeviceInfo.getDeviceType(),
};
