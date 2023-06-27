import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'IonicTest',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.198:8100',
    cleartext: true,
  }
};

export default config;
