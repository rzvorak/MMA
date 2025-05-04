import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {  
    images: {
        remotePatterns: [new URL('https://vyzdamzroiuuldfooeti.supabase.co')],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
