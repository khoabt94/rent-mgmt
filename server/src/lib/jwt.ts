import { ConfigService } from "@nestjs/config"
import { ENV_KEY } from "src/constants"

export async function useJWTServiceFactory(configService: ConfigService) {
  const secret = configService.get<string>(ENV_KEY.JWT_SECRET)
  const expiresIn = configService.get<string>(ENV_KEY.JWT_EXPIRE)

  return {
    secret,
    signOptions: {
      expiresIn
    }
  }
}