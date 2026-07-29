import type ConfigType from "@/config/types";

const config: ConfigType = {
    base_url: process.env.BACKEND_API_URL as string,    
}
export default config;