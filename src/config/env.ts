/**
 * Environment configuration
 * Vite exposes environment variables prefixed with VITE_ to the client
 */

export const config = {
  apiGatewayUrl: import.meta.env.VITE_API_GATEWAY_URL || '',
} as const;

/**
 * Validates that all required environment variables are set
 */
export function validateEnv(): { isValid: boolean; missingVars: string[] } {
  const missingVars: string[] = [];

  if (!config.apiGatewayUrl || config.apiGatewayUrl.includes('your-api-id')) {
    missingVars.push('VITE_API_GATEWAY_URL');
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}
