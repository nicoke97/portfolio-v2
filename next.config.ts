import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: "/nerd-stuff", destination: "/projects", permanent: true },
      { source: "/projects/pythonos", destination: "/projects/codenda", permanent: true },
      { source: "/projects/modernization", destination: "/projects/NetFramework-to-Core", permanent: true },
      { source: "/projects/microservices", destination: "/projects/TFS-migration-GH", permanent: true },
    ];
  },
};

export default nextConfig;
