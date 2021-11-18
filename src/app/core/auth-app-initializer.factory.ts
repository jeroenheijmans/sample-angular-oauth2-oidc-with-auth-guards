import { AuthService } from './auth.service'

export function authAppInitializerFactory(authService: AuthService): () => Promise<void> {
  return () => authService.runInitialLoginSequence();
}
