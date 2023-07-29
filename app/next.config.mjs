import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

export default million.next(nextConfig);
