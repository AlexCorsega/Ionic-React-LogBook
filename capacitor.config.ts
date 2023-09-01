import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.logbook.app",
  appName: "Log Book",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
